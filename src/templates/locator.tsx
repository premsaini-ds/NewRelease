import * as React from "react";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/PageLayout";
import {
  provideHeadless,
  SandboxEndpoints,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";
import StoreLocator from "../components/StoreLocator";
import PhotoSlider from "../components/PhotoSlider";

export const getPath: GetPath<TemplateProps> = () => {
  return `locator`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "Hero Showroom locations",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const searcher = provideHeadless({
  apiKey: "5ecc488e505919f17978d7eaa85ab2cc",
  // make sure your experience key matches what you see in the platform
  experienceKey: "demonewrepoproject",
  locale: "en",
  endpoints: SandboxEndpoints,
  verticalKey: "locations",
});

const Locator: Template<TemplateRenderProps> = ({
  path,
  __meta,
  document,
}) => {
  const { _site, meta } = document;
  console.log("document",_site);

  
  return (
    <PageLayout _site={_site}>
      <PhotoSlider photoGallery={_site?.c_headerSliderImages}/>
      <SearchHeadlessProvider searcher={searcher}>
       
          {/* <Moment format="DD MMM yyy"></Moment> */}
          <StoreLocator /> 
        
      </SearchHeadlessProvider>
    </PageLayout>
  );
};

export default Locator;