import React from "react";
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const About = () => {
  return (
    <div className="w-full h-full mb-10 md:my-20 flex justify-center">
      <div className="grid md:grid-cols-2 md:grid-rows-2 w-[1450px] text-justify max-md:gap-y-10">
        <GridItems
          type="desc"
          content="Philippine Chung Hua School Inc. was founded in 1968 by Mr. Agustin N. Tanco. It is located in Sta. Mesa, Manila and provides quality education to Pre-K to 12th-grade students of all faiths and backgrounds. The school has modern facilities, including three buildings, and aims to continually improve by expanding its facilities. PCHS offers English and Chinese subjects and provides scholarships and incentives for academic achievements."
          title="About PCHS"
        />
        <GridItems
          type="image"
          content="Home-About.png"
          images={["/Home_About.jpg"]}
        />
        <GridItems
          type="carousel"
          jsx={
            <CarouselOrientation
              images={["/vision1.jpg", "/vision2.jpg", "/vision3.jpg"]}
            />
          }
          images={["/Home_About.jpg"]}
        />
        <GridItems
          type="desc"
          content="We, at Philippine Chung Hua School, envision ourselves to be agents of transformation of the youth, through innovative and quality education developing in them high sense of moral values, creating peaceful and conducive learning environment, so as to produce well rounded, globally competitive, world class young individuals who can be active participants in national development.
          To realize the vision, we journey with the youth in an environment characterized by strong commitment, perpetual collaboration and networking. learning and collaboration and networking. "
          title="Vision-Mission Statement"
        />
      </div>
    </div>
  );
};

export default About;

type GridItem = {
  type: "desc" | "image" | "carousel";
  title?: string;
  content?: string | JSX.Element;
  jsx?: JSX.Element;
  images?: string[];
};
const GridItems = ({ type, content, title, jsx, images }: GridItem) => {
  return type === "desc" ? (
    <div className="place-self-center px-10">
      <div className="text-3xl font-bold pb-5">{title}</div>
      {content}
    </div>
  ) : type === "carousel" ? (
    <div className="place-self-center px-10">{jsx}</div>
  ) : (
    <div className="place-self-center px-10 rounded-xl">
      <Image
        src={images ? images[0] : ""}
        alt={title ? title : ""}
        width={700}
        height={600}
        style={{ borderRadius: "0.75rem" }}
      />
    </div>
  );
};

type carouselItems = {
  images: string[];
};

const CarouselOrientation = ({ images }: carouselItems = { images: [] }) => {
  return (
    <Carousel
      carouselOptions={{
        loop: true,
      }}
    >
      <CarouselNext className="top-1/3 -translate-y-1/3 h-8 w-8" />
      <CarouselPrevious className="top-1/3 -translate-y-1/3 h-8 w-8" />
      <CarouselMainContainer className="h-60">
        {Array.from({ length: 3 }).map((_, index) => (
          <SliderMainItem key={index} className="bg-transparent">
            <div className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background overflow-hidden">
              <Image
                src={images ? images[index] : ""}
                alt="vision/mission"
                width={700}
                height={600}
              />
            </div>
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer>
        {Array.from({ length: 3 }).map((_, index) => (
          <SliderThumbItem key={index} index={index} className="bg-transparent">
            <div className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background overflow-hidden">
              <Image
                src={images ? images[index] : ""}
                alt="vision/mission"
                width={700}
                height={600}
              />
            </div>
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};
