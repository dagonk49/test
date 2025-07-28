import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Heart, MessageCircle, User, Send, Tag } from 'lucide-react';
import { articlesAPI, commentsAPI } from '../services/api';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    loadArticleAndComments();
  }, [id]);

  const loadArticleAndComments = async () => {
    try {
      setLoading(true);
      const [articleResponse, commentsResponse] = await Promise.all([
        articlesAPI.getById(id),
        commentsAPI.getByArticle(id)
      ]);
      
      setArticle(articleResponse.data);
      setComments(commentsResponse.data);
      
      // Load related articles
      const relatedResponse = await articlesAPI.getAll({
        category: articleResponse.data.category,
        limit: 4
      });
      setRelatedArticles(relatedResponse.data.articles.filter(a => a.id !== id));
      
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement de l\'article');
      console.error('Error loading article:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim() || submittingComment) return;

    try {
      setSubmittingComment(true);
      await commentsAPI.create(id, {
        author: userName.trim(),
        content: newComment.trim()
      });
      
      // Reload comments
      const commentsResponse = await commentsAPI.getByArticle(id);
      setComments(commentsResponse.data);
      
      // Clear form
      setNewComment('');
      setUserName('');
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert('Erreur lors de l\'ajout du commentaire');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleLikeArticle = async () => {
    try {
      const response = await articlesAPI.like(id);
      setArticle(prev => ({ ...prev, likes: response.data.likes }));
    } catch (err) {
      console.error('Error liking article:', err);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const response = await commentsAPI.like(commentId);
      setComments(prev => 
        prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, likes: response.data.likes }
            : comment
        )
      );
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  if (loading) {
    return (
      <div className="dark-container">
        <div className="dark-content-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div className="heading-2" style={{ color: 'var(--text-muted)' }}>
              Chargement de l'article...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="dark-container">
        <div className="dark-content-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h1 className="display-medium" style={{ marginBottom: '20px' }}>
              {error || 'Article non trouvé'}
            </h1>
            <Link to="/blog" className="btn-primary">
              <ArrowLeft size={18} />
              Retour au blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && userName.trim()) {
      // In a real app, this would make an API call
      console.log('Nouveau commentaire:', { userName, content: newComment });
      setNewComment('');
      setUserName('');
      alert('Commentaire ajouté ! (simulé)');
    }
  };

  // Parse article content for basic markdown-like formatting
  const formatContent = (content) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="display-medium" style={{ margin: '40px 0 20px', color: 'var(--text-primary)' }}>
            {paragraph.substring(2)}
          </h1>
        );
      } else if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="heading-1" style={{ margin: '32px 0 16px', color: 'var(--text-primary)' }}>
            {paragraph.substring(3)}
          </h2>
        );
      } else if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="heading-2" style={{ margin: '24px 0 12px', color: 'var(--text-primary)' }}>
            {paragraph.substring(4)}
          </h3>
        );
      } else if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="body-medium" style={{ margin: '8px 0', color: 'var(--text-secondary)', marginLeft: '20px' }}>
            {paragraph.substring(2)}
          </li>
        );
      } else if (paragraph.trim()) {
        return (
          <p key={index} className="body-medium" style={{ margin: '16px 0', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            {paragraph}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="dark-container">
      <div className="dark-content-container">
        {/* Back Button */}
        <div style={{ paddingTop: '40px', marginBottom: '40px' }}>
          <Link 
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '16px',
              transition: 'color 0.3s ease'
            }}
            className="back-link"
          >
            <ArrowLeft size={18} />
            Retour au blog
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '80px',
          alignItems: 'start'
        }}>
          {/* Main Article */}
          <article>
            {/* Article Header */}
            <header style={{ marginBottom: '40px' }}>
              {/* Category Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'var(--brand-hover)',
                marginBottom: '24px'
              }}>
                <Tag size={16} style={{ color: 'var(--brand-primary)' }} />
                <span style={{ 
                  color: 'var(--brand-primary)', 
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="display-large" style={{ 
                marginBottom: '24px',
                lineHeight: '1.1'
              }}>
                {article.title}
              </h1>

              {/* Meta Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                paddingBottom: '24px',
                borderBottom: '1px solid var(--border-subtle)',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <User size={18} style={{ color: 'var(--text-muted)' }} />
                  <span className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                    {article.author}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
                  <span className="body-small" style={{ color: 'var(--text-muted)' }}>
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} style={{ color: 'var(--text-muted)' }} />
                  <span className="body-small" style={{ color: 'var(--text-muted)' }}>
                    {article.readTime}
                  </span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div style={{ marginBottom: '60px' }}>
              {formatContent(article.content)}
            </div>

            {/* Tags */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '40px',
              paddingBottom: '40px',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              {article.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    padding: '6px 12px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '14px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Comments Section */}
            <section>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <h3 className="heading-2">Commentaires</h3>
                <span className="body-small" style={{ 
                  color: 'var(--text-muted)',
                  background: 'var(--bg-secondary)',
                  padding: '4px 12px',
                  borderRadius: '0px'
                }}>
                  {comments.length}
                </span>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                padding: '32px',
                marginBottom: '40px'
              }}>
                <h4 className="heading-3" style={{ marginBottom: '20px' }}>
                  Ajouter un commentaire
                </h4>
                
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '0px',
                      color: 'var(--text-primary)',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      marginBottom: '16px'
                    }}
                    required
                  />
                  <textarea
                    placeholder="Votre commentaire..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: '12px 16px',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '0px',
                      color: 'var(--text-primary)',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                    required
                  />
                </div>
                
                <button type="submit" className="btn-primary">
                  <Send size={18} />
                  Publier le commentaire
                </button>
              </form>

              {/* Comments List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {comments.map(comment => (
                  <div
                    key={comment.id}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      padding: '24px'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}>
                      <span className="body-medium" style={{ 
                        color: 'var(--text-primary)',
                        fontWeight: '500'
                      }}>
                        {comment.author}
                      </span>
                      <span className="body-small" style={{ color: 'var(--text-muted)' }}>
                        {formatDate(comment.publishedAt)}
                      </span>
                    </div>
                    
                    <p className="body-medium" style={{ 
                      color: 'var(--text-secondary)',
                      marginBottom: '16px',
                      lineHeight: '1.6'
                    }}>
                      {comment.content}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Heart size={16} style={{ color: 'var(--text-muted)' }} />
                      <span className="body-small" style={{ color: 'var(--text-muted)' }}>
                        {comment.likes} j'aime
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside>
            {/* Article Stats */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              padding: '32px',
              marginBottom: '40px',
              position: 'sticky',
              top: '100px'
            }}>
              <h3 className="heading-3" style={{ marginBottom: '20px' }}>
                Statistiques
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Heart size={18} style={{ color: 'var(--brand-primary)' }} />
                    <span className="body-medium">J'aime</span>
                  </div>
                  <span className="body-medium" style={{ color: 'var(--brand-primary)' }}>
                    {article.likes}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MessageCircle size={18} style={{ color: 'var(--brand-primary)' }} />
                    <span className="body-medium">Commentaires</span>
                  </div>
                  <span className="body-medium" style={{ color: 'var(--brand-primary)' }}>
                    {comments.length}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={18} style={{ color: 'var(--brand-primary)' }} />
                    <span className="body-medium">Lecture</span>
                  </div>
                  <span className="body-medium" style={{ color: 'var(--brand-primary)' }}>
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              padding: '32px'
            }}>
              <h3 className="heading-3" style={{ marginBottom: '20px' }}>
                Articles similaires
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {mockArticles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3).map(relatedArticle => (
                  <Link
                    key={relatedArticle.id}
                    to={`/article/${relatedArticle.id}`}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      padding: '16px',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all 0.3s ease'
                    }}
                    className="related-article"
                  >
                    <h4 className="body-medium" style={{ 
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                      fontWeight: '500'
                    }}>
                      {relatedArticle.title}
                    </h4>
                    <p className="body-small" style={{ color: 'var(--text-muted)' }}>
                      {relatedArticle.readTime} • {relatedArticle.author}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .back-link:hover {
          color: var(--brand-primary) !important;
        }
        
        .related-article:hover {
          background: var(--brand-hover) !important;
          border-color: var(--brand-primary) !important;
        }
      `}</style>
    </div>
  );
};

export default ArticlePage;