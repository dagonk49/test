import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, Heart, MessageCircle, Filter, Tag } from 'lucide-react';
import { mockArticles } from '../mock/data';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [sortBy, setSortBy] = useState('recent');

  // Get unique categories
  const categories = ['Tous', ...new Set(mockArticles.map(article => article.category))];

  // Filter and sort articles
  const filteredArticles = mockArticles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Tous' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'comments':
          return b.comments - a.comments;
        default: // recent
          return new Date(b.publishedAt) - new Date(a.publishedAt);
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

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
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '8px 16px',
                    background: selectedCategory === category ? 'var(--brand-primary)' : 'var(--bg-secondary)',
                    color: selectedCategory === category ? '#000000' : 'var(--text-secondary)',
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
              onChange={(e) => setSortBy(e.target.value)}
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
          {filteredArticles.length === 0 ? (
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
            <div className="dark-grid">
              {filteredArticles.map(article => (
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
                              {article.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogPage;