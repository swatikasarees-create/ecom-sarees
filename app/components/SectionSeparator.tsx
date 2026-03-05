export default function SectionSeparator() {
  return (
    <div className="section-separator py-3 py-md-4" style={{ 
      background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(10px, 3vw, 20px)',
        width: '100%',
        maxWidth: '800px',
        padding: '0 20px'
      }}>
        {/* Left Line */}
        <div style={{
          flex: '1',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #ddd, #bbb)'
        }}></div>
        
        {/* Center Decorative Element */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(8px, 2vw, 12px)'
        }}>
          {/* Decorative Diamond */}
          <div style={{
            width: 'clamp(6px, 1.5vw, 8px)',
            height: 'clamp(6px, 1.5vw, 8px)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            transform: 'rotate(45deg)',
            opacity: '0.6'
          }}></div>
          
          {/* Center Circle */}
          <div style={{
            width: 'clamp(10px, 2.5vw, 14px)',
            height: 'clamp(10px, 2.5vw, 14px)',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
          }}></div>
          
          {/* Decorative Diamond */}
          <div style={{
            width: 'clamp(6px, 1.5vw, 8px)',
            height: 'clamp(6px, 1.5vw, 8px)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            transform: 'rotate(45deg)',
            opacity: '0.6'
          }}></div>
        </div>
        
        {/* Right Line */}
        <div style={{
          flex: '1',
          height: '1px',
          background: 'linear-gradient(to left, transparent, #ddd, #bbb)'
        }}></div>
      </div>
    </div>
  );
}
