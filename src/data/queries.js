import { gql } from "@apollo/client";

export const bannerQuery = gql`
  query bannerComponents {
    bannerComponents {
      id
      brImg {
        id
        url
      }
      brTitle
      brSubtitle
      brBtnText
      brBtnLinkk
    }
  }
`;

export const introQuery = gql`
  query introductionComponents {
    introductionComponents {
      id
      introTitle
      introDesc1
      introDesc2
      introDesc3
    }
    serviceComponents {
      id
      svrLinkk1
      svrLinkk2
      svrLinkk3
      svrText1
      svrText2
      svrText3
    }
  }
`;

export const assetsQuery = gql`
  query Assets {
    assets {
      id
      url
    }
  }
`;
