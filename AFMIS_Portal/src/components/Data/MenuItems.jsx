export const menuItems = {
  Home: [],
  "Projects&Programs": [
    { name: "KADIWA", link: "https://kadiwa.da.gov.ph/", external: true },
    {
      name: "FoodLane",
      link: "https://foodlane.da.gov.ph/home",
      external: true,
    },
    {
      name: "Matchmaking",
      link: "/",
      external: true,
    },
  ],
  "News&Events": [
    { name: "News Articles", link: "/news-articles" },
    { name: "Upcoming Events", link: "/upcoming-events" },
    {
      name: "Daily Prices",
      submenu: [
        { name: "Price Report", link: "/price-report" },
        { name: "Infographics", link: "/infographics" },
        {
          name: "Comparitive World Prices",
          link: "https://docs.google.com/spreadsheets/d/1C7qUSTm8N6dDrGE9ceA4ODV_-XMxwsF3xmtl_w2y3QE/edit?gid=697672754#gid=697672754",
          external: true,
        },
      ],
    },
  ],
  Databases: [
    {
      name: "Price Monitoring System",
      link: "http://www.bantaypresyo.da.gov.ph/",
      external: true,
    },
    {
      name: "Supply Trade Monitoring System",
      link: "https://www.bantaypresyo.da.gov.ph/tradingpost/comvolwatch/index.php",
      external: true,
    },
  ],
  Analytics: [
    { name: "Supply & Demand Analysis", link: "/supply-demand-analysis" },
    {
      name: "International & Domestic Market Trends & Forecast",
      link: "/market-trends&forecast",
    },
  ],
  Resources: [
    { name: "Import & Export Data", link: "/import-export-data" },
    {
      name: "Research Information & Technology",
      link: "/research-information&technology",
    },
    {
      name: "Product Standards & Market Requirements",
      link: "/product-standards&market-requirements",
    },
    {
      name: "Market Study / Market Research",
      link: "/market-study-research",
    },
  ],
  Directory: [
    {
      name: "FFEDIS Registration System",
      link: "https://ffedis.da.gov.ph/",
      external: true,
    },
    {
      name: "Directory of Agribusiness Players",
      link: "/agribusiness-directory",
    },
  ],
  About: [
    { name: "About Us", link: "/about-us" },
    { name: "Contact Us", link: "/contact-us" },
    { name: "Frequently Asked Questions (FAQ)", link: "/faq" },
  ],
};
