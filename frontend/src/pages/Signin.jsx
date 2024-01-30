import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Signin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account🏦"} />

        <InputBox onchange={e => {
          setUsername(e.target.value)
        }} placeholder="email address" label={"Email"} />

        <InputBox onchange={e => {
          setPassword(e.target.value)
        }} placeholder="password" label={"Password"} />

        <div className="pt-4">
          <Button onclick={async () => {
            try{
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username: username,
                password: password
              })
              localStorage.setItem("token", response.data.token)
              console.log(response.data.message)
              navigate("/dashboard")
            } catch (err) {
              console.log(err.response.data.message)
            }
          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}