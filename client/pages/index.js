import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navigation/Navbar'
import { AuthContext } from '../contexts/AuthContext'
import _ from 'lodash'
import Dashboard from '../components/dashboard/Dashboard'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function Home() {
  const { user, setUse, SignOut } = useContext(AuthContext)
  const router = useRouter()
  const [products, setProducts] = useState()
  
  useEffect(() => {
    const getProducts = async () => {
        const response = await fetch(`${SERVER_URL}/v1/products`)
        const data = await response.json()
        if (response.ok){
          setProducts(data)
          console.log(data)
        }
    }
    getProducts()
  }, [])


  return (
    <div className='h-full'>
      <Head>
        <title>4413 Ecommerce</title>
        <meta name="description" content="4413 e-commerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='h-screen'>
        <Navbar />

        {products 
          ? <Dashboard products={products} setProducts={setProducts} />
          : ""
        }
{/* 
        <div className='text-black'>
          Main screen
        </div>

        <Link href={'/signup'}>
          Sign up
        </Link> */}
      </main>
      <footer>
      </footer>
    </div>
  )
}


