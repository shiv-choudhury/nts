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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="First name" value={userProfile?.firstname} />
            <Field label="Last name" value={userProfile?.lastname} />
            <Field label="Mobile" value={userProfile?.mobileno} />
            <Field label="Email" value={userProfile?.email} />
          </div>
        );
      case "ORDERS":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 font-semibold">Order ID</th>
                  <th className="p-2 font-semibold">Date</th>
                  <th className="p-2 font-semibold">Status</th>
                  <th className="p-2 font-semibold">Total</th>
                  <th className="p-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 text-blue-700">#05042025760</td>
                  <td className="p-2">5 April 2025</td>
                  <td className="p-2">Order placed</td>
                  <td className="p-2">£99.99 for 1 item</td>
                  <td className="p-2">
                    <button className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-100 transition">
                      VIEW
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                GO SHOP →
              </button>
            </div>
          </div>
        );
      case "LOGOUT":
        return (
          <div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              CONFIRM LOGOUT
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) {
    navigate("/login");
  }

  return (
    <div className="bg-gray-50 rounded shadow-md overflow-hidden mx-auto max-w-6xl my-8">
      {/* Mobile Tabs */}
      <div className="flex md:hidden justify-around border-b bg-white">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-700"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <div className="hidden md:block w-1/4 bg-gray-100 p-4">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-2 mb-2 rounded font-medium ${
                activeTab === tab
                  ? "bg-white text-blue-700 shadow"
                  : "hover:bg-white hover:text-blue-600"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-6">
          <h2 className="text-xl font-semibold border-b pb-2 mb-4 flex items-center gap-2">
            {activeTab === "ACCOUNT DETAILS" && <span>👤</span>}
            {activeTab === "ORDERS" && <span>📋</span>}
            {activeTab === "LOGOUT" && <span>🚪</span>}
            {activeTab}
          </h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <div className="mt-1 bg-gray-100 p-2 rounded text-gray-800">{value}</div>
    </div>
  );
}
