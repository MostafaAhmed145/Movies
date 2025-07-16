import React, {  useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation , Autoplay  , EffectCoverflow } from 'swiper/modules';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loading from '../LOADING/Loading';
import Errors from '../ERRORS/Errors';
import PhotosSliderCss from "./PhotosSlider.module.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css"



function PhotosSlider() {

    let [ selectedItem , setSelectedItem] = useState(null)
        

 

async function sliderImage() {
    return  axios.get("https://api.themoviedb.org/3/trending/all/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
}


let {data , isError , isLoading , refetch} = useQuery("sliderImage" , sliderImage)


if (isLoading) {
    return <Loading/>
}

if (isError) {
    return < Errors refetch={refetch}/>
}

 


    return <>






<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title fs-5" id="exampleModalLabel">
            {selectedItem != null ? selectedItem.title  || selectedItem.name : "not title"}
        </h2>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className={ PhotosSliderCss.modalBody + " modal-body position-relative"}>
        {selectedItem != null ?   <img  className=' w-100 rounded-1' style={{ "height" : "300px" }} src={"https://image.tmdb.org/t/p/original" + selectedItem.poster_path} alt={selectedItem.title} /> : ""}
        <div className={PhotosSliderCss.text + ' position-absolute start-0 en p-2 rounded-1 text-center text-white' }>
            <h3>
            {selectedItem != null ? selectedItem.title : ""}
            </h3>
            <p>{selectedItem != null ? selectedItem.overview : ""}</p>
        </div>
      </div>

    </div>
  </div>
</div>





     <div className=' p-2 '>
        <Swiper
           navigation={true}
  modules={[Navigation, Autoplay, EffectCoverflow]} // ← مهم جدًا
  effect="coverflow"
  coverflowEffect={{
    rotate: 30,
    depth: 100,
    stretch: 50,
    slideShadows: true,
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
        }}
          className="mySwiper  rounded-3  " >
        
                    {data.data.results.map( (tredingSlider)=>{
                        return <SwiperSlide key={tredingSlider.id} style={{ "height" : "300px" }} className={PhotosSliderCss.SwiperSlide + ' rounded-5 '}>
                             <LazyLoadImage onClick={()=> setSelectedItem(tredingSlider) } data-bs-toggle="modal" data-bs-target="#exampleModal" className=' w-100 rounded-3 overflow-hidden' style={{"cursor" : "pointer"}} src={"https://image.tmdb.org/t/p/original" + tredingSlider.poster_path} alt={tredingSlider.title} />
                        </SwiperSlide>
                    } )}
      
    
      </Swiper>
     </div>

    
    </>
}

export default PhotosSlider
