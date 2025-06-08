


import axios from 'axios'
import TopRatedCss from "./topRated.module.css"
import { Search } from '../SEARCH/Search';
import Loading from '../LOADING/Loading';
import Aos from 'aos';
import "aos/dist/aos.css"
import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Errors from '../ERRORS/Errors';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css"

export function TopRated() {




   async function getTopRatedMovies(){
    return axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44") ;

    
}


let { data , isLoading , isError , refetch } = useQuery("getTopRatedMovies" , getTopRatedMovies , {
    refetchInterval : 3000
})




useEffect( ()=>{
    Aos.init( {duration : 2500} )
} )

if (isLoading) {
    return <Loading/>
}

        if (isError) {
                    return  <Errors refetch={refetch}/>
        }


    return <>
    
    
    {data.data.results.length > 0 ? <div className=" container-fluid py-5">
            <div className="row g-3 p-2">


            {/* <h1 data-aos="flip-up" className=' py-4 fw-bold text-white'>Top Rated</h1> */}

            <Search/>

            <h2 className=' text-capitalize'>top rated</h2>


              {data.data.results.map( (topRated)=> {
                
                return   <div  key={topRated.id } className= {TopRatedCss.mainCol + " col-lg-3 col-md-6 col-sm-12 rounded  p-3 "}>

                           <div className='border-bottom  rounded shadow '>
                             <Link to={`/Detailse/${topRated.id}`}>
                            
                            <div data-aos="zoom-in-up" className={TopRatedCss.innar + " rounded-top-3  position-relative"}>

                                    <figure className=' position-relative h-100 '>
                                    <LazyLoadImage className='rounded-top-3 w-100 h-100'  src={"https://image.tmdb.org/t/p/original" + topRated.backdrop_path} alt={topRated.name} />

                                    <figcaption className= { TopRatedCss.text + ' p-2 text-center  position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center flex-column text-white rounded-3'}>
                                        
                                        <h3 className=' text-danger'>{ topRated.name  ? topRated.name : topRated.title}</h3>
                                        <p>{topRated.overview.split(" ").slice(0, 15).join(" ") + " ...."}</p>

                                        {topRated.first_air_date ? <p>Release Data : {topRated.first_air_date}</p> : "" }

                                        
                                    </figcaption>

                                    
                                    </figure>

                                    
                                    </div>

                            </Link>

                            
                                            <div className= "  d-flex justify-content-between bg-dark p-1" >
                                            <Link to={`/NowPlaying/${topRated.name  ? topRated.name : topRated.title}`} className=' text-decoration-none text-white border p-1'>
                                            Live Video
                                                <i class="fa-brands fa-youtube ms-2" style={{"color": "#ff0505"}}>
                                                </i> 
                                             </Link> 

                                             <div className={TopRatedCss.rating + "  d-flex justify-content-center bg-danger align-items-center border px-2 pt-2 "}>
                                            <h6 className=' d-flex align-items-center text-white '> <i class="fa-solid fa-star" style={{"color": "gold"}}></i> {topRated.vote_average}</h6>
                                            </div>

                                          

                                            
                                            
                                    </div>
                            </div>

                    
                </div>

              } )}

                

 
            </div>
        </div> : "" }
        
    
    </>
}

export default TopRated









