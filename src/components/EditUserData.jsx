import React, { useEffect, useState } from 'react'
import { Kesh } from './Kesh'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Styles/editCss.scss'
import gif from '../assets/gif.gif'
import { ToastContainer, toast ,Flip} from 'react-toastify';

const EditUserData = () => {
    const [formInput, setFormInput] = useState(
        {
            name:"",
            password:"",
            phone:"",
            city:""
        }
    )
    const [error, setError] = useState({})
    const [getId, setGetId] = useState(0)

    const navi = useNavigate()

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

    function formClicked(e) {
        e.preventDefault();

        if(!validateForm()){
           return 
        }
        axios.put(`${Kesh}/${getId}`,{
            yourname: formInput.name,
            password: formInput.password,
            phone: formInput.phone,
            city : formInput.city
        })
        setFormInput( {
            name:"",
            password:"",
            phone:"",
            city:""
        })
        localStorage.clear()
        toast.success('Updated Successfully!', {
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
            setInterval(() => {
                navi('/read')
            }, 3000);
        console.log("Item Edited Successfully!");
    }

    useEffect(() => {
        const receiveData = JSON.parse(localStorage.getItem('Users'));
    
        if (receiveData) {
            setGetId(receiveData.id || 0);
            setFormInput(receiveData);
        } else {
            setFormInput({
                name: "",
                password: "",
                phone: "",
                city: ""
            });
        }
    }, []);
    

  return (
    <div style={{backgroundImage:`url(${gif})`,backgroundSize:"cover",backgroundPosition:'center',height:"100vh"}}>
        <div className="edit-container">
            <div className="edit-sub">
            <h1>Update Details</h1>    
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
                <input type="submit" value="Update" style={{backgroundColor:"orange",width:"5rem",cursor:"pointer",alignSelf:"start",marginLeft:"1rem"}}/>
            </form>
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

export default EditUserData;
