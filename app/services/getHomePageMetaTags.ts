import { baseURL } from "~/constants";
import getPageMetaTags from "~/utils/getPageMetaTags";

export default function getHomePageMetaTags() {
  return getPageMetaTags([
    {
      title: "Best Home Healthcare Providers in UAE | DarDoc",
    },
    {
      name: "description",
      content: `Experience doorstep home healthcare services and home nursing services in UAE with DarDoc, the front-runner in home health medical centres. Sign up now!`,
    },
    {
      name: "keywords",
      content: "home healthcare services, home health medical centre, best home healthcare, home nursing services",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: baseURL,
    },
  ]);
}
