import { Alert } from "antd";
import CarouselData from "./data/CarouselData";
import CarouselModal from "./components/CarouselModal";
import DeleteModal from "./components/DeleteModal";
import Admin from "../../../components/Admin";
import useCarousel from "../../../hooks/UseCarousel";

const AdminCarousel = () => {
  const {
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
  } = useCarousel();

  if (isLoading) {
    return (
      <Admin>
        <p>Yuklanmoqda...</p>
      </Admin>
    );
  }

  if (error) {
    if (error.status === 404) {
      return (
        <Admin>
          <CarouselModal
            isModalVisible={isModalVisible}
            showModal={showModal}
            handleCancel={handleCancel}
            refreshData={refreshData}
          />
          <h1>Ma&apos;lumot yo&apos;q</h1>
        </Admin>
      );
    } else {
      return (
        <Admin>
          <CarouselModal
            isModalVisible={isModalVisible}
            showModal={showModal}
            handleCancel={handleCancel}
            refreshData={refreshData}
          />
          <Alert message="Rasmlarni yuklashda xatolik yuz berdi" type="error" />
        </Admin>
      );
    }
  }

  return (
    <Admin>
      <CarouselModal
        isModalVisible={isModalVisible}
        showModal={showModal}
        handleCancel={handleCancel}
        refreshData={refreshData}
      />
      <CarouselData openDeleteModal={openDeleteModal} />
      <DeleteModal
        deleteModal={deleteModal}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </Admin>
  );
};

export default AdminCarousel;
