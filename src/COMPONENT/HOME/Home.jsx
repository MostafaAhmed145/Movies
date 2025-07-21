


import axios from 'axios'
import homeCss from "./home.module.css"
import { Link } from 'react-router-dom'
import Loading from '../LOADING/Loading'
import { Search } from '../SEARCH/Search'
import Aos from 'aos'
import "aos/dist/aos.css"

import React, { useContext, useEffect  } from 'react'
import { useQuery } from 'react-query'
import Errors from '../ERRORS/Errors'
import Header from '../HEADER/Header'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css"
import PhotosSlider from '../PHOTOS-SLIDER/PhotosSlider'
import ButtonScrolTop from '../BUTTON-SCROL/ButtonScrolTop'
import { myContext } from '../CONTEXT/AuseContext'

export function Home() {


let {  setBtnscroll } = useContext(myContext)

    async function grtDataMovie(){

        return  axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
 
      }


        let {data , isError , isLoading , refetch } = useQuery("grtDataMovie" , grtDataMovie)

        
        useEffect( ()=>{
            Aos.init( {duration : 2500} )
            setBtnscroll()
        } , [setBtnscroll] )
        
        if (isLoading ) {
        return <Loading/>
        }

        if (isError) {
            return  <Errors refetch={refetch}/>
        }


    return <>


            <Header/>


            <PhotosSlider/>


     { data.data.results.length > 0 ? <div  className="container-fluid  py-5 px-4">
            <div className={homeCss.row + " row gy-3 "}>

            <Search/>

                
                <h2>Popular</h2>
                {data.data.results.map(  (movie)=> { 

                    return   <div  key={movie.id } className= {homeCss.mainCol + " col-lg-3 col-md-6 col-sm-12 rounded  p-3 "}>

                           <div className='border-bottom  rounded shadow border'>
                             <Link to={`/Detailse/${movie.id}`}>
                            
                            <div data-aos="zoom-in-up" style={{"height": "400px"}} className={homeCss.innar + " rounded-top-3  position-relative "}>

                                    <figure className=' position-relative h-100 '>
                                    <LazyLoadImage className='rounded-top-3 w-100 h-100'  src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path} alt={movie.name} />

                                    <figcaption className= { homeCss.text + ' p-2   position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center flex-column text-white rounded-3'}>
                                        
                                        <h3 className=' text-danger '>{ movie.name  ? movie.name : movie.title}</h3>
                                        <p>{movie.overview.split(" ").slice(0, 15).join(" ") + " ...."}</p>

                                        {movie.first_air_date ? <p>Release Data : {movie.first_air_date}</p> : "" }

                                        
                                    </figcaption>

                                    
                                    </figure>

                                    
                                    </div>

                            </Link>

                            
                                            <div className= "  d-flex flex-column rounded-bottom-2  bg-dark p-2" >
                                                <h6 className=' d-flex align-items-center text-white '> <i class="fa-solid fa-star" style={{"color": "gold"}}></i> {movie.vote_average}</h6>
                                                <h3 className=' h6 text-white'>{movie.name  ? movie.name : movie.title}</h3>
                                            <Link to={`/NowPlaying/${movie.id}/${movie.name  ? movie.name : movie.title}`} className={ homeCss.watchTheMovie + ' text-decoration-none text-white bg-danger  rounded-2 p-1 text-center' }>
                                                Live Video
                                                <i class="fa-brands fa-youtube ms-2">
                                                </i> 
                                             </Link> 

                                            </div>




                                                </div>
                </div>
                } 
            ) }
            
          
                
            </div>
        </div> : ""}
                



             <ButtonScrolTop/>


    
    </>
}

export default Home













   

    







    

    //


 

