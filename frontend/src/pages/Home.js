import React from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import Esports from "../components/Esports"
import Carousel from "../components/Carousel"
import CallToAction from "../components/CallToAction"
import CarouselAkali from "../components/CarouselAkali"
import "./Home.css"
import {useEffect } from "react"

const Home = (props) => {
  const toTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    })
  }

  useEffect(() => {
    toTop()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="bodyBackground" style={{backgroundImage:"url('https://i.postimg.cc/wTQ3BSmJ/nuevolala.png')"}}>
        <Header {...props}/>
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
