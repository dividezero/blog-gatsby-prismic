module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'Hazlan Rozaimi', // Navigation and Site Title
  titleAlt: 'hazlan(rozaimi);', // Title for JSONLD
  description: 'Personal site for a full stack software engineer in a quest to learn and build the latest tech.',
  headline: 'Full stack software engineer', // Headline for schema.org JSONLD
  url: 'https://hazlanrozaimi.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  logo: '/logos/logo-1024.png', // Used for SEO
  ogLanguage: 'en_US', // Facebook Language

  // JSONLD / Manifest
  favicon: 'src/favicon.png', // Used for manifest favicon generation
  shortName: 'Hazlan', // shortname for manifest. MUST be shorter than 12 characters
  author: 'Hazlan', // Author for schemaORGJSONLD
  themeColor: '#3D63AE',
  backgroundColor: '#EBEDF2',

  twitter: '@hazlanrozaimi', // Twitter Username
  facebook: 'hazlanrozaimi', // Facebook Site Name
  googleAnalyticsID: 'UA-37306238-1',

  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
}
