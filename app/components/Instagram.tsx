import Image from 'next/image';

export default function Instagram() {
  const instaImages = [
    '/images/insta-item1.jpg',
    '/images/insta-item2.jpg',
    '/images/insta-item3.jpg',
    '/images/insta-item4.jpg',
    '/images/insta-item5.jpg',
    '/images/insta-item6.jpg',
  ];

  return (
    <section className="instagram position-relative">
      <div className="d-flex justify-content-center w-100 position-absolute bottom-0 z-1">
        <a href="https://www.instagram.com/" className="btn btn-dark px-5">Follow us on Instagram</a>
      </div>
      <div className="row g-0">
        {instaImages.map((image, index) => (
          <div key={index} className="col-6 col-sm-4 col-md-2">
            <div className="insta-item">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <Image 
                  src={image} 
                  alt="instagram" 
                  className="insta-image img-fluid" 
                  width={300} 
                  height={300}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
