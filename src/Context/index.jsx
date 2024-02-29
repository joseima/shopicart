import { createContext, useState,  useEffect } from "react";

export const ShopiContext = createContext()


export const initializeLocalStorage = () => {
  const accountInLocalSotrage = localStorage.getItem('account')
  const signOutInLocalSotrage = localStorage.getItem('sign-out')
  let parsedAccount
  let parsedSignOut

  if (!accountInLocalSotrage) {
    localStorage.setItem('account', JSON.stringify({}))
    parsedAccount = {}
  } else {
    parsedAccount = JSON.parse(accountInLocalSotrage)
  }
  if (!signOutInLocalSotrage) {
    localStorage.setItem('sign-out', JSON.stringify({}))
    parsedSignOut = false
  } else {
    parsedAccount = JSON.parse(signOutInLocalSotrage)
  }
}


export const ShopiContextProvider = ({children}) => {

  const [account, setAccount] = useState({})
  const [signOut, setSignOut] = useState(false)



    const [items, setItems] = useState(null);
    const [searchByTitle, setSearchByTitle] = useState(null);
    const [searchByCategory, setSearchByCategory] = useState(null);

    const [filteredItems, setFilteredItems] = useState(null);

    console.log(filteredItems);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setItems(data))
      },[])


    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()));
    }



    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
          return filteredItemsByTitle(items, searchByTitle)
        }
    
        if (searchType === 'BY_CATEGORY') {
          return filteredItemsByCategory(items, searchByCategory)
        }
    
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
          return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
    
        if (!searchType) {
          return items
        }
      }
    
      useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
      }, [items, searchByTitle, searchByCategory])


    const [count, setCount] = useState(0);
    
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)
    
    const [productToShow, setProductToShow] = useState({})

    const [cartProducts, setCartProducts] = useState([])
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)

    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    const [order, setOrder] = useState([])



    return (
        <ShopiContext.Provider value = {{
            items,
            setItems,
            count, 
            setCount, 
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            searchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut

        }}>
            {children}
        </ShopiContext.Provider>
    )
}