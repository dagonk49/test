import React from 'react';
import { Shield, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '60px 0 20px',
      marginTop: '100px'
    }}>
      <div className="dark-content-container">
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Shield size={28} style={{ color: 'var(--brand-primary)' }} />
              <span className="heading-2" style={{ color: 'var(--text-primary)' }}>
                CIEL
              </span>
            </div>
            <p className="body-medium" style={{ marginBottom: '20px', maxWidth: '300px' }}>
              Section spécialisée dans la formation aux métiers de la cybersécurité, 
              de l'informatique et des réseaux électroniques.
            </p>
            
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{
                background: 'var(--bg-secondary)',
                padding: '12px',
                borderRadius: '0px',
                color: 'var(--text-muted)',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              className="social-link">
                <Github size={20} />
              </a>
              <a href="#" style={{
                background: 'var(--bg-secondary)',
                padding: '12px',
                borderRadius: '0px',
                color: 'var(--text-muted)',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="#" style={{
                background: 'var(--bg-secondary)',
                padding: '12px',
                borderRadius: '0px',
                color: 'var(--text-muted)',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              className="social-link">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="heading-3" style={{ marginBottom: '20px' }}>
              Navigation
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="/" className="footer-link body-medium">Accueil</a>
              <a href="/blog" className="footer-link body-medium">Blog</a>
              <a href="#formations" className="footer-link body-medium">Formations</a>
              <a href="#projets" className="footer-link body-medium">Projets</a>
            </div>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="heading-3" style={{ marginBottom: '20px' }}>
              Spécialisations
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#cyber" className="footer-link body-medium">Cybersécurité</a>
              <a href="#reseaux" className="footer-link body-medium">Réseaux & Télécoms</a>
              <a href="#dev" className="footer-link body-medium">Développement</a>
              <a href="#electronique" className="footer-link body-medium">Électronique</a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="heading-3" style={{ marginBottom: '20px' }}>
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={18} style={{ color: 'var(--brand-primary)' }} />
                <span className="body-small">Lyon, France</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={18} style={{ color: 'var(--brand-primary)' }} />
                <span className="body-small">contact@ciel-cyber.fr</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={18} style={{ color: 'var(--brand-primary)' }} />
                <span className="body-small">+33 4 XX XX XX XX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p className="body-small" style={{ color: 'var(--text-muted)' }}>
            © 2025 CIEL. Tous droits réservés.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#privacy" className="footer-link body-small">
              Confidentialité
            </a>
            <a href="#terms" className="footer-link body-small">
              Mentions légales
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-link {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-link:hover {
          color: var(--brand-primary);
        }
        
        .social-link:hover {
          background: var(--brand-hover) !important;
          color: var(--brand-primary) !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;