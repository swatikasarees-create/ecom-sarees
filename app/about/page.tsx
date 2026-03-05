import Link from 'next/link';

const offerings = [
  'Premium Sarees for weddings, parties & festive occasions',
  'Elegant Suit Sets & Dress Materials',
  'Trend-focused designs with traditional charm',
  'Quality fabrics at affordable prices',
];

export default function AboutPage() {
  return (
    <main style={{ background: '#faf7f8' }}>
      <section
        style={{
          background: 'linear-gradient(135deg, #dc747d 0%, #b45d76 100%)',
          color: '#fff',
          padding: '70px 16px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 35%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.15), transparent 30%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative' }}>
          <p
            data-aos="fade-down"
            style={{
              margin: 0,
              fontSize: '0.8rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              opacity: 0.9,
            }}
          >
            Swatika Sarees & Suits
          </p>
          <h1
            data-aos="fade-up"
            style={{
              margin: '12px 0 16px',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              lineHeight: 1.15,
            }}
          >
            Where Tradition Meets Timeless Elegance
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="150"
            style={{
              margin: 0,
              maxWidth: 860,
              fontSize: 'clamp(1rem, 2.1vw, 1.1rem)',
              lineHeight: 1.75,
              opacity: 0.96,
            }}
          >
            Welcome to Swatika Sarees & Suits, based in Gaur Saundaryam, Greater
            Noida. We bring a carefully curated collection of sarees and ethnic
            suits designed to celebrate every occasion, from festive gatherings and
            weddings to everyday graceful wear.
          </p>
        </div>
      </section>

      <section style={{ padding: '54px 16px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div
            data-aos="fade-up"
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 12px 28px rgba(18, 18, 18, 0.08)',
              padding: '24px clamp(18px, 3vw, 34px)',
              marginBottom: 24,
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 10, fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
              Our Story
            </h2>
            <p style={{ marginBottom: 12, color: '#525252', lineHeight: 1.8 }}>
              At Swatika Sarees, we believe ethnic fashion is not just clothing. It
              is an expression of culture, confidence, and individuality. Our
              collections are thoughtfully selected to blend classic craftsmanship
              with modern aesthetics, so every woman feels beautiful, comfortable,
              and confident.
            </p>
            <p style={{ margin: 0, color: '#525252', lineHeight: 1.8 }}>
              Our mission is simple: to make ethnic fashion accessible, stylish, and
              memorable for every woman.
            </p>
          </div>

          <div className="row g-3 g-md-4 mb-4">
            {offerings.map((item, index) => (
              <div key={item} className="col-12 col-md-6" data-aos="zoom-in" data-aos-delay={index * 100}>
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(220, 116, 125, 0.18)',
                    borderRadius: 14,
                    padding: '18px 16px',
                    height: '100%',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <p style={{ margin: 0, color: '#2f2f2f', fontWeight: 600, lineHeight: 1.65 }}>
                    ✨ {item}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            style={{
              background: 'linear-gradient(135deg, rgba(220, 116, 125, 0.08), rgba(180, 93, 118, 0.08))',
              border: '1px solid rgba(220, 116, 125, 0.2)',
              borderRadius: 16,
              padding: 'clamp(18px, 3vw, 30px)',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 10 }}>Why Customers Trust Us</h3>
            <p style={{ marginBottom: 10, color: '#474747', lineHeight: 1.75 }}>
              We proudly offer Pan-India delivery with Cash on Delivery (COD)
              available, making shopping easy and convenient from anywhere in India.
              Each piece is selected with love, focused on quality, comfort, and
              the latest trends.
            </p>
            <p style={{ marginBottom: 0, color: '#474747', lineHeight: 1.75 }}>
              Whether you are dressing up for a special celebration or adding
              timeless pieces to your wardrobe, Swatika Sarees & Suits is here to
              make every moment more elegant.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '16px 16px 58px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div
            data-aos="flip-up"
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
              textAlign: 'center',
              padding: '28px 18px',
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 10 }}>Order now — limited stock available!</h2>
            <p style={{ color: '#5a5a5a', marginBottom: 18 }}>
              Explore our latest collection and shop your favorite ethnic styles today.
            </p>
            <Link
              href="/sarees"
              className="btn"
              style={{
                background: '#dc747d',
                color: '#fff',
                borderRadius: 999,
                padding: '11px 26px',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
