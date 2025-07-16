


import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

import TrandingCss from "./tranding.module.css"
import Loading from '../LOADING/Loading'
import { Link } from 'react-router-dom'
import { Search } from '../SEARCH/Search'
import Errors from '../ERRORS/Errors'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css"
import ButtonScrolTop from '../BUTTON-SCROL/ButtonScrolTop'

function Trading() {


        async function trandingMoveis() {
            return axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
        }




        let { data , isLoading , isError , refetch} = useQuery( "trandingMoveis" , trandingMoveis )
 

if (isLoading) {
    return <Loading/>
}

if( isError){
    return <Errors refetch={refetch}/>
}



    return <>
    

    {data.data.results.length > 0 ? <div className=" container-fluid mt-3 p-4">

        <Search/>

        <h2>Trending</h2>

        <div className="row">


            {data.data.results.map( (tranding)=> { 
                return <div  key={tranding.id } className= {TrandingCss.mainCol + " col-lg-3 col-md-6 col-sm-12 rounded  p-3 "}>

                           <div className='border-bottom  rounded shadow '>
                             <Link to={`/Detailse/${tranding.id}`}>
                            
                            <div data-aos="zoom-in-up" className={TrandingCss.innar + " rounded-top-3  position-relative"}>

                                    <figure className=' position-relative h-100 '>
                                    <LazyLoadImage className='rounded-top-3 w-100 h-100'  src={"https://image.tmdb.org/t/p/original" + tranding.backdrop_path} alt={tranding.name} />

                                    <figcaption className= { TrandingCss.text + ' p-2   position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center flex-column text-white rounded-3'}>
                                        
                                        <h3 className=' text-danger '>{ tranding.name  ? tranding.name : tranding.title}</h3>
                                        <p>{tranding.overview.split(" ").slice(0, 15).join(" ") + " ...."}</p>

                                        {tranding.first_air_date ? <p>Release Data : {tranding.first_air_date}</p> : "" }

                                        
                                    </figcaption>

                                    </figure>

                                    
                                    </div>

                            </Link>

                            
                                            <div className= "  d-flex justify-content-between bg-dark p-1" >
                                            <Link to={`/NowPlaying/${tranding.id}/${tranding.name  ? tranding.name : tranding.title}`} className=' text-decoration-none text-white border p-1'>
                                            Live Video
                                                <i class="fa-brands fa-youtube ms-2" style={{"color": "#ff0505"}}>
                                                </i> 
                                             </Link> 

                                             <div className={TrandingCss.rating + "  d-flex justify-content-center bg-danger align-items-center border px-2 pt-2 "}>
                                            <h6 className=' d-flex align-items-center text-white '> <i class="fa-solid fa-star" style={{"color": "gold"}}></i> {tranding.vote_average}</h6>
                                            </div>

                                          

                                            
                                            
                                    </div>
                           </div>

                    
                </div>
            } )}
            
        </div>
    </div> : ""}
    
    
    <ButtonScrolTop/>

    </>
}

export default Trading


//TrandingCss.innar
//
//TrandingCss.rating