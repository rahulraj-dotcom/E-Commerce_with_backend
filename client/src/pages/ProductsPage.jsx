import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../apis/apis";
import { useAuth } from "../context/authContext";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const { accessToken } = useAuth();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");

      setProducts(response.data.data.products);
      console.log(response);
    }

    getProducts();
  }, []);

  async function deleteProduct(productId) {
    try {
      const respponse = await api.delete(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(respponse);

      setProducts((prevProducts) => {
        return prevProducts.filter((product) => product._id !== productId);
      });
    } catch (error) {
      console.log("Delete error:", error.response?.data);
    }
  }

  function updateProduct(product) {
    setSelectedProduct(product);

    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
    });

    setUpdateImage(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleUpdate() {
    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);

      if (updateImage) {
        data.append("image", updateImage);
      }

      const response = await api.put(`/products/${selectedProduct._id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response);

      const updatedProduct = response.data.data.product;

      setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          if (product._id === updatedProduct._id) {
            return updatedProduct;
          }

          return product;
        });
      });

      setSelectedProduct(null);
      setUpdateImage(null);

      setFormData({
        title: "",
        description: "",
        price: "",
      });
    } catch (error) {
      console.log("Update error:", error.response?.data);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3dfc7] px-6 py-10 md:px-10 lg:px-16">
      {/* Heading */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-gray-600">
          Our Collection
        </p>

        <h1 className="text-4xl font-bold text-black md:text-5xl">
          Explore Our Products
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-gray-700">
          Discover premium fashion essentials designed for comfort, confidence,
          and everyday style.
        </p>
      </div>

      {selectedProduct && (
        <div className="mx-auto mb-10 max-w-2xl rounded-2xl bg-gray-200 text-black font-bold p-6 shadow-lg">
          <h2 className="mb-5 text-2xl font-bold">Update Product</h2>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border p-3"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border p-3"
            rows="5"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border p-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setUpdateImage(e.target.files[0])}
            className="mb-4 w-full rounded-lg border p-3"
          />
          <p className="mb-2 text-sm text-gray-600">
            Current image: {selectedProduct.image.split("/").pop()}
          </p>

          <div className="w-full grid grid-cols-2 mt-5">
            <button
              onClick={handleUpdate}
              className="mr-3 rounded-lg bg-green-600 px-5 py-2 font-bold text-white"
            >
              Update
            </button>

            <button
              onClick={() => setSelectedProduct(null)}
              className="rounded-lg bg-orange-600 px-5 py-2 font-bold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Products */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-2xl bg-gray-200 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image */}
            <div className="h-80 overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            {/* Product Details */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-black">{product.title}</h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {product.description}
              </p>

              <p className="mt-4 text-2xl font-bold text-[#d93600]">
                ₹{product.price}
              </p>

              {/* Actions */}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => updateProduct(product)}
                  className="flex-1 rounded-lg bg-[#f4510b] px-4 py-2.5 font-bold text-white transition hover:bg-black"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="flex-1 rounded-lg border-2 border-black px-4 py-2.5 font-bold text-black transition hover:bg-black hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
