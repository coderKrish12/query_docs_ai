"use client";
// Next Imports
import dynamic from "next/dynamic";
import Image from "next/image";

// React Imports
import { useContext, useLayoutEffect, useState } from "react";

// UI Component Imports
import Sectionheading from "@/components/SectionHeading";
import CarouselSlider, { SliderElement } from "@/components/Slider";

// Context Imports
import { ColorModeContext } from "@/appStateStore/context/ThemeContext";

// Util Imports
import {
  AdditionalBenefitsData,
  FeaturesData,
  HomeProcessFlow,
  PricingData,
  TestimonialsData,
  UseCasesData,
} from "@/utils/UtilsData";

// UI Imports
import {
  Avatar,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

// Icon Imports
import { IoStar } from "react-icons/io5";

// Third party Imports
import { useRouter } from "next-nprogress-bar";
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const [bannerUrl, setBannerUrl] = useState("/images/HomePageBanner.png");
  const additionalbenefitsSliderConfig = {
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 2, spacing: 50 },
      },
      "(min-width: 900px)": {
        slides: { perView: 4, spacing: 50 },
      },
    },
    slides: {
      perView: 1,
      spacing: 50,
    },
  };
  const testimonialsSliderConfig = {
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 2, spacing: 50 },
      },
      "(min-width: 900px)": {
        slides: { perView: 3, spacing: 50 },
      },
    },
    slides: {
      perView: 1,
      spacing: 50,
    },
  };

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
          onClick={() => {
            router.push("/dashboard");
          }}
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
        bgcolor={
          theme.palette.background[mode === "light" ? "default" : "paper"]
        }
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
          backgroundColor:
            theme.palette.background[mode === "light" ? "default" : "paper"],
        }}
      >
        <div
          className="rounded-tr-[200px] rounded-bl-[200px] h-full w-full p-10"
          style={{
            backgroundColor:
              theme.palette.background[mode === "light" ? "paper" : "default"],
          }}
        >
          <Sectionheading text="Additional Benefits" />
          <CarouselSlider sliderConfig={additionalbenefitsSliderConfig}>
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
      <section
        className="w-full py-10"
        style={{
          backgroundColor:
            theme.palette.background[mode === "light" ? "default" : "paper"],
        }}
      >
        <Sectionheading text="Our Features" />
        <Grid container>
          {FeaturesData.map((feature, i) => {
            return (
              <Grid key={i} item xs={12} sm={6} md={4} p={2}>
                <div
                  className="flex rounded-lg shadow-lg p-6 h-full"
                  style={{
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <div className="border rounded-md h-fit flex items-center justify-center p-2 w-2/12">
                    <Image
                      src={feature.image}
                      width={45}
                      height={45}
                      alt={feature.title}
                    />
                  </div>
                  <div className="px-4 w-10/12">
                    <Typography className="font-semibold text-xs">
                      {feature.title}
                    </Typography>
                    <Typography className="text-xs">
                      {feature.description}
                    </Typography>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </section>
      <section
        className="w-full py-10"
        style={{
          backgroundColor:
            theme.palette.background[mode === "light" ? "default" : "paper"],
        }}
      >
        <div
          className="rounded-tr-[200px] rounded-bl-[200px] h-full w-full p-10"
          style={{
            backgroundColor:
              theme.palette.background[mode === "light" ? "paper" : "default"],
          }}
        >
          <Sectionheading text="Use Cases" />
          <Typography className="w-full text-center mb-8">
            Unlock the power of your documents across various professions and
            fields:
          </Typography>
          <Grid container my={6}>
            {UseCasesData.map((useCase, i) => {
              return (
                <Grid key={i} item xs={12} sm={6} md={3} p={2}>
                  <div
                    className="p-10 text-center h-full shadow-lg rounded-lg flex flex-col items-center justify-between"
                    style={{
                      backgroundColor:
                        theme.palette.background[
                          mode === "light" ? "default" : "paper"
                        ],
                    }}
                  >
                    <Image
                      src={useCase.image}
                      width={0}
                      height={0}
                      className="w-[50px] h-[50px]"
                      unoptimized
                      alt={useCase.title}
                    />
                    <Typography className="my-6 font-medium">
                      {useCase.title}
                    </Typography>
                    <Typography className="text-sm">
                      {useCase.description}
                    </Typography>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </section>
      <section
        className="w-full py-10"
        style={{
          backgroundColor:
            theme.palette.background[mode === "light" ? "default" : "paper"],
        }}
      >
        <Sectionheading text="A pricing solutions for businesses of all sizes" />
        <Grid container justifyContent="center">
          {PricingData.map((pricing, i) => {
            return (
              <Grid key={i} item xs={12} sm={6} md={3} p={4}>
                <div
                  className="shadow-lg rounded-lg flex flex-col h-full"
                  style={{
                    backgroundColor: theme.palette.background.default,
                    paddingTop: !pricing.recommended ? "30px" : "",
                  }}
                >
                  {pricing.recommended && (
                    <Typography className="w-full bg-black text-center uppercase text-xs py-2 rounded-t-lg text-white font-semibold">
                      Recommended
                    </Typography>
                  )}
                  <div className="flex flex-col p-6">
                    <div className="flex items-center justify-between">
                      <Typography className="font-bold">
                        {pricing.title}
                      </Typography>
                      <Typography
                        className="text-xl italic font-medium capitalize"
                        style={{
                          color: theme.palette.primary.main,
                        }}
                      >
                        {pricing.period}ly
                      </Typography>
                    </div>
                    <div className="flex items-end">
                      <Typography
                        className="text-3xl font-bold"
                        style={{
                          color:
                            mode === "dark" ? theme.palette.primary.main : "",
                        }}
                      >
                        {pricing.price}
                      </Typography>
                      <Typography className="text-sm font-semibold ml-4">
                        /{pricing.period}
                      </Typography>
                    </div>
                    <Typography
                      className="text-3xl font-bold mt-2"
                      style={{
                        color:
                          mode === "dark" ? theme.palette.primary.main : "",
                      }}
                    >
                      {pricing.credits} credits
                    </Typography>
                    <Typography className="text-xs mt-4">
                      {pricing.description}
                    </Typography>
                    <Button
                      variant="contained"
                      className="capitalize text-xs p-3 my-6"
                    >
                      Explore
                    </Button>
                    <Typography className="uppercase text-xs text-center">
                      No Credit Cards required
                    </Typography>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </section>
      <section
        className="w-full py-10"
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <div
          className="h-full w-full p-10"
          style={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Sectionheading text="Testimonials" />
          <CarouselSlider sliderConfig={testimonialsSliderConfig}>
            {TestimonialsData.map((testimonial, i) => {
              return (
                <SliderElement
                  key={i}
                  className={`number-slide${i} flex flex-col p-6 rounded-[20px] text-center shadow-lg`}
                  style={{
                    backgroundColor:
                      theme.palette.background[
                        mode === "light" ? "default" : "paper"
                      ],
                  }}
                >
                  <div className="flex">
                    <Avatar
                      sx={{ width: 70, height: 70 }}
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <div className="flex flex-col items-start ml-6">
                      <Typography
                        className="text-xl font-semibold"
                        sx={{
                          color: theme.palette.primary.main,
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography className="text-[10px]">
                        {testimonial.occupation}
                      </Typography>
                      <Rating
                        value={testimonial.rating}
                        emptyIcon={<IoStar />}
                      />
                    </div>
                  </div>
                  <Typography className="text-xs p-6 text-start leading-5">
                    {testimonial.feedback}
                  </Typography>
                </SliderElement>
              );
            })}
          </CarouselSlider>
        </div>
      </section>
      <section
        className="p-8 md:p-16 flex flex-col items-center text-center"
        style={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Typography className="text-xl md:text-4xl font-semibold my-4 text-white">
          Subscribe to our newsletter
        </Typography>
        <Typography className="my-4 text-sm md:text-md text-white">
          Lorem Ipsum is simply dummy text of the printing.
        </Typography>
        <TextField
          placeholder="Email"
          className="w-full sm:w-3/4 md:w-2/4 mt-4 mb-12 [&_div]:!p-2"
          sx={{}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" className="px-10">
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </section>
    </>
  );
}
