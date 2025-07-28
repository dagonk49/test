import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Terminal, Wifi } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="dark-header">
      <div className="dark-content-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '8px 16px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Shield size={24} style={{ color: 'var(--brand-primary)' }} />
            <span className="heading-3" style={{ color: 'var(--text-primary)' }}>
              CIEL
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="dark-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link 
            to="/" 
            className={`dark-nav-link ${isActive('/') ? 'active' : ''}`}
            style={{ 
              color: isActive('/') ? 'var(--brand-primary)' : 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '400',
              transition: 'color 0.3s ease'
            }}
          >
            Accueil
          </Link>
          <Link 
            to="/blog" 
            className={`dark-nav-link ${isActive('/blog') ? 'active' : ''}`}
            style={{ 
              color: isActive('/blog') ? 'var(--brand-primary)' : 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '400',
              transition: 'color 0.3s ease'
            }}
          >
            Blog
          </Link>
          
          {/* CTA Button */}
          <button className="btn-primary">
            <Terminal size={18} />
            Contact
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            padding: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav" style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            padding: '20px',
            display: 'none'
          }}>
            <Link to="/" className="mobile-nav-link" style={{ 
              display: 'block', 
              padding: '12px 0', 
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              Accueil
            </Link>
            <Link to="/blog" className="mobile-nav-link" style={{ 
              display: 'block', 
              padding: '12px 0', 
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              Blog
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .dark-nav {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: flex !important;
          }
          
          .mobile-nav {
            display: block !important;
          }
        }
        
        .dark-nav-link:hover {
          color: var(--text-primary) !important;
        }
        
        .mobile-menu-btn:hover {
          background: var(--brand-hover) !important;
          color: var(--brand-primary) !important;
        }
      `}</style>
    </header>
  );
};

export default Header;