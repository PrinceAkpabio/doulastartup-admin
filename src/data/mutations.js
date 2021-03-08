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
    $id: ID!
    $svrLinkk1: String
    $svrLinkk2: String
    $svrLinkk3: String
    $svrText1: String
    $svrText2: String
    $svrText3: String
  ) {
    updateServiceComponent(
      where: { id: $id }
      data: {
        svrLinkk1: $svrLinkk1
        svrLinkk2: $svrLinkk2
        svrLinkk3: $svrLinkk3
        svrText1: $svrText1
        svrText2: $svrText2
        svrText3: $svrText3
      }
    ) {
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
