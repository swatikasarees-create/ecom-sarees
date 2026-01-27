import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="footer" className="mt-5">
      <div className="container">
        <div className="row d-flex flex-wrap justify-content-between py-5">
          <div className="col-md-3 col-sm-6">
            <div className="footer-menu footer-menu-001">
              <div className="footer-intro mb-4">
                <Link href="/">
                  <Image 
                    src="/images/main-logo.png" 
                    alt="logo" 
                    width={112} 
                    height={45}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </Link>
              </div>
              <p>Gravida massa volutpat aenean odio. Amet, turpis erat nullam fringilla elementum diam in. Nisi, purus
                vitae, ultrices nunc. Sit ac sit suscipit hendrerit.</p>
              <div className="social-links">
                <ul className="list-unstyled d-flex flex-wrap gap-3">
                  <li>
                    <a href="#" className="text-secondary">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use xlinkHref="#facebook"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-secondary">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use xlinkHref="#twitter"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-secondary">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use xlinkHref="#youtube"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-secondary">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use xlinkHref="#pinterest"></use>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-secondary">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use xlinkHref="#instagram"></use>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="footer-menu footer-menu-002">
              <h5 className="widget-title text-uppercase mb-4">Quick Links</h5>
              <ul className="menu-list list-unstyled text-uppercase border-animation-left fs-6">
                <li className="menu-item">
                  <Link href="/" className="item-anchor">Home</Link>
                </li>
                <li className="menu-item">
                  <Link href="/about" className="item-anchor">About</Link>
                </li>
                <li className="menu-item">
                  <Link href="/services" className="item-anchor">Services</Link>
                </li>
                <li className="menu-item">
                  <Link href="/single" className="item-anchor">Single item</Link>
                </li>
                <li className="menu-item">
                  <Link href="/contact" className="item-anchor">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="footer-menu footer-menu-003">
              <h5 className="widget-title text-uppercase mb-4">Help & Info</h5>
              <ul className="menu-list list-unstyled text-uppercase border-animation-left fs-6">
                <li className="menu-item">
                  <a href="#" className="item-anchor">Track Your Order</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="item-anchor">Returns + Exchanges</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="item-anchor">Shipping + Delivery</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="item-anchor">Contact Us</a>
                </li>
                <li className="menu-item">
                  <a href="#" className="item-anchor">Find us easy</a>
                </li>
                <li className="menu-item">
                  <Link href="/faqs" className="item-anchor">Faqs</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="footer-menu footer-menu-004 border-animation-left">
              <h5 className="widget-title text-uppercase mb-4">Contact Us</h5>
              <p>Do you have any questions or suggestions? <a href="mailto:contact@yourcompany.com"
                  className="item-anchor">contact@yourcompany.com</a></p>
              <p>Do you need support? Give us a call. <a href="tel:+43 720 11 52 78" className="item-anchor">+43 720 11 52
                  78</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-top py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex flex-wrap">
              <div className="shipping">
                <span>We ship with:</span>
                <Image src="/images/arct-icon.png" alt="icon" width={40} height={20} style={{ width: 'auto', height: 'auto' }} />
                <Image src="/images/dhl-logo.png" alt="icon" width={40} height={20} style={{ width: 'auto', height: 'auto' }} />
              </div>
              <div className="payment-option">
                <span>Payment Option:</span>
                <Image src="/images/visa-card.png" alt="card" width={40} height={25} style={{ width: 'auto', height: 'auto' }} />
                <Image src="/images/paypal-card.png" alt="card" width={40} height={25} style={{ width: 'auto', height: 'auto' }} />
                <Image src="/images/master-card.png" alt="card" width={40} height={25} style={{ width: 'auto', height: 'auto' }} />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <p>© Copyright 2022 Kaira. All rights reserved. Design by <a href="https://templatesjungle.com"
                  target="_blank">TemplatesJungle</a> Distribution By <a href="https://themewagon.com"
                target="_blank">ThemeWagon</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
