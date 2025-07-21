


import React, {  useEffect, useRef , useState } from 'react'

import LoginCss from "./Login.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {  RotatingLines } from 'react-loader-spinner';
// import { auseContext } from '../TITLE-COMPONENT/TitleComponent';
// import { myContext } from '../CONTEXT/AuseContext';



export function Login() {

      let refrance = useRef(null)
    

      useEffect( ()=>{
          refrance.current.focus()
         }  , [])

   let [ isSacces , setIsSacces ]  = useState(false)

   let [ isFeal , setIsFeal ] = useState(false)

   let [ isLoding , setIsLoding ] = useState(false)




   let myNavegeate =  useNavigate()



let myFormik = useFormik( {
    initialValues : {

        email: "",

        password: "",
    },

    onSubmit : async function (values) {

        setIsLoding(true)

         await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
        .then( (res)=>{


             localStorage.setItem("tkn" , res.data.token)


            

            
            setIsSacces(true)

            setTimeout( ()=>{
                setIsSacces(false)
                setIsLoding(false)
                myNavegeate("/Home")
            } , 1500 )
            


        } ).catch( (error)=>{

            setIsFeal(error.response.data.message)

            setTimeout( ()=>{
                setIsFeal(false)
                setIsLoding(false)
            } , 3000)
            
        } )

        
        
    },



    validate : function (values) {
        let errors = {}


        let redxPassword = /^[A-Za-z0-9]{6,18}[@#$%^&*]$/




        if (values.email.includes("@") !== true && values.email.includes(".") !== true ) {
            errors.email = " The email must contain '@' and also include the letter `.` "
        }

        if (redxPassword.test(values.password) !== true) {
            errors.password = "Password must contain at least one uppercase letter "
        }




        return errors

        
    }


} )















    return <>
    
          <div className="container my-4 ">

 
          <h1 className=' py-4 fw-bold '>Login</h1>


             {isSacces ? <div class="alert d-flex justify-content-center  w-50 m-auto align-items-center bg-info text-white text-center fw-bold">
                Your login was successful! Welcome back!
             </div> : ""}


             {isFeal ? <div class="alert d-flex justify-content-center  w-50 m-auto align-items-center bg-danger text-white text-center fw-bold">
               {isFeal}
            </div> : ""}




            <div className="row m-auto mt-4 ">
                <form className={ LoginCss.fancyForm + ' overflow-hidden p-5'} onSubmit={myFormik.handleSubmit}>
                    <div className=" ">

                   


                    
                    <div>
                        {/* <label className={LoginCss.label + " px-2"} htmlFor="email">Email</label> */}
                    <input  ref={refrance}  onBlur={myFormik.handleBlur} className={LoginCss.email + " p-1  w-100 mb-2" } placeholder='Email' value={myFormik.values.email} onChange={myFormik.handleChange} type="email" id='email'  />
                    
                    {myFormik.values.email !== false && myFormik.touched.email ? <p className=' text-danger  w-100 '>{myFormik.errors.email}</p> : "" }
                    

                    
                    {/* <label className={LoginCss.label + " px-2"} htmlFor="password">Password</label> */}
                    {/* <label className={LoginCss.label + " px-2"} htmlFor="Password">Password</label> */}
                    
                    <input onBlur={myFormik.handleBlur} className={LoginCss.password + " p-1  w-100 mb-2" } placeholder='Password' value={myFormik.values.password} onChange={myFormik.handleChange} type="password" id='password'  />
                    
                    {myFormik.values.password !== false && myFormik.touched.password ? <p className=' text-danger w-100 '>{myFormik.errors.password}</p> : "" }
                    
                    </div>

                    <span className='d-block'>Don’t have an account?<Link to="/Register"> Sign up</Link></span>
                    





                
                    <div className=' col-lg-6 col-md-12  mt-4 m-auto'>
                        <button type='Submit' className='btn btn-success w-100 '>

                    {isLoding ? <RotatingLines
                            visible={true}
                            height="30"
                            width="30"
                            color="Brown"
                            strokeWidth="5"
                            animationDuration="1"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            /> : "Login"}
                    </button>
                    </div>
                    </div>
                </form>
            </div>
          </div>

    </>
}

export default Login
