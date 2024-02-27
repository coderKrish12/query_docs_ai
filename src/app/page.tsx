"use client";
import Sectionheading from "@/components/SectionHeading";
import CarouselSlider, { SliderElement } from "@/components/Slider";
import { ColorModeContext } from "@/store/context/ThemeContext";
import { AdditionalBenefitsData, HomeProcessFlow } from "@/utils/UtilsData";
import { Button, Divider, Grid, Typography, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useContext, useLayoutEffect, useState } from "react";
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});
export default function Home() {
  const theme = useTheme();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const [bannerUrl, setBannerUrl] = useState("/images/HomePageBanner.png");

  useLayoutEffect(() => {
    const handleWindowResize = () => {
      const { innerWidth } = window;
      if (innerWidth < 768) {
        setBannerUrl("/images/HomePageBanner90Degree.png");
      } else {
        setBannerUrl("/images/HomePageBanner.png");
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      <div className="z-40 p-2 items-center justify-end w-full flex">
        <div
          className="rounded-3xl flex w-fit p-1"
          style={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Image
            src="/images/LightModeIcon.png"
            width={30}
            height={30}
            alt="light"
            className="rounded-full p-1 m-1 cursor-pointer"
            onClick={toggleColorMode}
            style={{
              backgroundColor:
                mode === "light" ? theme.palette.primary.main : "",
            }}
          />
          <Image
            src="/images/DarkModeIcon.png"
            width={30}
            height={30}
            alt="dark"
            className="rounded-full p-1 m-1 cursor-pointer"
            onClick={toggleColorMode}
            style={{
              backgroundColor:
                mode === "dark" ? theme.palette.primary.main : "",
            }}
          />
        </div>
      </div>
      <Image
        src={bannerUrl}
        width={0}
        height={0}
        priority
        unoptimized
        className="w-full h-auto absolute z-10"
        alt="Home Page"
      />
      <div className="w-full z-20 flex flex-col items-center justify-center p-10 !pt-20 ">
        <Typography className="text-[1.3rem] md:text-3xl text-white mb-2">
          Chat with any document easily
        </Typography>
        <Typography className="text-white text-sm font-medium">
          Transforming PDFs into Conversational Hubs.
        </Typography>
        <Typography className="text-white text-sm font-medium mb-5">
          Explore the Possibilities with Querydocs.
        </Typography>
        <Button
          variant="contained"
          className="capitalize px-10 w-full md:w-fit"
        >
          Try for free
        </Button>
      </div>
      <div className="w-full h-full flex items-center justify-center z-20">
        <div
          className="w-full m-6 h-[300px] md:h-[500px] md:w-7/12 p-4 md:p-10 flex items-center justify-center md:rounded-lg [&_iframe]:rounded-lg relative"
          style={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <ReactPlayer
            url="https://www.youtube.com/embed/tctS3bHOAL8?si=70wZAPAWom1aN7iB"
            controls
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <Grid
        container
        p={4}
        py={10}
        alignItems="center"
        justifyContent="center"
        className="flex-col-reverse sm:flex-row"
        zIndex={20}
        bgcolor={theme.palette.background.default}
      >
        <Grid
          item
          xs={12}
          sm={4}
          className="p-2 sm:p-12 text-center sm:text-start"
        >
          <Typography className="text-xs sm:text-sm">
            Transform Static PDFs into Interactive Conversations, Insights, and
            Knowledge Nuggets.
          </Typography>
          <Typography className="text-6xl sm:text-7xl mt-2 font-semibold uppercase">
            Navigate
          </Typography>
          <Typography className="text-2xl sm:text-3xl mt-1 font-semibold uppercase tracking-wider">
            Interact and learn
          </Typography>

          <Typography className="text-xs sm:text-sm mt-3">
            Discover the Future of Document Engagement with querydocs.
          </Typography>
          <Button
            variant="contained"
            className="py-2 px-12 mt-6 w-[95%] sm:w-fit font-semibold capitalize"
          >
            Explore
          </Button>
        </Grid>
        <Grid item xs={12} sm={5} p={3}>
          <Image
            src="/images/NavigateSectionImage.png"
            width={0}
            height={0}
            priority
            unoptimized
            className="w-full"
            alt="Navigate"
          />
        </Grid>
      </Grid>
      <Grid
        container
        bgcolor={theme.palette.background.paper}
        zIndex={20}
        position="relative"
      >
        {HomeProcessFlow.map((process) => {
          return (
            <Grid
              key={process.title}
              item
              xs={12}
              md={3}
              p={2}
              mb={8}
              className="text-center items-center flex flex-col"
            >
              <Image
                src={process.image}
                width={0}
                height={0}
                priority
                unoptimized
                className="w-full h-[290px] object-contain p-6"
                alt={process.title}
              />
              <Typography className="text-lg">{process.title}</Typography>
              <Divider className="w-3/4 my-4" />
              <Typography className="text-sm w-3/4">
                {process.description}
              </Typography>
            </Grid>
          );
        })}
        <div className="absolute flex flex-col items-center sm:items-start sm:flex-row pt-[200px] justify-evenly w-full h-full">
          <Image
            src={`/images/DirectionArrow${mode === "dark" ? "" : "Dark"}1.png`}
            width={0}
            height={0}
            unoptimized
            className="w-20 h-fit -mt-36 sm:mt-0 ml-6 rotate-90 sm:rotate-0"
            alt="next"
          />
          <Image
            src={`/images/DirectionArrow${mode === "dark" ? "" : "Dark"}2.png`}
            width={0}
            height={0}
            unoptimized
            className="w-20 h-fit rotate-90 sm:rotate-0"
            alt="next"
          />
          <Image
            src={`/images/DirectionArrow${mode === "dark" ? "" : "Dark"}3.png`}
            width={0}
            height={0}
            unoptimized
            className="w-20 h-fit sm:mr-12 rotate-90 sm:rotate-0"
            alt="next"
          />
        </div>
      </Grid>
      <section
        className="w-full py-10"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <div
          className="rounded-tr-[200px] rounded-bl-[200px] h-full w-full p-10"
          style={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Sectionheading text="Additional Benefits" />
          <CarouselSlider>
            {AdditionalBenefitsData.map((benefit, i) => {
              return (
                <SliderElement
                  key={i}
                  className={`number-slide${i} flex flex-col items-center justify-between rounded-[30px] text-center shadow-lg`}
                  style={{
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <Image
                    src={benefit.image}
                    width={0}
                    height={0}
                    priority
                    unoptimized
                    className="w-full object-contain shadow-md"
                    alt={benefit.title}
                  />
                  <div className=" py-8 flex flex-col items-center justify-center">
                    <Typography className="text-lg">{benefit.title}</Typography>
                    <Divider className="w-3/4 mt-10 mb-6" />
                    <Typography className="text-sm w-3/4">
                      {benefit.description}
                    </Typography>
                  </div>
                </SliderElement>
              );
            })}
          </CarouselSlider>
        </div>
      </section>
    </>
  );
}
