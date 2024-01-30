import { WebApi } from "../api";

const branchId = localStorage.getItem("branchId");

export const fetchRoomConfig = async (type) => {
  try {
    const response = await fetch(`${WebApi}/get_config_by_type/${type}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: document.cookie,
      },
    });
    const respData = await response.json();

    return respData.data.filter(
      (item) => item.branch_id === parseInt(branchId)
    );
  } catch (error) {
    console.error("Error fetching room config:", error);
    throw error;
  }
};

export const updateHostel = async (data, id) => {
  try {
    const response = await fetch(`${WebApi}/update_hostel/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: document.cookie,
      },
    });

    const respData = await response.json();
    return respData;
  } catch (error) {
    console.error("Error updating hostel:", error);
    throw error;
  }
};
