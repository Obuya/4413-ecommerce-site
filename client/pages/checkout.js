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
  const [shippingDetails, setShippingDetails] = useState('')

  const [name, setName] = useState(user ? user.name : '')
  const [cardNumber, setCardNumber] = useState(user ? user.cardNumber : '')

  // if not signed up or in redirect to login
  useEffect(() => {
      if (!user) router.push('/signup', { query: { from: router.pathname }})
      if (shoppingCart.length === 0) router.push('/')
  }, [user, shoppingCart])

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

    //const response = await fetch(`${SERVER_URL}/`,)
    setShoppingCart([])
    // push to a success page maybe
    //router.push('sucess page')
  }


    
  return (
    <div className="h-full">
      <Navbar search={false} />

      <div className="flex w-full h-full px-10 py-10">
        <div className="w-1/2 p-10">
          <h1 className="text-lg">Shipping Details</h1>

          <div>Address</div>
          <input placeholder="address" value={address} />

          <div className="flex w-full justify-between">
              <div>
                  <div>Postal code</div>
                  <input placeholder="postal code" value={postalCode} />
              </div>
                <div>
                  <div>Select shipping</div>
                  <input placeholder="select shipping" value={shippingDetails} />
              </div>
          </div>

          <h1 className="text-lg pt-20">Payment Details</h1>

          <div>Name on card</div>
          <input placeholder="name" value={name} />

          <div>Card number</div>
          <input placeholder="card number" value={cardNumber} />
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

          <div className="flex w-full justify-between mt-10">
            <button className="rounded-lg px-2 py-1 text-xs" onClick={() => cancelOrder()}>Cancel Order</button>
            <button className="bg-orange-400 px-4 py-2 rounded-lg" onClick={() => completeOrder()}>Complete Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}