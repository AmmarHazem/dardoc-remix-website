import { FC, useMemo, useState } from "react";
import { useLocation } from "@remix-run/react";
import { Colors, chatWithUsNavLink, navbarHomeLink, topbarLinks } from "~/constants";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import MobileNavMenuDrawer from "./MobileNavMenuDrawer";
import ChatWithUsButton from "./ChatWithUsButton";
import ExpandedTopMenu from "./ExpandedTopMenu";
import VNavLink from "./VNavLink";
import NavbarLogoImage from "./NavbarLogoImage";

const DDNavbar: FC = () => {
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
  const [showMenu, setShowMenu] = useState<string>();
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const navbarItems = useMemo(() => {
    const pagesWithOnlyHomeLink = ["/mai", "/eliane", "/noor", "/sam", "/aya", "/nimra", "/isha", "/khushboo", "/kashish"];
    if (pagesWithOnlyHomeLink.includes(pathname)) {
      return [navbarHomeLink];
    }
    return topbarLinks;
  }, [pathname]);

  return (
    <>
      <ExpandedTopMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      <Box as="nav" borderBottom={`1px solid ${Colors.Neutral[100]}`} zIndex={"50"} top={0} pos={"sticky"}>
        <Box
          pos={"relative"}
          paddingY={{ base: 1, lg: 1 }}
          className="topbar_menu white-glass-bg"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          style={{ height: `var(--nav-bar-height)` }}
        >
          <Box
            display={{ base: "flex", lg: "none" }}
            pos={"absolute"}
            top={"0"}
            left={"0"}
            width={"100%"}
            height={"var(--nav-bar-height)"}
            justifyContent={"center"}
            alignItems={"center"}
            paddingTop={2}
            zIndex={"10"}
          >
            <NavbarLogoImage onClick={() => setShowMenu(undefined)} />
          </Box>
          <Box paddingX={4} display={"flex"} justifyContent={"space-between"} className="container">
            <Box display={{ base: "none", lg: "block" }}>
              <NavbarLogoImage onClick={() => setShowMenu(undefined)} />
            </Box>
            <Box
              as="nav"
              display={{ base: "none", lg: "flex" }}
              width={"fit-content"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={{ base: 4, lg: 8 }}
            >
              {navbarItems.map((link) => {
                return (
                  <VNavLink
                    key={link.route}
                    to={link.route}
                    target={link.route === chatWithUsNavLink.route ? "_blank" : undefined}
                    rel="noreferrer"
                    onMouseEnter={() => {
                      if (link.subMenus.length) {
                        setShowMenu(link.route);
                      }
                    }}
                    onClick={() => {
                      setShowMenu(undefined);
                    }}
                    className={`topbar_link topbar-text-shadow`}
                  >
                    <Text
                      fontSize={"13px"}
                      color={"black"}
                      whiteSpace={"wrap"}
                      display={"inline-block"}
                      _hover={{
                        color: "black",
                      }}
                    >
                      {t(link.label)}
                    </Text>
                  </VNavLink>
                );
              })}
            </Box>
            <Box display={{ base: "none", lg: "block" }}>
              <ChatWithUsButton text={t("talk-to-us")} />
            </Box>
            <Box display={{ base: "flex", lg: "none" }} alignItems={"center"} pos={"relative"} zIndex={20}>
              <IconButton
                onClick={() => {
                  setOpenMobileDrawer(!openMobileDrawer);
                }}
                sx={{ position: "static", backgroundColor: "unset" }}
                _hover={{
                  backgroundColor: "unset",
                }}
                _focus={{
                  backgroundColor: "unset",
                }}
                _active={{
                  backgroundColor: "unset",
                }}
                size="small"
                aria-label={"DarDoc"}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11 20H29M11 14H29M11 26H29"
                    stroke="#1A1A1A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </IconButton>
            </Box>
          </Box>
        </Box>
        <MobileNavMenuDrawer
          open={openMobileDrawer}
          topbarLinks={navbarItems}
          onClose={function (): void {
            setOpenMobileDrawer(false);
          }}
        />
      </Box>
    </>
  );
};

export default DDNavbar;
