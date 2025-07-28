#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for CIEL Cybersecurity Blog
Tests all API endpoints with various scenarios including pagination, search, filtering, and error handling.
"""

import requests
import json
import os
from datetime import datetime
import sys

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        print("❌ Frontend .env file not found")
        return None
    return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("❌ Could not get backend URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"

print(f"🔗 Testing backend at: {API_BASE}")

class TestResults:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.errors = []
    
    def success(self, test_name):
        self.passed += 1
        print(f"✅ {test_name}")
    
    def failure(self, test_name, error):
        self.failed += 1
        self.errors.append(f"{test_name}: {error}")
        print(f"❌ {test_name}: {error}")
    
    def summary(self):
        total = self.passed + self.failed
        print(f"\n📊 Test Summary: {self.passed}/{total} passed")
        if self.errors:
            print("\n🚨 Failures:")
            for error in self.errors:
                print(f"  - {error}")

results = TestResults()

def test_health_check():
    """Test health check endpoint"""
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "status" in data and data["status"] == "healthy":
                results.success("Health check endpoint")
            else:
                results.failure("Health check endpoint", "Invalid response format")
        else:
            results.failure("Health check endpoint", f"Status code: {response.status_code}")
    except Exception as e:
        results.failure("Health check endpoint", str(e))

def test_get_articles_basic():
    """Test basic articles retrieval"""
    try:
        response = requests.get(f"{API_BASE}/articles", timeout=10)
        if response.status_code == 200:
            data = response.json()
            required_fields = ["articles", "total", "page", "limit"]
            if all(field in data for field in required_fields):
                if len(data["articles"]) > 0:
                    # Check article structure
                    article = data["articles"][0]
                    article_fields = ["id", "title", "excerpt", "content", "author", "category", "tags", "likes", "comment_count"]
                    if all(field in article for field in article_fields):
                        results.success("Get articles basic")
                    else:
                        results.failure("Get articles basic", "Missing article fields")
                else:
                    results.failure("Get articles basic", "No articles returned")
            else:
                results.failure("Get articles basic", "Missing response fields")
        else:
            results.failure("Get articles basic", f"Status code: {response.status_code}")
    except Exception as e:
        results.failure("Get articles basic", str(e))

def test_articles_pagination():
    """Test articles pagination"""
    try:
        # Test page 1 with limit 2
        response = requests.get(f"{API_BASE}/articles?page=1&limit=2", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data["page"] == 1 and data["limit"] == 2 and len(data["articles"]) <= 2:
                results.success("Articles pagination")
            else:
                results.failure("Articles pagination", "Pagination parameters not respected")
        else:
            results.failure("Articles pagination", f"Status code: {response.status_code}")
    except Exception as e:
        results.failure("Articles pagination", str(e))

def test_articles_search():
    """Test articles search functionality"""
    try:
        # Search for "cybersécurité"
        response = requests.get(f"{API_BASE}/articles?search=cybersécurité", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if len(data["articles"]) > 0:
                # Check if search term appears in title, excerpt, or content
                found_match = False
                for article in data["articles"]:
                    if ("cybersécurité" in article["title"].lower() or 
                        "cybersécurité" in article["excerpt"].lower() or 
                        "cybersécurité" in article["content"].lower()):
                        found_match = True
                        break
                if found_match:
                    results.success("Articles search")
                else:
                    results.failure("Articles search", "Search results don't contain search term")
            else:
                results.failure("Articles search", "No search results returned")
        else:
            results.failure("Articles search", f"Status code: {response.status_code}")
    except Exception as e:
        results.failure("Articles search", str(e))

def test_articles_category_filter():
    """Test articles category filtering"""
    try:
        # Filter by "Menaces" category
        response = requests.get(f"{API_BASE}/articles?category=Menaces", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if len(data["articles"]) > 0:
                # Check if all articles have the correct category
                all_correct_category = all(article["category"] == "Menaces" for article in data["articles"])
                if all_correct_category:
                    results.success("Articles category filter")
                else:
                    results.failure("Articles category filter", "Some articles have wrong category")
            else:
                results.failure("Articles category filter", "No articles found for category")
        else:
            results.failure("Articles category filter", f"Status code: {response.status_code}")
    except Exception as e:
        results.failure("Articles category filter", str(e))

def test_articles_sorting():
    """Test articles sorting"""
    try:
        # Test sorting by likes (popular)
        response = requests.get(f"{API_BASE}/articles?sort=popular", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if len(data["articles"]) >= 2:
                # Check if articles are sorted by likes in descending order
                likes_sorted = all(data["articles"][i]["likes"] >= data["articles"][i+1]["likes"] 
                                 for i in range(len(data["articles"])-1))
                if likes_sorted:
                    results.success("Articles sorting (popular)")
                else:
                    results.failure("Articles sorting (popular)", "Articles not sorted by likes")
            else:
                results.success("Articles sorting (popular)")  # Not enough articles to verify sorting
        else:
            results.failure("Articles sorting (popular)", f"Status code: {response.status_code}")
    except Exception as e:
        results.failure("Articles sorting (popular)", str(e))

def test_get_specific_article():
    """Test getting a specific article by ID"""
    try:
        # First get articles to get a valid ID
        response = requests.get(f"{API_BASE}/articles", timeout=10)
        if response.status_code == 200:
            articles = response.json()["articles"]
            if len(articles) > 0:
                article_id = articles[0]["id"]
                
                # Now get specific article
                response = requests.get(f"{API_BASE}/articles/{article_id}", timeout=10)
                if response.status_code == 200:
                    article = response.json()
                    if article["id"] == article_id:
                        results.success("Get specific article")
                    else:
                        results.failure("Get specific article", "Wrong article returned")
                else:
                    results.failure("Get specific article", f"Status code: {response.status_code}")
            else:
                results.failure("Get specific article", "No articles available for testing")
        else:
            results.failure("Get specific article", "Could not get articles list")
    except Exception as e:
        results.failure("Get specific article", str(e))

def test_article_not_found():
    """Test 404 for non-existent article"""
    try:
        response = requests.get(f"{API_BASE}/articles/non-existent-id", timeout=10)
        if response.status_code == 404:
            results.success("Article not found (404)")
        else:
            results.failure("Article not found (404)", f"Expected 404, got {response.status_code}")
    except Exception as e:
        results.failure("Article not found (404)", str(e))

def test_like_article():
    """Test liking an article"""
    try:
        # First get an article
        response = requests.get(f"{API_BASE}/articles", timeout=10)
        if response.status_code == 200:
            articles = response.json()["articles"]
            if len(articles) > 0:
                article_id = articles[0]["id"]
                original_likes = articles[0]["likes"]
                
                # Like the article
                response = requests.post(f"{API_BASE}/articles/{article_id}/like", timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    if "likes" in data and data["likes"] == original_likes + 1:
                        results.success("Like article")
                    else:
                        results.failure("Like article", "Likes count not incremented correctly")
                else:
                    results.failure("Like article", f"Status code: {response.status_code}")
            else:
                results.failure("Like article", "No articles available for testing")
        else:
            results.failure("Like article", "Could not get articles list")
    except Exception as e:
        results.failure("Like article", str(e))

def test_get_comments():
    """Test getting comments for an article"""
    try:
        # First get an article
        response = requests.get(f"{API_BASE}/articles", timeout=10)
        if response.status_code == 200:
            articles = response.json()["articles"]
            if len(articles) > 0:
                article_id = articles[0]["id"]
                
                # Get comments
                response = requests.get(f"{API_BASE}/articles/{article_id}/comments", timeout=10)
                if response.status_code == 200:
                    comments = response.json()
                    if isinstance(comments, list):
                        if len(comments) > 0:
                            # Check comment structure
                            comment = comments[0]
                            comment_fields = ["id", "article_id", "author", "content", "likes", "published_at"]
                            if all(field in comment for field in comment_fields):
                                results.success("Get comments")
                            else:
                                results.failure("Get comments", "Missing comment fields")
                        else:
                            results.success("Get comments")  # Empty comments list is valid
                    else:
                        results.failure("Get comments", "Response is not a list")
                else:
                    results.failure("Get comments", f"Status code: {response.status_code}")
            else:
                results.failure("Get comments", "No articles available for testing")
        else:
            results.failure("Get comments", "Could not get articles list")
    except Exception as e:
        results.failure("Get comments", str(e))

def test_create_comment():
    """Test creating a comment"""
    try:
        # First get an article
        response = requests.get(f"{API_BASE}/articles", timeout=10)
        if response.status_code == 200:
            articles = response.json()["articles"]
            if len(articles) > 0:
                article_id = articles[0]["id"]
                original_comment_count = articles[0]["comment_count"]
                
                # Create comment
                comment_data = {
                    "author": "Test User",
                    "content": "This is a test comment for API testing."
                }
                response = requests.post(f"{API_BASE}/articles/{article_id}/comments", 
                                       json=comment_data, timeout=10)
                if response.status_code == 200:
                    comment = response.json()
                    if (comment["article_id"] == article_id and 
                        comment["author"] == comment_data["author"] and
                        comment["content"] == comment_data["content"]):
                        
                        # Verify comment count was incremented
                        response = requests.get(f"{API_BASE}/articles/{article_id}", timeout=10)
                        if response.status_code == 200:
                            updated_article = response.json()
                            if updated_article["comment_count"] == original_comment_count + 1:
                                results.success("Create comment")
                            else:
                                results.failure("Create comment", "Comment count not incremented")
                        else:
                            results.failure("Create comment", "Could not verify comment count")
                    else:
                        results.failure("Create comment", "Comment data incorrect")
                else:
                    results.failure("Create comment", f"Status code: {response.status_code}")
            else:
                results.failure("Create comment", "No articles available for testing")
        else:
            results.failure("Create comment", "Could not get articles list")
    except Exception as e:
        results.failure("Create comment", str(e))

def test_like_comment():
    """Test liking a comment"""
    try:
        # First get comments
        response = requests.get(f"{API_BASE}/articles", timeout=10)
        if response.status_code == 200:
            articles = response.json()["articles"]
            if len(articles) > 0:
                article_id = articles[0]["id"]
                
                response = requests.get(f"{API_BASE}/articles/{article_id}/comments", timeout=10)
                if response.status_code == 200:
                    comments = response.json()
                    if len(comments) > 0:
                        comment_id = comments[0]["id"]
                        original_likes = comments[0]["likes"]
                        
                        # Like the comment
                        response = requests.post(f"{API_BASE}/comments/{comment_id}/like", timeout=10)
                        if response.status_code == 200:
                            data = response.json()
                            if "likes" in data and data["likes"] == original_likes + 1:
                                results.success("Like comment")
                            else:
                                results.failure("Like comment", "Likes count not incremented correctly")
                        else:
                            results.failure("Like comment", f"Status code: {response.status_code}")
                    else:
                        results.failure("Like comment", "No comments available for testing")
                else:
                    results.failure("Like comment", "Could not get comments")
            else:
                results.failure("Like comment", "No articles available for testing")
        else:
            results.failure("Like comment", "Could not get articles list")
    except Exception as e:
        results.failure("Like comment", str(e))

def test_get_ciel_info():
    """Test getting CIEL info"""
    try:
        response = requests.get(f"{API_BASE}/ciel-info", timeout=10)
        if response.status_code == 200:
            data = response.json()
            required_fields = ["name", "description", "mission", "specializations", "stats"]
            if all(field in data for field in required_fields):
                if (isinstance(data["specializations"], list) and 
                    isinstance(data["stats"], dict)):
                    results.success("Get CIEL info")
                else:
                    results.failure("Get CIEL info", "Invalid data structure")
            else:
                results.failure("Get CIEL info", "Missing required fields")
        else:
            results.failure("Get CIEL info", f"Status code: {response.status_code}")
    except Exception as e:
        results.failure("Get CIEL info", str(e))

def test_get_formations():
    """Test getting all formations"""
    try:
        response = requests.get(f"{API_BASE}/formations", timeout=10)
        if response.status_code == 200:
            formations = response.json()
            if isinstance(formations, list) and len(formations) > 0:
                # Check formation structure
                formation = formations[0]
                required_fields = ["level", "title", "duration", "description", "objectives", "skills", "career_paths"]
                if all(field in formation for field in required_fields):
                    results.success("Get formations")
                else:
                    results.failure("Get formations", "Missing formation fields")
            else:
                results.failure("Get formations", "No formations returned or invalid format")
        else:
            results.failure("Get formations", f"Status code: {response.status_code}")
    except Exception as e:
        results.failure("Get formations", str(e))

def test_get_formation_by_level():
    """Test getting formation by level"""
    try:
        levels = ["BAC_PRO", "BTS", "MASTER"]
        for level in levels:
            response = requests.get(f"{API_BASE}/formations/{level}", timeout=10)
            if response.status_code == 200:
                formation = response.json()
                if formation["level"] == level:
                    results.success(f"Get formation by level ({level})")
                else:
                    results.failure(f"Get formation by level ({level})", "Wrong level returned")
            else:
                results.failure(f"Get formation by level ({level})", f"Status code: {response.status_code}")
    except Exception as e:
        results.failure("Get formation by level", str(e))

def test_formation_not_found():
    """Test 404 for non-existent formation level"""
    try:
        response = requests.get(f"{API_BASE}/formations/INVALID_LEVEL", timeout=10)
        if response.status_code == 404:
            results.success("Formation not found (404)")
        else:
            results.failure("Formation not found (404)", f"Expected 404, got {response.status_code}")
    except Exception as e:
        results.failure("Formation not found (404)", str(e))

def test_cors_headers():
    """Test CORS headers are present"""
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        cors_headers = [
            'access-control-allow-origin',
            'access-control-allow-methods',
            'access-control-allow-headers'
        ]
        
        present_headers = [header for header in cors_headers 
                          if header in [h.lower() for h in response.headers.keys()]]
        
        if len(present_headers) > 0:
            results.success("CORS headers present")
        else:
            results.failure("CORS headers present", "No CORS headers found")
    except Exception as e:
        results.failure("CORS headers present", str(e))

def test_create_article():
    """Test creating a new article"""
    try:
        article_data = {
            "title": "Test Article for API Testing",
            "excerpt": "This is a test article created during API testing.",
            "content": "# Test Article\n\nThis is the content of the test article created during API testing.",
            "author": "API Test Suite",
            "category": "Test",
            "tags": ["test", "api", "automation"],
            "read_time": "2 min"
        }
        
        response = requests.post(f"{API_BASE}/articles", json=article_data, timeout=10)
        if response.status_code == 200:
            article = response.json()
            if (article["title"] == article_data["title"] and
                article["author"] == article_data["author"] and
                "id" in article):
                results.success("Create article")
            else:
                results.failure("Create article", "Article data incorrect")
        else:
            results.failure("Create article", f"Status code: {response.status_code}")
    except Exception as e:
        results.failure("Create article", str(e))

def run_all_tests():
    """Run all backend API tests"""
    print("🚀 Starting CIEL Cybersecurity Blog API Tests\n")
    
    # Health and basic functionality
    test_health_check()
    
    # Articles API tests
    test_get_articles_basic()
    test_articles_pagination()
    test_articles_search()
    test_articles_category_filter()
    test_articles_sorting()
    test_get_specific_article()
    test_article_not_found()
    test_like_article()
    test_create_article()
    
    # Comments API tests
    test_get_comments()
    test_create_comment()
    test_like_comment()
    
    # CIEL Info API tests
    test_get_ciel_info()
    
    # Formations API tests
    test_get_formations()
    test_get_formation_by_level()
    test_formation_not_found()
    
    # Additional tests
    test_cors_headers()
    
    # Print summary
    results.summary()
    
    return results.failed == 0

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)