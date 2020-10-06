import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>

      {/* fav icon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />

      {/* meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />

      {/* open graph */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="og:site_name"
      />
      <meta property="og:description" content={description} />

      {/* variable allows you to override attributes on the page using the SEO tags */}
      {children}
    </Helmet>
  );
}
