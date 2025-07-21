




import React, { useCallback, useEffect, useState } from 'react'
import debounce from "lodash.debounce";

import SearchCss from "./search.module.css"
import axios from 'axios'

import { Link } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css"

export function Search() {


    
    const [query, setQuery] = useState(''); // لحفظ الكلمة المفتاحية التي يبحث عنها المستخدم
    const [keywords, setKeywords] = useState([]); // لحفظ نتائج البحث


   


            let  getNameMoviesSearch = useCallback (
                debounce( async ( searchItem )=>{
                     try{
                 let response = await axios.get( `https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44` , {
                      params: {
                        query : searchItem ,
                          language: 'ar' 
                        }
            
                        
              })

                setKeywords(response.data.results)
                  
                  
           
              }
              catch(err){
                  console.log(err);
                    
              }


                } , 500 ), []

            )

            useEffect( ()=>{

                 if (query.trim() !== "") {
                getNameMoviesSearch(query); // تبعت قيمة query كـ باراميتر
            }

            } , [query , getNameMoviesSearch] )

  
        //     Aos.init( {duration : 3000} )








    return <>
    
    <div  data-aos="flip-up" className="container">
    <div className={SearchCss.searchContainer + " mt-3 "}>
    <input  value={query} onChange={ (e)=>   setQuery(e.target.value)  } type="text" className={SearchCss.searchInput + " border shadow" } placeholder="ابحث عن فيلم..." />
    
    </div>
    <div className="row">

{keywords.map( (movie)=>{


    return <div  key={movie.id } className= {SearchCss.mainCol + " col-lg-3 col-md-6 col-sm-12 rounded p-3 "}>



                           <div className='border-bottom  rounded shadow '>
                             <Link to={`/Detailse/${movie.id}`}>
                            
                            <div data-aos="zoom-in-up" style={{"maxHeight" : "450px"}} className={SearchCss.innar + " rounded-top-3  position-relative "}>

                                    <figure className=' position-relative h-100 '>
                                    <LazyLoadImage className='rounded-top-3 w-100 h-100'  src={"https://image.tmdb.org/t/p/original" +  movie.poster_path } alt={ movie.name  ? movie.name : movie.title} />

                                    <figcaption className= { SearchCss.text + ' p-2   position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center flex-column text-white rounded-top-3'}>
                                        
                                        <h3 className=' text-danger '>{ movie.name  ? movie.name : movie.title}</h3>
                                        <p>{movie.overview.split(" ").slice(0, 15).join(" ") + " ...."}</p>

                                        {movie.first_air_date ? <p>Release Data : {movie.first_air_date}</p> : "" }

                                        
                                    </figcaption>

                                    
                                    </figure>

                                    
                                    </div>

                            </Link>

                            
                                            <div className= "  d-flex flex-column rounded-bottom-3 bg-dark p-1" >
                                                <h6 className=' d-flex align-items-center text-white '> <i class="fa-solid fa-star" style={{"color": "gold"}}></i> {movie.vote_average}</h6>
                                                <h3 className="h6 text-white">{movie.name  ? movie.name : movie.title}</h3>
                                            <Link to={`/NowPlaying/${movie.id}/${movie.name  ? movie.name : movie.title}`} className=' text-decoration-none text-white  p-1 btn btn-danger'>
                                            Live Video <i class="fa-brands fa-youtube ms-2">
                                                </i> 
                                             </Link> 


                                    </div>
                           </div>

                    
                </div>
} )}

</div>
    </div>






    </>



     }
