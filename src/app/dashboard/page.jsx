"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { getUserList } from "@/services/userServices";
import { formatDate } from "@/helpers/formateDate";
import { FaRegEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const result = await getUserList();

      if (result.error) {
        setError(result.message);
      } else {
        setUsers(result.data);
      }
    }

    fetchUsers();
  }, []);

  return (
    <main className="flex flex-row gap-4 bg-gray-300 w-full">
      <Sidebar />

      <div className="flex flex-col gap-4 w-full mr-4">
        <Header />

        <div className="w-full bg-white p-3 rounded-md">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
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
                      <button className="flex items-center justify-center gap-2 text-[">
                        <FaRegEye className="text-2xl" />
                        <span>Lihat</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 text-[">
                        <FaRegEdit className="text-2xl" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="flex items-center justify-end p-4 gap-3 text-xs">
            <button className="text-[#9E9E9E]">Previous</button>
            <button className="p-2 bg-[#E0E0E0] rounded-lg w-[30px]">1</button>
            <button className="p-2 bg-[#E0E0E0] rounded-lg w-[30px]">2</button>
            <button className="p-2 bg-[#E0E0E0] rounded-lg w-[30px]">3</button>
            <button className="text-[#9E9E9E]">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}
