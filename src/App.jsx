import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Pagination from './components/Pagination';

function App() {
  // Products and categories state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter and search state
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Pagination state (10 products per page)
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;

  // Selected product for details view
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart state
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // 1. Debouncing the search input by 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setPage(1); // reset to page 1 on new search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  // 2. Fetch categories once when app loads
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log('Error fetching categories:', err);
      });
  }, []);

  // 3. Fetch products based on pagination, search, category, and sort
  useEffect(() => {
    setLoading(true);
    const skip = (page - 1) * limit;

    let apiUrl = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    // if searching
    if (debouncedSearch !== '') {
      apiUrl = `https://dummyjson.com/products/search?q=${debouncedSearch}&limit=${limit}&skip=${skip}`;
    } 
    // if category selected
    else if (selectedCategory !== '') {
      apiUrl = `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`;
    }

    // append sorting if chosen
    if (sortBy !== '') {
      const parts = sortBy.split('-');
      const field = parts[0];
      const order = parts[1];
      apiUrl = apiUrl + `&sortBy=${field}&order=${order}`;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        let items = data.products || [];

        // client sort fallback
        if (sortBy === 'price-asc') {
          items.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
          items.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating-asc') {
          items.sort((a, b) => a.rating - b.rating);
        } else if (sortBy === 'rating-desc') {
          items.sort((a, b) => b.rating - a.rating);
        }

        setProducts(items);
        setTotalProducts(data.total || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching products:', err);
        setLoading(false);
      });
  }, [page, debouncedSearch, selectedCategory, sortBy]);

  // Reset all filters
  function resetFilters() {
    setSearchText('');
    setDebouncedSearch('');
    setSelectedCategory('');
    setSortBy('');
    setPage(1);
  }

  // Add item to cart
  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      // increase quantity
      const updated = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updated);
    } else {
      // add as new item with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.title} added to cart!`);
  }

  // Increase item quantity in cart
  function increaseQty(id) {
    const updated = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updated);
  }

  // Decrease item quantity in cart
  function decreaseQty(id) {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updated);
  }

  // Remove single item from cart
  function removeItem(id) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
  }

  // Empty whole cart
  function clearCart() {
    setCart([]);
  }

  // Calculate cart total price and count
  let cartTotal = 0;
  let cartCount = 0;
  for (let i = 0; i < cart.length; i++) {
    cartTotal += cart[i].price * cart[i].quantity;
    cartCount += cart[i].quantity;
  }

  // Pagination helpers
  const totalPages = Math.ceil(totalProducts / limit) || 1;

  function prevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Top Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        showCart={showCart}
        setShowCart={setShowCart}
      />

      {/* Cart View (toggleable) */}
      <Cart
        showCart={showCart}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeItem={removeItem}
        clearCart={clearCart}
        cartTotal={cartTotal}
      />

      {/* Product Details View */}
      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Search, Filter, Sort Controls */}
      <Filters
        searchText={searchText}
        setSearchText={setSearchText}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          setPage(1);
        }}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resetFilters={resetFilters}
      />

      {/* Info text */}
      <p>Showing {products.length} of {totalProducts} products (Page {page} of {totalPages})</p>

      {/* Products List */}
      <ProductList
        products={products}
        loading={loading}
        onViewDetails={(item) => setSelectedProduct(item)}
        onAddToCart={addToCart}
      />

      {/* Pagination at bottom */}
      <Pagination
        page={page}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
}

export default App;
