'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* SVG Icons */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <defs>
          <symbol xmlns="http://www.w3.org/2000/svg" id="instagram" viewBox="0 0 15 15">
            <path fill="none" stroke="currentColor"
              d="M11 3.5h1M4.5.5h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4Zm3 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z" />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="facebook" viewBox="0 0 15 15">
            <path fill="none" stroke="currentColor"
              d="M7.5 14.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Zm0 0v-8a2 2 0 0 1 2-2h.5m-5 4h5" />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="twitter" viewBox="0 0 15 15">
            <path fill="currentColor"
              d="m14.478 1.5l.5-.033a.5.5 0 0 0-.871-.301l.371.334Zm-.498 2.959a.5.5 0 1 0-1 0h1Zm-6.49.082h-.5h.5Zm0 .959h.5h-.5Zm-6.99 7V12a.5.5 0 0 0-.278.916L.5 12.5Zm.998-11l.469-.175a.5.5 0 0 0-.916-.048l.447.223Zm3.994 9l.354.353a.5.5 0 0 0-.195-.827l-.159.474Zm7.224-8.027l-.37.336l.18.199l.265-.04l-.075-.495Zm1.264-.94c.051.778.003 1.25-.123 1.606c-.122.345-.336.629-.723 1l.692.722c.438-.42.776-.832.974-1.388c.193-.546.232-1.178.177-2.006l-.998.066Zm0 3.654V4.46h-1v.728h1Zm-6.99-.646V5.5h1v-.959h-1Zm0 .959V6h1v-.5h-1ZM10.525 1a3.539 3.539 0 0 0-3.537 3.541h1A2.539 2.539 0 0 1 10.526 2V1Zm2.454 4.187C12.98 9.503 9.487 13 5.18 13v1c4.86 0 8.8-3.946 8.8-8.813h-1ZM1.03 1.675C1.574 3.127 3.614 6 7.49 6V5C4.174 5 2.421 2.54 1.966 1.325l-.937.35Zm.021-.398C.004 3.373-.157 5.407.604 7.139c.759 1.727 2.392 3.055 4.73 3.835l.317-.948c-2.155-.72-3.518-1.892-4.132-3.29c-.612-1.393-.523-3.11.427-5.013l-.895-.446Zm4.087 8.87C4.536 10.75 2.726 12 .5 12v1c2.566 0 4.617-1.416 5.346-2.147l-.708-.706Zm7.949-8.009A3.445 3.445 0 0 0 10.526 1v1c.721 0 1.37.311 1.82.809l.74-.671Zm-.296.83a3.513 3.513 0 0 0 2.06-1.134l-.744-.668a2.514 2.514 0 0 1-1.466.813l.15.989ZM.222 12.916C1.863 14.01 3.583 14 5.18 14v-1c-1.63 0-3.048-.011-4.402-.916l-.556.832Z" />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="pinterest" viewBox="0 0 15 15">
            <path fill="none" stroke="currentColor"
              d="m4.5 13.5l3-7m-3.236 3a2.989 2.989 0 0 1-.764-2V7A3.5 3.5 0 0 1 7 3.5h1A3.5 3.5 0 0 1 11.5 7v.5a3 3 0 0 1-3 3a2.081 2.081 0 0 1-1.974-1.423L6.5 9m1 5.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z" />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="youtube" viewBox="0 0 15 15">
            <path fill="currentColor"
              d="m1.61 12.738l-.104.489l.105-.489Zm11.78 0l.104.489l-.105-.489Zm0-10.476l.104-.489l-.105.489Zm-11.78 0l.106.489l-.105-.489ZM6.5 5.5l.277-.416A.5.5 0 0 0 6 5.5h.5Zm0 4H6a.5.5 0 0 0 .777.416L6.5 9.5Zm3-2l.277.416a.5.5 0 0 0 0-.832L9.5 7.5ZM0 3.636v7.728h1V3.636H0Zm15 7.728V3.636h-1v7.728h1ZM1.506 13.227c3.951.847 8.037.847 11.988 0l-.21-.978a27.605 27.605 0 0 1-11.568 0l-.21.978ZM13.494 1.773a28.606 28.606 0 0 0-11.988 0l.21.978a27.607 27.607 0 0 1 11.568 0l.21-.978ZM15 3.636c0-.898-.628-1.675-1.506-1.863l-.21.978c.418.09.716.458.716.885h1Zm-1 7.728a.905.905 0 0 1-.716.885l.21.978A1.905 1.905 0 0 0 15 11.364h-1Zm-14 0c0 .898.628 1.675 1.506 1.863l.21-.978A.905.905 0 0 1 1 11.364H0Zm1-7.728c0-.427.298-.796.716-.885l-.21-.978A1.905 1.905 0 0 0 0 3.636h1ZM6 5.5v4h1v-4H6Zm.777 4.416l3-2l-.554-.832l-3 2l.554.832Zm3-2.832l-3-2l-.554.832l3 2l.554-.832Z" />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="calendar" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <rect width="20" height="18" x="2" y="4" rx="4" />
              <path d="M8 2v4m8-4v4M2 10h20" />
            </g>
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="shopping-bag" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path
                d="M3.977 9.84A2 2 0 0 1 5.971 8h12.058a2 2 0 0 1 1.994 1.84l.803 10A2 2 0 0 1 18.833 22H5.167a2 2 0 0 1-1.993-2.16l.803-10Z" />
              <path d="M16 11V6a4 4 0 0 0-4-4v0a4 4 0 0 0-4 4v5" />
            </g>
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="heart" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M20.16 4.61A6.27 6.27 0 0 0 12 4a6.27 6.27 0 0 0-8.16 9.48l7.45 7.45a1 1 0 0 0 1.42 0l7.45-7.45a6.27 6.27 0 0 0 0-8.87Zm-1.41 7.46L12 18.81l-6.75-6.74a4.28 4.28 0 0 1 3-7.3a4.25 4.25 0 0 1 3 1.25a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 6.05Z" />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="search" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="cart" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z" />
          </symbol>
        </defs>
      </svg>

      {/* Search Popup */}
      <div className={`search-popup ${isSearchOpen ? 'show' : ''}`}>
        <div className="search-popup-container">
          <form role="search" method="get" className="form-group" action="">
            <input type="search" id="search-form" className="form-control border-0 border-bottom"
              placeholder="Type and press enter" name="s" />
            <button type="submit" className="search-submit border-0 position-absolute bg-white"
              style={{ top: '15px', right: '15px' }}>
              <svg className="search" width="24" height="24">
                <use xlinkHref="#search"></use>
              </svg>
            </button>
          </form>

          <h5 className="cat-list-title">Browse Categories</h5>
          <ul className="cat-list">
            <li className="cat-list-item"><Link href="/sarees?type=designer" title="Designer Sarees">Designer Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=silk" title="Silk Sarees">Silk Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=cotton" title="Cotton Sarees">Cotton Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=banarasi" title="Banarasi Sarees">Banarasi Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=patola" title="Patola Sarees">Patola Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=wedding" title="Wedding Sarees">Wedding Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=party" title="Party Wear Sarees">Party Wear Sarees</Link></li>
          </ul>
        </div>
      </div>

      {/* Cart Offcanvas */}
      <div className={`offcanvas offcanvas-end ${isCartOpen ? 'show' : ''}`} data-bs-scroll="true" tabIndex={-1} id="offcanvasCart">
        <div className="offcanvas-header justify-content-center">
          <button type="button" className="btn-close" onClick={() => setIsCartOpen(false)} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Designer Silk Saree</h6>
                  <small className="text-body-secondary">Wine Red with Gold Border</small>
                </div>
                <span className="text-body-secondary">₹2,903</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Cotton Saree</h6>
                  <small className="text-body-secondary">Pastel Yellow Floral</small>
                </div>
                <span className="text-body-secondary">₹1,500</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Georgette Saree</h6>
                  <small className="text-body-secondary">Black Party Wear</small>
                </div>
                <span className="text-body-secondary">₹1,800</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>₹6,203</strong>
              </li>
            </ul>
            <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to Checkout</button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg bg-light text-uppercase fs-6 p-3 border-bottom align-items-center">
        <div className="container-fluid">
          <div className="row justify-content-between align-items-center w-100">
            <div className="col-auto">
              <Link className="navbar-brand d-flex align-items-center" href="/">
                <Image 
                  src="/images/SwatikaSarees.png" 
                  alt="Swatika Sarees" 
                  width={150} 
                  height={50}
                  priority
                  className="logo"
                  style={{ objectFit: 'contain', height: 'auto', maxHeight: '50px' }}
                />
              </Link>
            </div>

            <div className="col-auto">
              <button className="navbar-toggler" type="button" onClick={() => setIsOffcanvasOpen(!isOffcanvasOpen)}>
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className={`offcanvas offcanvas-end ${isOffcanvasOpen ? 'show' : ''}`} tabIndex={-1} id="offcanvasNavbar">
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                  <button type="button" className="btn-close text-reset" onClick={() => setIsOffcanvasOpen(false)}></button>
                </div>

                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 gap-1 gap-md-5 pe-3">
                    <li className="nav-item">
                      <Link className="nav-link active" href="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/about">About Us</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="dropdownSarees" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sarees
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="dropdownSarees">
                        <li><Link className="dropdown-item" href="/sarees?type=designer">Designer Sarees</Link></li>
                        <li><Link className="dropdown-item" href="/sarees?type=silk">Silk Sarees</Link></li>
                        <li><Link className="dropdown-item" href="/sarees?type=cotton">Cotton Sarees</Link></li>
                        <li><Link className="dropdown-item" href="/sarees?type=georgette">Georgette Sarees</Link></li>
                        <li><Link className="dropdown-item" href="/sarees?type=chiffon">Chiffon Sarees</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" href="/sarees">View All Sarees</Link></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-3 col-lg-auto">
              <ul className="list-unstyled d-flex m-0">
                <li className="d-none d-lg-block">
                  <a href="#" className="text-uppercase mx-3">Wishlist <span className="wishlist-count">(0)</span></a>
                </li>
                <li className="d-none d-lg-block">
                  <a href="#" className="text-uppercase mx-3" onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }}>
                    Cart <span className="cart-count">(0)</span>
                  </a>
                </li>
                <li className="d-lg-none">
                  <a href="#" className="mx-2">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <use xlinkHref="#heart"></use>
                    </svg>
                  </a>
                </li>
                <li className="d-lg-none">
                  <a href="#" className="mx-2" onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <use xlinkHref="#cart"></use>
                    </svg>
                  </a>
                </li>
                <li className="search-box mx-2">
                  <a href="#search" className="search-button" onClick={(e) => { e.preventDefault(); setIsSearchOpen(!isSearchOpen); }}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <use xlinkHref="#search"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
