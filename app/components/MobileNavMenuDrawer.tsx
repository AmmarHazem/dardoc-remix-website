import MobileNavDrawerItem from "./MobileNavDrawerItem";
import { FC, useCallback, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { Box, Drawer, DrawerContent, IconButton } from "@chakra-ui/react";
import { Colors, TopBarLinkItemModel, TopBarSubMenuItemModel } from "~/constants";
import { useNavigate } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { IoChevronBackOutline } from "react-icons/io5";

const MobileNavMenuDrawer: FC<MobileNavMenuDrawerProps> = ({ onClose, open, topbarLinks }) => {
  const navigate = useNavigate();
  const [submenu, setSubmenu] = useState<TopBarSubMenuItemModel[]>([]);

  // useEffect(() => {
  //   if (open) {
  //     const elements = document.getElementsByClassName("intercom-lightweight-app");
  //     const intercom = elements[0] as HTMLElement;
  //     if (intercom) {
  //       intercom.style.display = "none";
  //     }
  //   } else {
  //     const elements = document.getElementsByClassName("intercom-lightweight-app");
  //     const intercom = elements[0] as HTMLElement;
  //     if (intercom) {
  //       intercom.style.display = "block";
  //     }
  //   }
  // }, [open]);

  useEffect(() => {
    if (open) {
      setSubmenu([]);
    }
  }, [open]);

  const handleLinkClick = useCallback(
    (href: string, isSubmenu?: boolean) => {
      const link = topbarLinks.find((link) => link.route === href);
      if (isSubmenu) {
        navigate(href);
        onClose();
      } else if (link?.subMenus.length) {
        setSubmenu(link.subMenus);
      } else {
        navigate(link?.route ?? "");
        onClose();
      }
    },
    [navigate, onClose, topbarLinks]
  );

  const handleBackClicked = useCallback(() => {
    setSubmenu([]);
  }, []);

  const animationDuration = 0.2;

  return (
    <Drawer placement={"top"} isOpen={open} onClose={onClose} id="mobile-nav-menu-drawer">
      <DrawerContent>
        <Box
          sx={{
            backgroundColor: Colors.Neutral[50],
          }}
          width={"100vw"}
          height={"100vh"}
          pos={"relative"}
        >
          <AnimatePresence>
            {submenu.length > 0 && (
              <motion.div
                exit={{ x: -10, opacity: 0 }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: animationDuration, delay: animationDuration }}
              >
                <IconButton
                  sx={{ position: "absolute", top: "8px", left: "8px", backgroundColor: "unset", zIndex: 10 }}
                  onClick={handleBackClicked}
                  aria-label={"Close"}
                  fontSize={18}
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
                >
                  <IoChevronBackOutline />
                </IconButton>
              </motion.div>
            )}
          </AnimatePresence>
          <IconButton
            sx={{ position: "absolute", top: "8px", right: "8px", backgroundColor: "unset", zIndex: 10 }}
            onClick={onClose}
            aria-label={"Close"}
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
          >
            <CgClose />
          </IconButton>
          <Box pos={"relative"} width={"100%"} height={"100%"}>
            {/* main menu items */}
            <AnimatePresence>
              {submenu.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: animationDuration, delay: animationDuration }}
                  style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}
                >
                  <Box as="ul" paddingX={8} paddingY={16} display={"flex"} flexDir={"column"} gap={2}>
                    {topbarLinks.map((link) => {
                      return (
                        <MobileNavDrawerItem key={link.route} text={link.label} href={link.route} onClick={handleLinkClick} />
                      );
                    })}
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Sub menu items */}
            <AnimatePresence>
              {submenu.length > 0 && (
                <motion.div
                  exit={{ opacity: 0, x: -10 }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: animationDuration, delay: animationDuration }}
                  style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", color: "blue" }}
                >
                  {submenu.map((link) => {
                    return (
                      <Box as="ul" paddingY={16} display={"flex"} flexDir={"column"} gap={2} key={link.title.href}>
                        <MobileNavDrawerItem
                          key={link.title.href}
                          text={link.title.label}
                          href={link.title.href}
                          fontSize={16}
                          onClick={(href) => handleLinkClick(href, true)}
                        />
                        {link.listItems.map((listItem) => {
                          return (
                            <MobileNavDrawerItem
                              key={listItem.href}
                              text={listItem.label}
                              href={listItem.href}
                              onClick={(href) => handleLinkClick(href, true)}
                            />
                          );
                        })}
                      </Box>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
          {/* <WhatsappIcon /> */}
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

interface MobileNavMenuDrawerProps {
  open: boolean;
  topbarLinks: TopBarLinkItemModel[];
  onClose: () => void;
}

export default MobileNavMenuDrawer;
