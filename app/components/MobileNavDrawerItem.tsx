import { FC, useMemo } from "react";
import { NavLink } from "@remix-run/react";
import { Button } from "@chakra-ui/react";
import { Colors } from "~/constants";
import { useTranslation } from "react-i18next";

const MobileNavDrawerItem: FC<MobileNavDrawerItemProps> = ({ text, href, fontSize, onClick }) => {
  const { t } = useTranslation();

  const trimText = useMemo(() => {
    const tText = t(text);
    const limit = 34;
    if (tText.trim().length < limit) {
      return tText;
    }
    return `${tText.slice(0, limit)}...`;
  }, [t, text]);

  return (
    <li className={`mobile-nav-drawer-item`}>
      <div>
        {/* initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ ease: "easeOut" }} */}
        <NavLink
          to={href}
          onClick={(e) => {
            e.preventDefault();
            onClick(href);
          }}
        >
          <Button
            _hover={{
              backgroundColor: "unset",
            }}
            _focus={{
              backgroundColor: "unset",
            }}
            _active={{
              backgroundColor: "unset",
            }}
            _focusVisible={{
              boxShadow: "none",
            }}
            size={"sm"}
            fontSize={fontSize ?? 20}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              fontWeight: "600",
              textTransform: "capitalize",
              backgroundColor: "unset",
              color: Colors.Neutral[800],
            }}
          >
            {trimText}
          </Button>
        </NavLink>
      </div>
    </li>
  );
};

interface MobileNavDrawerItemProps {
  text: string;
  href: string;
  fontSize?: number;
  onClick: (href: string) => void;
}

export default MobileNavDrawerItem;
