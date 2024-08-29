import { CarouselSliderItemProps } from "~/components/CarouselSliderItem";
import { ivDripsLink, homeHeroSliderActiveItemID, adultAndElderlyLink, weightLossLink, labTestsHomeHref } from "~/constants";

export interface HomePageResponseModel {
  sliderListItems: CarouselSliderItemProps[];
  popularServiceData: CarouselSliderItemProps[];
}

export default function getHomePageData(): HomePageResponseModel {
  const sliderListItems: CarouselSliderItemProps[] = [
    {
      learnMoreHref: ivDripsLink.route,
      inViewID: homeHeroSliderActiveItemID,
      text: "vitamin-iv-drips",
      bgImageURL:
        "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/dardoc-iv-drip-at-home-service-abu-dhabi-dubai.webp",
      videoURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/dardoc-iv-drip-at-home-abu-dhabi-dubai_.mp4",
    },
    {
      learnMoreHref: "/babysitting-and-newborn",
      text: "newborn-and-child",
      inViewID: homeHeroSliderActiveItemID,
      bgImageURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/dardoc-babysitting-abu-dhabi-dubai.jpg",
      videoURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/dardoc-newborn-care-and-baby-sitting-2.mp4",
    },
    {
      learnMoreHref: labTestsHomeHref,
      text: "laboratory-tests",
      inViewID: homeHeroSliderActiveItemID,
      bgImageURL:
        "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/dardoc-at-home-laboratory-tests-abu-dhabi-dubai.jpg",
      videoURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/dardoc-lab-test-at-home.mp4",
    },
    {
      learnMoreHref: adultAndElderlyLink.route,
      text: adultAndElderlyLink.label,
      inViewID: homeHeroSliderActiveItemID,
      bgImageURL:
        "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/elderly-care-at-home-abu-dhabi-dubai-at-home.jpg",
      videoURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/dardoc-elderly-care-abu-dhabi-dubai.mp4",
    },
    {
      learnMoreHref: weightLossLink.route,
      text: "weight-loss",
      inViewID: homeHeroSliderActiveItemID,
      bgImageURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/dardoc-weight-loss-program.jpg",
      videoURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/weight-loss-medication.mp4",
    },
  ];
  const popularServiceData: CarouselSliderItemProps[] = [
    {
      learnMoreHref: "/babysitting-and-newborn",
      inViewID: "popular-service-slider-item-in-view",
      text: "newborn-and-child",
      bgImageURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/NursesforNewborn&Mothers-3.jpg",
    },
    {
      learnMoreHref: weightLossLink.route,
      text: "weight-loss",
      inViewID: "popular-service-slider-item-in-view",
      bgImageURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/Weight-Loss-Program.jpg",
    },
    {
      learnMoreHref: ivDripsLink.route,
      inViewID: "popular-service-slider-item-in-view",
      text: "vitamin-iv-drips",
      bgImageURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/VitaminIV-Drips.jpg",
    },
    {
      learnMoreHref: "/iv-drips/skin-whitening-iv-drip?lng=en",
      inViewID: "popular-service-slider-item-in-view",
      text: "skin-whitening-and-glutathione",
      bgImageURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/Skin-Whitening-IV-Drip.jpg",
    },
    {
      learnMoreHref: "/iv-drips/nad-iv-drip?lng=en",
      inViewID: "popular-service-slider-item-in-view",
      text: "nad-iv-drip",
      bgImageURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/nad-popular-service-at-home.jpg",
    },
    {
      learnMoreHref: adultAndElderlyLink.route,
      inViewID: "popular-service-slider-item-in-view",
      text: "adult-and-elderly-nursing",
      bgImageURL: "https://dardocstorageaccount.blob.core.windows.net/dardocpictures/Adult-&-Elderly-Nursing.jpg",
    },
  ];
  return {
    sliderListItems: Array.from({ length: 40 }).map<CarouselSliderItemProps>((_, i) => {
      return sliderListItems[i % sliderListItems.length];
    }),
    popularServiceData: Array.from({ length: 40 }).map<CarouselSliderItemProps>((_, i) => {
      return popularServiceData[i % popularServiceData.length];
    }),
  };
}
