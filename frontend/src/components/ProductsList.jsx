import { NavLink } from "react-router-dom";
import { Badge, Button, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";

export default function ProductsList({ products, handlePopoverOpen, loading }) {
  const { addToCart }= useCart()

  if (loading) {
  return (
    <div className="w-full flex justify-center items-center py-12">
      <Spinner/>
      <span className="text-lg font-semibold ml-6">Cargando productos...</span>
    </div>
  );
  }

  return (
    <div className="grid grid-catalog gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="block w-full max-w-[284px] min-w-[225px] mx-auto h-auto relative z-1"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <NavLink to={`/producto/${product.id}`}>
              <img
                src={product.images}
                alt={product.title}
                className="w-full h-auto object-contain"
              />
            </NavLink>

            <div className="p-4">
              <NavLink to={`/producto/${product.id}`}>
                <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-top">
                    {product.title}
                  </Tooltip>
                }
                >
                  <h3 className="text-[1.10rem] font-semibold mb-2 truncate">{product.title}</h3>
                </OverlayTrigger>
              </NavLink>

              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 text-[1.50rem] font-semibold">${product.price.toFixed(2)}</span>
                  <Badge pill bg="secondary" className="py-1">Category</Badge>
                </div>
                <p className="text-gray-600 line-clamp-2 mb-3 text-sm">{product.description}</p>
                <Button
                  variant="dark"
                  onClick={() => {
                    addToCart(product);
                    handlePopoverOpen();
                  }}
                  className="w-full py-1 text-sm font-medium"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
