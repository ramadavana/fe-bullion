import { useState, useEffect } from "react";
import { updateUser } from "@/services/userEditServices";

export default function EditProfile({ user, onClose }) {
  const [formData, setFormData] = useState({ name: "", date_of_birth: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, date_of_birth: user.date_of_birth });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateUser(user._id, formData);
    setLoading(false);

    if (result.error) {
      setError(result.message);
    } else {
      onClose(); // Close modal on success
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-lg font-bold">Edit Profile</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="mr-2">
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
