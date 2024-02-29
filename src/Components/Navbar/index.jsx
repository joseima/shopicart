import { useContext } from "react";
import { NavLink } from "react-router-dom"
import { ShopiContext } from "../../Context";

const Navbar = () => {
    const context = useContext(ShopiContext);
    const activeStyle = 'underline underline-offset-4';

    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut

    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)

    const noAccountInLocalStorge = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorge || !noAccountInLocalState

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(true) 
    }
    const renderView = () => {
        if (hasUserAnAccount && !isUserSignOut) {
            return  (
                <>
             <li className="text-black/60">
                    admin@shopi.es
                </li>
                <li className='menu'>
                    <NavLink to='/my-account'  className={({isActive}) => isActive ?activeStyle : undefined }>
                        My Account
                    </NavLink>
                    <ul className='sub-menu' >
                        <li>
                            <NavLink to='/my-orders'   className={({isActive}) => isActive ?activeStyle : undefined }>
                                My Orders
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink to='/sign-in'  
                        className={({isActive}) => isActive ?activeStyle : undefined }
                        onClick={() => handleSignOut()}
                    >
                        Sign Out
                    </NavLink>
                </li>
            </>
               
            )
        } else  {
            <li>
            <NavLink to='/sign-in'  
                className={({isActive}) => isActive ?activeStyle : undefined }
                onClick={() => handleSignOut()}
            >
                Sign In
            </NavLink>
        </li>
        }
    }

    return (
        <nav className='flex justify-between items-center bg-white fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
            <ul className='flex gap-5  items-center' >
                <li className="font-bold text-lg">
                    <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}
                    onClick={() => context.setSearchByCategory('')}>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/' 
                        onClick={() => context.setSearchByCategory('')}
                        className={({isActive}) => isActive ?activeStyle : undefined }>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/womens-clothes'
                        onClick={() => context.setSearchByCategory("women's clothing")}
                        className={({isActive}) => isActive ?activeStyle : undefined }>
                        Women's clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/mens-clothes'
                        onClick={() => context.setSearchByCategory("men's clothing")}
                        className={({isActive}) => isActive ?activeStyle : undefined }>
                        Men's clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/electronics'
                      onClick={() => context.setSearchByCategory('electronics')}
                      className={({isActive}) => isActive ?activeStyle : undefined }>
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/jewelery'  
                        onClick={() => context.setSearchByCategory('jewelery')}
                        className={({isActive}) => isActive ?activeStyle : undefined }>
                        Jewelery
                    </NavLink>
                    </li>
            </ul>
            <ul className='flex gap-4 items-center'>
               {renderView()}
               <li className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg><span>{context.cartProducts.length}</span>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar