
import { useState } from 'react'
import Link from 'next/link'

function Dashboard({ products, setProducts }) {
  const [filterCategory, setFilterCategory] = useState()
  const [filterBrand, setFilterBrand] = useState()
  const categories = new Set()

  function sortProducts(option = 'ASC') {
    let sortedProducts = [...products]
    
    if (option === 'ASC') {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price)
    } else if (option === 'DSC') {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price)
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
          <div className='flex gap-x-2 p-1' key={"ALL"}>
              <input name="price" type={"radio"} onClick={() => setFilterCategory(undefined)} />
              <label className='font-medium'>All</label>
            </div>
            {//categories 

              _.uniqBy(products, 'details.subcategories')
                .map(cat => (
                  !categories.has(cat.details.subcategories[0]) && categories.add(cat.details.subcategories[0]) &&
                  <div className='flex p-1 gap-x-2' key={cat.details.subcategories[0]}>
                    <input name="price" type={"radio"} onClick={() => {setFilterCategory(cat.details.subcategories[0]); setFilterBrand(undefined)}} />
                    <label className='font-medium'>{cat.details.subcategories[0]}</label>
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
                  (filterCategory === undefined  || brand.details.subcategories.includes(filterCategory)) &&  
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
                  .filter(product => !filterCategory || product.details.subcategories.includes(filterCategory))
                  .filter(product => !filterBrand || product.details.brand === filterBrand)
                  .map(product => <ProductDisplay key={product._id} {...product} />)
              )  // products
              : ""  // skelton here
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard


function ProductDisplay(product) {
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
  {/* TODO SHOULD BE MOVED TO UTIL FUNCTION */ }
  const ratings = reviews.filter(review => review.score && review.score != 'N/A')
  let sum = 0
  for (let rating of ratings) {
    if (rating.score) sum += parseInt(rating.score)
  }
  const average_rating = Math.round(sum / ratings.length)
  return (
    <Link href={`/products/${_id}`} className="group border border-black-500 rounded">
      <div key={_id} className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white-200 xl:aspect-w-7 xl:aspect-h-8">
        <img src={imageURLs[0]} className="mt-2 object-scale-down h-48 w-96 group-hover:opacity-75" />
      </div>
      <p className="px-2 mt-5 text-lg font-medium text-gray-900">${price}
        <div class="flex items-center">
          <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        </div></p>
      <h3 className="p-2 text-sm text-gray-700">{name}</h3>


    </Link>

  )
}



