import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopiContext } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../Utilities";

import './styles.css';

const CheckoutSideMenu = () => {
    const context = useContext(ShopiContext);

    const  handleDelete =(id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id != id)
        context.setCartProducts(filteredProducts)
    }
    const handleCheckout = () => {
        const orderToAdd = {
            date: new Date(),
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }
        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.closeCheckoutSideMenu()
    }

    return (
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side flex flex-col fixed bg-white right-0 border border-black rounded-lg`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <button className="cursor-pointer"  onClick={()=> context.closeCheckoutSideMenu()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="px-6 overflow-y-scroll flex-1">
           {context.cartProducts.map(product => (
                <OrderCard key={product.id} id={product.id} title={product.title} imageUrl={product.image} price={product.price} handleDelete ={handleDelete} />
            ))}
            </div>
            <div className="px-6 ">
                <p className="flex justify-between items-center text-lg font-medium">
                    <span>Total:</span>
                    <span>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                    <button className="w-full py-4 text-white my-4 bg-black rounded-md " onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu