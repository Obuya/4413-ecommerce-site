
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Navbar({search=true, loginAndCart=true}){
  const { user, setUser } = useContext(AuthContext)
  const router = useRouter()

  const path = router.asPath
  return (
    <div className="sticky">
    <div 
      className="flex justify-between bg-gradient-to-r transition-all duration-500 from-pink-500 to-yellow-500 p-5"
    > 
        <Link href={"/"}>
          <h1 className="mt-3 text-white font-bold">Home</h1>
        </Link>

        {search && (
          <div className="flex items-center bg-white rounded-lg">
            {/* <div className="px-5 bg-white h-full flex items-center rounded-l-lg">
              {' '}
            </div> */}
            <input 
              className="h-full px-5 rounded-l-lg"
              placeholder="Search for something"
            />
            <button className=" h-full items-center flex px-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
        )}
        {loginAndCart && (
          <div className="flex gap-x-5">
            <Link href={!user ? `/login?from=${path.slice(1)}` : "/profile"}>
              <button className="bg-white rounded-lg px-5 py-2">
                {!user ? "Login" : "Profile"}
              </button>
            </Link>
            <button onClick={() => router.push('/shopping-cart')} className="bg-white rounded-lg px-5 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>
          </div>
         )}
      </div>
    </div>
  )
}
export default Navbar