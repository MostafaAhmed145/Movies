import React , { lazy, Suspense } from 'react';
import './App.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { LeyOet } from './COMPONENT/OUTLET/Outlet';
import { Home } from './COMPONENT/HOME/Home';
import { TopRated } from './COMPONENT/TOP-RATED/TopRated';
import { Upcoming } from './COMPONENT/UPCOMING/Upcoming';
import Register from './COMPONENT/Register/Register';
import Login from './COMPONENT/LOGIN/Login';
import TitleComponent from './COMPONENT/TITLE-COMPONENT/TitleComponent';
import AuseContextProvider from './COMPONENT/CONTEXT/AuseContext';
import ProtectedRoute from './COMPONENT/Protected Route/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import Trading from './COMPONENT/TRADING/Trading';
import People from './COMPONENT/People/People';
import Actor from './COMPONENT/ACTOR/Actor';
let NowPlaying = React.lazy( ()=> import("./COMPONENT/NOWPLAYING/NowPlaying") )
let Detailse = React.lazy( ()=> import("./COMPONENT/DETAILSE/Detailse") )





function App() {


  



  let myRoot = createHashRouter(  [ 
    { path : "/" , element :  <LeyOet/> , children : [
      {path : "/" , element : <Register/>},
      {path : "Watched-Movies" , element :  <Register/>  },
      {path : "Home" , element : <ProtectedRoute> <Home/> </ProtectedRoute> },
      {path : `Tranding` , element : <ProtectedRoute> <Trading/> </ProtectedRoute> },
      {path : `Detailse/:id` , element : <ProtectedRoute> <React.Suspense fallback="Loding....">  <Detailse/>  </React.Suspense>  </ProtectedRoute> },
      {path : `NowPlaying/:id/:title` , element : <ProtectedRoute> <React.Suspense fallback="Loding....">  <NowPlaying/>  </React.Suspense> </ProtectedRoute> },
      {path : "TopRated" , element : <ProtectedRoute> <TopRated/> </ProtectedRoute> },
      {path : "Upcoming" , element : <Upcoming/>},
      {path : "People" , element : <People/>},
      {path : "Register" , element : <Register/>},
      {path : "Login" , element :  <Login />},
      {path : "Actor/:id/:name" , element :  <Actor />},

    ] } 
  ]  )


  

  let myClaynt = new QueryClient()



  return <>


<QueryClientProvider client={myClaynt}>

  <AuseContextProvider>
  <TitleComponent>
  <RouterProvider router={myRoot}/>
  </TitleComponent>
  </AuseContextProvider>

  </QueryClientProvider>
 
</>
}

export default App;
