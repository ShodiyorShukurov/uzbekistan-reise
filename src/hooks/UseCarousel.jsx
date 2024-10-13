import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Api from "../api/index";
import { AxiosError } from "axios";

const useCarousel = () => {
  /*FOR MODAL*/
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [id, setId] = React.useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  /** Modal oynasini yopish va formani tozalash */
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchCarouselData = async () => {
    try {
      const res = await Api.get("/carousels");
      return res.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const queryClient = useQueryClient();

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
      const res = await Api.delete("/carousel/delete", { data });
      if (res.data) {
        setDeleteModal(false);
        notification.success({
          message: "Muvaffaqiyatli",
          description: "Rasm muvaffaqiyatli o'chirildi!",
        });
        queryClient.invalidateQueries({ queryKey: ["carousel"] });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios xatosi:", error.message);
        notification.error({
          message: "Xatolik",
          description:
            error.response?.data?.message ||
            "Rasmni o'chirishda xatolik yuz berdi.",
        });
      } else {
        console.error("Noma'lum xato:", error);
        notification.error({
          message: "Xatolik",
          description: "Rasmni o'chirishda noma'lum xatolik yuz berdi.",
        });
      }
    }
  };

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["carousel"] }); 
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["carousel"],
    queryFn: fetchCarouselData,
  });

  return {
    data,
    isLoading,
    error,
    isModalVisible,
    showModal,
    handleCancel,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    deleteModal,
    refreshData,
  };
};

export default useCarousel;
