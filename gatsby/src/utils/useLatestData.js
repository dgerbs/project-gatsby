import { useEffect, useState } from 'react';

const deets = `
	name
	_id
	image {
		asset {
			url
			metadata {
				lqip
			}
		}
	}
`;

export function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [sliceMasters, setSliceMasters] = useState();
  //   use a side effect to fetch data from graphql endpoint
  useEffect(function () {
    // when component mounts, run code and fetch data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // check for errors
        // set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log('OH NOOOOES');
        console.log(err);
      });
  }, []);
  return {
    hotSlices,
    sliceMasters,
  };
}
