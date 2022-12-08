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

  console.log(shoppingCart)

  return (
    <div className="h-screen">
      <Navbar search={false} loginAndCart={false} />

      <div className="relative bg-pink-500 m-10 p-10">
        <h1 className="text-2xl font-semibold text-white">Shopping Cart</h1>
        <h1 className="absolute bottom-5 right-10 text-white font-semibold">Price</h1>

      </div>
    </div>
  )
}

