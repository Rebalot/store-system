import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { useMediaQuery } from "react-responsive";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { ShoppingCart } from 'lucide-react';
import ProductFilters from "../components/ProductFilters";
import { useLocation } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import { fetchData } from "../services/faketstoreApi";
import { useCart } from "../contexts/CartContext";


export default function CatalogComponent() {
  const isDesktop = useMediaQuery({ query: "(min-width: 1020px)" });
  const { items, removeFromCart } = useCart();
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { id } = location.state || {};
  const { handleRoutesLoadComplete, handleRoutesLoading } = useLoading();
  const categories = [ "Clothes", "Electronics", "Furniture", "Shoes", "Miscellaneous" ];
  
  useEffect(() => {
      setLoading(true); // Inicia la carga
      console.log(id);
      async function loadAllData() {
        try {
          const productsList = await fetchData(
            `https://api.escuelajs.co/api/v1/products/?categoryId=${id}&offset=0&limit=10`
          );
          console.log("product list: ", productsList);
  
          setProducts(productsList);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
          handleRoutesLoadComplete();
        }
      }
  
      loadAllData();
    }, [id]);
  const handlePopoverToggle = () => {
    setPopoverVisible(!isPopoverVisible);
  };
  const handlePopoverOpen = () => {
    setPopoverVisible(true);
  };
  const handleFiltersChange = (filters) => {
    // Aquí puedes manejar los cambios de filtros
    console.log("Filters changed:", filters);
  }
  const popover = (
    <Popover id="popover-basic" className="z-10" style={{ height: 'calc(100vh - 160px)', width: '300px' }}>
      <Popover.Header as="h3">Cart</Popover.Header>
      <Popover.Body className="overflow-y-auto max-h-[calc(100vh-210px)]">
      {items.length === 0 ? <p>No items in cart</p> : (
                <ul className="gap-3">
                    {items.map((product) => (
                            <li key={product.id} className="flex gap-4 border-b border-gray-300 pb-2 mb-2">
                                <img src={product.images} className="" style={{ width: "80px" }} />
                                <div>
                                    <h3>{product.title}</h3>
                                    <p>{product.price} $</p>
                                    <button onClick={() => removeFromCart(product.id)} className="btn btn-danger">Remove</button>
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
      <ProductFilters onFiltersChange={handleFiltersChange} categories={categories} priceRange={{min: 0, max: 9999}}/>
    </aside>

    <main className="w-full md:pr-5">
      <ProductsList handlePopoverOpen={handlePopoverOpen} products={products} loading={loading}/>
    </main>

    {/* {isDesktop && isPopoverVisible && (
      <aside className="min-w-[275px]"></aside>
    )} */}

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
