import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, Heart, MessageCircle, Filter, Tag } from 'lucide-react';
import { articlesAPI } from '../services/api';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0
  });

  // Get unique categories from articles
  const categories = ['Tous', ...new Set(articles.map(article => article.category))];

  useEffect(() => {
    loadArticles();
  }, [searchTerm, selectedCategory, sortBy, pagination.page]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        sort: sortBy
      };
      
      if (selectedCategory && selectedCategory !== 'Tous') {
        params.category = selectedCategory;
      }
      
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await articlesAPI.getAll(params);
      setArticles(response.data.articles);
      setPagination(prev => ({
        ...prev,
        total: response.data.total
      }));
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading && articles.length === 0) {
    return (
      <div className="dark-container">
        <div className="dark-content-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div className="heading-2" style={{ color: 'var(--text-muted)' }}>
              Chargement des articles...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className="dark-container">
        <div className="dark-content-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div className="heading-2" style={{ color: 'var(--text-muted)' }}>
              {error}
            </div>
            <button 
              onClick={loadArticles}
              className="btn-primary"
              style={{ marginTop: '20px' }}
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark-container">
      <div className="dark-content-container">
        {/* Header */}
        <section style={{ padding: '60px 0', textAlign: 'center' }}>
          <h1 className="display-large" style={{ marginBottom: '24px' }}>
            Blog Cybersécurité
          </h1>
          <p className="body-large" style={{ 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Analyses, guides pratiques et veille technologique sur les enjeux 
            de la cybersécurité et des réseaux informatiques.
          </p>
        </section>

        {/* Search and Filters */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }}>
            {/* Search Bar */}
            <div style={{
              position: 'relative',
              flex: '1',
              minWidth: '300px'
            }}>
              <Search 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                type="text"
                placeholder="Rechercher des articles..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0px',
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Filter size={20} style={{ color: 'var(--text-muted)' }} />
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  style={{
                    padding: '8px 16px',
                    background: (selectedCategory === category || (category === 'Tous' && !selectedCategory)) ? 'var(--brand-primary)' : 'var(--bg-secondary)',
                    color: (selectedCategory === category || (category === 'Tous' && !selectedCategory)) ? '#000000' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    fontSize: '14px'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              style={{
                padding: '12px 16px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0px',
                color: 'var(--text-primary)',
                fontSize: '16px',
                fontFamily: 'inherit',
                cursor: 'pointer'
              }}
            >
              <option value="recent">Plus récents</option>
              <option value="popular">Plus populaires</option>
              <option value="comments">Plus commentés</option>
            </select>
          </div>
        </section>

        {/* Articles Grid */}
        <section>
          {articles.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)'
            }}>
              <p className="body-large" style={{ color: 'var(--text-muted)' }}>
                Aucun article trouvé pour ces critères.
              </p>
            </div>
          ) : (
            <>
              <div className="dark-grid">
                {articles.map(article => (
                  <Link
                    key={article.id}
                    to={`/article/${article.id}`}
                    style={{ textDecoration: 'none' }}
                    className="dark-hover"
                  >
                    <article style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      padding: '32px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.4s ease-in-out'
                    }}>
                      {/* Category Badge */}
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: 'fit-content',
                        padding: '6px 12px',
                        background: 'var(--brand-hover)',
                        marginBottom: '20px'
                      }}>
                        <Tag size={14} style={{ color: 'var(--brand-primary)' }} />
                        <span style={{ 
                          color: 'var(--brand-primary)', 
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          {article.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="heading-2" style={{ 
                        marginBottom: '16px',
                        color: 'var(--text-primary)'
                      }}>
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="body-medium" style={{ 
                        color: 'var(--text-secondary)',
                        marginBottom: '24px',
                        flex: 1
                      }}>
                        {article.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div style={{ marginTop: 'auto' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px',
                          marginBottom: '16px',
                          flexWrap: 'wrap'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
                            <span className="body-small" style={{ color: 'var(--text-muted)' }}>
                              {formatDate(article.published_at)}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Clock size={16} style={{ color: 'var(--text-muted)' }} />
                            <span className="body-small" style={{ color: 'var(--text-muted)' }}>
                              {article.read_time}
                            </span>
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '16px',
                          borderTop: '1px solid var(--border-subtle)'
                        }}>
                          <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
                            Par {article.author}
                          </span>
                          
                          <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Heart size={16} style={{ color: 'var(--text-muted)' }} />
                              <span className="body-small" style={{ color: 'var(--text-muted)' }}>
                                {article.likes}
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MessageCircle size={16} style={{ color: 'var(--text-muted)' }} />
                              <span className="body-small" style={{ color: 'var(--text-muted)' }}>
                                {article.comment_count}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.total > pagination.limit && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '20px',
                  marginTop: '60px'
                }}>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                    disabled={pagination.page === 1}
                    className="btn-secondary"
                    style={{
                      opacity: pagination.page === 1 ? 0.5 : 1,
                      cursor: pagination.page === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Précédent
                  </button>

                  <span className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                    Page {pagination.page} sur {Math.ceil(pagination.total / pagination.limit)}
                  </span>

                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
                    className="btn-secondary"
                    style={{
                      opacity: pagination.page >= Math.ceil(pagination.total / pagination.limit) ? 0.5 : 1,
                      cursor: pagination.page >= Math.ceil(pagination.total / pagination.limit) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {loading && articles.length > 0 && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            padding: '16px 24px',
            color: 'var(--text-primary)'
          }}>
            Chargement...
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;