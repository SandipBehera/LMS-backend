import React from "react";
import { LocalApi } from "../api";

export const Add_Book_Category = async (
  category_name,
  category_description,
  status
) => {
  return await fetch(`${LocalApi}/create-book-category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category_name: category_name,
      category_description: category_description,
      status: status,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

export const GetAllBookCategories = async () => {
  return await fetch(`${LocalApi}/get-all-book-categories`, {
    method: "GET",
  }).then((response) => response.json());
};

export const GetBookCategory = async (id) => {
  return await fetch(`${LocalApi}/get-book-category/${id}`, {
    method: "POST",
  }).then((response) => response.json());
};

export const UpdateBookCategory = async (
  id,
  category_name,
  category_description,
  status
) => {
  return await fetch(`${LocalApi}/update-book-category/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category_name: category_name,
      category_description: category_description,
      status: status,
    }),
  }).then((response) => {
    return response.json();
  });
};

export const UploadBulkCategory = async (data) => {
  return await fetch(`${LocalApi}/upload-bulk-category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};
