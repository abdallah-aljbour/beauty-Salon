import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Switch, TimePicker, message } from "antd";
import moment from "moment";
import DashboardLayout from "./DashboardLayout";

const OpeningHoursEditor = () => {
  const [openingHours, setOpeningHours] = useState({});
  const [loading, setLoading] = useState(true);

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
      const response = await axios.get(
        "http://localhost:3000/api/salon-ownerDahboord/opening-hours",
        {
          headers: getAuthHeader(),
        }
      );
      setOpeningHours(response.data.openingHours);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch opening hours");
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
      message.success("Opening hours updated successfully");
    } catch (error) {
      message.error("Failed to update opening hours");
    }
  };

  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
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
        />
      ),
    },
    {
      title: "Open/Closed",
      key: "isOpen",
      render: (_, record) => (
        <Switch
          checked={record.isOpen}
          onChange={(checked) => handleUpdate(record.key, "isOpen", checked)}
          checkedChildren="Open"
          unCheckedChildren="Closed"
        />
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
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Opening Hours</h1>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={false}
          rowClassName={(record) => (record.isOpen ? "bg-green-100" : "")}
        />
      </div>
    </DashboardLayout>
  );
};

export default OpeningHoursEditor;
