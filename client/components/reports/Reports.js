import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

function Reports(){
    const [soldProducts, setSoldProducts] = useState(null)
    const { user } = useContext(AuthContext)
    const [profile, setProfile] = useState()

    useEffect(() => {
        const getUserProfile = async () => {
            let token = sessionStorage.getItem('jwt')
            const response = await fetch(`${SERVER_URL}/v1/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const data = await response.json()
            setProfile(data)
        }
        getUserProfile()
    }, [])

    return (
        <div>
            <h1 className="text-2xl text-center">Admin Reports</h1>
            <h1 className="text-lg px-10">Items Sold</h1>
            {
                profile && profile.sold && (
                    profile.sold.filter(p => p.name).map(product => (
                    <div className="m-5" key={product.id}>
                        <div>Product Name: {product.name}</div>
                        <div>Quantity: {product.quantity}</div>
                    </div>
                    ))
                )
            }
        </div>
    )
}
export default Reports