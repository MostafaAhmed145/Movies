




import React, { useEffect, useRef, useState } from 'react'

import RegisterCss from "./register.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {  RotatingLines } from 'react-loader-spinner';



export function Register() {
                
    


    let refrance = useRef(null)

   let [ isSacces , setIsSacces ]  = useState(false)

   let [ isFeal , setIsFeal ] = useState(false)

   let [ isLoding , setIsLoding ] = useState(false)


   useEffect( ()=>{
    refrance.current.focus()
   }  , [])


   let myNavegeate =  useNavigate()



let myFormik = useFormik( {
    initialValues : {

        name: "",

        email: "",

        phone: "",

        password: "",

        rePassword: "",
    },

    onSubmit : async function (values) {

        setIsLoding(true)


        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
        .then( (res)=>{

            console.log("res" , res);
            setIsSacces(true)

            setTimeout( ()=>{
                setIsSacces(false)
                setIsLoding(false)
                myNavegeate("/Login")
            } , 3000 )
            


        } ).catch( (error)=>{

            console.log("eror" , error);

            setIsFeal(error.response.data.message)

            setTimeout( ()=>{
                setIsFeal(false)
                setIsLoding(false)
            } , 3000)
            
        } )

            console.log(data);

        
        
        
    },



    validate : function (values) {
        let errors = {}

        let redexName = /^[A-Za-z]{2,18}$/

        let redxPassword = /^[A-Za-z0-9]{6,18}[@#$%^&*]$/

        let redexPhone = /^01[0125][0-9]{8}$/


        if (redexName.test(values.name) !== true) {
            errors.name = "The username must be between 2 and 18 letters and contain only alphabets!"
        }

        if (values.email.includes("@") !== true && values.email.includes(".") !== true ) {
            errors.email = " The email must contain '@' and also include the letter `.` "
        }

        if (redxPassword.test(values.password) !== true) {
            errors.password = "The password must be between 6 and 18 characters long and end with one of the following special characters : @ , # , $ , % , ^ , & , *"
        }

        if (values.password !== values.rePassword) {
            errors.rePassword = "The password must match the re-entered password."
        }

        if (redexPhone.test( values.phone ) !== true) {
            
            errors.phone = "Please make sure to enter your phone number"
        }





        
        

        return errors

        
    }


} )















    return <>
    
          <div className="container my-4 ">


          <h1 className=' py-4 fw-bold '>register</h1>



                    <p className={RegisterCss.directions + ' text-white py-3 alert border bg-dark'}><span>Password Guidelines</span>

                            <ul >
                                <li>Length: 6 to 18 characters.</li>
                                <li>Use letters (A-Z, a-z) and numbers (0-9).</li>
                                <li>End with one special character: @, #, $, %, ^, &, or *.</li>
                            </ul>
                            
                            Example : password123@ , John456#</p>
                            
                            
                            
                            
                            

                            


             {isSacces ? <div  class="alert d-flex justify-content-center  w-50 m-auto align-items-center bg-info text-white text-center fw-bold">
                Lorem, ipsum dolor sit amet consectetur adipisicing....
             </div> : ""}


             {isFeal ? <div class="alert d-flex justify-content-center  w-50 m-auto align-items-center bg-danger text-white text-center fw-bold">
               {isFeal}
            </div> : ""}




            <div className="row m-auto  ">
                <form className={ RegisterCss.form  + ' overflow-hidden p-5'} onSubmit={myFormik.handleSubmit}>
                    <div className="col-md-12">
                        
                    
                    <input ref={refrance} onBlur={myFormik.handleBlur} className={RegisterCss.name + " mb-2  p-1 rounded w-100 bg-transparent text-black" } value={myFormik.values.name} onChange={myFormik.handleChange} type="text" id='name' placeholder='name' />
                    {/* <label className={RegisterCss.label + " px-2"} htmlFor="name">User Name</label> */}
                    
                    {myFormik.values.name !== false && myFormik.touched.name ? <p className=' text-danger w-100 '>{myFormik.errors.name}</p> : "" }
                    
                    



                    
                    <input onBlur={myFormik.handleBlur} className={RegisterCss.email + " mb-2  p-1 rounded w-100 bg-transparent text-black" } placeholder='Email' value={myFormik.values.email} onChange={myFormik.handleChange} type="email" id='email'  />
                    {/* <label className={RegisterCss.label + " px-2"} htmlFor="email">Email</label> */}
                    
                    {myFormik.values.email !== false && myFormik.touched.email ? <p className=' text-danger  '>{myFormik.errors.email}</p> : "" }
                    

                    
                    <input onBlur={myFormik.handleBlur} className={RegisterCss.password + " mb-2  p-1 rounded w-100  text-black bg-transparent" } placeholder='Password' value={myFormik.values.password} onChange={myFormik.handleChange} type="password" id='password'  />
                    
                    
                    {myFormik.values.password !== false && myFormik.touched.password ? <p className=' text-danger  '>{myFormik.errors.password}</p> : "" }
                    

                    
                    {/* <label className={RegisterCss.label + " px-2 text-black"} htmlFor="rePassword">RePassword</label> */}
                    <input onBlur={myFormik.handleBlur} className={RegisterCss.rePassword + " mb-2  p-1 rounded w-100  bg-transparent" } placeholder='rePassword' value={myFormik.values.rePassword} onChange={myFormik.handleChange} type="password" id='rePassword'  />
                    
                    {myFormik.values.rePassword !== false && myFormik.touched.rePassword ? <p className=' text-danger    '>{myFormik.errors.rePassword}</p> : ""  }
                    

                    
                    <input onBlur={myFormik.handleBlur} className={RegisterCss.phone + " mb-2  p-1 rounded w-100  bg-transparent text-black mb-3" } placeholder='phone' value={myFormik.values.phone} onChange={myFormik.handleChange} type="text" id='phone'  />
                    {/* <label className={RegisterCss.label + " px-2"} htmlFor="phone">phone</label> */}
                
                    {myFormik.values.phone !== false && myFormik.touched.phone ? <p className=' text-danger w-100 '>{myFormik.errors.phone}</p> : ""  }
                    

                    <span className='d-block'>Already have an account?<Link to="/Login"> Log in</Link></span>
                                        
                    

                    <div className=' col-lg-6 col-md-12  mt-4 m-auto'>
                        <button type='Submit' className='btn btn-success w-100'>

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
                            /> : "Register"}
                    </button>
                    </div>
                    </div>
                </form>
            </div>
          </div>

    </>
}

export default Register
