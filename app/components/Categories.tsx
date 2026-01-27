import Image from 'next/image';
import Link from 'next/link';

export default function Categories() {
  return (
    <section className="categories overflow-hidden">
      <div className="container">
        <div className="open-up" data-aos="zoom-out">
          <div className="row">
            <div className="col-md-4">
              <div className="cat-item image-zoom-effect">
                <div className="image-holder">
                  <Link href="/">
                    <Image 
                      src="/images/cat-item1.jpg" 
                      alt="categories" 
                      className="product-image img-fluid" 
                      width={500} 
                      height={700}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Link>
                </div>
                <div className="category-content">
                  <div className="product-button">
                    <Link href="/" className="btn btn-common text-uppercase">Shop for men</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="cat-item image-zoom-effect">
                <div className="image-holder">
                  <Link href="/">
                    <Image 
                      src="/images/cat-item2.jpg" 
                      alt="categories" 
                      className="product-image img-fluid" 
                      width={500} 
                      height={700}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Link>
                </div>
                <div className="category-content">
                  <div className="product-button">
                    <Link href="/" className="btn btn-common text-uppercase">Shop for women</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="cat-item image-zoom-effect">
                <div className="image-holder">
                  <Link href="/">
                    <Image 
                      src="/images/cat-item3.jpg" 
                      alt="categories" 
                      className="product-image img-fluid" 
                      width={500} 
                      height={700}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Link>
                </div>
                <div className="category-content">
                  <div className="product-button">
                    <Link href="/" className="btn btn-common text-uppercase">Shop accessories</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
