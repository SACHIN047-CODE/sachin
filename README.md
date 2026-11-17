# ShopSmart - E-Commerce Application

A clean, simple React e-commerce application built using the [DummyJSON API](https://dummyjson.com).

## Features Implemented

1. **Browse Products & Pagination**:
   - Displays 12 products per page with Previous / Next navigation and page indicators.
   - Shows total products available.

2. **Search Products with Debouncing**:
   - Live search by product title with a 500ms debounce delay to avoid spamming the API.
   - Automatically resets pagination to page 1 upon new search queries.

3. **Filter Products by Category**:
   - Dynamically fetches all categories from DummyJSON (`/products/categories`).
   - Category selector filters products directly via the DummyJSON category endpoint.

4. **Sort Products by Price and Rating**:
   - Sort by:
     - Price: Low to High
     - Price: High to Low
     - Rating: Low to High
     - Rating: High to Low
   - Supports DummyJSON sorting parameters with client-side sorting fallback.

5. **View Complete Product Details**:
   - Clicking "View Details" displays the full product overview:
     - Title, brand, category, and full description
     - High-resolution thumbnail
     - Price, discount percentage, rating, and stock status
     - Warranty, shipping information, return policy
     - Customer reviews with reviewer names, star ratings, and review comments
     - Quick "Add to Cart" and "Back to Products" buttons

6. **Cart Management**:
   - **Add to Cart**: Add any product from the product card or details view.
   - **Manage Quantities**: Increment (`+`) and decrement (`-`) quantity, or remove items.
   - **View Cart Total**: Live total items counter and calculated subtotal & grand total.
   - **Local Storage Persistence**: Cart persists across page reloads.

---

## How to Run

### Option 1: Standalone (No Node.js / NPM setup needed)
Simply double-click or open [standalone.html](file:///c:/Users/LOQ/shopsmart/standalone.html) in any web browser (Chrome, Edge, Firefox).

### Option 2: Vite + React Dev Server
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open the localhost URL in your browser.

