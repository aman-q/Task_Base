import React, { useState } from "react";
import logo from "../asset/logo.svg";
import invoiceIcon from "../asset/invoiceIcon.svg";
import scheduleIcon from "../asset/scheduleIcon.svg";
import calendarIcon from "../asset/calendarIcon.svg";
import notificationIcon from "../asset/notificationIcon.svg";
import settingsIcon from "../asset/settingsIcon.svg";
import dashboardIcon from "../asset/dashboardIcon.svg";

function UploadPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-gray-100 ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300`}
      >
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-8 h-6" />
            {isSidebarOpen && <span className="text-lg font-semibold ml-2">Base</span>}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6" // Removed p-4
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isSidebarOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
        <nav className="mt-10">
          <a
            href="#"
            className="flex items-center py-3 px-4 ml-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <img src={dashboardIcon} alt="Dashboard" className="w-[17px] h-[17px]" />
            {isSidebarOpen && <span className="ml-4">Dashboard</span>}
          </a>
          <a
            href="#"
            className="flex items-center py-3 px-4 ml-1 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <img src={invoiceIcon} alt="Invoice" className="w-6 h-6 mt-2" />
            {isSidebarOpen && <span className="ml-4">Uploads</span>}
          </a>
          
          <a
            href="#"
            className="flex items-center py-3 px-4 ml-1 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <img src={invoiceIcon} alt="Invoice" className="w-6 h-6 mt-2" />
            {isSidebarOpen && <span className="ml-4">Invoice</span>}
          </a>
          <a
            href="#"
            className="flex items-center py-3 px-4 ml-1 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <img src={scheduleIcon} alt="Schedule" className="w-6 h-6" />
            {isSidebarOpen && <span className="ml-4">Schedule</span>}
          </a>
          <a
            href="#"
            className="flex items-center py-3 px-4 ml-1 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <img src={calendarIcon} alt="Calendar" className="w-6 h-6" />
            {isSidebarOpen && <span className="ml-4">Calendar</span>}
          </a>
          <a
            href="#"
            className="flex items-center py-3 px-4 ml-1 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <img src={notificationIcon} alt="Notification" className="w-6 h-6" />
            {isSidebarOpen && <span className="ml-4">Notification</span>}
          </a>
          <a
            href="#"
            className="flex items-center py-3 px-4 ml-1 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <img src={settingsIcon} alt="Settings" className="w-6 h-6" />
            {isSidebarOpen && <span className="ml-4">Settings</span>}
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-10">
        <h1 className="text-2xl md:text-3xl text-white mb-4 md:mb-8">Upload CSV</h1>
        <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-md w-full max-w-lg text-center">
          <div className="border-2 border-dashed border-gray-600 p-8 md:p-10">
            <svg
              className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10c0 1.104.896 2 2 2h14a2 2 0 002-2V7M5 5h14c1.104 0 2 .896 2 2v2H3V7c0-1.104.896-2 2-2z"
              />
            </svg>
            <p className="text-gray-400">
              Drop your excel sheet here or{" "}
              <a href="#" className="text-blue-500">
                browse
              </a>
            </p>
          </div>
          <button className="mt-6 md:mt-8 px-4 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
