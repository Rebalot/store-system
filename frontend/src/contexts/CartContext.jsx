import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])
  console.log("CartProvider initialized with items:", items)
  // useEffect(() => {
  //   console.log("CartProvider useEffect triggered")
  //   const savedCart = localStorage.getItem("cart")
  //   console.log("Loading cart from localStorage:", savedCart)
  //   if (savedCart) {
  //     setItems(JSON.parse(savedCart))
  //     console.log("Cart loaded from localStorage:", JSON.parse(savedCart))
  //   }
  // }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addToCart = (product, quantity = 1) => {
    console.log("Adding to cart:", product, "Quantity:", quantity)
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [...prevItems, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    console.log("Calculating total items in cart:", items.reduce((total, item) => total + item.quantity, 0))
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
