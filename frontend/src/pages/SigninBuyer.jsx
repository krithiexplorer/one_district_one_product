import { ButtonComponent } from "../components/ButtonComponent";
import { ButtonWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SigninBuyer(){
  
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
   const navigate = useNavigate();

    return(
    <div className="bg-slate-300 h-screen flex justify-center">
       <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-80 text-center p-2 px-4">
            <Heading  label = {"Sign In"} />
            <SubHeading text={"Enter your information to signin"}/>
           
            <InputBox onChange={e=>{
                setUsername(e.target.value);
            }}  label={"Email"} placeholder="john@example.com"/>
            <InputBox onChange={e=>{
                setPassword(e.target.value);
            }} label={"Password"} placeholder="12234"/>
            <ButtonComponent onClick={ async () => {
            const response = await axios.post("http://localhost:3000/api/v1/users/signin", {
              username,
              password
            });       
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("seller",response.data.seller);

            navigate("/view_products");
            }}buttonname={"Sign in"} />
            <ButtonWarning text={"Don't have an account? "} buttonText={"Sign Up"}  to={"/signup/buyer"}/>
        </div>
       </div>
    </div>)
}
