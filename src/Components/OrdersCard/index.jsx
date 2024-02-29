const OrdersCard = props => {
    const { totalPrice, totalProducts} = props


    return (
        <div className="flex justify-between items-center p-4 rounded-lg w-80 mb-5 border border-black">
          <div className=' flex flex-col w-full'>
          <p className='text-sm font-light flex justify-between w-full items-center'>
                <span className="flex flex-col">
                    <span className="font-light">01.02.23</span>
                    <span  className="font-light">{totalProducts} articles</span>
                </span>
                <span  className="font-medium">{totalPrice} €</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

            </p>
            </div>
        </div>

    )
}

export default OrdersCard