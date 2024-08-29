import { FC, useEffect } from "react";
import { Colors, sliderListElementID } from "~/constants";
import { Box } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { HScrollList } from "./HScrollList";
import CarouselSliderItem, { CarouselSliderItemProps } from "./CarouselSliderItem";

const HomeScrollListContent: FC<HomeScrollListContentProps> = ({ sliderItems }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  useEffect(() => {
    if (!window) return;
    const scrollElement = document.getElementById(sliderListElementID);
    const childElements = Array.from(scrollElement?.children ?? []);
    const firstChild = childElements[0];
    if (firstChild) {
      const rect = firstChild.getBoundingClientRect();
      const scrollLeftValue = Math.floor((rect.width + 32) * (sliderItems.length / 2));
      scrollElement?.scrollTo({ behavior: "instant", left: isEn ? scrollLeftValue : -scrollLeftValue });
    }
  }, [isEn, sliderItems.length]);

  return (
    <Box
      width={"100%"}
      height={"550px"}
      sx={{
        "@media (max-WIDTH: 700px)": {
          height: "410px",
        },
        "& .h-scroll-list-item": {
          aspectRatio: "915/436",
          maxWidth: "870px",
          "@media (max-width: 700px)": {
            aspectRatio: "1",
          },
        },
      }}
    >
      <HScrollList
        id={sliderListElementID}
        // itemsClassName="aspect-square md:aspect-[735/436] 2xl:aspect-[915/436] max-w-[870px]"
        // showControls={false}
        controlsClassName="mt-8"
        controlsPosition={"bottom-trailing"}
        prevButton={
          <Box
            sx={{
              color: Colors.Neutral[500],
              backgroundColor: Colors.Neutral[900],
              borderRadius: "50%",
              width: "27px",
              height: "27px",
              minWidth: "27px",
              minHeight: "27px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: Colors.Neutral[800],
              },
            }}
          >
            <FaChevronLeft />
          </Box>
        }
        nextButton={
          <Box
            sx={{
              color: Colors.Neutral[500],
              backgroundColor: Colors.Neutral[900],
              borderRadius: "50%",
              width: "27px",
              height: "27px",
              minWidth: "27px",
              minHeight: "27px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: Colors.Neutral[800],
              },
            }}
          >
            <FaChevronRight />
          </Box>
        }
        // className="h-[410px] md:h-[500px] lg:h-[550px]"
        className="h-full"
      >
        {sliderItems.map((item, i) => {
          return <CarouselSliderItem key={i} id={`${sliderListElementID}-${i}`} {...item} />;
        })}
      </HScrollList>
    </Box>
  );
};

interface HomeScrollListContentProps {
  sliderItems: CarouselSliderItemProps[];
}

export default HomeScrollListContent;
