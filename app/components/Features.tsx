export default function Features() {
  return (
    <section className="features py-4 py-md-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-3 text-center mb-3 mb-md-0" data-aos="fade-in" data-aos-delay="0">
            <div className="py-3 py-md-5 px-2 px-md-0">
              <div className="icon-wrapper mb-2 mb-md-3" style={{ 
                width: 'clamp(50px, 15vw, 70px)', 
                height: 'clamp(50px, 15vw, 70px)', 
                margin: '0 auto',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="white" style={{ width: 'clamp(28px, 8vw, 38px)', height: 'clamp(28px, 8vw, 38px)' }}>
                  <use xlinkHref="#calendar"></use>
                </svg>
              </div>
              <h4 className="element-title text-capitalize my-2 my-md-3 fw-bold" style={{ fontSize: 'clamp(0.85rem, 3vw, 1.1rem)' }}>Personalized Styling</h4>
              <p className="text-muted d-none d-md-block" style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>Book a one-on-one consultation with our saree experts to find the perfect drape for your occasion.</p>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center mb-3 mb-md-0" data-aos="fade-in" data-aos-delay="300">
            <div className="py-3 py-md-5 px-2 px-md-0">
              <div className="icon-wrapper mb-2 mb-md-3" style={{ 
                width: 'clamp(50px, 15vw, 70px)', 
                height: 'clamp(50px, 15vw, 70px)', 
                margin: '0 auto',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="white" style={{ width: 'clamp(28px, 8vw, 38px)', height: 'clamp(28px, 8vw, 38px)' }}>
                  <use xlinkHref="#shopping-bag"></use>
                </svg>
              </div>
              <h4 className="element-title text-capitalize my-2 my-md-3 fw-bold" style={{ fontSize: 'clamp(0.85rem, 3vw, 1.1rem)' }}>Express Delivery</h4>
              <p className="text-muted d-none d-md-block" style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>Get your favorite saree delivered to your doorstep within 24-48 hours across major cities.</p>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center mb-3 mb-md-0" data-aos="fade-in" data-aos-delay="600">
            <div className="py-3 py-md-5 px-2 px-md-0">
              <div className="icon-wrapper mb-2 mb-md-3" style={{ 
                width: 'clamp(50px, 15vw, 70px)', 
                height: 'clamp(50px, 15vw, 70px)', 
                margin: '0 auto',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="white" style={{ width: 'clamp(28px, 8vw, 38px)', height: 'clamp(28px, 8vw, 38px)' }}>
                  <use xlinkHref="#gift"></use>
                </svg>
              </div>
              <h4 className="element-title text-capitalize my-2 my-md-3 fw-bold" style={{ fontSize: 'clamp(0.85rem, 3vw, 1.1rem)' }}>Premium Packaging</h4>
              <p className="text-muted d-none d-md-block" style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>Each saree is carefully wrapped in elegant packaging, perfect for gifting or safekeeping.</p>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center mb-3 mb-md-0" data-aos="fade-in" data-aos-delay="900">
            <div className="py-3 py-md-5 px-2 px-md-0">
              <div className="icon-wrapper mb-2 mb-md-3" style={{ 
                width: 'clamp(50px, 15vw, 70px)', 
                height: 'clamp(50px, 15vw, 70px)', 
                margin: '0 auto',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="white" style={{ width: 'clamp(28px, 8vw, 38px)', height: 'clamp(28px, 8vw, 38px)' }}>
                  <use xlinkHref="#arrow-cycle"></use>
                </svg>
              </div>
              <h4 className="element-title text-capitalize my-2 my-md-3 fw-bold" style={{ fontSize: 'clamp(0.85rem, 3vw, 1.1rem)' }}>Easy Returns</h4>
              <p className="text-muted d-none d-md-block" style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>Not satisfied? Enjoy hassle-free returns within 7 days with full refund or exchange guarantee.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
