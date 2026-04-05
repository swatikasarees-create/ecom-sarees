'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products, Product } from '../lib/productData';
import { addToCart } from '../lib/commerceStore';

type CatalogSection = 'sarees' | 'suit';

const CATEGORY_BY_QUERY: Record<string, string> = {
  designer: 'Designer Sarees',
  silk: 'Silk Sarees',
  cotton: 'Cotton Sarees',
  georgette: 'Georgette Sarees',
  chiffon: 'Chiffon Sarees',
  banarasi: 'Banarasi Sarees',
  patola: 'Patola Sarees',
  wedding: 'Wedding Sarees',
  party: 'Party Wear Sarees',
};

interface SareesContentProps {
  section?: CatalogSection;
  /** `?type=` from URL; parent remounts this component when it changes. */
  typeQuery?: string | null;
}

export default function SareesContent({ section = 'sarees', typeQuery }: SareesContentProps) {
  const typeParam = typeQuery ?? null;
  const isSuitSection = section === 'suit';

  const sectionProducts = useMemo(
    () =>
      isSuitSection
        ? products.filter((product) => product.category === 'Suit')
        : products.filter((product) => product.category !== 'Suit'),
    [isSuitSection]
  );

  const categoryOptions = useMemo(
    () => [...new Set(sectionProducts.map((product) => product.category))].sort(),
    [sectionProducts]
  );

  const fabricOptions = useMemo(
    () => [...new Set(sectionProducts.map((product) => product.fabric))].sort(),
    [sectionProducts]
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (isSuitSection) return ['Suit'];
    if (!typeParam) return [];
    const category = CATEGORY_BY_QUERY[typeParam];
    if (category && categoryOptions.includes(category)) return [category];
    return [];
  });
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [sortBy, setSortBy] = useState<string>('date-new');
  const [gridColumns, setGridColumns] = useState<number>(3);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const imageViewportRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startPanX: number;
    startPanY: number;
  } | null>(null);

  const filteredProducts = useMemo(() => {
    let filtered = [...sectionProducts];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category));
    }

    if (selectedFabrics.length > 0) {
      filtered = filtered.filter((product) => selectedFabrics.includes(product.fabric));
    }

    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [priceRange, sectionProducts, selectedCategories, selectedFabrics, sortBy]);

  const openProductModal = (product: Product) => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsDraggingImage(false);
    dragStateRef.current = null;
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (!selectedProduct) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProductModal();
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [selectedProduct]);

  const toggleFilter = (
    filterArray: string[],
    setFilterArray: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter((item) => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories(isSuitSection ? ['Suit'] : []);
    setSelectedFabrics([]);
    setPriceRange([0, 15000]);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const shopNowHref = (product: Product) =>
    `/checkout?productId=${encodeURIComponent(String(product.id))}&product=${encodeURIComponent(product.name)}`;

  const clampPan = (x: number, y: number, zoom = zoomLevel) => {
    if (!imageViewportRef.current || zoom <= 1) {
      return { x: 0, y: 0 };
    }
    const viewportWidth = imageViewportRef.current.clientWidth;
    const viewportHeight = imageViewportRef.current.clientHeight;
    const maxX = ((zoom - 1) * viewportWidth) / 2;
    const maxY = ((zoom - 1) * viewportHeight) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const onImagePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement.closest('button')) return;
    if (zoomLevel <= 1) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startPanX: panPosition.x,
      startPanY: panPosition.y,
    };
    setIsDraggingImage(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onImagePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - dragStateRef.current.startX;
    const deltaY = event.clientY - dragStateRef.current.startY;
    setPanPosition(
      clampPan(dragStateRef.current.startPanX + deltaX, dragStateRef.current.startPanY + deltaY)
    );
  };

  const endImageDrag = () => {
    dragStateRef.current = null;
    setIsDraggingImage(false);
  };

  return (
    <div className="container-fluid py-3 py-md-5">
      <div className="row">
        <div className="col-12 d-md-none mb-3">
          <button
            className="btn btn-outline-dark w-100"
            onClick={() => setShowFilters(!showFilters)}
            style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'} ({filteredProducts.length} products)
          </button>
        </div>

        <div className={`col-lg-3 col-md-4 ${showFilters ? '' : 'd-none d-md-block'}`}>
          <div className="filter-sidebar mb-4 mb-md-0" style={{ position: 'sticky', top: '20px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4 px-2 px-md-0">
              <h4 className="mb-0" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>
                Filters
              </h4>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={clearAllFilters}
                style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}
              >
                Clear All
              </button>
            </div>

            <div className="filter-section mb-3 mb-md-4 px-2 px-md-0">
              <h5 className="filter-title mb-2 mb-md-3" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>
                Price
              </h5>
              <div className="filter-options">
                <div className="d-flex justify-content-between mb-2">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="15000"
                  step="250"
                  value={priceRange[1]}
                  onChange={(event) => setPriceRange([0, parseInt(event.target.value, 10)])}
                />
              </div>
            </div>

            <div className="filter-section mb-3 mb-md-4 px-2 px-md-0">
              <h5 className="filter-title mb-2 mb-md-3" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>
                Category
              </h5>
              <div className="filter-options" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {categoryOptions.map((category) => (
                  <div key={category} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleFilter(selectedCategories, setSelectedCategories, category)}
                    />
                    <label className="form-check-label" htmlFor={`category-${category}`}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-section mb-3 mb-md-4 px-2 px-md-0">
              <h5 className="filter-title mb-2 mb-md-3" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>
                Fabric
              </h5>
              <div className="filter-options">
                {fabricOptions.map((fabric) => (
                  <div key={fabric} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`fabric-${fabric}`}
                      checked={selectedFabrics.includes(fabric)}
                      onChange={() => toggleFilter(selectedFabrics, setSelectedFabrics, fabric)}
                    />
                    <label className="form-check-label" htmlFor={`fabric-${fabric}`}>
                      {fabric}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9 col-md-8">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 mb-md-4 px-2 px-md-0 gap-3">
            <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', marginBottom: '0' }}>
              {isSuitSection ? 'Suit Collection' : 'Saree Collection'}
            </h2>
            <div className="d-flex gap-2 gap-md-3 align-items-center flex-wrap">
              <select
                className="form-select form-select-sm"
                style={{ width: 'auto', fontSize: 'clamp(0.75rem, 2vw, 0.95rem)' }}
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="date-new">Date, new to old</option>
                <option value="price-low">Price, low to high</option>
                <option value="price-high">Price, high to low</option>
                <option value="name-asc">Name, A to Z</option>
                <option value="name-desc">Name, Z to A</option>
              </select>

              <div className="btn-group d-none d-md-flex" role="group">
                <button className={`btn btn-sm btn-outline-secondary ${gridColumns === 1 ? 'active' : ''}`} onClick={() => setGridColumns(1)} style={{ fontSize: '0.85rem' }}>☰</button>
                <button className={`btn btn-sm btn-outline-secondary ${gridColumns === 2 ? 'active' : ''}`} onClick={() => setGridColumns(2)} style={{ fontSize: '0.85rem' }}>▦</button>
                <button className={`btn btn-sm btn-outline-secondary ${gridColumns === 3 ? 'active' : ''}`} onClick={() => setGridColumns(3)} style={{ fontSize: '0.85rem' }}>▦▦</button>
                <button className={`btn btn-sm btn-outline-secondary ${gridColumns === 4 ? 'active' : ''}`} onClick={() => setGridColumns(4)} style={{ fontSize: '0.85rem' }}>▦▦▦</button>
                <button className={`btn btn-sm btn-outline-secondary ${gridColumns === 5 ? 'active' : ''}`} onClick={() => setGridColumns(5)} style={{ fontSize: '0.85rem' }}>▦▦▦▦</button>
              </div>
            </div>
          </div>

          <p className="text-muted mb-3 mb-md-4 px-2 px-md-0" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
            {filteredProducts.length} products
          </p>

          <div className={`row row-cols-2 row-cols-md-${Math.min(gridColumns, 3)} row-cols-lg-${gridColumns} g-3 g-md-4 px-2 px-md-0`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100 border-0 shadow-sm product-card" style={{ transition: 'transform 0.3s' }}
                  onMouseEnter={(event) => (event.currentTarget.style.transform = 'translateY(-5px)')}
                  onMouseLeave={(event) => (event.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div
                    className="text-decoration-none w-100 text-start"
                    role="button"
                    tabIndex={0}
                    onClick={() => openProductModal(product)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') openProductModal(product);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="position-relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                      <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} className="product-image" unoptimized />
                      {product.originalPrice && (
                        <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                          Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    <div className="card-body p-2 p-md-3">
                      <h6 className="card-title text-dark mb-2" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>{product.name}</h6>
                      <p className="card-text text-muted mb-2 d-none d-md-block" style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)' }}>
                        {product.fabric} • {product.color}
                      </p>
                      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-1 gap-md-2">
                        <span className="fw-bold text-dark" style={{ fontSize: 'clamp(0.85rem, 2.2vw, 1rem)' }}>₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                          <span className="text-muted text-decoration-line-through" style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)' }}>
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <div className="d-flex gap-2 mt-3">
                        <button type="button" className="btn btn-sm btn-dark flex-fill" onClick={(event) => { event.preventDefault(); event.stopPropagation(); handleAddToCart(product); }}>
                          Add to Cart
                        </button>
                        <Link
                          href={shopNowHref(product)}
                          className="btn btn-sm btn-outline-dark flex-fill"
                          onClick={(event) => event.stopPropagation()}
                        >
                          Shop now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-5">
              <h4>No products found</h4>
              <p className="text-muted">Try adjusting your filters</p>
              <button className="btn btn-primary" onClick={clearAllFilters}>Clear All Filters</button>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div
          role="button"
          tabIndex={0}
          onClick={closeProductModal}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              closeProductModal();
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: 1050,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(980px, 100%)',
              maxHeight: '90vh',
              background: '#fff',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            }}
          >
            <div className="row g-0">
              <div className="col-md-6">
                <div
                  ref={imageViewportRef}
                  onPointerDown={onImagePointerDown}
                  onPointerMove={onImagePointerMove}
                  onPointerUp={endImageDrag}
                  onPointerCancel={endImageDrag}
                  style={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '55vh',
                    background: '#f8f8f8',
                    overflow: 'hidden',
                    cursor: zoomLevel > 1 ? (isDraggingImage ? 'grabbing' : 'grab') : 'default',
                    touchAction: zoomLevel > 1 ? 'none' : 'auto',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transform: `matrix(${zoomLevel}, 0, 0, ${zoomLevel}, ${panPosition.x}, ${panPosition.y})`,
                      transformOrigin: 'center center',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      style={{ objectFit: 'contain', objectPosition: 'center' }}
                      unoptimized
                    />
                  </div>

                  <div
                    className="badge text-bg-dark"
                    style={{ position: 'absolute', left: 12, top: 12, zIndex: 2, fontSize: '0.8rem' }}
                  >
                    {zoomLevel.toFixed(1)}x
                  </div>

                  <div
                    className="d-flex flex-column gap-2"
                    style={{ position: 'absolute', right: 12, top: 12, zIndex: 2 }}
                  >
                    <button
                      type="button"
                      className="btn btn-light border"
                      style={{ width: 36, height: 36, padding: 0, fontSize: '1.1rem', lineHeight: 1 }}
                      onClick={(event) => {
                        event.stopPropagation();
                        setZoomLevel((prev) => {
                          const next = Math.min(3, Number((prev + 0.2).toFixed(1)));
                          setPanPosition((currentPan) => clampPan(currentPan.x, currentPan.y, next));
                          return next;
                        });
                      }}
                      aria-label="Zoom in"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="btn btn-light border"
                      style={{ width: 36, height: 36, padding: 0, fontSize: '1.2rem', lineHeight: 1 }}
                      onClick={(event) => {
                        event.stopPropagation();
                        setZoomLevel((prev) => {
                          const next = Math.max(1, Number((prev - 0.2).toFixed(1)));
                          setPanPosition((currentPan) => clampPan(currentPan.x, currentPan.y, next));
                          return next;
                        });
                      }}
                      aria-label="Zoom out"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 p-md-4">
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <h4 className="mb-2">{selectedProduct.name}</h4>
                    <button type="button" className="btn-close" onClick={closeProductModal} aria-label="Close" />
                  </div>
                  <p className="text-muted mb-2">
                    {selectedProduct.category} • {selectedProduct.fabric}
                  </p>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="fw-bold fs-5">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-muted text-decoration-line-through">
                        ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <p className="text-muted mb-4">{selectedProduct.description || 'No description available.'}</p>
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-dark" onClick={() => handleAddToCart(selectedProduct)}>
                      Add to Cart
                    </button>
                    <Link href={shopNowHref(selectedProduct)} className="btn btn-outline-dark">
                      Shop now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
