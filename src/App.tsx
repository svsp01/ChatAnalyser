
import './App.css'
import Footer from './components/Footer/Footer'
import Home from './components/Hero/Home'
import NavBar from './components/Nav/NavBar'


function App() {

  return (
    <>
    <div className='justify-between flex flex-col '>
     <NavBar/>
     <Home/>
     <Footer/>
    </div>
    </>
  )
}

export default App
