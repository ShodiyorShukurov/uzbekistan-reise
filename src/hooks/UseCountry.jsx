import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Api from "../api";
import { AxiosError } from "axios";

const useCountry = () => {
  /*FOR MODAL*/
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectItem, setSelectedItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [id, setId] = React.useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  /** Modal oynasini yopish va formani tozalash */
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const fetchCountryData = async () => {
    try {
      const res = await Api.get("/countries");
      return res.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const queryClient = useQueryClient();

  const handleEdit = (item) => {
    setSelectedItem(item);
    showModal();
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
      const res = await Api.delete("/country/delete/", { data });
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

   const refreshData = () => {
     queryClient.invalidateQueries({ queryKey: ["countryData"] });
   };

  const { data, isLoading, error } = useQuery({
    queryKey: ["countryData"],
    queryFn: fetchCountryData,
  });

  return {
    data,
    isLoading,
    error,
    isModalVisible,
    showModal,
    handleCancel,
    selectItem,
    setSelectedItem,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    deleteModal,
    handleEdit,
    refreshData,
  };
};

export default useCountry;
