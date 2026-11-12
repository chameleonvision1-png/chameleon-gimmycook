import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "مطعم جيمي كوك | GIMMY COOK — إيطالي وشرقي بمود مختلف",
    short_name: "GIMMY COOK",
    description:
      "مطعم جيمي كوك (GIMMY COOK) في القاهرة الجديدة — بيتزا، فطير شرقي وحادق، مكرونة، طواجن فرن، وجبات، ومشويات بدليفري 24 ساعة.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF5E8",
    theme_color: "#0B2D5C",
    dir: "rtl",
    lang: "ar",
    icons: [
      {
        src: "/icon-192.png?v=1",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png?v=1",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-512.png?v=1",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
