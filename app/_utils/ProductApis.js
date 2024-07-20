const { default: axiosClient } = require("./axiosClient");

const getLatestProducts = async () => axiosClient.get("/products?populate=*");


export default {
    getLatestProducts,
}