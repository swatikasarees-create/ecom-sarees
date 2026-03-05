'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { products, Product, getUniqueColors, getUniqueCategories, getUniqueFabrics, getUniqueCollections } from '../lib/productData';
import { addToCart, addToWishlist } from '../lib/commerceStore';

export default function SareesContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [availability, setAvailability] = useState<'all' | 'in_stock' | 'out_of_stock'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<string>('date-new');
  const [gridColumns, setGridColumns] = useState<number>(3);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Initialize filters based on URL params
  useEffect(() => {
    if (typeParam) {
      const categoryMap: { [key: string]: string } = {
        'designer': 'Designer Sarees',
        'silk': 'Silk Sarees',
        'cotton': 'Cotton Sarees',
        'georgette': 'Georgette Sarees',
        'chiffon': 'Chiffon Sarees',
        'banarasi': 'Banarasi Sarees',
        'patola': 'Patola Sarees',
        'wedding': 'Wedding Sarees',
        'party': 'Party Wear Sarees',
      };
      const category = categoryMap[typeParam];
      if (category) {
        setSelectedCategories([category]);
      }
    }
  }, [typeParam]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => selectedColors.includes(p.color));
    }

    // Fabric filter
    if (selectedFabrics.length > 0) {
      filtered = filtered.filter(p => selectedFabrics.includes(p.fabric));
    }

    // Collection filter
    if (selectedCollections.length > 0) {
      filtered = filtered.filter(p => p.collection && selectedCollections.includes(p.collection));
    }

    // Availability filter
    if (availability !== 'all') {
      filtered = filtered.filter(p => p.availability === availability);
    }

    // Price range filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
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
        // date-new (default order from data)
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, selectedColors, selectedFabrics, selectedCollections, availability, priceRange, sortBy]);

  const toggleFilter = (filterArray: string[], setFilterArray: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter(item => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setSelectedCollections([]);
    setAvailability('all');
    setPriceRange([0, 5000]);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="container-fluid py-3 py-md-5">
      <div className="row">
        {/* Mobile Filter Button */}
        <div className="col-12 d-md-none mb-3">
          <button 
            className="btn btn-outline-dark w-100" 
            onClick={() => setShowFilters(!showFilters)}
            style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'} ({filteredProducts.length} products)
          </button>
        </div>

        {/* Filter Sidebar */}
        <div className={`col-lg-3 col-md-4 ${showFilters ? '' : 'd-none d-md-block'}`}>
          <div className="filter-sidebar mb-4 mb-md-0" style={{ position: 'sticky', top: '20px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4 px-2 px-md-0">
              <h4 className="mb-0" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>Filters</h4>
              <button className="btn btn-sm btn-outline-secondary" onClick={clearAllFilters} style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                Clear All
              </button>
            </div>

            {/* Collections Filter */}
            <div className="filter-section mb-3 mb-md-4 px-2 px-md-0">
              <h5 className="filter-title mb-2 mb-md-3" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>Collections</h5>
              <div className="filter-options">
                {getUniqueCollections().map(collection => (
                  <div key={collection} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`collection-${collection}`}
                      checked={selectedCollections.includes(collection)}
                      onChange={() => toggleFilter(selectedCollections, setSelectedCollections, collection)}
                    />
                    <label className="form-check-label" htmlFor={`collection-${collection}`}>
                      {collection}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="filter-section mb-3 mb-md-4 px-2 px-md-0">
              <h5 className="filter-title mb-2 mb-md-3" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>Availability</h5>
              <div className="filter-options">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="availability"
                    id="availability-all"
                    checked={availability === 'all'}
                    onChange={() => setAvailability('all')}
                  />
                  <label className="form-check-label" htmlFor="availability-all">
                    All
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="availability"
                    id="availability-in-stock"
                    checked={availability === 'in_stock'}
                    onChange={() => setAvailability('in_stock')}
                  />
                  <label className="form-check-label" htmlFor="availability-in-stock">
                    In Stock ({products.filter(p => p.availability === 'in_stock').length})
                  </label>
                </div>
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-section mb-3 mb-md-4 px-2 px-md-0">
              <h5 className="filter-title mb-2 mb-md-3" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>Price</h5>
              <div className="filter-options">
                <div className="d-flex justify-content-between mb-2">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-section mb-3 mb-md-4 px-2 px-md-0">
              <h5 className="filter-title mb-2 mb-md-3" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>Category</h5>
              <div className="filter-options" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {getUniqueCategories().map(category => (
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

            {/* Color Filter */}
            <div className="filter-section mb-3 mb-md-4 px-2 px-md-0">
              <h5 className="filter-title mb-2 mb-md-3" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>Color</h5>
              <div className="filter-options d-flex flex-wrap gap-2">
                {getUniqueColors().map(color => {
                  const colorMap: { [key: string]: string } = {
                    'Red': '#DC143C',
                    'Pink': '#FFC0CB',
                    'Yellow': '#FFD700',
                    'Green': '#228B22',
                    'Blue': '#1E90FF',
                    'Black': '#000000',
                    'Wine': '#722F37',
                    'Mauve': '#E0B0FF',
                    'Orange': '#FF8C00',
                    'Gold': '#FFD700',
                    'White': '#FFFFFF',
                    'Purple': '#800080',
                    'Maroon': '#800000',
                    'Multi': 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)',
                  };
                  return (
                    <div 
                      key={color} 
                      className={`color-swatch ${selectedColors.includes(color) ? 'selected' : ''}`}
                      style={{ 
                        background: colorMap[color] || '#ccc',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        border: selectedColors.includes(color) ? '3px solid #000' : '2px solid #ddd',
                        boxShadow: selectedColors.includes(color) ? '0 0 5px rgba(0,0,0,0.3)' : 'none',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => toggleFilter(selectedColors, setSelectedColors, color)}
                      title={color}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="col-lg-9 col-md-8">
          {/* Toolbar */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 mb-md-4 px-2 px-md-0 gap-3">
            <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', marginBottom: '0' }}>Designer Sarees</h2>
            <div className="d-flex gap-2 gap-md-3 align-items-center flex-wrap">
              {/* Sort Dropdown */}
              <select 
                className="form-select form-select-sm" 
                style={{ width: 'auto', fontSize: 'clamp(0.75rem, 2vw, 0.95rem)' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date-new">Date, new to old</option>
                <option value="price-low">Price, low to high</option>
                <option value="price-high">Price, high to low</option>
                <option value="name-asc">Name, A to Z</option>
                <option value="name-desc">Name, Z to A</option>
              </select>

              {/* Grid Layout Buttons - Hidden on mobile */}
              <div className="btn-group d-none d-md-flex" role="group">
                <button 
                  className={`btn btn-sm btn-outline-secondary ${gridColumns === 1 ? 'active' : ''}`}
                  onClick={() => setGridColumns(1)}
                  style={{ fontSize: '0.85rem' }}
                >
                  ☰
                </button>
                <button 
                  className={`btn btn-sm btn-outline-secondary ${gridColumns === 2 ? 'active' : ''}`}
                  onClick={() => setGridColumns(2)}
                  style={{ fontSize: '0.85rem' }}
                >
                  ▦
                </button>
                <button 
                  className={`btn btn-sm btn-outline-secondary ${gridColumns === 3 ? 'active' : ''}`}
                  onClick={() => setGridColumns(3)}
                  style={{ fontSize: '0.85rem' }}
                >
                  ▦▦
                </button>
                <button 
                  className={`btn btn-sm btn-outline-secondary ${gridColumns === 4 ? 'active' : ''}`}
                  onClick={() => setGridColumns(4)}
                  style={{ fontSize: '0.85rem' }}
                >
                  ▦▦▦
                </button>
                <button 
                  className={`btn btn-sm btn-outline-secondary ${gridColumns === 5 ? 'active' : ''}`}
                  onClick={() => setGridColumns(5)}
                  style={{ fontSize: '0.85rem' }}
                >
                  ▦▦▦▦
                </button>
              </div>
            </div>
          </div>

          {/* Products Count */}
          <p className="text-muted mb-3 mb-md-4 px-2 px-md-0" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>{filteredProducts.length} products</p>

          {/* Product Grid */}
          <div className={`row row-cols-2 row-cols-md-${Math.min(gridColumns, 3)} row-cols-lg-${gridColumns} g-3 g-md-4 px-2 px-md-0`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100 border-0 shadow-sm product-card" style={{ transition: 'transform 0.3s' }}
                     onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                     onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <Link href={`/sarees/${product.id}`} className="text-decoration-none">
                    <div className="position-relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        className="product-image"
                        unoptimized
                      />
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
                        <button
                          type="button"
                          className="btn btn-sm btn-dark flex-fill"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          Add to Cart
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark flex-fill"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToWishlist(product);
                          }}
                        >
                          Wishlist
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-5">
              <h4>No products found</h4>
              <p className="text-muted">Try adjusting your filters</p>
              <button className="btn btn-primary" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
