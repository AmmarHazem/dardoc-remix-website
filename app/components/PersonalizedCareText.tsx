import { Text, Box, Heading } from "@chakra-ui/react";
import { FC } from "react";

const PersonalizedCareText: FC = () => {
  return (
    <Box
      as="section"
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      backgroundColor={"black"}
      color={"white"}
      paddingY={20}
      paddingX={4}
      gap={4}
    >
      <Heading width={"100%"} textAlign={"center"} size={"3xl"} className="text-teal-gradient">
        Personalized care for all.
      </Heading>
      <Text width={"100%"} textAlign={"center"} maxW={"500px"} fontWeight={500} fontSize={"large"}>
        Supercharge your healthcare experience with services tailored for everyone. Enjoy access to doctors, nurses, disease
        management plans, childcare services, medications, and a host of other resources, all expertly curated by our network of
        industry leading professionals.
      </Text>
    </Box>
  );
};

export default PersonalizedCareText;
