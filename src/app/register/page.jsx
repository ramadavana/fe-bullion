"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import CryptoJS from "crypto-js";
import apiEndpoints from "@/services/apiEndpoints";
import ErrorMessage from "@/components/Error/ErrorMessage";
import Link from "next/link";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaCalendarDays, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TbCloudUpload } from "react-icons/tb";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    email: "",
    phone: "",
    address: "",
    photo: null,
    password: "",
    confirm_password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date_of_birth: date,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage(
        "Password harus minimal 8 karakter, mengandung huruf kapital, huruf kecil, dan angka."
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return;
    }

    const confirm_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!confirm_password.test(formData.confirm_password)) {
      setErrorMessage(
        "K. Password harus minimal 8 karakter, mengandung huruf kapital, huruf kecil, dan angka."
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return;
    }

    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Password dan Konfirmasi Password tidak sesuai.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    try {
      const encryptedPassword = CryptoJS.SHA256(formData.password).toString();
      const encryptedConfirmPassword = CryptoJS.SHA256(
        formData.confirm_password
      ).toString();

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("first_name", formData.first_name);
      formDataToSubmit.append("last_name", formData.last_name);
      formDataToSubmit.append("gender", formData.gender);
      formDataToSubmit.append("date_of_birth", formData.date_of_birth);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("phone", formData.phone);
      formDataToSubmit.append("address", formData.address);
      formDataToSubmit.append("photo", formData.photo);
      formDataToSubmit.append("password", encryptedPassword);
      formDataToSubmit.append("confirm_password", encryptedConfirmPassword);

      const response = await axios.post(
        apiEndpoints.auth.register,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.err_message || "Terjadi kesalahan."
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        setErrorMessage("Terjadi kesalahan pada server.");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    }
  };

  return (
    <main className="flex justify-center items-stretch min-h-screen">
      {/* Left Panel */}
      <div className="bg-[#2E74B2] w-[548px] min-h-screen flex-shrink-0">
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
        <h1 className="text-[32px] font-bold w-[405px] text-left">Daftar</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 w-[405px]"
        >
          {/* First Name */}
          <div className="flex flex-col gap-4">
            <label htmlFor="first_name" className="text-sm font-bold">
              Nama Depan
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              required
              value={formData.first_name}
              onChange={handleChange}
              placeholder="John"
              className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-4">
            <label htmlFor="last_name" className="text-sm font-bold">
              Nama Belakang
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              required
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Doe"
              className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-4 relative">
            <label htmlFor="gender" className="text-sm font-bold">
              Jenis Kelamin
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm appearance-none"
            >
              <option value="" disabled hidden>
                Pilih Jenis Kelamin
              </option>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
            <BiSolidDownArrow className="absolute right-3 top-[47px] text-[#FD5725] text-[16px] z-[-1]" />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-4 relative">
            <label htmlFor="date_of_birth" className="text-sm font-bold">
              Tanggal Lahir
            </label>
            <ReactDatePicker
              selected={formData.date_of_birth}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              placeholderText="Pilih Tanggal Lahir"
              className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm w-full"
            />
            <div
              className="absolute right-3 top-[47px] text-[#FD5725] text-[16px] cursor-pointer"
              onClick={() =>
                document
                  .querySelector(".react-datepicker__input-container input")
                  .focus()
              }
            >
              <FaCalendarDays />
            </div>
          </div>

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

          {/* Phone Number */}
          <div className="flex flex-col gap-4 col-span-2">
            <label htmlFor="phone" className="text-sm font-bold">
              No. Handphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="081234567890"
              className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-4 col-span-2">
            <label htmlFor="address" className="text-sm font-bold">
              Alamat
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Jl. Contoh No. 123, Kota, Provinsi"
              className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-4 relative">
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

          {/* Confirm Password */}
          <div className="flex flex-col gap-4 relative">
            <label htmlFor="confirm_password" className="text-sm font-bold">
              Konfirmasi Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              required
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Konfirmasi Password"
              className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm"
            />
            <div
              className="absolute right-3 top-[45px] cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <FaRegEye className="text-[#FD5725] text-[20px]" />
              ) : (
                <FaRegEyeSlash className="text-[#FD5725] text-[20px]" />
              )}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col gap-4 col-span-2 relative">
            <label htmlFor="photo" className="text-sm font-bold">
              Foto Profil
            </label>
            <div className="relative">
              <label
                htmlFor="photo"
                className="border border-[#E0E0E0] rounded-lg px-4 py-2 text-sm cursor-pointer flex"
              >
                {formData.photo ? formData.photo.name : "Choose File"}
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  handleChange(e);
                }}
                className="hidden"
              />
              <TbCloudUpload className="absolute right-3 top-[9px] text-[#FD5725] text-[20px]" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="mt-4 bg-[#2E74B2] text-white border-2 border-[#2E74B2] rounded-lg px-4 py-2 font-bold text-sm w-full cursor-pointer hover:bg-white hover:text-[#2E74B2] transition-all duration-150"
            >
              Daftar
            </button>
          </div>

          {/* Error Message */}
          <ErrorMessage message={errorMessage} />
        </form>

        {/* Login Link */}
        <div className="text-sm text-center">
          <Link
            href="/login"
            className="text-[#2E74B2] font-semibold hover:underline"
          >
            Link Halaman Login Admin
          </Link>
        </div>
      </div>
    </main>
  );
}
