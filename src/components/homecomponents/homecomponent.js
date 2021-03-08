import React from "react";
import BannerComponent from "./bannerComponent";
import IntroComponent from "./introComponent";
import ServiceComponent from "./servicesComponent";

const HomeComponent = () => {
  return (
    <div className="home component">
      <BannerComponent />
      <IntroComponent />
      <ServiceComponent />
    </div>
  );
};

export default HomeComponent;
