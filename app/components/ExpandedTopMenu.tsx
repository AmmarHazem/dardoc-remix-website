import { Box, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Colors, topbarLinks } from "~/constants";
import VLink from "./VLink";

const ExpandedTopMenu: FC<ExpandedTopMenuProps> = ({ showMenu, setShowMenu }) => {
  const selectedMenu = useMemo(() => {
    return topbarLinks.find((item) => item.route === showMenu);
  }, [showMenu]);

  const { t } = useTranslation();

  const height = useMemo(() => {
    const itemHeight = 50;
    return (selectedMenu?.subMenus?.[0]?.listItems.length ?? 0) * itemHeight + 100;
  }, [selectedMenu?.subMenus]);

  const openAnimationDuration = 0.3;

  const firstListItemDelay = 0.2;

  return (
    <AnimatePresence>
      {showMenu && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              paddingTop: `var(--nav-bar-height)`,
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(20px)",
              zIndex: "50",
            }}
          />
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration: openAnimationDuration }}
            animate={{ height: showMenu ? height : 0, zIndex: 80, opacity: 1 }}
            style={{
              position: "fixed",
              overflow: "hidden",
              top: "var(--nav-bar-height)",
              left: 0,
              width: "100vw",
              backgroundColor: "white",
            }}
            onMouseLeave={() => {
              setShowMenu(undefined);
            }}
          >
            {showMenu && (
              <Box as="nav" paddingX={4} display={"flex"} gap={12} paddingY={8} className="container">
                {selectedMenu?.subMenus.map((menu, i) => {
                  const isFirstMenu = i === 0;
                  return (
                    <Box display={"flex"} flexDir={"column"} key={menu.title.href}>
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{ marginBottom: "0.5rem" }}
                          transition={{ duration: 0.3, delay: firstListItemDelay }}
                        >
                          <VLink
                            to={menu.title.href}
                            onClick={() => {
                              setShowMenu(undefined);
                            }}
                          >
                            <Text fontSize="medium" color={Colors.Gray[700]} fontWeight={500} marginBottom={"1rem"}>
                              {t(menu.title.label)}
                            </Text>
                          </VLink>
                        </motion.div>
                      </AnimatePresence>
                      {menu.listItems.map((listItem, index) => {
                        return (
                          <AnimatePresence key={listItem.href}>
                            <motion.div
                              key={listItem.href}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ delay: firstListItemDelay + index / 60 }}
                              style={{ marginBottom: "0.5rem" }}
                            >
                              <VLink
                                to={listItem.href}
                                onClick={() => {
                                  setShowMenu(undefined);
                                }}
                              >
                                <Box
                                  as="p"
                                  fontSize={isFirstMenu ? "26px" : "14px"}
                                  color={isFirstMenu ? Colors.Neutral[800] : Colors.Gray[700]}
                                  fontWeight={500}
                                >
                                  {t(listItem.label)}
                                </Box>
                              </VLink>
                            </motion.div>
                          </AnimatePresence>
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface ExpandedTopMenuProps {
  showMenu?: string;
  setShowMenu: Dispatch<SetStateAction<string | undefined>>;
}

export default ExpandedTopMenu;
