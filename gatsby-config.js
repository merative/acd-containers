const siteTitle = 'IBM Annotator for Clinical Data'

var sitePrefix = process.env.SITE_PREFIX || "/"
console.log(`Using SITE_PREFIX: '${sitePrefix}'`)

module.exports = {
  siteMetadata: {
    title: siteTitle,
    description: 'IBM Annotator for Clinical Data on Kubernetes Runbook',
    keywords: 'ibm,acd,containers',
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteTitle,
        short_name: siteTitle,
        start_url: sitePrefix,
        background_color: '#ffffff',
        theme_color: '#0062ff',
        display: 'browser',
        icon: 'node_modules/gatsby-theme-carbon/src/images/favicon.svg'
      },
    },
    { 
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: '${__dirname}/_1.0',
        ignore: ['**/\.*'],
      },
    },
    { 
      resolve: 'gatsby-plugin-page-creator',
      options: {
        name: 'pages',
        path: '${__dirname}/_1.0',
        ignore: ['**/\.*'],
      },
    },
    { 
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: '${__dirname}/_data',
        ignore: ['**/\.*'],
      },
    },
    {
      resolve: 'gatsby-theme-carbon',
      options: {
        isSearchEnabled: true,
        withWebp: true,
        imageQuality: 75,
      },
    },
  ],
};