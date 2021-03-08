import { gql } from "@apollo/client";

export const BANNERMUTATION = gql`
  mutation UpdateBannerComponent(
    $id: ID!
    $brTitle: String!
    $brSubtitle: String!
    $brBtnLink: String
    $brBtnText: String
    $brID: ID!
  ) {
    updateBannerComponent(
      where: { id: $id }
      data: {
        brTitle: $brTitle
        brSubtitle: $brSubtitle
        brBtnLinkk: $brBtnLink
        brBtnText: $brBtnText
        brImg: { connect: { id: $brID } }
      }
    ) {
      id
      brTitle
      brSubtitle
      brBtnText
      brBtnLinkk
      brImg {
        id
        url
      }
    }
  }
`;

export const INTROMUTATION = gql`
  mutation UpdateIntroductionComponent(
    $id: ID!
    $introTitle: String!
    $introDesc1: String!
    $introDesc2: String!
    $introDesc3: String!
  ) {
    updateIntroductionComponent(
      where: { id: $id }
      data: {
        introTitle: $introTitle
        introDesc1: $introDesc1
        introDesc2: $introDesc2
        introDesc3: $introDesc3
      }
    ) {
      id
      introTitle
      introDesc1
      introDesc2
      introDesc3
    }
  }
`;
export const SERVICESMUTATION = gql`
  mutation UpdateServicesComponent(
    $svrID: ID!
    $svrLink1: String
    $svrLink2: String
    $svrLink3: String
  ) {
    updateServiceComponent(
      where: { id: $svrID }
      data: { svrLink1: $svrLink1, svrLink2: $svrLink2, svrLink3: $svrLink3 }
    ) {
      id
      svrLink1
      svrLink2
      svrLink3
    }
  }
`;
