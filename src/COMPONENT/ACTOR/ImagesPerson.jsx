

import axios from 'axios'
import React, { useContext, useState } from 'react'
import { myContext } from '../CONTEXT/AuseContext'
import { useQuery } from 'react-query'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Loading from '../LOADING/Loading'

function ImagesPerson() {

    let { idPerson , setAmendentImg } = useContext(myContext)

    let [ imgPerson , setImgPerson ] = useState(null)

     async function getImgsPerson() {
            return await  axios.get(`https://api.themoviedb.org/3/person/${idPerson}/images?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        }

        let { data , isLoading } = useQuery(["getImgsPerson" , idPerson ], getImgsPerson )

        if (isLoading) {
            return <Loading/>
        }

        if (imgPerson != null) {
            setAmendentImg( imgPerson )
        }


        

    return <>


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


                                    {data.data.profiles.map( (imgPerson)=>{
                                        
                                         return <SwiperSlide className=' rounded-2'>
                                            <figure onClick={ ()=> setImgPerson(imgPerson.file_path)}>
                                                <LazyLoadImage loading='lazy'   src={"https://image.tmdb.org/t/p/original" + imgPerson.file_path } alt={imgPerson.name} className=' w-100 rounded-2' />
                                            </figure>
                                            </SwiperSlide>
                                         
                                    } ) }
                                    
                                    </Swiper>


    
    
    
    </>
}

export default ImagesPerson
