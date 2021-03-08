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
      svrLink1
      svrLink2
      svrLink3
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
