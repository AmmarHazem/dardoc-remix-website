import FadeInImage from "./FadeInImage";
import { FC, RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useWindowSize from "~/hooks/useWindowSize";
import useHScrollListControls from "~/hooks/useHScrollListControls";

export const HScrollList: FC<HScrollListProps> = ({
  // height,
  //   scrollElementClassName,
  children,
  id,
  controlsPosition,
  nextIcon,
  prevIcon,
  showControls = true,
  controlsClassName,
  className,
  controlsContainerClassName,
  itemsClassName,
  nextButton,
  prevButton,
  scrollRef,
  leadingTrailingPadding = true,
  onScroll,
}) => {
  const { width: screenWidth } = useWindowSize();
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const [margin, setMargin] = useState(0);

  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const isAr = i18n.language === "ar";

  useEffect(() => {
    if (!window) return;
    setMargin(() => {
      const containerMaxWith = 1360; // 1280;
      const value = Math.max((screenWidth - containerMaxWith) / 2, 0);
      return value;
    });
  }, [screenWidth]);

  const { handleNextClicked, handlePreviousClicked, disableNext, disablePrevious } = useHScrollListControls({
    scrollElementRef: scrollRef ?? scrollElementRef,
  });

  const controls = useMemo(() => {
    return (
      <Box
        display={"flex"}
        gap={4}
        width={24}
        flexDir={isAr ? "row-reverse" : "row"}
        className={controlsClassName}
        // className={clsx("flex gap-4 w-24", controlsClassName, { "flex-row-reverse": isAr })}
      >
        {prevButton ? (
          <button
            aria-label="Previous slide"
            onClick={handlePreviousClicked}
            style={{ opacity: disablePrevious ? 0.5 : 1 }}
            disabled={disablePrevious}
          >
            {prevButton}
          </button>
        ) : (
          <button aria-label="Previous slide" onClick={handlePreviousClicked}>
            {prevIcon ? (
              <Image
                src={prevIcon}
                alt="Scroll Previous"
                width={{ base: "18px", md: "26px" }}
                height={{ base: "18px", md: "26px" }}
              />
            ) : (
              <FadeInImage src={"/images/arrow.left.svg"} alt="Scroll Previous" />
            )}
          </button>
        )}
        {nextButton ? (
          <button
            aria-label="Next slide"
            onClick={handleNextClicked}
            style={{ opacity: disableNext ? 0.5 : 1 }}
            disabled={disableNext}
          >
            {nextButton}
          </button>
        ) : (
          <button aria-label="Next slide" onClick={handleNextClicked}>
            {nextIcon ? (
              <Image
                src={nextIcon}
                alt="Scroll Next"
                width={{ base: "18px", md: "26px" }}
                height={{ base: "18px", md: "26px" }}
              />
            ) : (
              <FadeInImage src={"/images/arrow.right.svg"} alt="Scroll Next" />
            )}
          </button>
        )}
      </Box>
    );
  }, [
    controlsClassName,
    disableNext,
    disablePrevious,
    handleNextClicked,
    handlePreviousClicked,
    isAr,
    nextButton,
    nextIcon,
    prevButton,
    prevIcon,
  ]);

  const controlsClassNames = `h-scroll-list-controls flex container-md`;

  return (
    <Box display={"flex"} flexDir={"column"} className={className}>
      {showControls && (controlsPosition === "top-leading" || controlsPosition === "top-trailing") && (
        <Box
          sx={{ justifyContent: controlsPosition === "top-trailing" ? "flex-end" : "flex-start" }}
          display={"flex"}
          marginBottom={8}
          className={`${controlsClassNames} ${controlsContainerClassName ?? ""}`}
        >
          {controls}
        </Box>
      )}
      <Box
        id={id}
        ref={scrollRef ?? scrollElementRef}
        paddingX={leadingTrailingPadding ? 8 : 0}
        height={"100%"}
        overflowX={"scroll"}
        overflowY={"hidden"}
        display={"flex"}
        gap={4}
        width={"100%"}
        marginX={"auto"}
        // scrollSnapAlign={"center"}
        scrollSnapType={"x mandatory"}
        className={"hide-scrollbar"}
        onScroll={onScroll}
      >
        {children.map((item, i) => {
          return (
            <Box
              key={i}
              height={"100%"}
              scrollSnapAlign={"center"}
              className={`h-scroll-list-item ${itemsClassName ?? ""}`}
              style={{
                marginLeft: isEn && i === 0 && leadingTrailingPadding ? `${margin}px` : "0px",
                marginRight: isEn && i === children.length - 1 && leadingTrailingPadding ? `${margin}px` : "0px",
              }}
            >
              {item}
            </Box>
          );
        })}
      </Box>
      {showControls && (controlsPosition === "bottom-leading" || controlsPosition === "bottom-trailing") && (
        <Box
          style={{ justifyContent: controlsPosition === "bottom-trailing" ? "flex-end" : "flex-start" }}
          className={`${controlsClassNames} ${controlsContainerClassName ?? ""}`}
        >
          {controls}
        </Box>
      )}
    </Box>
  );
};

interface HScrollListProps {
  // items: JSX.Element[];
  children: React.ReactNode[];
  scrollRef?: RefObject<HTMLDivElement>;
  scrollElementClassName?: string;
  // height: string;
  id: string;
  nextIcon?: string;
  prevIcon?: string;
  showControls?: boolean;
  controlsPosition: "top-leading" | "top-trailing" | "bottom-leading" | "bottom-trailing";
  controlsClassName?: string;
  className?: string;
  controlsContainerClassName?: string;
  itemsClassName?: string;
  leadingTrailingPadding?: boolean;
  nextButton?: React.ReactNode;
  prevButton?: React.ReactNode;
  onScroll?: () => void;
}
