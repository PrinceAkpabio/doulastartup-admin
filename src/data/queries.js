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

export const assetsQuery = gql`
  query Assets {
    assets {
      id
      url
    }
  }
`;
