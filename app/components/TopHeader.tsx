export default function TopHeader() {
  return (
    <div className="top-header py-2" style={{ 
      background: '#dc747d',
      color: 'white'
    }}>
      <div className="container-fluid">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 gap-md-0 px-2 px-md-3">
          <div className="text-center text-md-start" style={{ 
            fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
            fontWeight: '500',
            letterSpacing: '0.3px'
          }}>
            🎉 Big Offer: Buy any 3 Products At ₹999 Only - Offer Applied On Checkout Page
          </div>
          
          <div className="d-none d-md-flex align-items-center gap-4">
            <a href="tel:+911234567890" className="text-white text-decoration-none d-flex align-items-center gap-2" style={{ fontSize: '0.875rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              +91 123-456-7890
            </a>
            
            <a href="mailto:info@swatikasarees.com" className="text-white text-decoration-none d-flex align-items-center gap-2" style={{ fontSize: '0.875rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              info@swatikasarees.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
