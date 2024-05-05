import React from "react";
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const announcements = ["/Enrolment.png", "/Foundation.png"];
const Announcement = () => {
  return (
    <div className="size-full flex justify-center bg-custom-blue-light">
      <div className="max-w-[1350px] my-20">
        <div className="text-3xl md:text-6xl mb-10 text-white font-semibold">
          Announcements
        </div>
        <div>
          <Carousel
            carouselOptions={{
              loop: true,
            }}
          >
            <CarouselNext />
            <CarouselPrevious />
            <div className="relative ">
              <CarouselMainContainer className="h-full">
                {Array.from({ length: announcements.length }).map(
                  (_, index) => (
                    <SliderMainItem key={index} className="bg-transparent">
                      <div className="size-full flex items-center justify-center rounded-xl bg-background overflow-hidden">
                        <Image
                          src={announcements[index]}
                          alt="announcement"
                          width={1500}
                          height={588}
                        />
                      </div>
                    </SliderMainItem>
                  )
                )}
              </CarouselMainContainer>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                <CarouselThumbsContainer className="gap-x-1 ">
                  {Array.from({ length: announcements.length }).map(
                    (_, index) => (
                      <CarouselIndicator
                        key={index}
                        index={index}
                        className="data-[active='false']:bg-slate-600 data-[active='true']: bg-slate-100"
                      />
                    )
                  )}
                </CarouselThumbsContainer>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
