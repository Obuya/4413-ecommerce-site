import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AuthContext } from './contexts/AuthContext'

export default function Home() {
  const user = undefined
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>4413 Ecommerce</title>
        <meta name="description" content="4413 e-commerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className='text-black'>
          Main screen
        </div>
        {!user ? (
          <div>
            <button onClick={() => router.push('/signup')}>Sign Up</button>
          </div>
        ) : (
          <button onClick={SignOut} className='border'>Sign Out</button>
        )}

        <Link href={'/signup'}>
        Sign up
        </Link>
      </main>
      <footer>
      </footer>
    </div>
  )
}
