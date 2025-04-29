import React, { useEffect, useState } from "react";
import { getUserDetail } from "@/services/userDetailServices";
import { IoIosCloseCircle } from "react-icons/io";

export default function ViewProfile({ userId, onClose }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getUserDetail(userId);
      if (result.success) {
        setUserDetails(result.data);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="flex flex-col bg-white p-8 gap-8 rounded-md shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold">Lihat User</h1>
          <IoIosCloseCircle
            className="text-[#FD5725] text-[32px] cursor-pointer"
            onClick={onClose}
          />
        </div>
        {userDetails && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col gap-2 w-full items-center justify-center col-span-2 mb-4">
              <p className="font-bold">Foto Profile</p>
              <img
                src={`data:image/jpeg;base64,${userDetails.photo}`}
                alt={`${userDetails.first_name} ${userDetails.last_name}`}
                className="rounded-full w-[112px] h-[112px] object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Nama Depan:</p>
              <span text>{userDetails.first_name}</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Nama Belakang:</p>{" "}
              <span>{userDetails.last_name}</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Jenis Kelamin:</p>
              <span>{userDetails.gender}</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Tanggal Lahir:</p>
              <span>
                {new Date(userDetails.date_of_birth).toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <p className="font-bold">Email:</p>
              <span>{userDetails.email}</span>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <p className="font-bold">No. Handphone:</p>
              <span>{userDetails.phone}</span>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <p className="font-bold">Alamat:</p>
              <span>{userDetails.address}</span>
            </div>
          </div>
        )}
        <div className="w-full">
          <button className="w-full border-2 border-[#FD5725] bg-[#FD5725] text-white py-2 rounded-lg font-bold hover:bg-white hover:text-[#FD5725] cursor-pointer transition-all duration-150">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
