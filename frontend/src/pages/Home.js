import React from "react";
import Header from "../components/Header";
// import Hero from "../components/Hero";
import Footer from "../components/Footer";
import News from "../components/News";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Header />
      {/* <Hero /> */}
      <News />
      <Footer />
    </>
  );
};

export default Home;
