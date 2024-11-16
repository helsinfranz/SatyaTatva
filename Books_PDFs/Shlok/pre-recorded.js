const shivTandavStotram = [
  {
    title: "Spotify-Shiv-Strotam-Uma-Mohan",
    record: [
      18.61, 18.52, 23.06, 19.86, 51.72, 18.27, 16.34, 21.36, 34.4, 35.37,
      19.85, 16.79, 32.31, 26.15,
    ],
  },
];

const hanumanChalisa = [
  {
    title: 'Spotify-Hanuman-Chalisa-from-"HanuMan"',
    record: [
      5.12, 6.99, 8.33, 12.86, 8.96, 9.1, 21.81, 13.22, 8.83, 8.16, 9.04, 9.99,
      17.35, 5.68, 12.44, 8.64, 9.22, 21.97, 9.11, 8.5, 10.66,
    ],
  },
];

export function getShlokasMovements(slug) {
  const slugMatcher = {
    "others-shiv-tandav-stotram": shivTandavStotram,
    "others-hanuman-chalisa": hanumanChalisa,
  };

  return slugMatcher[slug] || [];
}
