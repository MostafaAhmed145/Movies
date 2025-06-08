

import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../LOADING/Loading'
import { Link,  useParams } from 'react-router-dom'


export function NowPlaying() {

    let myParams = useParams()


        async function getViduoMovie() {
            return axios.get(`https://api.themoviedb.org/3/movie/${myParams.id}/videos?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        }



        let { data , isLoading} = useQuery("getViduoMovie" , getViduoMovie )

        if (isLoading) {
            return <Loading/>
        }



        let video = data.data.results[0];


    return <>
    


    <div className="container mt-4">
    <h1  className=' py-4 fw-bold  m-auto  '>movie : {myParams.title}</h1>
        <div className="row">
            <div className="col-12 text-center viduo  m-auto mt-5 ">

                {video ? <>
                    
                    <iframe 
                    className=' rounded-3 text-center'
                                    
                                    width="90%" 
                                    height="400" 
                                    src={`https://www.youtube.com/embed/${video.key}`} 
                                    title="مشغل الفيديو" 
                                    frameBorder="0" 
                                    autoplay
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                />
                
                
                </> : ""}
                
            <Link to="/Home" className='btn btn-outline-primary  m-auto my-2'> ← Back to HomePage</Link>
            </div>

        </div>
    </div>

    </>
}

export default NowPlaying
