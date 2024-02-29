import { useContext } from "react";
import { ShopiContext } from "../../Context";

const Card = (data) => {
    const product = data.data;
    const context = useContext(ShopiContext);
    const showProduct = (productDetail) => {
        context.openProductDetail()
        context.setProductToShow(productDetail)
    }
    const addProductToCart = (event, product) => {
        event.stopPropagation()
        context.setCount(context.count + 1)
        context.setCartProducts([...context.cartProducts, product])
        context.closeProductDetail()
        context.openCheckoutSideMenu();
    }
    const renderIcon = (id) => {
        const isInCart = context.cartProducts.filter(product => product.id === id).length > 0;
        if (isInCart) {
            return (
                <div className='absolute bottom-0 right-0 flex justify-center font-medium items-center bg-green-100 w-8 h-8 m-2 rounded-full' >   
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                   </svg>
               </div>
            )
        } else {
            return (
                
                 <button className='absolute bottom-0 right-0 flex justify-center font-medium items-center bg-black w-8 h-8 m-2 rounded-full'
                 onClick={(event)=> addProductToCart(event, product)}
                 >   
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="w-4 h-4">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                     </svg>
                 </button>
            )
        }

    }
   
    return (
        <div 
            className='bg-white cursor-pointer w-56 h-80 rounded-lg mb-6 mt-3'
            onClick={()=> showProduct(product)}
         >
            <figure className='relative mb-3 w-full h-4/5'>
                {renderIcon(product.id)}
                <img className='w-full h-full object-cover rounded-lg' src={product.image} alt={product.title} />
                <span className='absolute bottom-0 left-0 p-1 bg-white/60 rounded-lg text-black text-cs m-2'>{product.category}</span>
            </figure>
            <p className="flex justify-between flex-wrap items-center">
                <span className="text-sm font-light">{product.title}</span>
                <span className="font-medium text-lg w-36">{product.price} €</span>
                
            </p>
        </div>
    )
}

export default Card