import { gql } from "@apollo/client";
import client from "client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
    const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";
    const { data } = await client.query({
      query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocksJSON
            title
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            menuItems {
              menuItem {
                destination  {
                  ... on Page {
                    uri
                  }
                }
                label
              }
              items {
                label
                destination {
                  ... on Page {
                    uri
                  }
                }
              }
            }
            callToActionButton {
              label
              destination {
                ... on Page {
                  uri
                }
              }
            }
          }
        }
      }`,
      variables: {
        uri
      }
    });
    const blocks = cleanAndTransformBlocks(data.nodeByUri.blocksJSON);
    return {
      props: { 
        mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
        callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
        callToActionDestination: data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
        blocks
       }
    }
  }