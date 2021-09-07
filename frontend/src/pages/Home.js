import React from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import Esports from "../components/Esports"
import Carousel from "../components/Carousel"
import CallToAction from "../components/CallToAction"
import CarouselAkali from "../components/CarouselAkali"
import "./Home.css"

const Home = () => {
  return (
    <>
      <div className="bodyBackground" style={{backgroundImage:"url('https://i.postimg.cc/4dGhW9qH/background-Violeta.png')"}}>
        <Header/>
        <Hero/>
        <Carousel/>
        <Esports/>
        <CallToAction/>
        <CarouselAkali/>
        <Footer/>
      </div>
    </>
  )
}

export default Home
