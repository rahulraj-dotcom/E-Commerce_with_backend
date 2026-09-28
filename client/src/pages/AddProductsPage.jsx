import { useState } from "react";
import api from "../apis/apis";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

const AddProductsPage = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [image, setImage] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("image", image);

      const response = await api.post("/products", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response);

      setFormData({
        title: "",
        description: "",
        price: "",
      });

      setImage(null);

      navigate("/product");
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("ERROR DATA:", error.response?.data);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3dfc7] px-6 py-10 md:px-10">
      <div className="mx-auto max-w-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-gray-600">
            E-Commerce
          </p>

          <h1 className="text-4xl font-bold text-black">Add New Product</h1>

          <p className="mt-3 text-gray-700">
            Add your product details and upload a product image.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-lg md:p-8 text-black font-bold"
        >
          {/* Title */}
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-2 block font-semibold text-black"
            >
              Product Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#f4510b]"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label
              htmlFor="description"
              className="mb-2 block font-semibold text-black"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="5"
              className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-[#f4510b]"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-5">
            <label
              htmlFor="price"
              className="mb-2 block font-semibold text-black"
            >
              Price
            </label>

            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter product price"
              min="0"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#f4510b]"
              required
            />
          </div>

          {/* Image */}
          <div className="mb-7">
            <label
              htmlFor="image"
              className="mb-2 block font-semibold text-black"
            >
              Product Image
            </label>

            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-3"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#f4510b] px-5 py-3 font-bold text-white transition hover:bg-black"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductsPage;
