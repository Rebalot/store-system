import electronicsImg from "../assets/categories/electronics.jpg";
import clothesImg from "../assets/categories/clothes.jpg";
import furnitureImg from "../assets/categories/furniture.jpg";
import shoesImg from "../assets/categories/shoes.jpg";
import miscellaneousImg from "../assets/categories/miscellaneous.jpg";

export const CATEGORIES = [
  {
    label: "Electronics",
    value: "ELECTRONICS",
    image: electronicsImg,
    navlink: "/catalog?category=ELECTRONICS",
  },
  {
    label: "Clothes",
    value: "CLOTHES",
    image: clothesImg,
    navlink: "/catalog?category=CLOTHES",
  },
  {
    label: "Furniture",
    value: "FURNITURE",
    image: furnitureImg,
    navlink: "/catalog?category=FURNITURE",
  },
  {
    label: "Shoes",
    value: "SHOES",
    image: shoesImg,
    navlink: "/catalog?category=SHOES",
  },
  {
    label: "Miscellaneous",
    value: "MISCELLANEOUS",
    image: miscellaneousImg,
    navlink: "/catalog?category=MISCELLANEOUS",
  },
];