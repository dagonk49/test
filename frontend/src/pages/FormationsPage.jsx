import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, Users, Award, BookOpen, Target, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { formationsAPI } from '../services/api';

const FormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('BAC_PRO');

  useEffect(() => {
    loadFormations();
  }, []);

  const loadFormations = async () => {
    try {
      setLoading(true);
      const response = await formationsAPI.getAll();
      setFormations(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des formations');
      console.error('Error loading formations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    const colors = {
      'BAC_PRO': 'var(--brand-primary)',
      'BTS': '#6FD2C0',
      'MASTER': '#4A9B8E'
    };
    return colors[level] || 'var(--brand-primary)';
  };

  const getLevelOrder = (level) => {
    const order = { 'BAC_PRO': 1, 'BTS': 2, 'MASTER': 3 };
    return order[level] || 0;
  };

  const sortedFormations = formations.sort((a, b) => getLevelOrder(a.level) - getLevelOrder(b.level));

  if (loading) {
    return (
      <div className="dark-container">
        <div className="dark-content-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div className="heading-2" style={{ color: 'var(--text-muted)' }}>
              Chargement des formations...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dark-container">
        <div className="dark-content-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div className="heading-2" style={{ color: 'var(--text-muted)' }}>
              {error}
            </div>
            <button 
              onClick={loadFormations}
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
        {/* Hero Section */}
        <section style={{ padding: '60px 0', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-secondary)',
            padding: '12px 20px',
            marginBottom: '32px',
            border: '1px solid var(--border-subtle)'
          }}>
            <BookOpen size={20} style={{ color: 'var(--brand-primary)' }} />
            <span className="body-medium" style={{ color: 'var(--brand-primary)' }}>
              Parcours de Formation
            </span>
          </div>

          <h1 className="display-large" style={{ marginBottom: '24px' }}>
            Nos Formations CIEL
          </h1>
          <p className="body-large" style={{ 
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto',
            marginBottom: '60px'
          }}>
            Un parcours complet de BAC PRO à Master pour former les experts 
            en cybersécurité, informatique et réseaux électroniques de demain.
          </p>

          {/* Formation Path Visualization */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '80px',
            flexWrap: 'wrap'
          }}>
            {sortedFormations.map((formation, index) => (
              <div key={formation.id} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div 
                  style={{
                    padding: '12px 20px',
                    background: selectedLevel === formation.level ? 'var(--brand-primary)' : 'var(--bg-secondary)',
                    color: selectedLevel === formation.level ? '#000000' : 'var(--text-primary)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                  onClick={() => setSelectedLevel(formation.level)}
                >
                  {formation.level.replace('_', ' ')}
                </div>
                {index < sortedFormations.length - 1 && (
                  <ArrowRight size={20} style={{ color: 'var(--text-muted)' }} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Formation Details */}
        <section>
          {sortedFormations.map((formation) => (
            <div
              key={formation.id}
              style={{
                display: selectedLevel === formation.level ? 'block' : 'none',
                marginBottom: '60px'
              }}
            >
              {/* Formation Header */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                padding: '60px',
                marginBottom: '40px'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gap: '60px',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: 'var(--brand-hover)',
                      marginBottom: '20px'
                    }}>
                      <span style={{ 
                        color: 'var(--brand-primary)', 
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {formation.level.replace('_', ' ')}
                      </span>
                    </div>

                    <h2 className="display-medium" style={{ 
                      marginBottom: '16px',
                      color: 'var(--text-primary)'
                    }}>
                      {formation.title}
                    </h2>
                    
                    <p className="body-large" style={{ 
                      color: 'var(--text-secondary)',
                      marginBottom: '24px',
                      lineHeight: '1.6'
                    }}>
                      {formation.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Clock size={18} style={{ color: 'var(--brand-primary)' }} />
                      <span className="body-medium" style={{ color: 'var(--text-primary)' }}>
                        Durée : {formation.duration}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    <button className="btn-primary" style={{ width: '100%' }}>
                      <Users size={18} />
                      Candidater
                    </button>
                    <button className="btn-secondary" style={{ width: '100%' }}>
                      <BookOpen size={18} />
                      Programme détaillé
                    </button>
                  </div>
                </div>
              </div>

              {/* Formation Content Grid */}
              <div className="dark-grid" style={{ gap: '40px' }}>
                {/* Objectifs */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '40px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <Target size={24} style={{ color: 'var(--brand-primary)' }} />
                    <h3 className="heading-2">Objectifs</h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    {formation.objectives.map((objective, index) => (
                      <li key={index} style={{ 
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '12px'
                      }}>
                        <CheckCircle2 size={16} style={{ 
                          color: 'var(--brand-primary)', 
                          marginTop: '2px',
                          flexShrink: 0
                        }} />
                        <span className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                          {objective}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compétences */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '40px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <Award size={24} style={{ color: 'var(--brand-primary)' }} />
                    <h3 className="heading-2">Compétences</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {formation.skills.map((skill, index) => (
                      <div key={index} style={{
                        padding: '12px 16px',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-subtle)'
                      }}>
                        <span className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Débouchés */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '40px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <Briefcase size={24} style={{ color: 'var(--brand-primary)' }} />
                    <h3 className="heading-2">Débouchés</h3>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px'
                  }}>
                    {formation.career_paths.map((career, index) => (
                      <div key={index} style={{
                        padding: '16px',
                        background: 'var(--brand-hover)',
                        border: '1px solid var(--border-subtle)',
                        textAlign: 'center'
                      }}>
                        <span className="body-small" style={{ 
                          color: 'var(--brand-primary)',
                          fontWeight: '500'
                        }}>
                          {career}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conditions d'admission */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '40px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <BookOpen size={24} style={{ color: 'var(--brand-primary)' }} />
                    <h3 className="heading-2">Admission</h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    {formation.admission_requirements.map((requirement, index) => (
                      <li key={index} style={{ 
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '12px'
                      }}>
                        <ChevronRight size={16} style={{ 
                          color: 'var(--brand-primary)', 
                          marginTop: '2px',
                          flexShrink: 0
                        }} />
                        <span className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                          {requirement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Points forts */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '40px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <Award size={24} style={{ color: 'var(--brand-primary)' }} />
                    <h3 className="heading-2">Points Forts</h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    {formation.program_highlights.map((highlight, index) => (
                      <li key={index} style={{ 
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '12px'
                      }}>
                        <CheckCircle2 size={16} style={{ 
                          color: 'var(--brand-primary)', 
                          marginTop: '2px',
                          flexShrink: 0
                        }} />
                        <span className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '80px 0',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          marginTop: '60px',
          textAlign: 'center'
        }}>
          <h2 className="display-medium" style={{ marginBottom: '24px' }}>
            Prêt à rejoindre CIEL ?
          </h2>
          <p className="body-large" style={{ 
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Découvrez nos formations et commencez votre parcours vers l'expertise 
            en cybersécurité et réseaux informatiques.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary">
              <Users size={18} />
              Candidater maintenant
            </button>
            <button className="btn-secondary">
              <BookOpen size={18} />
              Télécharger la brochure
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FormationsPage;