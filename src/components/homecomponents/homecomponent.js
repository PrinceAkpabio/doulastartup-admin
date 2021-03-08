import React from "react";
import BannerComponent from "./bannerComponent";
import IntroComponent from "./introComponent";

const HomeComponent = () => {
  return (
    <div className="home component">
      <BannerComponent />
      <IntroComponent />
    </div>
  );
};

export default HomeComponent;
