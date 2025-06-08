import { render, screen } from "@testing-library/react"
import { CartProvider } from "../context/CartContext"
import { ProductsList } from "../components/ProductsList"
import { Cart } from "../components/Cart"

describe( "pruebas de funciones en CartContext", () => {

    test( "la lista de productos se renderiza", () => {
        render(
            <CartProvider>
                <ProductsList />
            </CartProvider>
        )

        const productList = screen.getByText(/productos/i)
        expect(productList).toBeInTheDocument()

    } ) 

    test( "Muestra inicialmente mensaje carrito vacío", () => {
        render(
            <CartProvider>
                <Cart />
            </CartProvider>
        )

        const emptyMessage = screen.getByText(/No items in cart/i)
        expect(emptyMessage).toBeInTheDocument()

    } )

} )