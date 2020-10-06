import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  //   console.clear();
  //   console.log(data);
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    // console.log('Creating a page for ', pizza.name);
    actions.createPage({
      // What is the URL?
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

// Toppings Filter
// function signature which turns data into pages
async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. Loop over each topping and create a page for the pizzas with that topping
  data.toppings.nodes.forEach((topping) => {
    // console.log('Creating a page for topping', topping.name);
    actions.createPage({
      // What is the URL?
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        //   REGEX for Topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // 4. Pass topping data to pizza.js
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // console.log('🍻 Turn Beers into Nodes!');
  // 1. Fetch a list of beers. FETCH is a browser API. In a node file, you need an isomorphic fetch.
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // console.log(beers, '🍺');
  // 2. Loop over each one, 'for of'
  for (const beer of beers) {
    // create a node for each beer
    // const nodeContent = JSON.stringify(beer);
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. Create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  //   2. Turn each slicermaster into their own page
  data.slicemasters.nodes.forEach((slicemaster) => {
    const slicemasterTemplate = path.resolve('./src/templates/Slicemaster.js');
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: slicemasterTemplate,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3. Figure out how many pages there are based on how many slicemasters there are, and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log(
    `There are ${data.slicemasters.totalCount} total people. We have ${pageCount} pages with ${pageSize} per page.`
  );

  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      //   This data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  // Fetch a list of beers and source them into the Gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  //  console.log('Creating PAGES!');
  // Create pages dynamically
  // 1. Pizzas
  //  await turnPizzasIntoPages(params);
  // 2. Toppings
  // await turnToppingssIntoPages(params);
  // Wait for ALL promises to be resolved before completing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  // 3. Slicemasters
}
