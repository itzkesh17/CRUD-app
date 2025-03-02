import React, { useState } from 'react'
import { Kesh } from './Kesh'
import axios from 'axios'
import './Styles/registerCss.scss'
import gif from '../assets/gif.gif'
import { Link } from 'react-router-dom'
import { ToastContainer, toast ,Flip} from 'react-toastify';

const AnotherSamp = () => {
    const [formInput, setFormInput] = useState(
        {
            name:"",
            password:"",
            phone:"",
            city:""
        }
    )
    const [error, setError] = useState({})

    function validateForm() {
        let newError = {}

        let nameCondition = /^[A-Z]+$/;
        let passwordCondition =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let phoneCondition = /^[0-9]{10}$/;

        if(formInput.name.trim()===""){
            newError.name="name is required"
        }
        else if(nameCondition.test(formInput.name)===false){
            newError.name="Name should be capital"
        }

        if(formInput.password.trim()===""){
            newError.password="password is required"
        }
        else if(passwordCondition.test(formInput.password)===false){
            newError.password="password must contain 8 characters"
        }

        if(formInput.phone.trim()===""){
            newError.phone="phone number is required"
        }
        else if(phoneCondition.test(formInput.phone)===false){
            newError.phone = "Phone number should be 10 digits"
        }

        if(formInput.city.trim()===""){
            newError.city="city is required"
        }
        setError(newError)
        setInterval(() => {
            setError({})
        }, 5000);

        return JSON.stringify(newError) === "{}"
    }

    async function formClicked(e) {
        e.preventDefault();

        if(!validateForm()){
           return 
        }

        try {
            const response = await axios.post(Kesh, {
                yourname: formInput.name,
                password: formInput.password,
                phone: formInput.phone,
                city: formInput.city
            });

            console.log("Response:", response.data);
            toast.success('Registered Successfully!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Flip,
                        });

            setFormInput({
                name: "",
                password: "",
                phone: "",
                city: ""
            });

        } catch (error) {
            console.error("Error submitting form:", error);
            
            toast.error('Error while posting a form!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Flip,
                        });
        }
    }
  return (
    <div style={{backgroundImage:`url(${gif})`,backgroundSize:"cover",backgroundPosition:'center',height:"100vh"}}>
        <div className="register-container">
            <div className="register-sub">
                <h1>Sign Up</h1>
                <form onSubmit={formClicked}>
                    <input 
                    type="text"
                    placeholder='UserName'
                    value={formInput.name}
                    onChange={(e)=>setFormInput({...formInput,name: e.target.value})}
                    />
                    <span>{error.name}</span>
                    <input 
                    type="password"
                    placeholder='Password'
                    value={formInput.password}
                    onChange={(e)=>setFormInput({...formInput,password: e.target.value})}
                    />
                    <span>{error.password}</span>
                    <input 
                    type="number"
                    placeholder='Phone Number'
                    value={formInput.phone}
                    onChange={(e)=>setFormInput({...formInput,phone:e.target.value})}
                    />
                    <span>{error.phone}</span>
                    <input 
                    type="text"
                    placeholder='City'
                    value={formInput.city}
                    onChange={(e)=>setFormInput({...formInput,city:e.target.value})}
                    />
                    <span>{error.city}</span>
                    <input type="submit" value="Sign In" style={{backgroundColor:"orange",width:"5rem",cursor:"pointer",alignSelf:"start",marginLeft:"1rem"}}/>
                </form>
                <hr />
                <p>
                    Already have an Account?
                    <Link to="/">Login</Link>
                </p>
            </div>
        </div>
        <ToastContainer
                className="toast"
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Flip}
                />
    </div>
  )
}

export default AnotherSamp
