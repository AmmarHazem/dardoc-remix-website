import { RefObject, useCallback } from "react";

export const xPadding = 32;

export default function useHScrollListControls({ scrollElementRef }: { scrollElementRef: RefObject<HTMLDivElement> }) {
  // const { i18n } = useTranslation();
  // const isAr = i18n.language === "ar";
  // const [disableNext, setDisableNext] = useState(false);
  // const [disablePrevious, setDisablePrevious] = useState(isAr ? false : true);
  const disableNext = false;
  const disablePrevious = false;

  // useEffect(() => {
  //   const ref = scrollElementRef;
  //   const scrollListener = () => {
  //     const rect = ref.current?.getBoundingClientRect();
  //     const scrollLeft = ref.current?.scrollLeft ?? 0;
  //     const isAtEnd = scrollLeft === (ref.current?.scrollWidth ?? 0) - (rect?.width ?? 0);
  //     const isAtStart = scrollLeft === 0;
  //     setDisableNext(isAr ? false : isAtEnd);
  //     setDisablePrevious(isAr ? false : isAtStart);
  //   };
  //   ref.current?.addEventListener("scroll", scrollListener);
  //   return () => {
  //     ref.current?.removeEventListener("scroll", scrollListener);
  //   };
  // }, [isAr, scrollElementRef]);

  const handleNextClicked = useCallback(() => {
    const ref = scrollElementRef;
    const childElements = Array.from(scrollElementRef.current?.children ?? []);
    const firstElement = childElements[0];
    const childRect = firstElement?.getBoundingClientRect();
    ref.current?.scrollBy({ left: (childRect?.width ?? 0) + 16, behavior: "smooth" });
  }, [scrollElementRef]);

  const handlePreviousClicked = useCallback(() => {
    const ref = scrollElementRef;
    const childElements = Array.from(ref.current?.children ?? []);
    const firstElement = childElements[0];
    const childRect = firstElement?.getBoundingClientRect();
    ref.current?.scrollBy({ left: -1 * ((childRect?.width ?? 0) + 16), behavior: "smooth" });
  }, [scrollElementRef]);

  return { handlePreviousClicked, handleNextClicked, disableNext, disablePrevious };
}
