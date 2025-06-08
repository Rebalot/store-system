import { useNavigate } from "react-router-dom"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useMediaQuery } from "react-responsive"
import { useState } from "react"
import AuthModal from "../components/AuthModal"

const CartPage = () => {
  const navigate = useNavigate()
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart()
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const { user } = useAuth()
  const isXlOrLarger = useMediaQuery({ query: '(min-width: 1280)' });
  const handleCheckout = () => {
    if (!user) {
      setModalIsOpen(true)
      return
    }
    navigate("/checkout")
  }
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl lg:max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft size={20} />
            Back to store
          </button>

          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to start shopping</p>
            <Button variant="dark" className="px-6 py-3 rounded-lg" onClick={() => navigate("/")}>
            Explore products
          </Button>
          </div>
        </div>
      </div>
    )
  }
  console.log("Cart items:", items)
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          Continue shopping
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product list */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600 mt-1">
                  {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex gap-4">
                  
                      <img
                      src={item.images || "/placeholder.svg?height=100&width=100"}
                      alt={item.title}
                      className="w-[7rem] h-[7rem] aspect-square object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      {isXlOrLarger ? (
                        <h3 className="font-semibold text-gray-900 text-xl">{item.title}</h3>
                      ) : (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-top">
                              {item.title}
                            </Tooltip>
                          }
                        >
                          <h3 className="font-semibold text-gray-900 text-xl line-clamp-1">{item.title}</h3>
                        </OverlayTrigger>
                      )}
                      <p className="text-gray-600 text-base mt-1">{item.category.name}</p>
                      <p className="text-lg font-semibold text-gray-900 mt-2">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-1">
                        <Trash2 size={18} />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">
                      ${(getTotalPrice() + 10 + getTotalPrice() * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="dark" onClick={handleCheckout} className="mx-auto lg:mx-0 w-full py-3 px-4 rounded-lg font-medium whitespace-nowrap">
                Proceed to checkout
              </Button>
              <AuthModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
              {!user && (
                <p className="text-sm text-gray-500 mt-3 text-center">Sign in to continue with your purchase</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
