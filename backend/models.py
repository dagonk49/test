from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


class Article(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str  # Markdown content
    author: str
    published_at: datetime = Field(default_factory=datetime.utcnow)
    category: str
    tags: List[str]
    read_time: str
    likes: int = 0
    comment_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ArticleCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    author: str
    category: str
    tags: List[str]
    read_time: str

class Comment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    article_id: str
    author: str
    content: str
    likes: int = 0
    published_at: datetime = Field(default_factory=datetime.utcnow)

class CommentCreate(BaseModel):
    author: str
    content: str

class CielInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    mission: str
    specializations: List[dict]
    stats: dict

class Formation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    level: str  # "BAC_PRO", "BTS", "MASTER"
    title: str
    duration: str
    description: str
    objectives: List[str]
    skills: List[str]
    career_paths: List[str]
    admission_requirements: List[str]
    program_highlights: List[str]

class ArticlesResponse(BaseModel):
    articles: List[Article]
    total: int
    page: int
    limit: int