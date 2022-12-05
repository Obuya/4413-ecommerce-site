
import { useState } from 'react'
import Link from 'next/link'

function Dashboard({products, setProducts}){  
  const [filterCategory, setFilterCategory] = useState()
  const [filterBrand, setFilterBrand] = useState()

  function sortProducts(option='ASC') {
    let sortedProducts = [...products]
    if (option === 'ASC'){
      sortedProducts = sortedProducts.sort((a,b) => a.price - b.price)
    } else if (option === 'DSC') {
      sortedProducts = sortedProducts.sort((a,b) => b.price - a.price)
    }
    setProducts(sortedProducts)
  }

  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-1 h-full'>
        <div className='m-5 bg-white rounded-lg p-5'>
          <h1 className='text-center font-bold mb-2'>Sort</h1>
          <form>
            <div className='flex gap-x-2'>
              <input name="price" type={"radio"} onClick={() => sortProducts('ASC')} />
              <label className='font-medium'>Price Low to High</label>
            </div>
            <div className='flex gap-x-2'>
              <input name="price" type={"radio"} onClick={() => sortProducts('DSC')} />
              <label className='font-medium'>Price High to Low</label>
            </div>
            {/* <div className='flex gap-x-2'>
              <input name="price" type={"radio"} />
              <label className='font-medium'>Rating</label>
            </div> */}
          </form>
        </div>
        <div className='m-5 bg-white rounded-lg p-5'>
          <h1 className='text-center font-bold mb-2'>Categories</h1>
          <form>
            <div className='flex gap-x-2'>
              <input defaultChecked name="price" type={"radio"} onClick={() => {
                  setFilterCategory(undefined)
                  setFilterBrand(undefined)
                }
              } />
              <label className='font-medium'>All</label>
            </div>
            {
              _.uniqBy(products, 'details.type')
                .map(category => (
                  <div className='flex gap-x-2' key={category.details.type}>
                    <input name="price" type={"radio"} onClick={() => setFilterCategory(category.details.type)} />
                    <label className='font-medium'>{category.details.type}</label>
                  </div>
                  )
                )
              }
          </form>
        </div>
        <div className='m-5 bg-white rounded-lg p-5'>
          <h1 className='text-center font-bold mb-2'>Brands</h1>
          <form>
            {
              _.uniqBy(products.filter(product => filterCategory && product.details.type === filterCategory), 'details.brand')
                .map(brand => (
                  <div className='flex gap-x-2' key={brand.details.brand}>
                    <input name="price" type={"radio"} onClick={() => setFilterBrand(brand.details.brand)} />
                    <label className='font-medium'>{brand.details.brand}</label>
                  </div>
                )
              )
            }
          </form>
        </div>
      </div>

      <div className='col-span-4'>
        <div className='grid grid-cols-3 gap-5 p-5'>
          {
            products 
              ? (
                products
                  .filter(product => !filterCategory || product.details.type === filterCategory)
                  .filter(product => !filterBrand || product.details.brand === filterBrand)
                  .map(product => <ProductDisplay key={product._id} {...product} />)
              )  // products
              : ""  // skelton here
          }
        </div>
      </div>
    </div>
)}

export default Dashboard


function ProductDisplay(product){
  const {
    name,
    price,
    details,
    description,
    reviews,
    quantity,
    _id
  } = product
  {/* TODO SHOULD BE MOVED TO UTIL FUNCTION */}
  const ratings = reviews.filter(review => review.score && review.score != 'N/A')
  let sum = 0
  for (let rating of ratings){
    if (rating.score) sum += parseInt(rating.score)
  }
  const average_rating = Math.round(sum / ratings.length)

  return (
    <Link href={`/products/${_id}`}>
      <div key={_id} className='border rounded-lg px-5'>
        <div className='h-40 w-full bg-gray-200 mb-5 mt-10'>
          {/** DISPLAY IMAGE WILL GO HERE */}
          <img />
        </div>

        <div className='text-[14px] font-light'>{name}</div>

        <div>${price}</div>

        <div className='flex justify-between pb-5'>
          <div className='flex gap-x-2 items-center'>
            <div className='flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill={average_rating >= 1 ? "#FFD700" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill={average_rating >= 2 ? "#FFD700" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill={average_rating >= 3 ? "#FFD700" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill={average_rating >= 4 ? "#FFD700" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill={average_rating >= 5 ? "#FFD700" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <div className='text-[12px] text-black text-opacity-70'>{ratings.length} Reviews</div>
          </div>
          <div>
            {
              quantity > 0
                ? "Available"
                : "Not Available"
            }
          </div>
        </div>
      </div>
    </Link>
  )
}