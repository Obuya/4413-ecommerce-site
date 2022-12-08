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
      </div>
      <div className="m-10 p-10 bg-pink-500">
        {
          shoppingCart.length > 0 ? (
            <CartQuantites products={shoppingCart} setShoppingCart={setShoppingCart} />
          ) : ("")
        }
      </div>
    </div>
  )
}


function CartQuantites({products, setShoppingCart}){
  const productsHash = {}
  for (let i = 0; i < products.length; i++){
    productsHash[products[i]._id] = products[i]
  }
  return (
    <>
      {Object.values(productsHash).map(product => {
        const quantity = product.quantity || 1
        return (
          <CartItem product={product} quantity={quantity} setShoppingCart={setShoppingCart} />
      )})}
    </>
  )
}

function CartItem({product, quantity, setShoppingCart}){
  const [itemQuantity, setItemQuantity] = useState(quantity)
  const [errorMessage, setErrorMessage] = useState('')

  const removeItemFromCart = async () => {
    const response = await fetch(`${SERVER_URL}/v1/shopping_cart`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: product._id
      })
    })
    const data = await response.json()
     if (!response.ok){
      setErrorMessage(data.message)
    }
    // update shopping cart
    setShoppingCart(data.shopping_cart)
    setErrorMessage('')
  }

  const updateItemQuantity = async (event) => {
    const newQuantity = event.target.value
    const response = await fetch(`${SERVER_URL}/v1/shopping_cart`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: product._id,
        quantity: newQuantity
      })
    })
    const data = await response.json()

    if (!response.ok){
      setErrorMessage(data.message)
    }
    setItemQuantity(newQuantity)
    setErrorMessage('')
  }

  return (
    <div className="flex justify-between my-5">
      <div className="text-white font-medium">{product.name}</div>
      <div className="flex items-center gap-x-2">
        <select 
          name="quantity" 
          id="quantity" 
          value={itemQuantity} 
          onChange={(event) => updateItemQuantity(event)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button 
          className="text-white font-medium"
          onClick={removeItemFromCart}
        >Remove</button>
      </div>
      
    </div>
  )
}