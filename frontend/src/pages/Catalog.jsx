import { useEffect, useState, useCallback, useRef } from "react";
import ProductsList from "../components/ProductsList";
import { useMediaQuery } from "react-responsive";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { ShoppingCart } from 'lucide-react';
import ProductFilters from "../components/ProductFilters";
import { useLoading } from "../contexts/LoadingContext";
import { fetchProducts } from "../services/inventoryApi";
import { useCart } from "../contexts/CartContext";
import { useLocation } from "react-router-dom";
import { CATEGORIES } from "../utils/constants";


const categories = CATEGORIES.map((cat) => cat.value); // ["ELECTRONICS", "CLOTHES", ...]
const LIMIT = 12;

export default function CatalogComponent() {

  const isDesktop = useMediaQuery({ query: "(min-width: 1020px)" });
  const { items, removeFromCart } = useCart();
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const { handleRoutesLoadComplete } = useLoading();
  const location = useLocation();

  // ── Products state ──────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // ── Filter / search state ────────────────────────────────────────
const [filters, setFilters] = useState({
  category: location.state?.category ?? "",
  search: location.state?.search ?? "",
});

  // Debounce search to avoid firing a request on every keystroke
  const searchTimeout = useRef(null);

  // ── Fetch ────────────────────────────────────────────────────────
  const loadProducts = useCallback(async (page, activeFilters) => {
    setLoading(true);
    try {
      const query = {
        page,
        limit: LIMIT,
        ...(activeFilters.search && { search: activeFilters.search }),
        ...(activeFilters.category && { category: activeFilters.category }),
      };
      const data = await fetchProducts(query);
      setProducts(data.items ?? []);
      setTotalPages(data.totalPages ?? 1);
      setCurrentPage(data.currentPage ?? page);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
      handleRoutesLoadComplete();
    }
  }, [handleRoutesLoadComplete]);

  // Initial load + reload when page or filters change
  useEffect(() => {
    loadProducts(currentPage, filters);
  }, [currentPage, filters, loadProducts]);

  // ── Filter handlers ──────────────────────────────────────────────
  const handleFiltersChange = (newFilters) => {
    setCurrentPage(1); // reset to page 1 on every filter change
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSearchChange = (value) => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setCurrentPage(1);
      setFilters((prev) => ({ ...prev, search: value }));
    }, 400);
  };

  // ── Cart popover ─────────────────────────────────────────────────
  const handlePopoverOpen = () => setPopoverVisible(true);
  const handlePopoverToggle = () => setPopoverVisible((v) => !v);

  const popover = (
    <Popover id="popover-basic" className="z-10" style={{ height: 'calc(100vh - 160px)', width: '300px' }}>
      <Popover.Header as="h3">Cart</Popover.Header>
      <Popover.Body className="overflow-y-auto max-h-[calc(100vh-210px)]">
        {items.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul className="gap-3">
            {items.map((product) => (
              <li key={product.id} className="flex gap-4 border-b border-gray-300 pb-2 mb-2">
                <img src={product.image} style={{ width: "80px" }} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.price} $</p>
                  <button onClick={() => removeFromCart(product.id)} className="btn btn-danger">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="mx-auto pl-5 py-8">
      <h1 className="text-3xl font-bold mb-6">Products Catalog</h1>

      <div
        className={`flex flex-col gap-4 relative md:grid ${
          isDesktop && isPopoverVisible
            ? "md:grid-cols-[minmax(300px,350px)_auto_275px]"
            : "md:grid-cols-[minmax(300px,350px)_auto]"
        }`}
      >
        <aside className="min-w-[300px] max-w-[350px] filter-aside relative">
          <ProductFilters
            onFiltersChange={handleFiltersChange}
            onSearchChange={handleSearchChange}
            categories={categories}
            priceRange={{ min: 0, max: 1000 }}
          />
        </aside>

        <main className="w-full md:pr-5">
          <ProductsList
            handlePopoverOpen={handlePopoverOpen}
            products={products}
            loading={loading}
          />

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              <Button
                variant="outline-dark"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline-dark"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </main>

        <div className="fixed bottom-5 right-5 z-10">
          <OverlayTrigger
            trigger="click"
            placement="top"
            overlay={popover}
            show={isPopoverVisible}
            onToggle={handlePopoverToggle}
          >
            <Button
              variant="dark"
              className="transition rounded-full w-12 h-12 flex items-center justify-center transform hover:scale-105"
            >
              <ShoppingCart />
            </Button>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
}
