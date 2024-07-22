const { default: axiosClient } = require("./axiosClient");

const getLatestProducts = async () => axiosClient.get("/products?populate=*");

const getProductById = async (id) => axiosClient.get(`/products/${id}?populate=*`);

const getProductByCategory = async (category, currentProductId) =>
  axiosClient.get(`/products?filters[category][$eq]=${category}&filters[id][$ne]=${currentProductId}&populate=*`);


export default {
    getLatestProducts,
    getProductById,
    getProductByCategory
}