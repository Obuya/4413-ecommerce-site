import { useEffect, useState } from "react"
import Navbar from "../components/navigation/Navbar"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function ShoppingCart(){
  const [shoppingCart, setShoppingCart] = useState([])

  useEffect(() => {
    const getShoppingCart = async () => {
      const response = await fetch(`${SERVER_URL}/v1/shopping_cart`, {
        credentials: 'include'
      })
      const data = await response.json()
      setShoppingCart(data.shopping_cart)
    } 
    getShoppingCart()
  }, [])

  return (
    <div className="h-screen">
      <Navbar search={false} loginAndCart={false} />

      <div className="relative bg-pink-500 m-10 p-10">
        <h1 className="text-2xl font-semibold text-white">Shopping Cart</h1>
        <h1 className="absolute bottom-5 right-10 text-white font-semibold">Price</h1>
        {
          shoppingCart.length > 0 ? (
            <CartQuantites products={shoppingCart} />
          ) : ("")
        }
      </div>
    </div>
  )
}


function CartQuantites({products}){
  const productsHash = {}
  const productsQuantity = {}
  for (let i = 0; i < products.length; i++){
    productsQuantity[products[i]._id] = productsQuantity[products[i]._id] + 1 || 1
    productsHash[products[i]._id] = products[i]
  }
  console.log(productsHash)
  console.log(productsQuantity)
  return (
    <>
      {Object.values(productsHash).map(product => {
        const quantity = productsQuantity[product._id]
        return (
          <CartItem product={product} quantity={quantity} />
      )})}
    </>
  )
}

function CartItem({product, quantity}){
  const [itemQuantity, setItemQuantity] = useState(quantity)
  return (
    <div className="flex justify-between my-5">
      <div>{product.name}</div>
      <select name="quantity" id="quantity" value={itemQuantity}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
  )
}