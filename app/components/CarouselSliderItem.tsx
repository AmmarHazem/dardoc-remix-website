import { useInView } from "react-intersection-observer";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Colors } from "~/constants";
import VLink from "./VLink";

const CarouselSliderItem: FC<CarouselSliderItemProps> = ({
  text,
  bgImageURL,
  videoURL,
  id,
  style,
  className,
  learnMoreHref,
  borderRadius,
  inViewID,
  // belowTextOverlay,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { ref, inView } = useInView({ threshold: 0.95 });
  const { t } = useTranslation();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (inView || isHovering) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [inView, isHovering]);

  const handleOnClick = useCallback(() => {
    linkRef.current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  return (
    <VLink
      linkRef={linkRef}
      to={learnMoreHref}
      onClick={(e) => {
        if (!inView) {
          e.preventDefault();
          handleOnClick();
        }
      }}
    >
      <Box
        ref={ref}
        style={{ ...(style ?? {}) }}
        sx={{
          transition: "opacity 0.2s ease-out",
        }}
        className={`h-full w-full content-box ${className} ${inView ? "in-view" : ""}`}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsHovering(true);
        }}
        onBlur={(e) => {
          e.stopPropagation();
          setIsHovering(false);
        }}
        onMouseOut={(e) => {
          e.stopPropagation();
          setIsHovering(false);
        }}
      >
        <Box
          id={inView ? inViewID : id}
          //   className="bg-neutral-800 animate-opacity-box"
          backgroundColor={Colors.Neutral[800]}
          sx={{
            // opacity: inView ? 1 : 0.4,
            height: "100%",
            display: "flex",
            borderRadius: borderRadius ?? "12px",
            flexDirection: "column",
            justifyItems: "flex-end",
            position: "relative",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("${bgImageURL}")`,
            backgroundPosition: "center",
            overflow: "hidden",
            width: "100%",
          }}
        >
          {videoURL && (
            <AnimatePresence>
              {videoURL && inView && (
                <motion.div
                  className="w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 1,
                    duration: 0.7,
                  }}
                >
                  <video
                    loop
                    playsInline
                    poster={bgImageURL}
                    muted={true}
                    autoPlay={true}
                    controls={false}
                    preload="auto"
                    className="home-slider-video"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      inset: "0px",
                      zIndex: 0,
                      transition: "opacity 1s ease-in-out",
                    }}
                  >
                    <track kind="captions" />
                    <source src={videoURL} type="video/mp4" />
                    <source src={videoURL} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          {/* {belowTextOverlay} */}
          <Box
            display={"flex"}
            flexDir={{ base: "column", md: "row" }}
            justifyContent={{ base: "flex-end", md: "space-between" }}
            alignItems={{ base: "flex-start", md: "flex-end" }}
            gap={{ base: 4, md: 0 }}
            padding={4}
            pos={"absolute"}
            top={0}
            left={0}
            width={"100%"}
            height={"100%"}
            zIndex={"20"}
          >
            <Box display={"flex"} flexDir={"column"} justifyContent={"flex-end"} marginBottom={1}>
              <Heading
                as="h3"
                fontWeight={600}
                style={{ color: "white", lineHeight: "0.9", margin: "0px" }}
                size={"xl"}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setIsHovering(true);
                }}
                onBlur={(e) => {
                  e.stopPropagation();
                  setIsHovering(true);
                }}
                onMouseOut={(e) => {
                  e.stopPropagation();
                  setIsHovering(true);
                }}
              >
                {t(text?.toString() ?? "")}
              </Heading>
            </Box>
            <Box
              color={"black"}
              backgroundColor={"white"}
              paddingX={5}
              paddingY={2}
              borderRadius={20}
              fontWeight={500}
              fontSize={"13px"}
              onMouseEnter={(e) => {
                e.stopPropagation();
                setIsHovering(true);
              }}
              onBlur={(e) => {
                e.stopPropagation();
                setIsHovering(true);
              }}
              onMouseOut={(e) => {
                e.stopPropagation();
                setIsHovering(true);
              }}
            >
              {t("learn-more")}
            </Box>
          </Box>
        </Box>
      </Box>
    </VLink>
  );
};

export interface CarouselSliderItemProps {
  text: string;
  bgImageURL: string;
  videoURL?: string;
  id?: string;
  inViewID: string;
  borderRadius?: string;
  className?: string;
  learnMoreHref: string;
  // belowTextOverlay?: React.ReactNode;
  style?: React.CSSProperties;
}

export default CarouselSliderItem;
