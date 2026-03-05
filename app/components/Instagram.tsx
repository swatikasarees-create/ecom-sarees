import Image from 'next/image';
import { getProductImageByHash } from '../lib/productImage';

export default function Instagram() {
  const instaImg = (hash: string) => getProductImageByHash(hash);

  const instaImages = [
    instaImg('1e8e23aeb8d70b9213ae15ac20175c0d35e88cbdadc93b8ed8d86ffd02ef8a8a'),
    instaImg('d572b2ddeebc5c37c8eb4c63deb69e10c3543589c62374ec45558d4217058267'),
    instaImg('5cc317d0105e936b6b2fa225210e55064f5cf16bd6c0137a4572165ee7c27d15'),
    instaImg('46a257b9b9f758da7849f836bf71346d414778c4382aac9c626a44c1c91301b9'),
    instaImg('59faa94e5e6422d3d7e99a492e212774569ccc6fe656c8d961b1a24c46a99e51'),
    instaImg('33b3c5ac84e7f428324c6d67f6a7f0732598ee87e26a0b165e594c3932725ac9'),
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
                  unoptimized
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
