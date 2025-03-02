import React, { useEffect, useState } from 'react'
import { Kesh } from './Kesh'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Styles/readCss.scss'
import gif from '../assets/gif.gif'
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { ToastContainer, toast ,Flip} from 'react-toastify';

const ReadUserData = () => {

    const [readData, setreadData] = useState([])
    const navigation = useNavigate();

    useEffect(()=>{
        async function getData() {
            try {
              const response = await fetch(Kesh)
              const result = await response.json()
              setreadData(result);
              
            } catch (error) {
              console.log("error", error);
            }
          }
          getData()
    },[readData])

    async function deleteItem(index) {

      await axios.delete(`${Kesh}/${index}`) // it will take as apiURL/index=1

      const result = await axios.get(Kesh)
      console.log(result.data)
      setreadData(result.data);

      toast.success('Item deleted Successfully!', {
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

    function editItem(index,yourname,password,phone,city) {

      const userDetails = {
        id: index,
        name: yourname,
        password: password,
        phone: phone,
        city: city
      };

      localStorage.setItem("Users", JSON.stringify(userDetails))
      navigation('/edit')
    }
  return (
    <div style={{backgroundImage:`url(${gif})`,backgroundSize:"cover",backgroundPosition:'center',height:"100vh"}}>
      <div className="read-container">
        <div className="read-sub">
        <h1>Read Data</h1>
          <table>
            <tbody>
            {readData.map((i)=>(
              <tr key={i.id} >
                <td >{i.id}</td>
                <td>{i.yourname}</td>
                <td>{i.password}</td>
                <td>{i.phone}</td>
                <td>{i.city}</td>
                <td><button onClick={()=>deleteItem(i.id)}><MdDeleteForever className='delete-icon'/></button></td>
                <td><button onClick={()=>editItem(i.id,i.yourname,i.password,i.phone,i.city)}><MdEditSquare className='edit-icon'/></button></td>
              </tr>
            ))}
            </tbody>
          </table>
          <button onClick={() => {
              localStorage.removeItem("Users");
              navigation("/");
            }}>
              Back to Login
          </button>
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

export default ReadUserData
