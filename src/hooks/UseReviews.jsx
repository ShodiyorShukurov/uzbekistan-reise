import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Api from "../api";
import { AxiosError } from "axios";

const useReviews = () => {
  /*FOR MODAL*/
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [id, setId] = React.useState(null);

  const fetchCountryData = async () => {
    try {
      const res = await Api.get(" /review/admin?limit=10&paga=1");
      return res.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const queryClient = useQueryClient();

  const handleEdit = async (status, id) => {
    console.log(status, id);

    const data = {
      id: id,
      status: status,
    };
    try {
      const res = await Api.put("/review/edit/status", data);

      if (res.status) {
        notification.success({
          message: "Muvaffaqiyatli",
          description: "Muvaffaqiyatli yangilandi!",
        });
      }
    } catch (error) {
      console.error("Noma'lum xato:", error);
      notification.error({
        message: "Xatolik",
        description: "Xatolik yuz berdi.",
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
          message: "Muvaffaqiyatli",
          description: "Yangilik muvaffaqiyatli o'chirildi!",
        });
        queryClient.invalidateQueries({ queryKey: ["countryData"] });
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
    queryKey: ["countryData"],
    queryFn: fetchCountryData,
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
  };
};

export default useReviews;
