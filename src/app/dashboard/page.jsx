"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { getUserList } from "@/services/userServices";
import { formatDate } from "@/helpers/formateDate";
import { FaRegEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import ViewProfile from "@/components/Modal/ViewProfile";
import EditProfile from "@/components/Modal/EditProfile";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [viewProfile, setViewProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(null);
  const limit = 10;

  const fetchUsers = async (currentPage) => {
    setLoading(true);
    const offset = (currentPage - 1) * limit;
    const result = await getUserList(offset, limit);

    if (!result.error) {
      setUsers(result.data);
    } else {
      console.error(result.message);
      setError(result.message);
    }

    setLoading(false);
  };

  const getVisiblePages = (currentPage, pageSize = 3) => {
    const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
    return Array.from({ length: pageSize }, (_, i) => startPage + i);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleViewProfile = (user) => {
    setViewProfile(user);
  };

  const handleEditProfile = (user) => {
    setEditProfile(user);
  };

  return (
    <main className="flex flex-row gap-4 bg-gray-300 w-full">
      <Sidebar />
      {viewProfile && (
        <div className="bg-black opacity-50 fixed inset-0 h-screen w-screen" />
      )}

      {editProfile && (
        <div className="bg-black opacity-50 fixed inset-0 h-screen w-screen" />
      )}

      {editProfile && (
        <EditProfile user={editProfile} onClose={() => setEditProfile(null)} />
      )}

      {viewProfile && (
        <ViewProfile
          userId={viewProfile._id}
          onClose={() => setViewProfile(null)}
        />
      )}

      <div className="flex flex-col gap-4 w-full mr-4">
        <Header />

        <div className="w-full bg-white p-3 rounded-md">
          {loading ? (
            <div className="flex items-center justify-center w-full h-[200px]">
              <p className="text-lg font-bold">Loading...</p>
            </div>
          ) : (
            (
              <table className="min-w-full">
                <thead>
                  <tr className="font-bold text-sm">
                    <th className="text-center px-4 py-2">Account ID</th>
                    <th className="text-left px-4 py-2">Name</th>
                    <th className="text-left px-4 py-2">Date</th>
                    <th className="text-center px-4 py-2">Status</th>
                    <th className="text-center px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`${
                        index % 2 === 0 ? "bg-[#FFF4ED]" : "bg-white"
                      } text-sm font-medium`}
                    >
                      <td className="p-4 text-center">{user._id}</td>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{formatDate(user.date_of_birth)}</td>
                      <td className="p-4 text-center">
                        <span className="rounded-[22px] bg-[#EBF9F1] text-[#1F9254] text-xs px-3 py-2 w-full items-center justify-center">
                          Registered
                        </span>
                      </td>
                      <td className="p-4 text-center flex gap-6 text-[#FD5725] w-fit">
                        <button
                          onClick={() => handleViewProfile(user)}
                          className="hover:opacity-75 cursor-pointer flex items-center justify-center gap-2 text-["
                        >
                          <FaRegEye className="text-2xl" />
                          <span>Lihat</span>
                        </button>
                        <button
                          onClick={() => handleEditProfile(user)}
                          className="hover:opacity-75 cursor-pointer flex items-center justify-center gap-2 text-["
                        >
                          <FaRegEdit className="text-2xl" />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) || <p>{error}</p>
          )}

          <div className="flex items-center justify-end p-4 gap-3 text-xs">
            <button
              onClick={handlePreviousPage}
              className="text-[#9E9E9E] cursor-pointer hover:text-black transition-all duration-150"
              disabled={page === 1}
            >
              Previous
            </button>

            {getVisiblePages(page).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
                  page === pageNumber
                    ? "bg-[#FD5725] text-white"
                    : "bg-[#E0E0E0] hover:bg-[#FD5725] hover:text-white"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              className="text-[#9E9E9E] cursor-pointer hover:text-black transition-all duration-150"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
