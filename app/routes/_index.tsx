import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import HeroVideo from "~/components/HeroVideo";
import MobileHomeScrollList from "~/components/MobileHomeScrollList";
import PersonalizedCareText from "~/components/PersonalizedCareText";
import getHomePageData, { HomePageResponseModel } from "~/services/getHomePageData";

export const loader = () => {
  const data = getHomePageData();
  return json<HomePageResponseModel>(data);
};

export default function Index() {
  const { sliderListItems } = useLoaderData<typeof loader>();

  return (
    <>
      <HeroVideo
        loadingImg="https://dardocstorageaccount.blob.core.windows.net/dardocpictures/dardoc-babysitting-abu-dhabi-dubai-.webp"
        path="https://dardocstorageaccount.blob.core.windows.net/dardocpictures/dardoc-home-healthcare-abu-dhabi-dubai.mp4"
      />
      <PersonalizedCareText />
      <MobileHomeScrollList sliderItems={sliderListItems} />
    </>
  );
}
