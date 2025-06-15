

import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../LOADING/Loading'
import DetailseCss from "./detailse.module.css"
import Aos from 'aos'
import "aos/dist/aos.css"



function Detailse() {

    

    let { id } = useParams()

    let myNavigate = useNavigate()

    useEffect( ()=>{
        Aos.init( {duration : 3000} )
    } , [] )


    async function getDetailseMovei() {
        return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44 `)
    }

    let {  data , isError , isLoading} = useQuery("getDetailseMovei" , getDetailseMovei)


    console.log("data?.data" , data?.data);

    if (isLoading) {
        return <Loading/>
    }

    console.log("data.data.homepage", data.data.homepage);
    


     function NavigateM() {
        myNavigate("/Home")
     }
    

    return <>


    <div className="container my-4 p-4 text-white">
        
        <div data-aos="zoom-in-up" className={DetailseCss.row + " row py-5 rounded-2 bg-white "}>
            <div className="col-lg-4 col-md-12 text-center position-relative">
                <figure className=' w-100 '>
                    <img className=' w-100 rounded-3' src={"https://image.tmdb.org/t/p/original" + data.data.backdrop_path} alt={data.data.original_title} />
                </figure>
            </div>
            <div className="col-lg-8">
                    <figcaption>
                        <h2>{data.data.original_title}</h2>
                        <p className=' text-black'>{data.data.overview}</p>
                        <Link className=' py-2' to={data.data.homepage}>{data.data.homepage}</Link>

                        <div className={DetailseCss.contant + "  d-flex justify-content-between text-white p-1"}>
                                
                                <h5 className=' p-2 rounded  text-center col-lg-3 col-12 h6 '>popularity : {data.data.popularity}</h5>
                                <h5 className=' p-2 rounded  text-center col-lg-3 col-12 h6'>Vote Average : {data.data.vote_average  }</h5>
                                <h5 className=' p-2 rounded  text-center col-lg-3 col-12 h6'>Vote Count : {data.data.vote_count  }</h5>

                        </div>
                    </figcaption>
            </div>
        <button onClick={ NavigateM } className=' btn btn-danger text-white col-lg-3 col-md-10  position-absolute bottom-0 '>عوده للصفحه الرئيسيه</button>
        </div>
    </div>
    
    </>
}

export default Detailse
