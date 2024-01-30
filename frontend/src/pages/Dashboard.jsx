import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios";

export const Dashboard = () => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        const getBalance = async () => {
            try{
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setValue(response.data.balance)
            } catch (error) {
                console.log(error)
            }
        }
        getBalance()
    }, [])

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={value} />
            <Users />
        </div>
    </div>
}