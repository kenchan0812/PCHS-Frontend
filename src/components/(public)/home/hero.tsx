import React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import Link from "next/link";
const Hero = () => {
  return (
    <>
      <div className="absolute w-full h-[865px] lg:bg-gradient-to-r from-black/60 from-[10%]  z-10" />
      <div className="absolute top-1/2 md:left-40 -translate-y-1/2 md:text-6xl text-5xl  z-10 text-white max-lg:text-custom-blue-primary pl-5 md:pl-10">
        <div>
          <span className="font-bold">P</span>erseverance
        </div>
        <br />
        <div>
          <span className="font-bold">C</span>
          ommitment
        </div>
        <div>
          <br />
          <span className="font-bold">H</span>
          umility
        </div>
        <div>
          <br />
          <span className="font-bold">S</span>trength
        </div>
        <Link href="/admission">
          <Button
            size="xl"
            className="my-10 bg-custom-blue-light  hover:bg-custom-blue-hover"
          >
            Get Started
          </Button>
        </Link>
      </div>
      <div className="max-lg:hidden">
        <Carousel
          carouselOptions={{
            loop: true,
          }}
        >
          <CarouselNext className="h-14 w-14" />
          <CarouselPrevious className="h-14 w-14" />
          <CarouselMainContainer className="h-[865px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <SliderMainItem key={index} className="bg-transparent">
                <div className="h-full w-[1903px] mx-auto flex items-center justify-center bg-background">
                  <Image
                    src={`/hero${index}.png`}
                    alt="hero"
                    width={1920}
                    height={1080}
                  />
                </div>
              </SliderMainItem>
            ))}
          </CarouselMainContainer>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <CarouselThumbsContainer className="gap-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselIndicator
                  key={index}
                  index={index}
                  className="data-[active='false']:bg-slate-600 data-[active='true']: bg-slate-100"
                />
              ))}
            </CarouselThumbsContainer>
          </div>
        </Carousel>
      </div>
      <div className="lg:hidden w-full h-[865px]" />
    </>
  );
};

export default Hero;
