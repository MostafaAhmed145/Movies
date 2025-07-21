

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../LOADING/Loading'
import DetailseCss from "./detailse.module.css"
import Aos from 'aos'
import "aos/dist/aos.css"
import Errors from '../ERRORS/Errors'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation , EffectCoverflow } from 'swiper/modules'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ButtonScrolTop from '../BUTTON-SCROL/ButtonScrolTop'




function Detailse() {

    let [ detailseMovei , setDetailseMovei ] = useState(null)
    let [ idCastMovie , setIdCastMovie] = useState(null)

    let { id } = useParams()

    let myNavigate = useNavigate()


                let toScrollTop = ()=>{
                    window.scrollTo( {
                        top : 0 , 
                        behavior : 'smooth'
                    } )
                }

    useEffect( ()=>{
        Aos.init( {duration : 3000} )
        toScrollTop()
    } , [] )







async function getDetailseMovei() {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44 `)
}

async function similar() {
    return axios.get( `https://api.themoviedb.org/3/movie/${id}/similar?api_key=eba8b9a7199efdcb0ca1f96879b83c44 `)
}

function getReviews() {
  return axios.get(`https://api.themoviedb.org/3/movie/${ detailseMovei?.id ? detailseMovei?.id : id }/reviews?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
}

function getCast() {
    return axios.get(`https://api.themoviedb.org/3/movie/${ idCastMovie ? idCastMovie :  id }/credits?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
}

let {  data , isError , isLoading , refetch} = useQuery("getDetailseMovei" , getDetailseMovei)



let dataSimilar = useQuery( "similar" , similar )

let { data: reviewsData, isLoading: isReviewsLoading, isError: isReviewsError } = useQuery( [ "reviews", detailseMovei?.id || id ] , getReviews);

let { data : getDataCast , isLoading : getLoading   } = useQuery( ["getCast" , idCastMovie || id] , getCast )






                if (dataSimilar.isLoading || isReviewsLoading || isLoading || getLoading ) {
                    return <Loading/>
                }

                if (dataSimilar.isError || isError  || isReviewsError ) {
                    return <Errors refetch={refetch}/>
                }




                const moveis = detailseMovei !== null ? detailseMovei : data.data


                



     function NavigateM() {
        myNavigate("/Home")
     }
    

    return <>
   


    <div className="container bg-light my-4 rounded border p-4 ">
        
        <section data-aos="zoom-in-up" className={DetailseCss.row + " row py-5  bg-white rounded-2 border "}>
            <div className="col-lg-4 col-md-12 text-center ">
                <figure className=' w-100 '>
                    {detailseMovei == null ? <LazyLoadImage className=' w-100 rounded-3' src={"https://image.tmdb.org/t/p/original" + data.data.backdrop_path} alt={data.data.original_title} /> : <LazyLoadImage className=' w-100 rounded-3' src={"https://image.tmdb.org/t/p/original" + detailseMovei.backdrop_path} alt={data.data.original_title} />}
                    
                </figure>
            </div>
            <div className="col-lg-8">
                    <figcaption>
                        <h2 className=' text-primary fst-italic'>{moveis.original_title} </h2>
                        <p className=' text-secondary'>{moveis.overview}</p>
                        <Link className=' py-2 mb-2 btn btn-outline-primary text-capitalize' to={moveis.homepage}>to home page</Link>
                        

                        <div className={DetailseCss.contant + "  d-flex justify-content-between text-white p-1 bg-white"}>
                            <div className='  p-2  text-center col-lg-3 col-12 h6 bg-light text-black rounded'>
                                <span className=' p-2'>popularity</span>
                                <h5 className=' text-primary'>  {moveis.popularity}</h5>
                            </div>

                            <div className='  p-2  text-center col-lg-3 col-12 h6 bg-light text-black rounded'>
                                <span className=' p-2'>Vote Count</span>
                                <h5 className=' text-primary'>  {moveis.vote_count}</h5>
                            </div>

                            <div className='  p-2  text-center col-lg-3 col-12 h6 bg-light text-black rounded'>
                                <span className=' p-2'>Average Rating</span>
                                <h5 className=' text-warning'> <i className="fa-solid fa-star me-1"></i>{moveis.vote_average} </h5>
                            </div>

                        </div>
                    </figcaption>
            </div>




            


        </section>
            

        <div>
        </div>

            


              <div className=' mt-5 p-2 '>
                            <h3 className=' d-block text-black text-capitalize p-2 fst-italic'>cast Movie</h3>
                             <Swiper
                             autoplay = { { delay : 2000 ,  disableOnInteraction : false } }
                                    effect="coverflow"
                                    grabCursor={true}
                                    centeredSlides={true}
                                    slidesPerView={4}   
                                    coverflowEffect={{
                                        rotate: 20,
                                        stretch: 0,
                                        depth: 100,
                                        modifier: 1.5,
                                        slideShadows: true,
                                    }}
                                    modules={[EffectCoverflow , Autoplay ,]}
                                    className="mySwiper"
                                    >


                                    {getDataCast.data.cast.map( (castMovie)=>{
                                        
                                         return <SwiperSlide className=' rounded-2'>
                                            <figure>
                                                <LazyLoadImage loading='lazy'  src={"https://image.tmdb.org/t/p/original" + castMovie.profile_path} alt={castMovie.name} className=' w-100 rounded-2' />
                                            </figure>
                                            </SwiperSlide>
                                         
                                    } ) }
                                    
                                    </Swiper>
                                      
                        </div>


                         <div className='  mt-5 p-2'>
                {reviewsData.data.results.length > 0 ? <h3 className=' text-black fa-italic text-capitalize fst-italic'>Similar movies</h3> : ""}
                <Swiper
                className={DetailseCss.Swiper + ' swiper'}
                    navigation={true}
                    
        modules={[Navigation, Autoplay , EffectCoverflow]}
        effect='coverflow'
                    coverflowEffect={{
                        rotate : 30 ,
                        depth : 100 , 
                        stretch : 50 ,
                        slideShadows : true
                    }}
        slidesPerView={5}
        spaceBetween={15}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }} >
                    {dataSimilar.data.data.results.map( (similarMovei)=>{
                        return <SwiperSlide key={similarMovei.id} className=' h-100 '>
                                    <figure onClick={ ()=>  { setDetailseMovei(similarMovei) ; setIdCastMovie(similarMovei.id ) ; toScrollTop() }} >
                                        <LazyLoadImage className=' w-100 rounded-3 h-100' src={"https://image.tmdb.org/t/p/original" + similarMovei.backdrop_path} loading='lazy' alt={similarMovei.original_title}  />
                                    </figure>
                        </SwiperSlide>
                    } )}

                    

                </Swiper>
        </div>



        <div className=' mt-3 text-black'>
                {reviewsData.data.results.length > 0 ? <h2 className=' fst-italic'>User Reviews</h2> : ""}
                
                { reviewsData.data.results.map( (riview)=> <div key={riview.id} className=' rounded bg-light border my-2 p-2'>
                    <div className=' userData d-flex'>
                        
                        {riview.author_details?.avatar_path != null ? <figure style={{"width" : "45px" , "height" : "45px"}} className='overflow-hidden rounded-circle'> <img className=' w-100 h-100 rounded-circle object-fit-cover' src={"https://image.tmdb.org/t/p/original" + riview.author_details.avatar_path } alt={riview.author} /> </figure>   : <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2"
                            style={{ width: "45px", height: "45px", fontSize: "18px" }}>
                        {riview.author?.charAt(0).toUpperCase()}

                        </div>}

                        <figcaption className=' d-flex flex-column ms-3'>
                            <div>
                                <h6 className='mb-0'>{riview.author}</h6>
                                <small className='text-muted'>
                                {riview.created_at?.slice(0, 10)} | ⭐ {riview.author_details?.rating ?? "N/A"}
                                </small>
                            </div>
                        </figcaption>

                    </div>

                    <div>
                        <p>{riview.content.slice(0, 300)}</p>
                    </div>
            </div>  )}
            </div>

            <div className=' w-100 mt-2'>
                    <button onClick={ NavigateM } className=' btn btn-danger text-white w-100 '>Back to Home Page</button>
            </div>

            <ButtonScrolTop/>

    </div>


    
    </>
}

export default Detailse
