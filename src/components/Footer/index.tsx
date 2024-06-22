// React Imports
import { useContext } from "react";

// Next Imports
import Image from "next/image";

// UI Imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  useTheme,
} from "@mui/material";

// Icon Imports
import { MdExpandMore } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa";

// Context Imports
import { ColorModeContext } from "@/appStateStore/context/ThemeContext";

// Util Imports
import { FooterSections } from "@/utils/UtilsData";

function Footer() {
  const theme = useTheme();
  const { mode } = useContext(ColorModeContext);
  const LogoImageUrl =
    mode === "light" ? "/images/LogoImage.png" : "/images/LogoImageDark.png";
  return (
    <Grid container className="bg-black text-white">
      <Grid item xs={12} sm={6} md={3} className="p-6 md:p-10">
        <p>
          Dive into a whole new reading experience! Chat with your favorite
          books using PDF.ai and get ready for interactive conversations that
          bring the pages to life.
        </p>
      </Grid>
      {FooterSections.map((section, i) => {
        return (
          <Grid
            item
            key={i}
            xs={12}
            sm={6}
            md={3}
            p={6}
            className="justify-between hidden md:flex "
          >
            <div className="flex flex-col">
              <p className="text-md text-2xl mb-2 font-medium">
                {section.title}
              </p>
              {section.children.map((item, i) => {
                return (
                  <p key={i} className="my-1 text-sm">
                    {item.title}
                  </p>
                );
              })}
            </div>
            {i !== section.children.length && (
              <Divider orientation="vertical" />
            )}
          </Grid>
        );
      })}
      {FooterSections.map((section, i) => {
        return (
          <Grid
            item
            key={i}
            xs={12}
            sm={6}
            md={3}
            className="justify-between w-full flex md:hidden"
          >
            <Accordion className="bg-black w-full text-white">
              <AccordionSummary
                expandIcon={<MdExpandMore className="text-white" />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="text-md text-lg mb-2 font-medium"
              >
                {section.title}
              </AccordionSummary>
              <AccordionDetails>
                {section.children.map((item, i) => {
                  return (
                    <p key={i} className="my-1 text-sm">
                      {item.title}
                    </p>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Grid>
        );
      })}
      <Grid
        container
        item
        xs={12}
        alignItems="center"
        justifyContent="center"
        className="text-[0.6rem] sm:text-[0.8rem] md:text-[1rem]"
        sx={{
          backgroundColor:
            theme.palette.background[mode === "light" ? "default" : "paper"],
          color: theme.palette.text.primary,
        }}
      >
        <Grid item xs={3}>
          <Image
            src={LogoImageUrl}
            width={0}
            height={0}
            priority
            unoptimized
            className="w-full md:w-[70%] h-auto p-4"
            alt="Query Docs"
          />
        </Grid>
        <Grid item xs={3}>
          <p className="flex items-center">
            <FaRegCopyright className="mr-2" /> Query Docs AI
          </p>
        </Grid>
        <Grid item xs={3}>
          <p>Privacy Policy</p>
        </Grid>
        <Grid item xs={3}>
          <p>Terms & Conditions</p>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
