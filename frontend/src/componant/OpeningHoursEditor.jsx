import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Switch, TimePicker, message as antMessage } from "antd";
import moment from "moment";
import DashboardLayout from "./DashboardLayout";

const OpeningHoursEditor = () => {
  const [openingHours, setOpeningHours] = useState({});
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    fetchOpeningHours();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      "x-auth-token": token,
      "Content-Type": "application/json",
    };
  };

  const fetchOpeningHours = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        antMessage.error("Authentication required");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/salon-ownerDahboord/opening-hours",
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json"
          },
        }
      );

      if (response.data && response.data.openingHours) {
        setOpeningHours(response.data.openingHours);
      } else {
        setOpeningHours({
          monday: { open: '', close: '', isOpen: true },
          tuesday: { open: '', close: '', isOpen: true },
          wednesday: { open: '', close: '', isOpen: true },
          thursday: { open: '', close: '', isOpen: true },
          friday: { open: '', close: '', isOpen: true },
          saturday: { open: '', close: '', isOpen: true },
          sunday: { open: '', close: '', isOpen: true }
        });
      }
    } catch (error) {
      console.error("Error fetching opening hours:", error.response || error);
      antMessage.error(error.response?.data?.message || "Failed to fetch opening hours");
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (day, field, value) => {
    const updatedHours = { ...openingHours };
    if (field === "isOpen") {
      updatedHours[day] = {
        ...updatedHours[day],
        isOpen: value,
        open: value ? updatedHours[day].open : null,
        close: value ? updatedHours[day].close : null,
      };
    } else {
      updatedHours[day] = {
        ...updatedHours[day],
        [field]: value,
      };
    }

    try {
      await axios.put(
        "http://localhost:3000/api/salon-ownerDahboord/opening-hours",
        { openingHours: updatedHours },
        { headers: getAuthHeader() }
      );
      setOpeningHours(updatedHours);
      antMessage.success("Opening hours updated successfully");
      setMessageText("Opening hours updated successfully");
    } catch (error) {
      antMessage.error("Failed to update opening hours");
      setMessageText("Failed to update opening hours");
    }
  };

  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      className: "font-semibold text-gray-800",
      render: (text) => (
        <span className="text-sm sm:text-base lg:text-lg capitalize">{text}</span>
      ),
    },
    {
      title: "Open",
      dataIndex: "open",
      key: "open",
      render: (_, record) => (
        <TimePicker
          value={record.open ? moment(record.open, "HH:mm") : null}
          onChange={(time, timeString) =>
            handleUpdate(record.key, "open", timeString)
          }
          format="HH:mm"
          disabled={!record.isOpen}
          className="w-24 sm:w-28 lg:w-32 text-sm sm:text-base border-2 border-gray-200 hover:border-red-300 focus:border-red-400 transition-colors"
          placeholder="Opening time"
        />
      ),
    },
    {
      title: "Close",
      dataIndex: "close",
      key: "close",
      render: (_, record) => (
        <TimePicker
          value={record.close ? moment(record.close, "HH:mm") : null}
          onChange={(time, timeString) =>
            handleUpdate(record.key, "close", timeString)
          }
          format="HH:mm"
          disabled={!record.isOpen}
          className="w-24 sm:w-28 lg:w-32 text-sm sm:text-base border-2 border-gray-200 hover:border-red-300 focus:border-red-400 transition-colors"
          placeholder="Closing time"
        />
      ),
    },
    {
      title: "Status",
      key: "isOpen",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Switch
            checked={record.isOpen}
            onChange={(checked) => handleUpdate(record.key, "isOpen", checked)}
            className={`${
              record.isOpen 
                ? 'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200' 
                : 'bg-gray-200'
            } scale-90 sm:scale-100`}
          />
          <span className={`text-xs sm:text-sm font-medium ${
            record.isOpen 
              ? 'text-red-400' 
              : 'text-gray-500'
          }`}>
            {record.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      ),
    },
  ];

  const data = Object.entries(openingHours).map(([day, hours]) => ({
    key: day,
    day: day.charAt(0).toUpperCase() + day.slice(1),
    ...hours,
  }));

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-sm">
        <div className="mb-6 sm:mb-8 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-4 sm:p-6 rounded-xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Opening Hours</h1>
          <p className="text-sm sm:text-base text-gray-700 mt-2">Manage your salon's operating hours</p>
        </div>

        <div className="bg-white rounded-xl overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={false}
            rowClassName={(record) => 
              `transition-all duration-200 hover:bg-red-50 
              ${record.isOpen ? 'bg-red-50/50' : 'bg-gray-50'}`
            }
            className="border border-gray-200 rounded-xl"
            scroll={{ x: true }}
          />
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-red-100 via-red-200 to-yellow-100 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Note:</h3>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span>Click the switch to toggle between open and closed</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span>Set opening and closing times by clicking the time fields</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span>Changes are saved automatically</span>
            </li>
          </ul>
        </div>

        {messageText && (
          <div className="mt-4 p-4 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-lg">
            <p className="text-sm sm:text-base text-gray-800 text-center">{messageText}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OpeningHoursEditor;
