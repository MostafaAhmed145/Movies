


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Loading from '../LOADING/Loading'
import Aos from 'aos'
import "aos/dist/aos.css"
// import PEPOLECSS from "./pepole.module.css"
import { Link } from 'react-router-dom'
import Errors from '../ERRORS/Errors'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css"

function People() {

    let [ query , setQuery] = useState()
    let [ results , setResults] = useState()

    

    useEffect( ()=>{
        Aos.init( {duration : 2500} )


        async function getNameActors() {   


        
            try{

                let response = await axios.get( `https://api.themoviedb.org/3/search/person?api_key=eba8b9a7199efdcb0ca1f96879b83c44` , {
                      params: {
                          query : query,
                          language: 'ar' 
                        }
            
                })

                setResults(response.data.results)

                }

                catch(err){
                    console.log(err);
                }

        }
        
            
            
    

    


        
            
                


        getNameActors()

        
    }  , [query])


    


        async function getAllPeople(){
            return axios.get("https://api.themoviedb.org/3/trending/person/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
        }

        let { data , isError, isLoading , refetch } = useQuery("getAllPeople" , getAllPeople)


        if (isLoading) {
            return <Loading/>
        }

        if (isError) {
            return <Errors refetch={refetch}/>
        }



    return <>
    
    <div className="container-fluid p-4 my-3">

                

                
                <div className=" container text-center">


                <div className={" search my-5"}>
                <form data-aos="flip-up" action="" className=' bg-white col-lg-6 col-md-12 m-auto p-1 rounded-top-5'>
                <input value={query} placeholder='ابحث عن ممثل...' onChange={  (e)=>{setQuery(e.target.value) } } type="text" className=' w-100 m-auto p-2 rounded-5 bg-transparent text-black' />
                </form>


                            <div className="row mt-5 shadow">
                            {results?.map(( searchAllPeople )=>{

                                return <div  className="col-lg-3 col-md-6 g-3 ">
            <div  className="innar  rounded-2 position-relative">
             <Link to={`/Actor/${searchAllPeople.id}/${searchAllPeople.name}`} className=' text-decoration-none'>
             <figure data-aos="zoom-in-up" className=' rounded-top-2 position-relative'>
                    <LazyLoadImage className=' w-100 rounded-top-2' src={"https://image.tmdb.org/t/p/original" + searchAllPeople.profile_path} alt={searchAllPeople.name} />

                    <figcaption className=' text-center text-white d-flex justify-content-between align-items-center  bg-dark p-2'>
                        <h3 className=' h5 mt-2  border p-1'>{searchAllPeople.name}</h3>
                        <div className= "  d-flex justify-content-center bg-danger align-items-center border px-2 pt-2 ">
                    <h6 className=' d-flex align-items-center text-white '> <i class="fa-solid fa-star" style={{"color": "gold"}}></i> {searchAllPeople.popularity}</h6>
                    </div>
                    </figcaption>

                    
                </figure>
             </Link>
                



            
            
            </div>
        </div>
                            } )}
                            </div>
                            </div> 
                
                
                </div>
    <div className="row p-3 mt-3">


        {data.data.results.map( (people)=>{

            return <div  className="col-lg-3 col-md-6 g-3 ">
            <div  className="innar  rounded-2 position-relative">
             <Link to={`/Actor/${people.id}/${people.name}`} className=' text-decoration-none'>
             <figure data-aos="zoom-in-up" className=' rounded-top-2 position-relative'>
                    <LazyLoadImage className=' w-100 rounded-top-2' src={"https://image.tmdb.org/t/p/original" + people.profile_path} alt={people.name} />

                    <figcaption className=' text-center text-white d-flex justify-content-between align-items-center  bg-dark p-2'>
                        <h3 className=' h5 mt-2  border p-1'>{people.name}</h3>
                        <div className= "  d-flex justify-content-center bg-danger align-items-center border px-2 pt-2 ">
                    <h6 className=' d-flex align-items-center text-white '> <i class="fa-solid fa-star" style={{"color": "gold"}}></i> {people.popularity}</h6>
                    </div>
                    </figcaption>

                </figure>
             </Link>
                



            
            
            </div>
        </div>
        } )}
        
    </div>


                
    </div>
    
    </>
}




export default People
