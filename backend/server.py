from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import Optional, List
import uuid
from datetime import datetime

# Load environment variables BEFORE importing local modules
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from models import (
    Article, ArticleCreate, ArticlesResponse,
    Comment, CommentCreate,
    CielInfo, Formation
)
from database import (
    articles_collection, comments_collection, 
    ciel_info_collection, formations_collection,
    seed_database
)

# Create the main app without a prefix
app = FastAPI(title="CIEL Cybersecurity Blog API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Articles endpoints
@api_router.get("/articles", response_model=ArticlesResponse)
async def get_articles(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    category: Optional[str] = None,
    search: Optional[str] = None,
    sort: str = Query("recent", regex="^(recent|popular|comments)$")
):
    """Get articles with pagination and filters"""
    skip = (page - 1) * limit
    
    # Build query
    query = {}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"excerpt": {"$regex": search, "$options": "i"}},
            {"content": {"$regex": search, "$options": "i"}}
        ]
    
    # Build sort
    sort_options = {
        "recent": {"published_at": -1},
        "popular": {"likes": -1},
        "comments": {"comment_count": -1}
    }
    sort_query = sort_options.get(sort, {"published_at": -1})
    
    # Get articles and total count
    articles_cursor = articles_collection.find(query).sort(list(sort_query.items())).skip(skip).limit(limit)
    articles = await articles_cursor.to_list(limit)
    total = await articles_collection.count_documents(query)
    
    return ArticlesResponse(
        articles=[Article(**article) for article in articles],
        total=total,
        page=page,
        limit=limit
    )

@api_router.get("/articles/{article_id}", response_model=Article)
async def get_article(article_id: str):
    """Get a specific article by ID"""
    article = await articles_collection.find_one({"id": article_id})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return Article(**article)

@api_router.post("/articles/{article_id}/like")
async def like_article(article_id: str):
    """Like an article"""
    result = await articles_collection.update_one(
        {"id": article_id},
        {"$inc": {"likes": 1}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Get updated article
    article = await articles_collection.find_one({"id": article_id})
    return {"likes": article["likes"]}

@api_router.post("/articles", response_model=Article)
async def create_article(article_data: ArticleCreate):
    """Create a new article"""
    article = Article(**article_data.dict())
    await articles_collection.insert_one(article.dict())
    return article

# Comments endpoints
@api_router.get("/articles/{article_id}/comments", response_model=List[Comment])
async def get_comments(article_id: str):
    """Get comments for an article"""
    comments_cursor = comments_collection.find({"article_id": article_id}).sort("published_at", 1)
    comments = await comments_cursor.to_list(1000)
    return [Comment(**comment) for comment in comments]

@api_router.post("/articles/{article_id}/comments", response_model=Comment)
async def create_comment(article_id: str, comment_data: CommentCreate):
    """Add a comment to an article"""
    # Check if article exists
    article = await articles_collection.find_one({"id": article_id})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Create comment
    comment = Comment(
        article_id=article_id,
        **comment_data.dict()
    )
    await comments_collection.insert_one(comment.dict())
    
    # Update article comment count
    await articles_collection.update_one(
        {"id": article_id},
        {"$inc": {"comment_count": 1}}
    )
    
    return comment

@api_router.post("/comments/{comment_id}/like")
async def like_comment(comment_id: str):
    """Like a comment"""
    result = await comments_collection.update_one(
        {"id": comment_id},
        {"$inc": {"likes": 1}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    # Get updated comment
    comment = await comments_collection.find_one({"id": comment_id})
    return {"likes": comment["likes"]}

# CIEL Info endpoints
@api_router.get("/ciel-info", response_model=CielInfo)
async def get_ciel_info():
    """Get CIEL section information"""
    ciel_info = await ciel_info_collection.find_one({})
    if not ciel_info:
        raise HTTPException(status_code=404, detail="CIEL info not found")
    return CielInfo(**ciel_info)

# Formations endpoints
@api_router.get("/formations", response_model=List[Formation])
async def get_formations():
    """Get all formations"""
    formations_cursor = formations_collection.find({})
    formations = await formations_cursor.to_list(1000)
    return [Formation(**formation) for formation in formations]

@api_router.get("/formations/{level}", response_model=Formation)
async def get_formation_by_level(level: str):
    """Get formation by level (BAC_PRO, BTS, MASTER)"""
    formation = await formations_collection.find_one({"level": level.upper()})
    if not formation:
        raise HTTPException(status_code=404, detail="Formation not found")
    return Formation(**formation)

# Health check
@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db():
    """Initialize database with seed data"""
    await seed_database()
    logger.info("Database initialized with seed data")

@app.on_event("shutdown")
async def shutdown_db_client():
    pass