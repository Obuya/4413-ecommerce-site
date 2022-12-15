import { useContext, useEffect, useState } from "react"
import Navbar from "../components/navigation/Navbar"
import { AuthContext } from "../contexts/AuthContext"
import Link from "next/link"
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function ShoppingCart(){
  const { shoppingCart, setShoppingCart } = useContext(AuthContext)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  // useEffect(() => {
  //   const getShoppingCart = async () => {
  //     const response = await fetch(`${SERVER_URL}/v1/shopping_cart`, {
  //       credentials: 'include'
  //     })
  //     const data = await response.json()
  //     setShoppingCart(data.shopping_cart)
  //   } 
  //   getShoppingCart()
  // }, [])
  
  return (
    <div className="h-screen">
      <Navbar search={false} loginAndCart={false} />

      <div className="flex">
        <div className="flex-grow">
          <div className="relative bg-pink-500 m-10 p-10">
            <h1 className="text-2xl font-semibold text-white">Shopping Cart</h1>
            <h1 className="absolute bottom-5 right-10 text-white font-semibold">Price</h1>
          </div>
          
          <div className="m-10 p-10 bg-pink-500">
            {
              shoppingCart.length > 0 ? (
                <CartQuantites 
                  products={shoppingCart} 
                  setShoppingCart={setShoppingCart} 
                  shoppingCart={shoppingCart} 
                />
              ) : ("")
            }
          </div>
        </div>

        <div className="mt-[300px] mr-10">
          <div className="bg-gray-200 px-10 py-2 rounded-lg">
            <div>
              <h1 className="font-bold">Subtotal</h1>
              {shoppingCart.length > 0 
                ? formatter.format((shoppingCart.reduce((acc, obj) =>  acc + (obj.price * obj.quantity), 0))) 
                : '$0.00'
              }
            </div>
            <Link href="/checkout">
              <button className="bg-orange-400 px-5 py-2 rounded-lg my-5">
                Proceed to Checkout
              </button>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}


function CartQuantites({products, setShoppingCart, shoppingCart}){
  const productsHash = {}
  for (let i = 0; i < products.length; i++){
    productsHash[products[i]._id] = products[i]
  }
  return (
    <>
      {Object.values(productsHash).map(product => {
        const quantity = product.quantity || 1
        return (
          <CartItem 
            key={product._id} 
            product={product} 
            quantity={quantity} 
            setShoppingCart={setShoppingCart} 
            shoppingCart={shoppingCart} 
          />
      )})}
    </>
  )
}

function CartItem({product, quantity, shoppingCart, setShoppingCart}){
  const [itemQuantity, setItemQuantity] = useState(quantity)
  const [errorMessage, setErrorMessage] = useState('')

  const removeItemFromCart = async () => {
    // const response = await fetch(`${SERVER_URL}/v1/shopping_cart`, {
    //   method: 'DELETE',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     product_id: product._id
    //   })
    // })
    // const data = await response.json()
    //  if (!response.ok){
    //   setErrorMessage(data.message)
    // }
    // update shopping cart
    setShoppingCart(shoppingCart => shoppingCart.filter(oldProduct => oldProduct._id !== product._id))
    setErrorMessage('')
  }

  const updateItemQuantity = async (event) => {
    const newQuantity = event.target.value
    // const response = await fetch(`${SERVER_URL}/v1/shopping_cart`, {
    //   method: 'PATCH',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     product_id: product._id,
    //     quantity: newQuantity
    //   })
    // })
    // const data = await response.json()

    // if (!response.ok){
    //   setErrorMessage(data.message)
    // }
    const oldProducts = [...shoppingCart].filter(oldProduct => oldProduct._id !== product._id)
    setShoppingCart([
      ...oldProducts,
      {
        ...product,
        quantity: newQuantity
      }
    ])
    setItemQuantity(newQuantity)
    setErrorMessage('')
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <div className="flex justify-between my-5">
      <div className="text-white font-medium">
        {product.name}

        <div className="flex items-center gap-x-2">
          <select 
            name="quantity" 
            id="quantity" 
            className="bg-white text-black"
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
          >Remove From Cart</button>
        </div>
      </div>  

      <div className="text-white font-bold">
        {formatter.format(product.price * quantity)}
      </div>
    </div>
  )
}