import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "../contexts/AuthContext"
import Navbar from "../components/navigation/Navbar"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function Checkout(){
  const { user, SignOut, shoppingCart, setShoppingCart } = useContext(AuthContext)
  const router = useRouter()

  const [address, setAddress] = useState(user ? user.address : '')
  const [postalCode, setPostalCode] = useState(user ? user.postalcode : '')
  const [shippingDetails, setShippingDetails] = useState('free')

  const [name, setName] = useState(user ? user.name : '')
  const [cardNumber, setCardNumber] = useState(user ? user.cardNumber : '')
  const [errorMessage, setErrorMessage] = useState('')

  // if not signed up or in redirect to login
  useEffect(() => {
      if (!user) router.push('/signup', { query: { from: router.pathname }})
      if (shoppingCart.length === 0) router.push('/')
  }, [user])

  if (!user) return (<div></div>)

  if (!shoppingCart) return (<div></div>)


  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const cancelOrder = () => {
    setShoppingCart([])
    router.push('/')
  }

  const completeOrder = async () => {

    if (!shoppingCart || !address || !name || !cardNumber || !postalCode || !shippingDetails){
      setErrorMessage('Error: Missing Required Information For Checkout')
      console.log(shoppingCart, address, name)
      return
    }

    if (cardNumber.length !== 16){
      setErrorMessage('Error: Card number is not the correct length for a credit card')
      return
    }

    const token = sessionStorage.getItem('jwt')
    const response = await fetch(`${SERVER_URL}/v1/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: user.id,
        shopping_cart: shoppingCart,
        address,
        name,
        cardNumber,
        postalCode,
        shippingDetails
      })
    })

    const data = await response.json()

    if (!response.ok){
      setErrorMessage(data.message)
      return
    }
    setShoppingCart([])
    //push to a success page maybe
    router.push('/order-success')
    setErrorMessage('')
  }

  
  return (
    <div className="h-full">
      <Navbar search={false} />

      <div className="flex w-full h-full px-10 py-10">
        <div className="w-1/2 p-10">
          <h1 className="text-lg">Shipping Details</h1>

          <div>Address</div>
          <input placeholder="address" value={address} onChange={(event) => setAddress(event.target.value)} className="border rounded-lg px-2"  />

          <div className="flex w-full justify-between">
              <div>
                  <div>Postal code</div>
                  <input 
                    placeholder="postal code" 
                    className="border rounded-lg px-2" 
                    value={postalCode} 
                    onChange={(event) => setPostalCode(event.target.value)}
                    />
              </div>
                <div>
                  <div>Select shipping</div>
                  <select className="border rounded-lg px-2" onChange={(event) => setShippingDetails(event.target.value)}>
                    <option value="free">Free</option>
                    <option value="express">Express</option>
                    <option value="priority">Priority</option>
                    <option value="overnight">Overnight</option>
                  </select>
              </div>
          </div>

          <h1 className="text-lg pt-20">Payment Details</h1>

          <div>Name on card</div>
          <input 
            placeholder="name" 
            className="border rounded-lg px-2" 
            value={name} 
            onChange={(event) => setName(event.target.value)}
          />

          <div>Card number</div>
          <input 
            placeholder="card number" 
            className="border rounded-lg px-2"
            value={cardNumber} 
            onChange={(event) => setCardNumber(event.target.value)}
          />
        </div>
        <div className="w-1/2 p-10">
          Order Summary:
          {shoppingCart.map(product => (
              <div className="bg-white px-5 py-2 rounded-lg" key={product._id}>
                  <div>{product.name}</div>
                  <div>{product.quantity} * {product.price} = {formatter.format(product.quantity * product.price)}</div>
                  <div></div>
              </div>
          ))}
          <div className="flex gap-x-2 mt-5">
            Total:
            <h2 className="font-semibold text-lg">
              {shoppingCart.length > 0 
                    ? formatter.format((shoppingCart.reduce((acc, obj) =>  acc + (obj.price * obj.quantity), 0))) 
                    : '$0.00'
                }
            </h2>
          </div>

          <div className="text-red-500">
            {errorMessage ? errorMessage : ''}
          </div>
          <div className="flex w-full justify-between mt-10">
            <button className="rounded-lg px-2 py-1 text-xs" onClick={() => cancelOrder()}>Cancel Order</button>
            <button className="bg-orange-400 px-4 py-2 rounded-lg" onClick={() => completeOrder()}>
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}