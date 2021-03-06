import { gql } from "@apollo/client";

export const BANNERMUTATION = gql`
  mutation UpdateBannerComponent(
    $id: ID!
    $brTitle: String!
    $brSubtitle: String!
    $brID: ID!
    $url: String!
  ) {
    updateBannerComponent(
      where: { id: $id }
      data: {
        brTitle: $brTitle
        brSubtitle: $brSubtitle
        brImg: { update: { where: { id: $brID }, data: { url: $url } } }
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
