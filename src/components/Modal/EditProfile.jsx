import { useState, useEffect } from "react";
import { updateUser } from "@/services/userEditServices";
import { IoIosCloseCircle } from "react-icons/io";

export default function EditProfile({ user, onClose, onUpdateSuccess }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "male",
    date_of_birth: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const names = user.name ? user.name.split(" ") : [];
      const firstName = user.first_name || (names.length > 0 ? names[0] : "");
      const lastName =
        user.last_name || (names.length > 1 ? names.slice(1).join(" ") : "");

      // Format date to YYYY-MM-DD for date input
      const dob = user.date_of_birth
        ? new Date(user.date_of_birth).toISOString().split("T")[0]
        : "";

      setFormData({
        first_name: firstName,
        last_name: lastName,
        gender: user.gender?.toLowerCase() || "male",
        date_of_birth: dob,
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
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        date_of_birth: new Date(formData.date_of_birth).toISOString(), // sesuai format API
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      };

      const result = await updateUser(user._id, payload);

      if (result.error) {
        setError(result.message || "Failed to update user");
      } else {
        onUpdateSuccess(result);
        alert("Profile updated successfully");
        onClose();
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(
        err.response?.data?.err_message_en ||
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
                  required
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
                  required
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
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
                  required
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
