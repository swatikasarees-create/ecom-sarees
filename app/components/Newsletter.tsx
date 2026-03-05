export default function Newsletter() {
  return (
    <section className="newsletter bg-light" style={{ background: 'url(/images/pattern-bg.png) no-repeat' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-md-8 py-4 py-md-5 my-3 my-md-5">
            <div className="subscribe-header text-center pb-3">
              <h3 className="section-title text-uppercase" style={{ fontSize: 'clamp(1.3rem, 4vw, 1.75rem)' }}>Sign Up for our newsletter</h3>
            </div>
            <form id="form" className="d-flex flex-column flex-md-row gap-2">
              <input type="text" name="email" placeholder="Your Email Address" className="form-control form-control-lg flex-grow-1" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }} />
              <button className="btn btn-dark btn-lg text-uppercase" style={{ fontSize: 'clamp(0.85rem, 2vw, 1.1rem)', minWidth: 'auto' }}>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
