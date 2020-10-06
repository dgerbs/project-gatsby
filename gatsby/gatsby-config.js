// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
// By default Gatsby will surface any token or constant variable beginning with GATSBY - but not in gatsby-config
import dotenv from 'dotenv';

// Explicit
dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in Hamilton!',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    // Object
    {
      // This is the name of the plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'fja8gjtu',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
