import { useContext } from "react";
import Layout from "../../Components/Layout"
import { ShopiContext } from "../../Context";
import OrdersCard from "../../Components/OrdersCard";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const context = useContext(ShopiContext);

  return (
    <Layout>
      <div className="flex mb-6 items-center justify-center relative w-80">
        <h1>My Orders</h1>
      </div>

       <div className="px-6  flex-1">
           {context.order.map((order, index) => (
            <Link key={index}  to={`/my-orders/${index}`}>
                <OrdersCard totalPrice={order.totalPrice}  totalProducts={order.totalProducts}  />
            </Link>
            ))}
        </div>
    </Layout>
  )
}



export default MyOrders
