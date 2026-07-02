import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import {
  ChevronDown,
  Plus,
  Star,
  Download,
  MoreHorizontal,
  UserCircle,
  RefreshCw,
  Check,
  SearchIcon,
  BadgeIndianRupee,
} from "lucide-react";

export default function AppLayout() {
  const sidebarOpen = useSelector((s) => s.ui.sidebarOpen);
  const user = useSelector((state) => state.auth.user);

  const tabs = ["Dashboard", "Recent Updates"];
  const location = useLocation();

  const pageTitle =
    location.pathname === "/customers"
      ? "New Customer"
      : location.pathname === "/dashboard"
        ? "Dashboard"
        : "";

  console.log("Redux User:", user);

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex">
      <Sidebar />

      <div
        className={`flex-1 flex flex-col h-screen min-w-0 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-60" : "lg:ml-16"
        }`}
      >
        <Navbar title={pageTitle} />
        <main className="flex-1 overflow-auto">
          <div className="h-full">
            {" "}
            {/* ⬅ was just <div>, give it h-full so children can use h-full */}
            <Outlet />
          </div>
        </main>
      </div>

      <Modal />
    </div>
  );
}
