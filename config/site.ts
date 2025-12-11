export type SiteConfig = typeof siteConfig;
export const siteConfig = {
  colors: [
    { id: "light-grey", value: "#D9D9D9", label: "Light Grey" },
    { id: "taupe", value: "#A89696", label: "Taupe" },
    { id: "black", value: "#2C1E1C", label: "Black" },
    { id: "mint", value: "#A7D7C5", label: "Mint" },
    { id: "pale-pink", value: "#FDE2E4", label: "Pale Pink" },
    { id: "lavender", value: "#B7B0D8", label: "Lavender" },
  ],
  sizes: [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "2xl", label: "2X" },
  ],

  categories: [
    "NEW",
    "BEST SELLERS",
    "SHIRTS",
    "T-SHIRTS",
    "POLO SHIRTS",
    "JEANS",
    "SHORTS",
    "JACKETS",
    "SWEATER",
    "SUITS",
    "COATS",
  ],
  products: [
    {
      id: "1",
      name: "Embroidered ticket shirt",
      price: 99,
      images: [
        "/merch.png",
        "/merch-2.png",
        "/merch.png",
        "/merch.png",
        "/merch.png",
      ],
    },
    {
      id: "2",
      name: "Abstract Print Shirt",
      price: 120,
      images: [
        "/merch.png",
        "/merch-2.png",
        "/merch.png",
        "/merch.png",
        "/merch.png",
      ],
    },
    {
      id: "3",
      name: "Linen Trousers",
      price: 89,
      images: [
        "/merch.png",
        "/merch-2.png",
        "/merch.png",
        "/merch.png",
        "/merch.png",
      ],
    },
  ],
};
