

import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../LOADING/Loading'
import ActorCss from "./actor.module.css"
import Aos from 'aos'
import "aos/dist/aos.css"
import Errors from '../ERRORS/Errors'
import { myContext } from '../CONTEXT/AuseContext'
import ImagesPerson from './ImagesPerson'


function Actor() {

    let myNavigate = useNavigate()
    
    let { id , name } = useParams() 

    let {  setIdPerson , amendentImg  } = useContext(myContext)

    useEffect( ()=>{
        setIdPerson(id)
    Aos.init({duration : 3000})
    } , [] )




        async function aboutTheActor() {
            
            return axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)

        }

       

        let { data , isError , isLoading , refetch } = useQuery("aboutTheActor" , aboutTheActor )
        

        if (isLoading ) {
            return <Loading/>
        }



   

        function back() {
            myNavigate("/People")
        }

        if (isError) {
            return <Errors refetch={refetch}/>
        }



    return <>

    <div className="container mt-4">
    <h1 data-aos="flip-up" > {name} </h1>
    <div data-aos="zoom-in-up" className="row p-4 bg-white m-3 rounded-4 border">

           <div className="col-lg-4 col-md-12">
                <div className=' h-100'>
                    <img className=' h-100 w-100 rounded-3' style={{ objectFit: "cover", maxHeight: "450px" , "cursor" : "pointer"}} src={`https://image.tmdb.org/t/p/original${amendentImg ? amendentImg : data.data.profile_path }` } alt={data.data.name} />
                </div>
                </div>
                <div className="col-lg-8 col-md-12 px-3">
                <div className=' actor-details'>
                    <h2 className=' fst-italic text-primary'>{data.data.name}</h2>
                    <p data-aos="fade-up" className={ActorCss.biography + " mb-4"}>{data.data.biography} {data.data.biography} {data.data.biography}</p>
                    <div className="row mb-2">
                        <div className="col-lg-4 col-md-6 col-sm-12 ">
                            <div className=' shadow border rounded-1 text-center p-2'>
                                <span><i className="fa-regular fa-calendar-days me-1 text-secondary"></i> Date of Birth </span>
                            <h4 className=' h6 text-primary'>{data.data.birthday}</h4>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12 ">
                            <div className=' shadow border rounded-1 text-center p-2'>
                                <span><i className="fa-solid fa-location-dot me-1 text-secondary"></i> place of birth </span>
                                <h4 className=' h6 text-primary'>{data.data.place_of_birth || "N/A"}</h4>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12 ">
                            <div className="shadow border rounded-1 text-center p-2">
                                <span><i className="fa-solid fa-fire me-1 text-secondary"></i> popularity </span>
                                {/* <h4 className={ ' h6 text-primary    }>{data.data.popularity || "N/A"}</h4> */}
                                    <h4 className={` h6 ${data.data.popularity > 10 ? " text-danger" : data.data.popularity >= 7 ? " text-warning" : " text-secondary"} `} >{Math.floor(data.data.popularity) || "N/A"}</h4>
                            </div>
                            
                        </div>

                        {data.data.homepage ? <Link to={data.data.homepage } className=' btn btn-outline-primary my-2'> to home page </Link> : ""}



                    </div>

                        <ImagesPerson/>
                </div>
                </div>

                
    </div>
                <div onClick={back} style={{cursor : "pointer"}} className="back btn btn-danger mb-2 w-100 text-center">
                    <span className=' text-capitalize'> <i  class="fa-solid fa-arrow-left fa-1x"></i> back to home page </span>
                </div>

    </div>    
    </>
}

export default Actor
