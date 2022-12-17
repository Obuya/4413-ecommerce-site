import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navigation/Navbar'
import Link from 'next/link'
import { AuthContext } from '../../contexts/AuthContext'


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

function Product() {
  const [product, setProduct] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const [addedToCart, setAddedToCart] = useState(false)
  const [review, setReview] = useState('')
  const { shoppingCart, setShoppingCart } = useContext(AuthContext) 
  const router = useRouter()
  const { id } = router.query

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

  useEffect(() => {
    const getProductDetails = async () => {
      const response = await fetch(`${SERVER_URL}/v1/products/${id}`)
      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.message)
        return
      }
      setProduct(data)
    }
    if (id) getProductDetails()
  }, [id])

  if (!product) {
    return (
      <div>
        {errorMessage && '404 Product not found'}
      </div>
    )
  }


  const addItemToShoppingCart = async () => {
    const response = await fetch(`${SERVER_URL}/v1/shopping_cart`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: id
      })
    })
    
    const data = await response.json()
    if (!response.ok) {
      setErrorMessage(data.message)
    }

    if (!shoppingCart.some(product => product._id === id)){
      setShoppingCart(cart => [...cart, product])
    } else {
      const itemIndex = shoppingCart.findIndex(product => product._id === id)
      const updatedCart = shoppingCart.filter(product => product._id !== id)
      updatedCart.push(
          {
          ...product,
          quantity: shoppingCart[itemIndex].quantity + 1
        }
      )
      setShoppingCart(updatedCart)
    }
    setAddedToCart(true)
  }

  const addReview = async () => {
    if (!review){
      setErrorMessage('Error: Need to provide review text')
      return
    }
    const response = await fetch(`${SERVER_URL}/v1/products/${id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: review,
        score: 3
      })
    })

    const data = await response.json()
    setReview('')
    router.reload(window.location.pathname)
    setErrorMessage('')
    setProduct(data.review)
  }

  return (
    <div>
      <Navbar search={false} />

      <div className='h-20' />

      <div className='xl:mx-20 mx-10 pb-10 flex gap-x-2'>
        <Link href="/">
          Home
        </Link>

        <div>| {product.details.type}</div>

        <div>| {product.details.brand}</div>

      </div>

      <div className='xl:mx-20 mx-10 flex'>

        <div className='flex w-1/2 gap-x-5'>
          <div className='flex flex-col gap-y-5'>
          </div>
          <div className='w-full h-[400px] bg-white-100'>

          <img src = {product.imageURLs[0]} className="object-contain w-full h-[400px]"/>

          </div>
        </div>
        <div className='flex w-1/2 px-5'>
          <div>
            <div className='text-3xl font-bold'>{product.name}</div>
            <div className='text-3xl font-bold mt-5'>${product.price}</div>

            <div className='flex mt-5'>
              <div className='text-black text-opacity-50 mr-28'>{id}</div>
              <div className='flex text-black text-opacity-50'>
                {
                  product.quantity > 0
                    ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )
                    : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )
                }

                {product.quantity > 0 ? 'Available' : 'Out of stock'}
              </div>
            </div>
            <div className='text-red-500 font-medium'>
              {errorMessage ? errorMessage : ''}
            </div>
           
            <div className='flex'>
              <button
                className={addedToCart ? 'text-gray-500 mt-20' : 'text-black mt-20'}
                onClick={addItemToShoppingCart}
                disabled={addedToCart}
              >
                ADD TO CART
              </button>
              {
                addedToCart
                  ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-green-500 mt-20">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )
                  : ('')
              }
            </div>
            
            {addedToCart && (
              <div>
                <Link href={"/checkout"}>
                  <button  className='bg-orange-300 px-4 py-2 rounded-lg mt-5'>
                  Proceed to Checkout
                  </button>
                </Link>
              </div>
            )}

            <div className='flex flex-col mt-5'>
              <textarea className='border rounded-lg' value={review} onChange={(event) => setReview(event.target.value)} />
              <button className='bg-orange-700 text-white px-4 py-2 rounded-lg mt-5' onClick={addReview}>
                Add Review
              </button>
            </div>
            
          </div>
        </div>
      </div>

      <div className='xl:mx-20 mx:10'>
        {product.reviews.map(review => <div key={review._id}>
          Review: {review.text}, {review.reviewDate.substr(0,10)}
        </div>)}
      </div>
    </div>
  )
}
export default Product