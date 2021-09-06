import React from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import Esports from "../components/Esports"
import Carousel from "../components/Carousel"
import "./Home.css"

const Home = () => {
  return (
    <>
    <Header/>
    <Hero/>
    <Carousel/>
    <Esports/>
    <Footer/>
    </>
  )
}

export default Home
