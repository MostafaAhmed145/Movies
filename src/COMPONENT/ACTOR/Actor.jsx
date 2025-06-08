

import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../LOADING/Loading'
import ActorCss from "./actor.module.css"
import Aos from 'aos'
import "aos/dist/aos.css"
import Errors from '../ERRORS/Errors'


function Actor() {

    let myNavigate = useNavigate()

    useEffect( ()=>{
    Aos.init({duration : 3000})
    } , [] )


    let { id , name } = useParams()


        async function aboutTheActor() {
            
            return axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)

        }

        let { data , isError , isLoading , refetch } = useQuery("aboutTheActor" , aboutTheActor)

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
    <div data-aos="zoom-in-up" className="row p-4 bg-white m-3 rounded-4 position-relative">

           <div className="col-lg-4 col-md-12">
                <figure className=' h-100'>
                    <img className=' h-100 w-100 rounded-3' src={"https://image.tmdb.org/t/p/original" + data.data.profile_path} alt={data.data.name} />
                </figure>
                </div>
                <div className="col-lg-8 col-md-12 px-3">
                <figcaption>
                    <h2 style={{color : "#00d30b"}}>{data.data.name}</h2>
                    <p>{data.data.biography}</p>
                    <ul className={ActorCss.ul }>
                        <li className=' col-lg-4 col-md-12 mb-1 text-white fw-bold p-2 rounded-1 '><span style={{textDecoration : "underline" , textDecorationThickness : "2px"}}>birthday</span> : {data.data.birthday  }  </li>
                        <li className=' col-lg-4 col-md-12 mb-1 text-white fw-bold p-2 rounded-1'><span style={{textDecoration : "underline" , textDecorationThickness : "2px"}}>place of birth</span> : {data.data.place_of_birth  }  </li>
                        <li className=' col-lg-4 col-md-12  text-white fw-bold p-2 rounded-1'><span style={{textDecoration : "underline" , textDecorationThickness : "2px"}}>popularity</span> : {data.data.popularity }  </li>
                        <Link to={data.data.homepage }> {data.data.homepage} </Link>   
                    </ul>
                </figcaption>
                </div>

                <div onClick={back} style={{backgroundColor : "red" , width : "fit-content" , cursor : "pointer"}} className="back position-absolute start-0 bottom-0 text-white p-2 rounded-end-2">
                <i  class="fa-solid fa-arrow-left fa-1x"></i>
                </div>
    </div>

    </div>    
    </>
}

export default Actor
