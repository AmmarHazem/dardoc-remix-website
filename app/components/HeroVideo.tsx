import { Box, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

const HeroVideo: FC<HeroVideoProps> = ({ path, loadingImg }) => {
  return (
    <Box
      as="section"
      width={"100%"}
      height={{ base: "400px", md: "calc(100vh - var(--nav-bar-height))" }}
      pos={"relative"}
      color={"white"}
    >
      <video
        loop
        playsInline
        poster={loadingImg}
        muted={true}
        autoPlay={true}
        controls={false}
        preload="auto"
        style={{ objectFit: "cover", width: "100%", height: "100%", position: "absolute", inset: "0px", zIndex: 0 }}
      >
        <track kind="captions" />
        <source src={path} type="video/mp4" />
        <source src={path} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      <Box
        gap={4}
        pos={"absolute"}
        width={"100%"}
        height={"100%"}
        inset={0}
        zIndex={10}
        background={"linear-gradient(0deg, rgba(0,0,0,0.9) 5%, rgba(0,0,0,0) 100%)"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        paddingX={8}
        paddingY={10}
      >
        <Heading size={"3xl"} as={"h1"} width={"100%"} textAlign={"center"} fontWeight={600}>
          Healthcare
          <br /> Now comes to your home.
        </Heading>
        <Text fontSize={"x-large"}>Newborn Care</Text>
      </Box>
    </Box>
  );
};

interface HeroVideoProps {
  path: string;
  loadingImg: string;
}

export default HeroVideo;
