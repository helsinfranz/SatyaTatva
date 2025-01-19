import { createSitemapContentArray } from "@/lib/storage";

const defaultSitemap = [
  {
    url: "https://www.satyatatva.com/veda/rig",
  },
  {
    url: "https://www.satyatatva.com/veda/sam",
  },
  {
    url: "https://www.satyatatva.com/veda/atharv",
  },
  {
    url: "https://www.satyatatva.com/veda/yajur",
  },
  {
    url: "https://www.satyatatva.com/purana/english",
  },
  {
    url: "https://www.satyatatva.com/purana/hindi",
  },
  {
    url: "https://www.satyatatva.com/upanishad/english",
  },
  {
    url: "https://www.satyatatva.com/upanishad/hindi",
  },
  {
    url: "https://www.satyatatva.com/others/shloks",
  },
  {
    url: "https://www.satyatatva.com/others/books",
  },
];

function generateSiteMap(ids) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${defaultSitemap
         .map((id) => {
           return `
        <url>
            <loc>${id.url}</loc>
        </url>
      `;
         })
         .join("")}
       ${ids
         .map((id) => {
           return `
         <url>
             <loc>https://www.satyatatva.com/${id}</loc>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We generate the XML sitemap with the content data
  const sitemap = generateSiteMap(createSitemapContentArray());

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
