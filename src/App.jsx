
import Home from './Pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login'
import Account from './Pages/Account'
const route=createBrowserRouter([
 {
  path:'/',
  element:<Home/>,
  children:[
   {path:'login',element:<Login />},
   {path:'account',element:<Account/>}
  ]
 }


])
function App() {

  return (
    <>
      <div>
      <RouterProvider router={route}/>

     </div>
    </>
  )
}

export default App
