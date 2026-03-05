'use client';

export default function PromoMarquee() {
  const promos = [
    {
      icon: '🚚',
      text: 'Worldwide Delivery'
    },
    {
      icon: '📱',
      text: 'WhatsApp: +91 6359561631'
    },
    {
      icon: '✨',
      text: 'Premium Quality Sarees'
    },
    {
      icon: '💯',
      text: '100% Authentic Products'
    },
    {
      icon: '🎁',
      text: 'Elegant Gift Packaging'
    },
    {
      icon: '⚡',
      text: 'Express Shipping Available'
    },
    {
      icon: '💳',
      text: 'Secure Payment Options'
    },
    {
      icon: '🔄',
      text: 'Easy Returns & Exchange'
    }
  ];

  return (
    <div className="promo-marquee overflow-hidden" style={{
      background: '#dc747d',
      color: 'white',
      padding: 'clamp(5px, 0vw, 10px) 0',
      position: 'relative'
    }}>
      <div className="marquee-wrapper" style={{
        display: 'flex',
        animation: 'marqueeScroll 30s linear infinite',
        whiteSpace: 'nowrap'
      }}>
        {/* First set */}
        {promos.map((promo, index) => (
          <div
            key={`first-${index}`}
            className="promo-item d-flex align-items-center gap-2 px-2 px-md-5"
            style={{
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              fontWeight: '500',
              letterSpacing: '0.3px',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>{promo.icon}</span>
            <span>{promo.text}</span>
            <span style={{ 
              margin: '0 clamp(15px, 3vw, 30px)',
              opacity: '0.6',
              fontSize: '1.2rem'
            }}>|</span>
          </div>
        ))}

        {/* Second set for seamless loop */}
        {promos.map((promo, index) => (
          <div
            key={`second-${index}`}
            className="promo-item d-flex align-items-center gap-2 px-4 px-md-5"
            style={{
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              fontWeight: '500',
              letterSpacing: '0.3px',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>{promo.icon}</span>
            <span>{promo.text}</span>
            <span style={{ 
              margin: '0 clamp(15px, 3vw, 30px)',
              opacity: '0.6',
              fontSize: '1.2rem'
            }}>|</span>
          </div>
        ))}

        {/* Third set for extra smoothness */}
        {promos.map((promo, index) => (
          <div
            key={`third-${index}`}
            className="promo-item d-flex align-items-center gap-2 px-4 px-md-5"
            style={{
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              fontWeight: '500',
              letterSpacing: '0.3px',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>{promo.icon}</span>
            <span>{promo.text}</span>
            <span style={{ 
              margin: '0 clamp(15px, 3vw, 30px)',
              opacity: '0.6',
              fontSize: '1.2rem'
            }}>|</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .promo-marquee {
          user-select: none;
        }
      `}</style>
    </div>
  );
}
