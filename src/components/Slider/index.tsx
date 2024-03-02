// React Imports
import React, { useState } from "react";

// UI Imports
import { IconButton, useTheme } from "@mui/material";

// Third party Imports
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// Icon Imports
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function CarouselSlider({
  children,
  sliderConfig,
}: {
  children: React.ReactNode;
  sliderConfig: Object;
}) {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    ...sliderConfig,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div ref={sliderRef} className="keen-slider mt-10 py-10">
        {children}
      </div>
      {loaded &&
        instanceRef.current &&
        Math.round(instanceRef.current.track.details.slidesLength) > 1 && (
          <div className="w-full flex items-center justify-evenly">
            <IconButton
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
              className="disabled:!bg-slate-200 disabled:text-slate-500 !rounded-md text-white"
              sx={{
                backgroundColor: `${theme.palette.primary.main}!important`,
              }}
            >
              <FaChevronLeft />
            </IconButton>
            <IconButton
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
              className="disabled:!bg-slate-200 disabled:text-slate-500 !rounded-md text-white"
              sx={{
                backgroundColor: `${theme.palette.primary.main}!important`,
              }}
            >
              <FaChevronRight />
            </IconButton>
          </div>
        )}
    </>
  );
}

export default CarouselSlider;

export const SliderElement = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className: string;
  [key: string]: any;
}) => {
  return (
    <div className={`keen-slider__slide ${className}`} {...props}>
      {children}
    </div>
  );
};
