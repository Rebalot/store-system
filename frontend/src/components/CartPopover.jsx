import { useCart } from "../contexts/CartContext"

export const Cart = () => {

    const { items, removeFromCart } = useCart()
    
    return (
        <div className="container">
            <h2 className="my-5 text-center">
                Your Cart
                <span className="badge text-bg-info ms-2">
                    {items.length}
                </span>
            </h2>
            {items.length === 0 ? <p>No items in cart</p> : (
                <ul className="d-flex flex-column gap-3">
                    {items.map((product) => (
                        <div key={product.id} className="card">
                            <li className="card-body d-flex gap-4">
                                <img src={product.image} className="card-img-top" style={{ width: "80px" }} />
                                <div>
                                    <h3>{product.title}</h3>
                                    <p>{product.price} $</p>
                                    <button onClick={() => removeFromCart(product.id)} className="btn btn-danger">Remove</button>
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    )
}
