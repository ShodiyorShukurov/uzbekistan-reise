import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Api from "../api";
import { AxiosError } from "axios";

const useTour = () => {
  /*FOR MODAL*/
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [id, setId] = React.useState(null);

  const fetchTourData = async () => {
    try {
      const res = await Api.get("/admin/tours/list?limit=10&page=1");
      return res.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const queryClient = useQueryClient();

  /*Delete function*/
  const openDeleteModal = (id) => {
    console.log(id);
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
      const res = await Api.delete("/tour/delete", { data });
      if (res.data) {
        setDeleteModal(false);
        notification.success({
          message: "Muvaffaqiyatli",
          description: "Yangilik muvaffaqiyatli o'chirildi!",
        });
        queryClient.invalidateQueries({ queryKey: ["tour"] });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios xatosi:", error.message);
        notification.error({
          message: "Xatolik",
          description:
            error.response?.data?.message ||
            "Yangilikni o'chirishda xatolik yuz berdi.",
        });
      } else {
        console.error("Noma'lum xato:", error);
        notification.error({
          message: "Xatolik",
          description: "Yangilikni o'chirishda noma'lum xatolik yuz berdi.",
        });
      }
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["tour"],
    queryFn: fetchTourData,
  });

  return {
    data,
    isLoading,
    error,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    deleteModal,
  };
};

export default useTour;
