import React from "react";
import BannerComponent from "./bannerComponent";
import BioComponent from "./bioComponent";
import IntroComponent from "./introComponent";
import ServiceComponent from "./servicesComponent";

const HomeComponent = () => {
  return (
    <div className="home component">
      <BannerComponent />
      <IntroComponent />
      <ServiceComponent />
      <BioComponent />
    </div>
  );
};

export default HomeComponent;
