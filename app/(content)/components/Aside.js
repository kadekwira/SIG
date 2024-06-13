import React from "react";
import { Logo } from "@/app/components/Logo";
import { NavbarTwoColumns } from "@/app/components/Navbar";

const Sidebar = () => {
  return (
    <div className="bg-gray-600 w-64 h-screen p-4 flex flex-col">
      <div>
        <NavbarTwoColumns logo={<Logo xl />}/>
        <hr className="border-t border-gray-300 my-4" />
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded">
          Cari Lokasi Terdekat Anda
        </button>
      </div>
      <div className="mt-auto">
      </div>
    </div>
  );
};

export default Sidebar;
