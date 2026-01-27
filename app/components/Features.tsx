export default function Features() {
  return (
    <section className="features py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 text-center" data-aos="fade-in" data-aos-delay="0">
            <div className="py-5">
              <svg width="38" height="38" viewBox="0 0 24 24">
                <use xlinkHref="#calendar"></use>
              </svg>
              <h4 className="element-title text-capitalize my-3">Book An Appointment</h4>
              <p>At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
            </div>
          </div>
          <div className="col-md-3 text-center" data-aos="fade-in" data-aos-delay="300">
            <div className="py-5">
              <svg width="38" height="38" viewBox="0 0 24 24">
                <use xlinkHref="#shopping-bag"></use>
              </svg>
              <h4 className="element-title text-capitalize my-3">Pick up in store</h4>
              <p>At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
            </div>
          </div>
          <div className="col-md-3 text-center" data-aos="fade-in" data-aos-delay="600">
            <div className="py-5">
              <svg width="38" height="38" viewBox="0 0 24 24">
                <use xlinkHref="#gift"></use>
              </svg>
              <h4 className="element-title text-capitalize my-3">Special packaging</h4>
              <p>At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
            </div>
          </div>
          <div className="col-md-3 text-center" data-aos="fade-in" data-aos-delay="900">
            <div className="py-5">
              <svg width="38" height="38" viewBox="0 0 24 24">
                <use xlinkHref="#arrow-cycle"></use>
              </svg>
              <h4 className="element-title text-capitalize my-3">free global returns</h4>
              <p>At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
