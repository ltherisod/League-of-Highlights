import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from "../components/Footer"
import News from "../components/News"
import Carousel from "../components/Carousel"
import "./Home.css"

const Home=()=>{
return (
    <>
    <Header/>
    <Hero/>
    <Carousel/>
    <News/>
    <Footer/>
    </>
)
}

export default Home 

