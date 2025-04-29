import { useState, useEffect } from "react";
import { updateUser } from "@/services/userEditServices";
import { IoIosCloseCircle } from "react-icons/io";

export default function EditProfile({ user, onClose, onUpdateSuccess }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "Male", // Default value set
    date_of_birth: "",
    email: "",
    phone: "",
    address: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        gender: user.gender || "Male",
        date_of_birth: user.date_of_birth || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        photo: user.photo || null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "photo" && value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });

      if (formData.photo instanceof File) {
        formDataToSend.append("photo", formData.photo);
      }

      const result = await updateUser(user._id, formDataToSend);

      if (result.error) {
        setError(result.message || "Failed to update user");
      } else {
        onUpdateSuccess(result.data);
        onClose();
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="flex flex-col bg-white rounded-md shadow-lg max-w-md w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-8 rounded-lg sticky top-0 bg-white z-10">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoIosCloseCircle className="text-[#FD5725] text-3xl cursor-pointer hover:text-[#e04a1b]" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-8 pb-8 text-sm">
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="block font-bold">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#E0E0E0] rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block font-bold">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#E0E0E0] rounded-md"
                />
              </div>
            </div>

            {/* Gender and Date of Birth */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="block font-bold">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#E0E0E0] rounded-md"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="block font-bold">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#E0E0E0] rounded-md"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="block font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-[#E0E0E0] rounded-md"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="block font-bold">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-[#E0E0E0] rounded-md"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label className="block font-bold">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-[#E0E0E0] rounded-md"
                rows={3}
              />
            </div>

            {/* Profile Photo */}
            <div className="flex flex-col gap-2">
              <label className="block font-bold">Profile Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                accept="image/*"
                className="file:cursor-pointer block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-2 file:border-[#FD5725]
                  file:text-sm file:font-semibold
                  file:bg-[#FD5725] file:text-white
                  hover:file:bg-white hover:file:text-[#FD5725] file:transition-all file:duration-150"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="cursor-pointer w-full border-2 border-[#FD5725] bg-[#FD5725] text-white py-2 px-4 rounded-md font-bold hover:bg-white hover:text-[#FD5725] disabled:opacity-50 transition-all duration-150"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-bold hover:bg-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
