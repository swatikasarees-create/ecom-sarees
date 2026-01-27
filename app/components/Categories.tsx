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
                <div className="image-holder position-relative" style={{ height: '500px', overflow: 'hidden' }}>
                  <Link href="/sarees?type=designer">
                    <Image 
                      src="/images/cat-item1.jpg" 
                      alt="Designer Sarees" 
                      className="product-image" 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>
                </div>
                <div className="category-content">
                  <div className="product-button">
                    <Link href="/sarees?type=designer" className="btn btn-common text-uppercase">Designer Sarees</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="cat-item image-zoom-effect">
                <div className="image-holder position-relative" style={{ height: '500px', overflow: 'hidden' }}>
                  <Link href="/sarees?type=silk">
                    <Image 
                      src="/images/cat-item2.jpg" 
                      alt="Silk Sarees" 
                      className="product-image" 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>
                </div>
                <div className="category-content">
                  <div className="product-button">
                    <Link href="/sarees?type=silk" className="btn btn-common text-uppercase">Silk Sarees</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="cat-item image-zoom-effect">
                <div className="image-holder position-relative" style={{ height: '500px', overflow: 'hidden' }}>
                  <Link href="/sarees?type=wedding">
                    <Image 
                      src="/images/cat-item3.jpg" 
                      alt="Wedding Sarees" 
                      className="product-image" 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>
                </div>
                <div className="category-content">
                  <div className="product-button">
                    <Link href="/sarees?type=wedding" className="btn btn-common text-uppercase">Wedding Sarees</Link>
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
