import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { Shield, Users, Award, Building, ChevronRight, Lock, Network, Code, Zap } from 'lucide-react';
import { cielAPI } from '../services/api';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [cielInfo, setCielInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCielInfo();
  }, []);

  const loadCielInfo = async () => {
    try {
      setLoading(true);
      const response = await cielAPI.getInfo();
      setCielInfo(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des informations');
      console.error('Error loading CIEL info:', err);
      // Fallback data in case of error
      setCielInfo({
        specializations: [
          {
            title: "Cybersécurité",
            description: "Protection des systèmes d'information, analyse des menaces, audit de sécurité"
          },
          {
            title: "Réseaux & Télécommunications",
            description: "Architecture réseau, administration système, infrastructures télécoms"
          },
          {
            title: "Développement Sécurisé",
            description: "Programmation sécurisée, tests de pénétration, développement d'outils"
          },
          {
            title: "Électronique Numérique",
            description: "Systèmes embarqués, IoT sécurisé, analyse de firmware"
          }
        ],
        stats: {
          students: 450,
          graduates: 1200,
          certifications: 15,
          partners: 85
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dark-container">
        <div className="dark-content-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div className="heading-2" style={{ color: 'var(--text-muted)' }}>
              Chargement...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cielInfo) {
    return (
      <div className="dark-container">
        <div className="dark-content-container">
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div className="heading-2" style={{ color: 'var(--text-muted)' }}>
              Erreur de chargement
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { specializations, stats } = cielInfo;

  return (
    <div className="dark-container">
      {/* Hero Section with Spline */}
      <section style={{ 
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0',
        overflow: 'hidden'
      }}>
        <div className="dark-content-container" style={{ width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            minHeight: '80vh'
          }}>
            {/* Left Content */}
            <div style={{ zIndex: 2 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'var(--bg-secondary)',
                padding: '12px 20px',
                marginBottom: '32px',
                border: '1px solid var(--border-subtle)'
              }}>
                <Shield size={20} style={{ color: 'var(--brand-primary)' }} />
                <span className="body-medium" style={{ color: 'var(--brand-primary)' }}>
                  Section CIEL
                </span>
              </div>

              <h1 className="display-huge" style={{ 
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #FFFFFF 0%, var(--brand-primary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Cybersécurité, Informatique & Réseaux
              </h1>
              
              <p className="body-large" style={{ 
                marginBottom: '40px',
                maxWidth: '500px',
                color: 'var(--text-secondary)'
              }}>
                Former les experts en cybersécurité de demain à travers des programmes pratiques, 
                des projets concrets et une approche hands-on de la sécurité informatique.
              </p>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
                <Link to="/blog" className="btn-primary">
                  <Code size={18} />
                  Découvrir le Blog
                </Link>
                <Link to="/formations" className="btn-secondary">
                  <Users size={18} />
                  Nos Formations
                </Link>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '32px'
              }}>
                <div>
                  <div className="display-medium" style={{ color: 'var(--brand-primary)', marginBottom: '8px' }}>
                    {stats.students}+
                  </div>
                  <p className="body-small" style={{ color: 'var(--text-muted)' }}>
                    Étudiants actuels
                  </p>
                </div>
                <div>
                  <div className="display-medium" style={{ color: 'var(--brand-primary)', marginBottom: '8px' }}>
                    {stats.graduates}+
                  </div>
                  <p className="body-small" style={{ color: 'var(--text-muted)' }}>
                    Diplômés
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Spline 3D */}
            <div style={{ 
              width: '700px', 
              height: '700px', 
              overflow: 'visible', 
              position: 'relative',
              justifySelf: 'center'
            }}>
              <Spline 
                scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="dark-content-container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="display-large" style={{ marginBottom: '24px' }}>
              Nos Spécialisations
            </h2>
            <p className="body-large" style={{ 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Quatre domaines d'expertise pour couvrir l'ensemble des enjeux 
              de la sécurité informatique moderne.
            </p>
          </div>

          <div className="dark-grid">
            {specializations.map((spec, index) => (
              <div 
                key={index}
                className="dark-hover"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '40px',
                  transition: 'all 0.4s ease-in-out'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'var(--brand-hover)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {spec.title === 'Cybersécurité' && <Lock size={28} style={{ color: 'var(--brand-primary)' }} />}
                    {spec.title === 'Réseaux & Télécommunications' && <Network size={28} style={{ color: 'var(--brand-primary)' }} />}
                    {spec.title === 'Développement Sécurisé' && <Code size={28} style={{ color: 'var(--brand-primary)' }} />}
                    {spec.title === 'Électronique Numérique' && <Zap size={28} style={{ color: 'var(--brand-primary)' }} />}
                  </div>
                  
                  <h3 className="heading-2">
                    {spec.title}
                  </h3>
                </div>
                
                <p className="body-medium" style={{ 
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6'
                }}>
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="dark-content-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            <div>
              <h2 className="display-large" style={{ marginBottom: '24px' }}>
                Restez informé des dernières menaces
              </h2>
              <p className="body-large" style={{ 
                color: 'var(--text-secondary)',
                marginBottom: '32px'
              }}>
                Découvrez nos analyses approfondies, guides pratiques et retours d'expérience 
                sur les enjeux actuels de la cybersécurité.
              </p>
              
              <Link to="/blog" className="btn-primary">
                Accéder au Blog
                <ChevronRight size={18} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div className="display-medium" style={{ color: 'var(--brand-primary)', marginBottom: '8px' }}>
                  {stats.certifications}+
                </div>
                <p className="body-small" style={{ color: 'var(--text-muted)' }}>
                  Certifications
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="display-medium" style={{ color: 'var(--brand-primary)', marginBottom: '8px' }}>
                  {stats.partners}+
                </div>
                <p className="body-small" style={{ color: 'var(--text-muted)' }}>
                  Partenaires
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;