"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import CryptoJS from "crypto-js";
import apiEndpoints from "@/services/apiEndpoints";
import ErrorMessage from "@/components/Error/ErrorMessage";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { setCookie } from "cookies-next";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const encryptedPassword = CryptoJS.SHA256(formData.password).toString();

      const response = await axios.post(apiEndpoints.auth.login, {
        email: formData.email,
        password: encryptedPassword,
      });

      if (response.status === 200) {
        const { token } = response.data.data;
        setCookie("token", token, { path: "/" });
        router.push("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.err_message || "Login gagal.");
      } else {
        setErrorMessage("Terjadi kesalahan pada server.");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <main className="flex justify-center items-stretch min-h-screen">
      {/* Left Panel */}
      <div className="bg-[#FD5725] w-[548px] min-h-screen flex-shrink-0">
        {/* Bullion Ecosystem International Logo Text */}
        <Image
          src="/bullion-graph-1.png"
          alt="Graph"
          width={605}
          height={552}
          className="absolute top-[-62px] left-[-214px] opacity-25"
          priority
        />

        {/* Graphic */}
        <Image
          src="/bullion-logo-1.png"
          alt="Logo"
          width={104}
          height={32}
          className="absolute top-[60px] left-[60px]"
          priority
        />
      </div>

      {/* Right Panel */}
      <div className="w-full flex flex-col py-12 gap-6 items-center justify-center min-h-screen">
        {/* Title */}
        <h1 className="text-[32px] font-bold w-[405px] text-left">
          Login Admin
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 w-[405px]"
        >
          {/* Email */}
          <div className="flex flex-col gap-4 col-span-2">
            <label htmlFor="email" className="text-sm font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-4 relative col-span-2">
            <label htmlFor="password" className="text-sm font-bold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan Password"
              className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm"
            />
            <div
              className="absolute right-3 top-[45px] cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaRegEye className="text-[#FD5725] text-[20px]" />
              ) : (
                <FaRegEyeSlash className="text-[#FD5725] text-[20px]" />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="mt-4 bg-[#FD5725] text-white border-2 border-[#FD5725] rounded-lg px-4 py-2 font-bold text-sm w-full cursor-pointer hover:bg-white hover:text-[#FD5725] transition-all duration-150"
            >
              Login
            </button>
          </div>

          {/* Error Message */}
          <ErrorMessage message={errorMessage} />
        </form>

        {/* Login Link */}
        <div className="text-sm text-center">
          <Link
            href="/register"
            className="text-[#FD5725] font-semibold hover:underline"
          >
            Link Halaman Register
          </Link>
        </div>
      </div>
    </main>
  );
}
