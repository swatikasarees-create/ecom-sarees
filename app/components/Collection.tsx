import Image from 'next/image';
import Link from 'next/link';

export default function Collection() {
  return (
    <section className="collection bg-light position-relative py-4 py-md-5">
      <div className="container">
        <div className="row">
          {/* <div className="title-xlarge text-uppercase txt-fx domino">Collection</div> */}
          <div className="collection-item d-flex flex-wrap my-3 my-md-5">
            <div className="col-12 col-md-6 column-container">
              <div className="image-holder position-relative" style={{ height: 'clamp(300px, 60vw, 600px)', overflow: 'hidden' }}>
                <Image 
                  src="/images/single-image-2.jpg" 
                  alt="collection" 
                  className="product-image" 
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 column-container bg-white">
              <div className="collection-content p-4 p-md-5 m-0 m-md-5">
                <h3 className="element-title text-uppercase" style={{ fontSize: 'clamp(1.3rem, 4vw, 1.75rem)' }}>Exclusive Saree Collection</h3>
                <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Discover our curated selection of premium sarees that blend traditional craftsmanship with contemporary design. Each piece is carefully selected to bring you the finest quality fabrics, intricate work, and timeless elegance. From weddings to festive celebrations, find the perfect saree that reflects your unique style and grace.</p>
                <Link href="/sarees" className="btn btn-dark text-uppercase mt-3" style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>Shop Collection</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
