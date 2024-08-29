import { Button, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Colors } from "~/constants";

const ChatWithUsButton: FC<ChatWithUsButtonProps> = ({ backgroundColor, text = "NEED HELP? CHAT WITH US" }) => {
  return (
    // <a href={whatsappChatLink} target="_blank" rel="noreferrer">
    <Button
      //   onClick={() => {
      //     if (onClick) {
      //       onClick();
      //     }
      //     show();
      //   }}
      fontSize={"small"}
      size={"sm"}
      height={"28px"}
      borderRadius={"30px"}
      paddingY={"8px"}
      paddingRight={"18px"}
      paddingLeft={"14px"}
      display={"flex"}
      gap={"0.5rem"}
      justifyItems={"center"}
      color={"white"}
      _hover={{
        backgroundColor: Colors.Neutral[900],
      }}
      backgroundColor={backgroundColor ?? "black"}
    >
      {/* <FaWhatsapp /> */}
      <Text fontSize={"11px"}>{text}</Text>
    </Button>
    // </a>
  );
};

interface ChatWithUsButtonProps {
  text?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export default ChatWithUsButton;
