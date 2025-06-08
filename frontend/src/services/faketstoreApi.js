import { extractURL } from "../utils/utils";

  export const fetchData = async (urlFetch) => {
    try {
      const response = await fetch(urlFetch);

      if (!response.ok) {
        throw new Error("Error al obtener las categorías");
      }

      const data = await response.json();
      // console.log('data catalogo prev: ', data)
      const updatedData = data
        .map((element, i) => {
          const url = extractURL(Array.isArray(element.images) ? element.images[0] : element.images);
          if (url !== null) {
            element.images = url;
            return element;
          }
          return null;
        })
        .filter((element) => element !== null);

      return updatedData;
  
    } catch (error) {
      console.error("Error con el fetch:", error);
      return [];
    }
  };

  export const fetchCategorias = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories");

      if (!response.ok) {
        throw new Error("Error al obtener las categorías");
      }

      const data = await response.json();

      const names = [
        { title: "Clothes", navlink: "/catalog/clothes" },
        { title: "Electronics", navlink: "/catalog/electronics" },
        { title: "Furniture", navlink: "/catalog/furniture" },
        { title: "Shoes", navlink: "/catalog/shoes" },
        { title: "Miscellaneous", navlink: "/catalog/miscellaneous" },
      ];
  
      const updatedData = data.map((element, i) => {
        if (names[i]) {
          element.name = names[i].title;
          element.navlink = names[i].navlink;
        }
        const url = extractURL(element.image);
        if (url !== null) {
          element.image = url;
        }

        return element;
      });
      return updatedData;
  
    } catch (error) {
      console.error("Error con el fetch:", error);
      return [];
    }
  };
