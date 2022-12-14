
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
    <div className='grid md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 m-5'>
      <div className='col-span-1 h-full'>
        <div className='m-5 bg-white rounded-lg p-5 border'>
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
        <div className='m-5 bg-white rounded-lg p-5 border'>
          <h1 className='text-center font-bold mb-2'>Categories</h1>
          <form>
            {//categories
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
        <div className='m-5 bg-white rounded-lg p-5 border'>
          <h1 className='text-center font-bold mb-2'>Brands</h1>
          <form>
            <div className='flex gap-x-2' key={"ALL"}> 
              <input name="price" type={"radio"} onClick={() => setFilterBrand(undefined)} />
              <label className='font-medium'>All</label>
            </div>
            {// Brands
              _.uniqBy(products, 'details.brand')
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
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-5  m-5'>
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
    _id,
    imageURLs
  } = product
  {/* TODO SHOULD BE MOVED TO UTIL FUNCTION */}
  const ratings = reviews.filter(review => review.score && review.score != 'N/A')
  let sum = 0
  for (let rating of ratings){
    if (rating.score) sum += parseInt(rating.score)
  }
  const average_rating = Math.round(sum / ratings.length)
  const img = imageURLs.split(",", )[0]
  return (
    <Link href={`/products/${_id}`} className="group border border-black-500 rounded">
        <div  key={_id} className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white-200 xl:aspect-w-7 xl:aspect-h-8">
          <img src = {img} className="mt-2 object-scale-down h-48 w-96 group-hover:opacity-75"/>
        </div>
        <p className="px-2 mt-5 text-lg font-medium text-gray-900">${price}</p>
        <h3 className="p-2 text-sm text-gray-700">{name}</h3>
        
</Link>
  
  )
}



