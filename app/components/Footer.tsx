'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="footer" style={{ background: '#dc747d', color: 'white' }}>
      <div className="container-fluid px-3 px-md-5 mt-4">
        <div className="row d-flex flex-wrap justify-content-between py-4 py-md-5">
          {/* Logo and Social Section */}
          <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="footer-brand mb-3 mb-md-4">
              <Link href="/">
                <Image 
                  src="/images/SwatikaSarees.png" 
                  alt="Swatika Sarees" 
                  width={140} 
                  height={46}
                  style={{ 
                    width: 'clamp(120px, 20vw, 140px)', 
                    height: 'auto',
                    filter: 'brightness(0) invert(1)' // Makes logo white
                  }}
                  priority
                />
              </Link>
            </div>
            <p style={{ 
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', 
              lineHeight: '1.7',
              marginBottom: 'clamp(20px, 4vw, 30px)',
              maxWidth: '400px',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Experience the timeless elegance of authentic Indian sarees. Each piece is carefully curated to bring you the finest collection of traditional and contemporary designs.
            </p>
            <div className="social-links">
              <ul className="list-unstyled d-flex flex-wrap gap-3 mb-0">
                <li>
                  <a 
                    href="#" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#dc747d';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = 'white';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#dc747d';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = 'white';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#dc747d';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = 'white';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#dc747d';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = 'white';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#dc747d';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = 'white';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6 mb-4 mb-lg-0">
            <h5 className="fw-bold mb-3 mb-md-4" style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Quick Links
            </h5>
            <ul className="list-unstyled" style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
              <li className="mb-2">
                <Link 
                  href="/" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                >
                  HOME
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  href="/about" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                >
                  ABOUT
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  href="/sarees" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                >
                  SAREES CATALOGUE
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  href="/sarees?type=silk" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                >
                  SHOP BY TYPE
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  href="/contact" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Info */}
          <div className="col-lg-3 col-md-3 col-6 mb-4 mb-lg-0">
            <h5 className="fw-bold mb-3 mb-md-4" style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Help & Info
            </h5>
            <ul className="list-unstyled" style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
              <li className="mb-2">
                <a 
                  href="#" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                >
                  TRACK YOUR ORDER
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                >
                  RETURNS + EXCHANGES
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                >
                  SHIPPING + DELIVERY
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                >
                  CONTACT US
                </a>
              </li>
              <li className="mb-2">
                <Link 
                  href="/faqs" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                >
                  FAQS
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Store */}
          <div className="col-lg-3 col-md-12 col-12">
            <h5 className="fw-bold mb-3 mb-md-4" style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Our Store
            </h5>
            {/* <p style={{ 
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', 
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '15px'
            }}>
              <strong>swatika Sarees</strong><br />
              123 Fashion Street, Saree Plaza<br />
              Mumbai, Maharashtra 400001<br />
              India
            </p> */}
            <p style={{ 
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', 
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '8px'
            }}>
              <strong>Email:</strong> <a href="mailto:swatikasarees@gmail.com" style={{ color: 'white', textDecoration: 'none' }}>swatikasarees@gmail.com</a>
            </p>
            <p style={{ 
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', 
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '0'
            }}>
              <strong>Phone:</strong> <a href="tel:+918130033637" style={{ color: 'white', textDecoration: 'none' }}>+91 81300 33637</a>
            </p>
            <p style={{ 
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', 
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '0'
            }}>
              
              <a
                href="https://wa.me/918130033637"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white', textDecoration: 'none', paddingTop: '10px' }}
              >
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        padding: 'clamp(20px, 4vw, 30px) 0'
      }}>
        <div className="container-fluid px-3 px-md-5">
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <p className="mb-0" style={{ 
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                © {new Date().getFullYear()} swatika Sarees. All rights reserved. 
                <span className="d-none d-md-inline"> | </span>
                <br className="d-md-none" />
                Design & Developed by <a href="https://krishnainfotech.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Krishna Infotech</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
