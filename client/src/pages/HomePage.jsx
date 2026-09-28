import React from "react";
import heroImage from "../images/download.png";

const featuredProducts = [
  {
    id: 1,
    title: "Classic Oversized T-Shirt",
    price: 799,
    image:
      "https://plus.unsplash.com/premium_photo-1673356301535-2cc45bcc79e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b3ZlcnNpemVkJTIwdC1zaGlydHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    title: "Relaxed Fit Shirt",
    price: 1209,
    image:
      "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Baggy jeans",
    price: 1199,
    image:
      "https://plus.unsplash.com/premium_photo-1673977134363-c86a9d5dcafa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmFnZ3klMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    title: "Formal pants",
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1609259886986-a642e7e1dbf9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Rm9ybWFsJTIwcGFudHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 5,
    title: "Straight Fit Jeans",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhdGUlMjBmaXQlMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    title: "GYM wear",
    price: 1299,
    image:
      "https://plus.unsplash.com/premium_photo-1723921379491-46da62e13562?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3BvcnRzJTIwY2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
  },
];

const HomePage = () => {
  return (
    <main className="bg-gray-200 min-h-[88vh] flex flex-col gap-7">
      {/* hero section */}
      <div className="flex flex-row bg-orange-300/30 text-black">
        <div className="px-20 py-15 flex flex-col gap-1 w-[50%]">
          <div className="pl-2 flex gap-8 text-gray-500">
            <p className="text-lg font-semibold uppercase">Trendy</p>
            <li className="text-lg font-semibold uppercase">Comfortable</li>
            <li className="text-lg font-semibold uppercase">premium</li>
          </div>
          <h2 className="text-7xl font-extrabold leading-17">
            Elevate Your <br />{" "}
            <span className="text-orange-700">Everyday Style</span>
          </h2>
          <p className="text-xl w-120 pt-6">
            Discover premium fashion essentials designed for comfort,
            confidence, and everyday wear.
          </p>
          <div className="flex gap-7 mt-5">
            <button className="px-7 py-2 border-2 border-orange-600 rounded-lg font-bold text-lg bg-orange-600 text-white">
              Shop Now
            </button>
            <button className="px-7 py-2 border-2 border-orange-600 rounded-lg font-bold text-lg">
              Explore Products
            </button>
          </div>
        </div>
        <div className="flex items-center w-[50%] relative">
          <div className="w-80 h-80 z-0 bg-orange-300/70 rounded-full left-37 absolute"></div>
          <img className="mt-2 z-10" src={heroImage} alt="Fashion" />
        </div>
      </div>
      <div className="px-20 text-black">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">Featured Products</h1>
          <p className="text-lg text-gray-700">
            Handpicked styles just for you
          </p>
        </div>
        <div className="grid grid-cols-3 gap-7 mt-8 pb-10">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-80 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">{product.title}</h2>

                <p className="text-lg font-semibold mt-2">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
