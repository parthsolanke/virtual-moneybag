import { useState } from "react"
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account🏦"} />

        <InputBox onchange={e => {
          setFirstName(e.target.value)
        }} placeholder="firstname" label={"First Name"} />

        <InputBox onchange={e => {
          setLastName(e.target.value)
        }} placeholder="lastname" label={"Last Name"} />

        <InputBox onchange={e => {
          setUsername(e.target.value)
        }} placeholder="email address" label={"Email"} />

        <InputBox onchange={e => {
          setPassword(e.target.value)
        }} placeholder="password" label={"Password"} />

        <div className="pt-4">
          <Button onclick={async () => {
            try{
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                firstName,
                lastName,
                username,
                password
              })
              localStorage.setItem("token", response.data.token)
              
              console.log(response.data.message)
            } catch (err) {
              console.log(err.response.data.message)
            }
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}