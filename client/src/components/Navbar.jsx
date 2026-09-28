import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logoutHandler } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="w-full bg-orange-700 px-20 py-5 flex flex-row items-center justify-between">
      <div className="text-3xl font-bold text-white uppercase">E-Commerce</div>
      <div className="flex gap-8">
        <NavLink
          className={({ isActive }) =>
            `font-semibold text-lg ${isActive ? "text-gray-400 border-b-3 font-bold" : "text-white"}`
          }
          to={"/"}
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `font-semibold text-lg ${isActive ? "text-gray-400 border-b-3 font-bold" : "text-white"}`
          }
          to={"/product"}
        >
          Products
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `font-semibold text-lg ${isActive ? "text-gray-400 border-b-3 font-bold" : "text-white"}`
          }
          to={"/addProduct"}
        >
          Add products
        </NavLink>
      </div>
      <div className="flex text-lg gap-8 text-white items-center">
        <p className="text-xl font-bold">{user?.name || user}</p>
        <button
          onClick={async () => {
            await logoutHandler();
            navigate("/login");
          }}
          className="px-7 py-2 rounded-lg font-bold bg-black"
        >
          LogOut
        </button>
      </div>
    </main>
  );
};

export default Navbar;
