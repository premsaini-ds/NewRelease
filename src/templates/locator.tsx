import * as React from "react";
import "../index.css";
import Moment from 'react-moment';
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

export const getPath: GetPath<TemplateProps> = () => {
  return `locator`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "Turtlehead Tacos Locations",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const searcher = provideHeadless({
  apiKey: "1d8ca6e0f97cb9c6297de6a5daff9b90",
  // make sure your experience key matches what you see in the platform
  experienceKey: "demonewrepoproject",
  locale: "en",
  endpoints: SandboxEndpoints,
  verticalKey: "locations",
});

const dateToFormat = '2023-05-17';

const Locator: Template<TemplateRenderProps> = () => {
  return (
    <PageLayout>
      <SearchHeadlessProvider searcher={searcher}>
        <div className="mx-auto max-w-7xl px-4">
          {/* <Moment format="DD MMM yyy"></Moment> */}
          <StoreLocator /> 
        </div>
      </SearchHeadlessProvider>
    </PageLayout>
  );
};

export default Locator;