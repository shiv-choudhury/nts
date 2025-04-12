import React, { useEffect, useState } from "react";
import { getUserOrders, getUserProfile } from "../apis/ApiCalls";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ACCOUNT DETAILS");
  const tabs = ["ACCOUNT DETAILS", "ORDERS", "LOGOUT"];
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    fetchUserProfile();
    // fetchOrderList();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const resp = await getUserProfile();
      const { data, success, message } = resp.data;
      if (success) {
        setUserProfile(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrderList = async () => {
    try {
      const resp = await getUserOrders();
      const { data, success, message } = resp.data;
      if (success) {
        setOrders(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "ACCOUNT DETAILS":
        return (
          <div className="grid grid-cols-2 gap-6 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                First name
              </label>
              <div className="mt-1 bg-gray-100 p-2 rounded">
                {userProfile?.firstname}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last name
              </label>
              <div className="mt-1 bg-gray-100 p-2 rounded">
                {userProfile?.lastname}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Mobile
              </label>
              <div className="mt-1 bg-gray-100 p-2 rounded">
                {userProfile?.mobileno}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="mt-1 bg-gray-100 p-2 rounded">
                {userProfile?.email}
              </div>
            </div>
          </div>
        );
      case "ORDERS":
        return (
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 font-semibold">Order ID</th>
                    <th className="p-2 font-semibold">Date</th>
                    <th className="p-2 font-semibold">Total</th>
                    <th className="p-2 font-semibold">Status</th>
                    <th className="p-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 text-blue-700">#05042025760</td>
                    <td className="p-2">5 April 2025</td>
                    <td className="p-2">order placed</td>
                    <td className="p-2">£99.99 for 1 item</td>
                    <td className="p-2">
                      <button className="border border-gray-400 px-3 py-1 rounded">
                        VIEW
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-6">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  GO SHOP →
                </button>
              </div>
            </div>
          </div>
        );
      // case "WHISHLIST":
      //   return <div className="p-4">Wishlist content.</div>;
      case "LOGOUT":
        return (
          <div className="p-4">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            >
              CONFIRM LOGOUT
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-gray-50 rounded shadow-lg overflow-hidden">
      <div className="w-1/4 bg-gray-200 p-4 min-h-[400px]">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-4 py-2 mb-2 rounded font-medium ${
              activeTab === tab
                ? "bg-white text-blue-700 shadow"
                : "hover:bg-white"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="w-3/4 bg-white p-4">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 flex items-center gap-2">
          {activeTab === "ACCOUNT DETAILS" && <span>👤</span>}
          {activeTab === "ORDERS" && <span>📋</span>}
          {activeTab}
        </h2>
        {renderContent()}
      </div>
    </div>
  );
}
