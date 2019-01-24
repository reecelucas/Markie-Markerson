module.exports = {
  siteMetadata: {
    title: 'Markie Markerson',
    description:
      'A Web-based DYMO label printing application for simpler marking'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'markie-markerson',
        short_name: 'markie',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'minimal-ui',
        icon: 'src/images/logo.png'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-emotion'
  ]
};
