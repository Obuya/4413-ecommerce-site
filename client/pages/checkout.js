import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "../contexts/AuthContext"
import Navbar from "../components/navigation/Navbar"

export default function Checkout(){
  const { user, SignOut, shoppingCart, setShoppingCart } = useContext(AuthContext)
  const router = useRouter()

  const [address, setAddress] = useState(user ? user.address : '')
  const [postalCode, setPostalCode] = useState(user ? user.postalcode : '')
  const [shippingDetails, setShippingDetails] = useState('')

  const [name, setName] = useState(user ? user.name : '')
  const [cardNumber, setCardNumber] = useState(user ? user.cardNumber : '')


  useEffect(() => {
      if (!user) router.push('/signup', { query: { from: router.pathname }})
  }, [user])

  if (!user) return (<div></div>)

  const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

    
  return (
    <div className="h-full">
      <Navbar loginAndCart={false} search={false} />

      <div className="flex w-full bg-red-200 h-full px-10 py-10">
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
          Itemized List:
          {shoppingCart.map(product => (
              <div>
                  <div>{product.name}</div>
                  <div>{product.quantity} * {product.price} = {formatter.format(product.quantity * product.price)}</div>
                  <div></div>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}