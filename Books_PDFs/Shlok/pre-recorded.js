const shivTandavStotram = [
  {
    title: "Spotify-Shiv-Strotam-Female-Voice",
    record: [
      2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2,
    ],
  },
  {
    title: "Spotify-Shiv-Strotam",
    record: [7, 5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5],
  },
];

export function getShlokasMovements(slug) {
  const slugMatcher = {
    "others-shiv-tandav-stotram": shivTandavStotram,
    // "others-hanuman-chalisa": hanumanChalisa,
  };

  return slugMatcher[slug] || [];
}
