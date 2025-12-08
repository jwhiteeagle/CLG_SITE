"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const featuredImages = [
  "April-12.jpg",
  "Coven-Army-Jan-2019-3.jpg",
  "Death Guard Vehicles-2.jpg",
  "Death-Guard-Sicaran-Class-4-1024x681.jpg",
  "Deathwatch_Army-9.jpg",
  "DSC_0004.JPG",
  "DSC_0012-2.JPG",
  "DSC_0022.JPG",
  "DSC_0025.JPG",
  "Eldar-Ranger-3.jpg",
  "Guillimans-1024x681.jpg",
  "Harlequins_Oct_2018-1-1-1024x681.jpg",
  "House-Griffith-Porphyrion-1.jpg",
  "IMG_1579.jpg",
  "Imperial Knights-2.jpg",
  "Iron-Warriors-3.jpg",
  "Isengard-Army-1.jpg",
  "Isengard-Army-13.jpg",
  "Isengard-Army-23.jpg",
  "Isengard-Army-24.jpg",
  "Isengard-Army-5.jpg",
  "Kabal-of-the-Black-Tongue-4-1024x681.jpg",
  "Knight-Lancer-1.jpg",
  "Lord-of-Skulls-9.jpg",
  "Nurgle Plague Hulk-6.jpg",
  "Nurgle-Renegade-Knight-2.jpg",
  "Thunderhawk-Gunship-12.jpg",
  "Thunderhawk-Gunship-17.jpg",
  "Thunderhawk-Gunship-2.jpg",
  "Thunderhawk-Gunship-7.jpg",
  "Tzeentch-Army-2-2.jpg",
  "Tzeentch-Army-2-5.jpg",
  "Tzeentch-Army-2.jpg",
  "Tzeentch-Daemons-2-10.jpg",
  "Tzeentch-Daemons-2-19.jpg",
  "Tzeentch-Daemons-2-8.jpg",
  "Yvahra-Dynamic-Pose-6.jpg",
];

export function FeaturedCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {featuredImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 dark:border-white/5">
                {/* Gradient overlay for iOS-style depth */}
                <div 
                  className="absolute inset-0 z-10 rounded-lg opacity-[0.08] pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, transparent 50%)'
                  }}
                />
                <Image
                  src={`/images/featured/${image}`}
                  alt={`Featured work ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
