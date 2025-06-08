"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreditCard, Lock, ArrowLeft } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "react-bootstrap"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setPaymentData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }))
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4)
    }
    setPaymentData((prev) => ({
      ...prev,
      expiryDate: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate Stripe payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Create order
      const order = {
        id: Date.now(),
        items: items,
        total: getTotalPrice() + 10 + getTotalPrice() * 0.1,
        status: "confirmed",
        date: new Date().toISOString(),
        shippingAddress: {
          address: paymentData.address,
          city: paymentData.city,
          postalCode: paymentData.postalCode,
          country: paymentData.country,
        },
        paymentMethod: `**** **** **** ${paymentData.cardNumber.slice(-4)}`,
      }

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      existingOrders.push(order)
      localStorage.setItem("orders", JSON.stringify(existingOrders))

      // Clear cart
      clearCart()

      // Redirect to confirmation page
      navigate("/order-confirmation", { state: { order } })
    } catch (error) {
      alert("Payment processing failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const totalAmount = getTotalPrice() + 10 + getTotalPrice() * 0.1

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          Back to cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="text-geay-600" size={24} />
              <h1 className="text-2xl font-semibold text-gray-900">Payment Information</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={paymentData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping address */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={paymentData.address}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={paymentData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={paymentData.postalCode}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Card Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentData.cardName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="dark" type="submit"
                disabled={isProcessing} className="mx-auto lg:mx-0 w-full py-3 px-4 rounded-lg font-medium whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing payment...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    Pay ${totalAmount.toFixed(2)}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.images || "/placeholder.svg?height=60&width=60"}
                    alt={item.name}
                    className="w-[6rem] h-[6rem] object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 line-clamp-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
