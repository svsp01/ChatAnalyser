
import { BrowserRouter as Router, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Hero/Home'
import { PrivateRoute } from './components/Router/PrivateRoute'
import Login from './components/Login/Login'
import Orgs from './components/Orgs/Orgs'


function App() {

  return (
    <>
    <Router basename="/">
        <Routes>
          <Route element={<PrivateRoute/>}>
              <Route path='/' element={<Home/>} />
              <Route path='/getOrgById/:id' element={<Orgs/>} />
          </Route>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
