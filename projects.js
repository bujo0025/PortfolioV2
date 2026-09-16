/*
  Add a new project by adding an object to this list.
  The homepage renders this array automatically.

  Ordered from most to least impressive (this drives the display order).

  {
    title: "Project Name",
    description: "One or two sentences about what it is and what it demonstrates.",
    highlights: ["Short spec", "Short spec", "Short spec"],
    image: "images/your-screenshot.png",
    url: "https://your-project-link.com"
  }
*/

const PROJECTS = [
  {
    title: "History of APOD",
    description: "A capstone project that lets you browse NASA's Astronomy Picture of the Day archive by date, pulling high-resolution imagery directly from NASA's live API.",
    highlights: ["Live NASA API integration", "Date-based archive browsing", "Curated fan favourites"],
    image: "images/apod.png",
    url: "https://bujo0025.github.io/mtm6302-capstone-your-github-bujo0025/"
  },
  {
    title: "Word Hunt",
    description: "A timed word-search game with a randomly generated letter grid, live scoring, and word validation against a dictionary, built for fast, replayable rounds.",
    highlights: ["Real-time scoring engine", "Timed grid-based gameplay", "Dynamic word validation"],
    image: "images/wordhunt.png",
    url: "https://bujo0025.github.io/WordHunt/"
  },
  {
    title: "Blacksmith Mini Game",
    description: "A browser game for buying, selling, and crafting items, with live tracking of resources and gold.",
    highlights: ["Custom crafting economy", "Live resource & gold tracking", "State-driven game loop"],
    image: "images/game.png",
    url: "https://bujo0025.github.io/Blacksmith-Game/"
  },
  {
    title: "Dwello Real Estate",
    description: "A real estate concept site with property listings, location details, and an agent directory.",
    highlights: ["Property listing layout", "Agent directory", "Responsive multi-page design"],
    image: "images/dwello.png",
    url: "https://bujo0025.github.io/DwelloRealEstate/"
  },
  {
    title: "Stadium Viewer",
    description: "An interactive viewer for MLB stadiums across both leagues, built to mark the Blue Jays' 2025 World Series run.",
    highlights: ["Interactive stadium data", "Built for the 2025 World Series run", "Cross-league coverage"],
    image: "images/stadium.png",
    url: "https://bujo0025.github.io/Stadium-Viewer/"
  },
  {
    title: "Pokedex",
    description: "A searchable Pokedex built on a public API, with a detail view for every entry.",
    highlights: ["Public REST API integration", "Live search filtering", "Per-entry detail view"],
    image: "images/pokedex.png",
    url: "https://bujo0025.github.io/Pokedex/"
  }
];
