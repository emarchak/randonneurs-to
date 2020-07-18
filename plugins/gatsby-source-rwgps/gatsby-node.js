require('isomorphic-unfetch');

const EVENT_NODE_TYPE = "Event";

const PROXY_ENDPOINT = "https://cors-anywhere.herokuapp.com/";
const RWGPS_ENDPOINT =
  "https://ridewithgps.com/events.json?organization_id=1406&page=0&per_page=200&starts_on_max=2030-1-1&starts_on_min=2010-1-1";
const REQUEST_ORIGIN = 'https://randonneurs.to';

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const {createNode} = actions;

  try {
    const response = await fetch(PROXY_ENDPOINT + RWGPS_ENDPOINT, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': REQUEST_ORIGIN,
      },
    });

    const data = await response.json();

    if (response.status !== 200 || !data) {
      throw new Error(`gatsby-source-rwgps response ${response.status} ${response.message}`);
    }

    data.results.forEach((event) => {
      createNode({
        ...event,
        id: createNodeId(`${EVENT_NODE_TYPE}-${event.id}`),
        rwgpsId: event.id,
        parent: null,
        children: [],
        internal: {
          type: EVENT_NODE_TYPE,
          content: JSON.stringify(event),
          contentDigest: createContentDigest(event),
        },
      });
    });
  } catch (error) {
    console.error(error);
  }
};
