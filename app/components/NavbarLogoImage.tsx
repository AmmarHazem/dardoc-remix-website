import { FC } from "react";
import { Box, Image } from "@chakra-ui/react";
import VLink from "./VLink";

const NavbarLogoImage: FC<NavbarLogoImageProps> = ({ onClick }) => {
  return (
    <VLink to="/" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100px" }} onClick={onClick}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} paddingTop={{ base: "0px", lg: "4px" }}>
        <Box display={"flex"} alignItems={"center"} pos={"relative"} width={"46px"} height={"26px"}>
          <Image
            src="https://dardocstorageaccount.blob.core.windows.net/dardocpictures/Group%20166595407698347.svg"
            alt="DarDoc"
            objectPosition={"center"}
            loading="eager"
            width={46}
            height={27}
          />
        </Box>
      </Box>
    </VLink>
  );
};

interface NavbarLogoImageProps {
  onClick?: () => void;
}

export default NavbarLogoImage;
