'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import type { CSSProperties } from 'react';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { getCart, getStoreEventName, removeFromCart, type CartItem } from '../lib/commerceStore';
import { getWishlist, getWishlistEventName } from '../lib/wishlistStore';
import { getCatalogProducts } from '../lib/productData';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showTestCatalog = searchParams.has('test');
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  /** Same display font as "Saree Collection" (h2 uses Marcellus / --heading-font in style.css). */
  const navFontStyle: CSSProperties = {
    fontFamily: 'var(--font-marcellus), "Marcellus", Georgia, serif',
    fontWeight: 400,
    letterSpacing: '0.1em',
    fontSize: '1.10rem',
    color: '#111',
    transition: 'color 0.22s ease',
  };

  useEffect(() => {
    const syncStore = () => {
      setCartItems(getCart());
    };
    syncStore();
    const eventName = getStoreEventName();
    window.addEventListener(eventName, syncStore);
    return () => window.removeEventListener(eventName, syncStore);
  }, []);

  useEffect(() => {
    const syncWishlist = () => {
      setWishlistCount(getWishlist().length);
    };
    syncWishlist();
    const eventName = getWishlistEventName();
    window.addEventListener(eventName, syncWishlist);
    return () => window.removeEventListener(eventName, syncWishlist);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );
  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );
  const searchMatches = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];
    return getCatalogProducts(showTestCatalog)
      .filter((product) => product.name.toLowerCase().includes(query))
      .slice(0, 8);
  }, [searchTerm, showTestCatalog]);

  const onSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    router.push(`/sarees?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
    setSearchTerm('');
  };

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
          <symbol xmlns="http://www.w3.org/2000/svg" id="search" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="cart" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z" />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="package-search" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 4a2 2 0 0 1 2-2h6.172a2 2 0 0 1 1.414.586l1.828 1.828A2 2 0 0 0 14.828 5H19a2 2 0 0 1 2 2v3h-8l-2-2H5v10h6v2H5a2 2 0 0 1-2-2V4zm11 11.414l4.95 4.95l-1.414 1.414L12.586 17H11v-2h2v-.586zM11 15a4 4 0 1 1 8 0a4 4 0 0 1-8 0z" />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" id="heart" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </symbol>
        </defs>
      </svg>

      {/* Search Popup */}
      <div
        className={`search-popup ${isSearchOpen ? 'is-visible show' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsSearchOpen(false);
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Search site"
      >
        <button
          type="button"
          className="btn-close search-popup-close-btn"
          onClick={() => {
            setIsSearchOpen(false);
            setSearchTerm('');
          }}
          aria-label="Close search"
        />

        <div className="search-popup-container">
          <form role="search" method="get" className="form-group position-relative" action="" onSubmit={onSearchSubmit}>
            <input
              ref={searchInputRef}
              type="search"
              id="search-form"
              className="form-control border-0 border-bottom"
              placeholder="Search sarees, suits, fabrics, colors..."
              name="s"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className="search-submit border-0 position-absolute bg-white"
              style={{ top: '15px', right: '15px' }}
              aria-label="Submit search"
            >
              <svg className="search" width="24" height="24">
                <use xlinkHref="#search"></use>
              </svg>
            </button>
          </form>

          {searchTerm.trim().length > 0 && (
            <div className="mb-4 text-start">
              <h5 className="cat-list-title">Search Results</h5>
              {searchMatches.length > 0 ? (
                <ul className="cat-list list-unstyled">
                  {searchMatches.map((product) => (
                    <li key={product.id} className="cat-list-item py-1">
                      <Link
                        href={`/sarees?q=${encodeURIComponent(product.name)}`}
                        title={product.name}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchTerm('');
                        }}
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                  No exact match for &quot;{searchTerm.trim()}&quot;. Press Enter to search catalog.
                </p>
              )}
            </div>
          )}

          <h5 className="cat-list-title text-start">Browse Categories</h5>
          <ul className="cat-list list-unstyled">
            <li className="cat-list-item"><Link href="/sarees?type=designer" onClick={() => setIsSearchOpen(false)} title="Designer Sarees">Designer Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=silk" onClick={() => setIsSearchOpen(false)} title="Silk Sarees">Silk Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=cotton" onClick={() => setIsSearchOpen(false)} title="Cotton Sarees">Cotton Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=banarasi" onClick={() => setIsSearchOpen(false)} title="Banarasi Sarees">Banarasi Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=patola" onClick={() => setIsSearchOpen(false)} title="Patola Sarees">Patola Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=wedding" onClick={() => setIsSearchOpen(false)} title="Wedding Sarees">Wedding Sarees</Link></li>
            <li className="cat-list-item"><Link href="/sarees?type=party" onClick={() => setIsSearchOpen(false)} title="Party Wear Sarees">Party Wear Sarees</Link></li>
            <li className="cat-list-item"><Link href="/suit" onClick={() => setIsSearchOpen(false)} title="Suit">Suit</Link></li>
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
              <span className="badge bg-primary rounded-pill">{cartCount}</span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems.length === 0 && (
                <li className="list-group-item text-center text-muted">
                  No products in cart.
                </li>
              )}
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-body-secondary">Qty: {item.qty}</small>
                    <div>
                      <button
                        type="button"
                        className="btn btn-link p-0 text-danger text-decoration-none"
                        style={{ fontSize: '0.82rem' }}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="text-body-secondary">
                    ₹{(item.price * item.qty).toLocaleString('en-IN')}
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
              </li>
            </ul>
            <Link className="w-100 btn btn-primary btn-lg" href="/cart" onClick={() => setIsCartOpen(false)}>
              Open Checkout
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg bg-white text-uppercase p-2 p-md-3 border-bottom sticky-header" style={{ position: 'sticky', top: 0, zIndex: 1020, backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid">
          {/* Mobile Layout: Hamburger | Logo | Icons */}
          <div className="d-flex d-lg-none align-items-center justify-content-between w-100">
            {/* Mobile Toggler - Left */}
            <button className="navbar-toggler border-0 p-1" type="button" onClick={() => setIsOffcanvasOpen(!isOffcanvasOpen)} style={{ order: 1 }}>
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Logo - Center */}
            <Link className="navbar-brand mx-auto" href="/" style={{ order: 2 }}>
              <Image 
                src="/images/swatika/Swatika_logo.png" 
                alt="Swatika Sarees" 
                width={120} 
                height={50}
                priority
                className="logo"
                style={{ objectFit: 'contain', height: 'auto', maxHeight: '50px' }}
              />
            </Link>

            {/* Mobile Icons - Right: Wishlist, Track, Cart */}
            <div className="d-flex align-items-center gap-2" style={{ order: 3 }}>
              <Link
                href="/wishlist"
                className="d-flex align-items-center position-relative swatika-header-icon-link"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <use xlinkHref="#heart"></use>
                </svg>
                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.62rem' }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/track-order"
                className="d-flex align-items-center swatika-header-icon-link"
                title="Track order"
                aria-label="Track order"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <use xlinkHref="#package-search"></use>
                </svg>
              </Link>
              <a
                href="#"
                className="d-flex align-items-center position-relative swatika-header-icon-link"
                onClick={(e) => {
                  e.preventDefault();
                  setIsCartOpen(true);
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <use xlinkHref="#cart"></use>
                </svg>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                    {cartCount}
                  </span>
                )}
              </a>
              <button
                type="button"
                className="btn btn-link p-0 d-flex align-items-center swatika-header-icon-link text-decoration-none"
                style={{ color: '#111' }}
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search products"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <use xlinkHref="#search"></use>
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          {/* Logo - Left */}
          <Link className="navbar-brand d-none d-lg-block" href="/">
            <Image 
              src="/images/swatika/Swatika_logo.png" 
              alt="Swatika Sarees" 
              width={150} 
              height={60}
              priority
              className="logo"
              style={{ objectFit: 'contain', height: 'auto', maxHeight: '60px' }}
            />
          </Link>

          {/* Desktop Navigation Menu - Center */}
          <div className="navbar-collapse justify-content-center d-none d-lg-flex">
            <ul className="navbar-nav gap-4">
              <li className="nav-item">
                <Link className="nav-link active" href="/" style={navFontStyle}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/about" style={navFontStyle}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/sarees" style={navFontStyle}>
                  Sarees
                </Link>
                {/* <ul className="dropdown-menu" aria-labelledby="dropdownSarees">
                  <li><Link className="dropdown-item" href="/sarees?type=designer">Designer Sarees</Link></li>
                  <li><Link className="dropdown-item" href="/sarees?type=silk">Silk Sarees</Link></li>
                  <li><Link className="dropdown-item" href="/sarees?type=cotton">Cotton Sarees</Link></li>
                  <li><Link className="dropdown-item" href="/sarees?type=georgette">Georgette Sarees</Link></li>
                  <li><Link className="dropdown-item" href="/sarees?type=chiffon">Chiffon Sarees</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" href="/sarees">View All Sarees</Link></li>
                </ul> */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/suit" style={navFontStyle}>
                  Suit
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" href="/contact" style={{ fontSize: '1rem' }}>Contact</Link>
              </li> */}
            </ul>
          </div>

          {/* Mobile Offcanvas Menu */}
          <div className={`offcanvas offcanvas-start d-lg-none ${isOffcanvasOpen ? 'show' : ''}`} tabIndex={-1} id="offcanvasNavbar">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
              <button type="button" className="btn-close text-reset" onClick={() => setIsOffcanvasOpen(false)}></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav gap-1">
                <li className="nav-item">
                  <Link className="nav-link active" href="/" style={{ ...navFontStyle, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/about" style={{ ...navFontStyle, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                    About Us
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                    className="nav-link "
                    href="/sarees"
                    id="dropdownSareesMobile"
                    aria-expanded="false"
                    style={{ ...navFontStyle, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}
                  >
                    Sarees
                  </Link>
                  {/* <ul className="dropdown-menu" aria-labelledby="dropdownSareesMobile">
                    <li><Link className="dropdown-item" href="/sarees?type=designer">Designer Sarees</Link></li>
                    <li><Link className="dropdown-item" href="/sarees?type=silk">Silk Sarees</Link></li>
                    <li><Link className="dropdown-item" href="/sarees?type=cotton">Cotton Sarees</Link></li>
                    <li><Link className="dropdown-item" href="/sarees?type=georgette">Georgette Sarees</Link></li>
                    <li><Link className="dropdown-item" href="/sarees?type=chiffon">Chiffon Sarees</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" href="/sarees">View All Sarees</Link></li>
                  </ul> */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/suit" style={{ ...navFontStyle, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                    Suit
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/wishlist"
                    onClick={() => setIsOffcanvasOpen(false)}
                    style={{ ...navFontStyle, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}
                  >
                    Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/track-order" style={{ ...navFontStyle, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                    Track order
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" href="/contact" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Contact</Link>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Desktop Icons - Right: Wishlist, Track order, Cart, Search */}
          <div className="d-none d-lg-flex align-items-center ms-auto">
            <ul className="list-unstyled d-flex m-0 align-items-center gap-3">
              <li>
                <Link
                  href="/wishlist"
                  className="text-uppercase text-decoration-none swatika-header-utility"
                  style={{ ...navFontStyle, whiteSpace: 'nowrap' }}
                >
                  Wishlist <span className="wishlist-count">({wishlistCount})</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-uppercase text-decoration-none swatika-header-utility"
                  style={{ ...navFontStyle, whiteSpace: 'nowrap' }}
                >
                  Track order
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-uppercase text-decoration-none swatika-header-utility"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCartOpen(true);
                  }}
                  style={{ ...navFontStyle, whiteSpace: 'nowrap', cursor: 'pointer' }}
                >
                  Cart <span className="cart-count">({cartCount})</span>
                </a>
              </li>
              <li className="search-box">
                <button
                  type="button"
                  className="btn btn-link p-0 search-button d-flex align-items-center swatika-header-utility text-decoration-none"
                  style={{ color: navFontStyle.color }}
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search products"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <use xlinkHref="#search"></use>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style jsx global>{`
        .search-popup {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background-color: rgba(255, 255, 255, 0.98) !important;
          z-index: 99999 !important;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.25s ease, visibility 0.25s ease;
          overflow-y: auto;
          padding: 40px 20px;
        }
        .search-popup.is-visible,
        .search-popup.show {
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
        }
        .search-popup-close-btn {
          position: fixed !important;
          top: 25px !important;
          right: 30px !important;
          width: 32px !important;
          height: 32px !important;
          z-index: 100000 !important;
          cursor: pointer;
        }
        .search-popup-container {
          max-width: 760px;
          margin: 60px auto 40px;
          position: relative;
        }
        .search-popup input#search-form {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          padding-bottom: 12px;
          border-bottom: 2px solid #222 !important;
          border-radius: 0;
        }
        .search-popup input#search-form:focus {
          box-shadow: none;
          border-bottom-color: #dc747d !important;
        }
        nav.sticky-header .navbar-brand {
          transition: opacity 0.22s ease;
        }
        nav.sticky-header .navbar-brand:hover {
          opacity: 0.88;
        }
        nav.sticky-header .navbar-nav .nav-link:hover {
          color: #dc747d !important;
        }
        nav.sticky-header .navbar-nav .nav-link {
          transition: color 0.22s ease;
        }
        nav.sticky-header .swatika-header-utility:hover {
          color: #dc747d !important;
        }
        nav.sticky-header .swatika-header-utility {
          transition: color 0.22s ease;
        }
        nav.sticky-header .swatika-header-icon-link {
          color: #111;
          transition: color 0.22s ease, transform 0.22s ease;
        }
        nav.sticky-header .swatika-header-icon-link:hover {
          color: #dc747d !important;
          transform: scale(1.08);
        }
        nav.sticky-header .swatika-header-icon-link svg {
          fill: currentColor;
        }
      `}</style>
    </>
  );
}
