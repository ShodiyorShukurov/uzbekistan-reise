import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Api from "../api";
import { AxiosError } from "axios";

const useReviews = () => {
  
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [next, setNext] = React.useState(1);

  const fetchReviews = async () => {
    try {
      const res = await Api.get(`/review/admin?limit=10&page=${next}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const queryClient = useQueryClient();

  const handleEdit = async (id, status) => {
    const data = {
      id: id,
      status: status,
    };
    try {
      const res = await Api.put("/review/edit/status", data);

      if (res.status) {
        notification.success({
          message: "Success",
          description: "Successfully updated!",
        });
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
      }
    } catch (error) {
      console.error("Unknown error:", error);
      notification.error({
        message: "Error",
        description: "An error occurred.",
      });
    }
  };

  /*Delete function*/
  const openDeleteModal = (id) => {
    setId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setId(null);
  };

  const handleDelete = async () => {
    const data = {
      id: id,
    };
    try {
      const res = await Api.delete("/review/delete", { data });
      if (res.data) {
        setDeleteModal(false);
        notification.success({
          message: "Success",
          description: "Review successfully deleted!",
        });
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios error:", error.message);
        notification.error({
          message: "Error",
          description:
            error.response?.data?.message ||
            "An error occurred while deleting the review.",
        });
      } else {
        console.error("Unknown error:", error);
        notification.error({
          message: "Error",
          description: "An unknown error occurred while deleting the review.",
        });
      }
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews", next],
    queryFn: fetchReviews,
    enabled: next > 0,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  return {
    data,
    isLoading,
    error,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    deleteModal,
    handleEdit,
    setNext,
    next
  };
};

export default useReviews;
