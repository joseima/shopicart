import { useContext } from "react"
import { ShopiContext } from "../../Context"
import Layout from "../../Components/Layout"
import Card from "../../Components/Card"
import ProductDetail from "../../Components/ProductDetail"

const Home = () => {

const context = useContext(ShopiContext);
const renderView = ()=> {
    if (context.filteredItems?.length > 0) {
      return (
        context.filteredItems?.map(item => (
          <Card key={item.id} data={item} />
        ))
      )
    } else {
      return (
        <div>Nothing matches!</div>
      )
    }
}

  return (
    <Layout>
      <h1 className="font-medium text-xl mb-3">Exclusive products</h1> 
      <input
        type="text"
        placeholder='Search product by title'
        className='rounded-lg border border-black w-80 p-2 mb-4 focus:outline-none'
        onChange={(event) => context.setSearchByTitle(event.target.value)} />
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home
