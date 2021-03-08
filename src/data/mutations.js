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
