import { Box } from "@chakra-ui/react";
import { FC } from "react";
import HomeScrollListContent from "./HomeScrollListContent";
import { CarouselSliderItemProps } from "./CarouselSliderItem";

const MobileHomeScrollList: FC<MobileHomeScrollListProps> = ({ sliderItems }) => {
  return (
    <Box
      paddingTop={"4rem"}
      paddingBottom={"4rem"}
      backgroundColor={"black"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      gap={"32px"}
      sx={{
        "& #home-hero-slider .home-slider-video": { opacity: 0 },
        "& #home-hero-slider .in-view .home-slider-video": { opacity: 1 },
        "& #home-hero-slider .content-box": {
          opacity: 0.6,
        },
        "& #home-hero-slider .content-box.in-view": {
          opacity: 1,
        },
        "& #home-hero-slider .content-box:hover": {
          opacity: 1,
        },
        "& #home-hero-slider .content-box:hover .home-slider-video": {
          opacity: 1,
        },
      }}
    >
      <HomeScrollListContent sliderItems={sliderItems} />
    </Box>
  );
};

interface MobileHomeScrollListProps {
  sliderItems: CarouselSliderItemProps[];
}

export default MobileHomeScrollList;
