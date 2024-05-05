import About from "@/components/(public)/home/about";
import Announcement from "@/components/(public)/home/announcement";
import Hero from "@/components/(public)/home/hero";
import Partners from "@/components/(public)/home/partners";
import Programs from "@/components/(public)/home/program";
import Tour from "@/components/(public)/home/tour";
import React from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <Tour />
      <Partners />
      <Announcement />
    </>
  );
};

export default Home;
