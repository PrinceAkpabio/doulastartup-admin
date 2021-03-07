import { gql } from "@apollo/client";

export const BANNERMUTATION = gql`
  mutation UpdateBannerComponent(
    $id: ID!
    $brTitle: String!
    $brSubtitle: String!
    $brID: ID!
  ) {
    updateBannerComponent(
      where: { id: $id }
      data: {
        brTitle: $brTitle
        brSubtitle: $brSubtitle
        brImg: { connect: { id: $brID } }
      }
    ) {
      id
      brTitle
      brSubtitle
      brImg {
        id
        url
      }
    }
  }
`;
