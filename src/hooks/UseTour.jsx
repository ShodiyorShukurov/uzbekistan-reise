import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Api from "../api";
import { AxiosError } from "axios";

const useTour = () => {
  /* FOR MODAL */
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [next, setNext] = React.useState(1);

  // Fetch tour data based on the current page number (next)
  const fetchTourData = async () => {

    try {
      const res = await Api.get(`/admin/tours/list?limit=15&page=${next}`);
      return res.data.data; // Return the data array
    } catch (error) {
      console.error("Error fetching tour data:", error);
      throw error; // Rethrow error to be caught by useQuery
    }
  };

  const queryClient = useQueryClient();

  /* Delete function */
  const openDeleteModal = (id) => {
    setId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setId(null);
  };

  const handleDelete = async () => {
    const data = { id };

    try {
      const res = await Api.delete("/tour/delete", { data });
      if (res.data) {
        setDeleteModal(false);
        notification.success({
          message: "Muvaffaqiyatli",
          description: "Yangilik muvaffaqiyatli o'chirildi!",
        });
        // Invalidate queries to refetch tour data
        queryClient.invalidateQueries({ queryKey: ["tour"] });
      }
    } catch (error) {
      // Handle errors based on their type
      if (error instanceof AxiosError) {
        console.error("Axios error:", error.message);
        notification.error({
          message: "Xatolik",
          description:
            error.response?.data?.message ||
            "Yangilikni o'chirishda xatolik yuz berdi.",
        });
      } else {
        console.error("Unknown error:", error);
        notification.error({
          message: "Xatolik",
          description: "Yangilikni o'chirishda noma'lum xatolik yuz berdi.",
        });
      }
    }
  };

   const refreshData = () => {
     queryClient.invalidateQueries({ queryKey: ["tour"] });
   };

  // Query to fetch tour data, refetches when `next` changes
  const { data, isLoading, error } = useQuery({
    queryKey: ["tour", next], // Include `next` to refetch on change
    queryFn: fetchTourData,
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
    setNext,
    next,
    refreshData,
  };
};

export default useTour;
