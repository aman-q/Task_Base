import React, { useState, useEffect } from "react";
import logo from "../asset/logo.svg";
import { Link } from "react-router-dom";
import invoiceIcon from "../asset/invoiceIcon.svg";
import scheduleIcon from "../asset/scheduleIcon.svg";
import calendarIcon from "../asset/calendarIcon.svg";
import notificationIcon from "../asset/notificationIcon.svg";
import settingsIcon from "../asset/settingsIcon.svg";
import dashboardIcon from "../asset/dashboardIcon.svg";
import uploadIcon from "../asset/upload.svg";
import Papa from 'papaparse';

function UploadPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [theme, setTheme] = useState('dark');
  const [isLight, setIsLight] = useState(false);
  const [data, setdata] = useState([]);
  const [val, setval] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    setIsLight(savedTheme === 'light');
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = isLight ? 'dark' : 'light';
    setTheme(newTheme);
    setIsLight(!isLight);
  };


  useEffect(() => {
    // Fetch uploads from Firebase storage when "Uploads" page is active
    if (activePage === "Uploads") {
      const fetchUploads = async () => {
        
        // Add your logic to fetch data from Firebase
        // Set the fetched data to the uploads state using setUploads
      };

      fetchUploads();
    }
  }, [activePage]);

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        console.log('Parsed CSV data:', results.data[0]["select tags"]);
        setdata(results.data);
        // Now you can store this data in Firebase Realtime Database
        //storeDataInDatabase(results.data);
      },
      header: true,
    });
  };

  const handleTagChange = (e, i) => {
    const selectedTag = e.target.value;

    // Create a new copy of the data array
    const updatedData = [...data];

    // Update the selectedTag for the specific item
    updatedData[i] = {
      ...updatedData[i],
      selectedTag: selectedTag,
    };

    // Set the updated data back to state
    setdata(updatedData);

    console.log(updatedData[i].selectedTag); // Log the selected tag to verify
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    parseCSV(file);
    // setIsLoading(true);

    // const storage = getStorage(app);
    // const uploadTask = storage.ref(`csv/${file.name}`).put(file);

    // //const uploadTask = uploadBytesResumable(storageReference, file);

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log(`Upload is ${progress}% done`);
    //   },
    //   (error) => {
    //     console.error("Upload failed:", error);
    //     alert("Upload failed: " + error.message);
    //     setIsLoading(false);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref)
    //       .then((downloadURL) => {
    //         console.log("File available at", downloadURL);
    //         // Handle success, such as saving the URL to your Realtime Database
    //         setIsLoading(false);
    //       })
    //       .catch((error) => {
    //         console.error("Error getting download URL:", error);
    //         alert("Error getting download URL: " + error.message);
    //         setIsLoading(false);
    //       });
    //   }
    // );
  };

  return (
    <div className="flex h-screen bg-gray-900 overflow-x-auto max-w-screen- ">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-gray-100 ${isSidebarOpen ? "w-64" : "w-20"
          } transition-all duration-300`}
      >
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-8 h-6" />
            {isSidebarOpen && (
              <span className="text-lg font-semibold ml-2">Base</span>
            )}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
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
          <Link
            to="/upload"
            onClick={() => setActivePage("Dashboard")}
            className={`flex items-center py-3 px-4 ml-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors ${activePage === "Dashboard" ? "bg-blue-600 text-white" : ""
              }`}
          >
            <img src={dashboardIcon} alt="Dashboard" className="w-[17px] h-[17px]" />
            {isSidebarOpen && <span className="ml-4">Dashboard</span>}
          </Link>
          <Link
            to="/upload"
            onClick={() => setActivePage("Uploads")}
            className={`flex items-center py-3 px-4 ml-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors ${activePage === "Uploads" ? "bg-blue-600 text-white" : ""
              }`}
          >
            <img src={uploadIcon} alt="Uploads" className="w-[17px] h-[17px]" />
            {isSidebarOpen && <span className="ml-4">Uploads</span>}
          </Link>
          <Link
            to="/upload"
            onClick={() => setActivePage("Invoice")}
            className={`flex items-center py-3 px-4 ml-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors ${activePage === "Invoice" ? "bg-blue-600 text-white" : ""
              }`}
          >
            <img src={invoiceIcon} alt="Invoice" className="w-[17px] h-[17px]" />
            {isSidebarOpen && <span className="ml-4">Invoice</span>}
          </Link>
          <Link
            to="/upload"
            onClick={() => setActivePage("Schedule")}
            className={`flex items-center py-3 px-4 ml-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors ${activePage === "Schedule" ? "bg-blue-600 text-white" : ""
              }`}
          >
            <img src={scheduleIcon} alt="Schedule" className="w-[17px] h-[17px]" />
            {isSidebarOpen && <span className="ml-4">Schedule</span>}
          </Link>
          <Link
            to="/upload"
            onClick={() => setActivePage("Calendar")}
            className={`flex items-center py-3 px-4 ml-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors ${activePage === "Calendar" ? "bg-blue-600 text-white" : ""
              }`}
          >
            <img src={calendarIcon} alt="Calendar" className="w-[17px] h-[17px]" />
            {isSidebarOpen && <span className="ml-4">Calendar</span>}
          </Link>
          <Link
            to="/upload"
            onClick={() => setActivePage("Notification")}
            className={`flex items-center py-3 px-4 ml-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors ${activePage === "Notification" ? "bg-blue-600 text-white" : ""
              }`}
          >
            <img src={notificationIcon} alt="Notification" className="w-[17px] h-[17px]" />
            {isSidebarOpen && <span className="ml-4">Notification</span>}
          </Link>
          <Link
            to="/upload"
            onClick={() => setActivePage("Settings")}
            className={`flex items-center py-3 px-4 ml-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors ${activePage === "Settings" ? "bg-blue-600 text-white" : ""
              }`}
          >
            <img src={settingsIcon} alt="Settings" className="w-[17px] h-[17px]" />
            {isSidebarOpen && <span className="ml-4">Settings</span>}
          </Link>
        </nav>
        <div className=" mt-64"> {/* Adjust margin as needed */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isLight}
              onChange={toggleTheme}
            />
            <div className={`w-11 h-6 ${isLight ? 'bg-blue-600' : 'bg-gray-200'} rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600`}></div>
            <div className={`absolute left-1 top-1 w-4 h-4 ${isLight ? 'bg-white' : 'bg-gray-400'} rounded-full transition-transform transform peer-checked:translate-x-5`}></div>
          </label>
        </div>
      </div>

         
      {/* Main Content */}
      
      <div className={`flex-1 p-6 md:p-10 ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"}`} >
        {activePage === "Uploads" && (
          <>
            <h1 className="text-2xl md:text-3xl text-white mb-4 md:mb-8">
              Upload CSV
            </h1>
            <div className="bg-gray-700 p-6 md:p-10 rounded-lg shadow-md w-full max-w-lg text-center mx-auto">
              <input
                type="file"
                id="file-input"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-600 p-8 md:p-10">
                <svg
                  className="w-10 h-10 mx-auto mb-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.83 4H19a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h4.17L11 2h2l1.83 2zM12 16l4-5h-3V9H9v2H6l4 5z" />
                </svg>
                <label
                  htmlFor="file-input"
                  className="text-sm md:text-lg text-gray-200 cursor-pointer"
                >
                  Drop your excel sheet here or{" "}
                  <span className="text-blue-400 underline">browse</span>
                </label>
              </div>
              <button
                onClick={handleUpload}
                className="mt-6 md:mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2.93 15.071A8.001 8.001 0 010 12H0c0 4.418 3.582 8 8 8a8 8 0 007.071-2.929L14.93 15.07z"
                      ></path>
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
            {/* Display uploaded files */}
            <div className="mt-12">
      <h2 className="text-xl text-white mb-4">Uploads</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-gray-400">Sl No.</th>
              <th className="py-2 px-4 text-left text-gray-400">Links</th>
              <th className="py-2 px-4 text-left text-gray-400">Prefix</th>
              <th className="py-2 px-4 text-left text-gray-400">Add Tags</th>
              <th className="py-2 px-4 text-left text-gray-400">Selected Tags</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((upload, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2 px-4 text-gray-200">{indexOfFirstItem + index + 1}</td>
                  <td className="py-2 px-4 text-blue-400">
                    <a
                      href={upload.links}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {upload.links}
                    </a>
                  </td>
                  <td className="py-2 px-4 text-gray-200">{upload.prefix}</td>
                  <td className="py-2 px-4 text-gray-200">
                    <select
                      className="bg-gray-700 text-gray-200 p-2 rounded-lg"
                      value={upload.selectedTag || ""}
                      onChange={(e) => handleTagChange(e, index)}
                    >
                      <option value="">Select Tags</option>
                      {upload["select tags"]
                        ?.split(',')
                        ?.map((tag, i) => (
                          <option key={i} value={tag}>
                            {tag}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="py-2 px-4 text-gray-200">{upload.selectedTag}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center text-gray-400">
                  No uploads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white rounded-lg ${currentPage === 1 ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          Previous
        </button>
        <span className="text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-white rounded-lg ${currentPage === totalPages ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          Next
        </button>
      </div>
    </div>

          </>
        )}
        {/* Add other pages' content here based on `activePage` */}
        {activePage === "Dashboard" && (
          <h1 className="text-2xl md:text-3xl text-white mb-4 md:mb-8">
            Dashboard Content
          </h1>

        )}
        {activePage === "Invoice" && (
          <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
            <h1 className="text-3xl font-semibold">Invoice</h1>
            <p className="mt-4">
              Manage your invoices here.
            </p>
          </div>
        )}
        {activePage === "Schedule" && (
          <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
            <h1 className="text-3xl font-semibold">Schedule</h1>
            <p className="mt-4">
              View and manage your schedule.
            </p>
          </div>
        )}
        {activePage === "Calendar" && (
          <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
            <h1 className="text-3xl font-semibold">Calendar</h1>
            <p className="mt-4">
              Keep track of your events.
            </p>
          </div>
        )}
        {activePage === "Notification" && (
          <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
            <h1 className="text-3xl font-semibold">Notifications</h1>
            <p className="mt-4">
              Check your notifications here.
            </p>
          </div>
        )}
        {activePage === "Settings" && (
          <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="mt-4">
              Adjust your preferences and settings.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default UploadPage;
