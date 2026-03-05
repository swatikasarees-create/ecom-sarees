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
           
          </div>
          
          <div className="d-none d-md-flex align-items-center gap-4">
            <a href="tel:+918130033637" className="text-white text-decoration-none d-flex align-items-center gap-2" style={{ fontSize: '0.875rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              +91 81300 33637
            </a>
            <a
              href="https://wa.me/918130033637"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none d-flex align-items-center gap-2"
              style={{ fontSize: '0.875rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.33-1.66a11.85 11.85 0 0 0 5.73 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.17-1.23-6.15-3.45-8.43zM12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.65-.24-.38a9.89 9.89 0 0 1-1.5-5.26c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.93 9.92zm5.44-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.49a9.1 9.1 0 0 1-1.67-2.07c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.59-.9-2.18-.24-.57-.49-.5-.66-.5h-.56c-.2 0-.53.08-.8.38-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.71.22 1.35.19 1.86.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.08-.13-.27-.2-.56-.35z"/>
              </svg>
              WhatsApp
            </a>
            
            <a href="mailto:swatikasarees@gmail.com" className="text-white text-decoration-none d-flex align-items-center gap-2" style={{ fontSize: '0.875rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              swatikasarees@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
