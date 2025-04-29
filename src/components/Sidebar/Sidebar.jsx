"use client";

import Image from "next/image";
import { FaSquare } from "react-icons/fa6";
import { deleteCookie } from "cookies-next";

const menuItems = [
  "User Aktif",
  "Produk",
  "Transaksi",
  "Laporan",
  "Pengaturan",
];

const menuActive = "User Aktif";

export default function Sidebar() {
  const handleLogout = () => {
    deleteCookie("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col gap-2.5 bg-white w-[260px] h-screen py-5">
      <div className="flex items-center px-6 py-3">
        <Image
          src="/bullion-logo-2.png"
          alt="Logo"
          width={104}
          height={32}
          priority
        />
      </div>

      <div className="flex flex-col">
        {menuItems.map((item, index) => {
          const isActive = item === menuActive;
          return (
            <div
              key={index}
              className={`flex items-center gap-2.5 px-6 py-3 text-sm cursor-pointer hover:bg-[#FD5725] hover:text-white hover:font-bold ${
                isActive ? "bg-[#FD5725] text-white font-bold" : ""
              }`}
            >
              <FaSquare className="text-[#7E1810] text-xl" />
              <span>{item}</span>
            </div>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-6 py-3 text-sm cursor-pointer hover:bg-[#FD5725] hover:text-white hover:font-bold"
        >
          <FaSquare className="text-[#7E1810] text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
