import { Alert } from "antd";
import PictureData from "./data/PictureData";
import usePicture from "../../../hooks/UsePicture";
import CarouselModal from "./components/MainModal";
import DeleteModal from "./components/DeleteModal";
import Admin from "../../../components/Admin";

const PicturePage = () => {
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
  } = usePicture();

  if (isLoading) {
    return (
      <Admin>
        <p>Loading...</p>
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
          <h1>Data Not Found</h1>
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
          <Alert
            message="An error occurred while loading images"
            type="error"
            description="Please refresh the page and try again."
            showIcon
          />
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
      <PictureData openDeleteModal={openDeleteModal} />
      <DeleteModal
        deleteModal={deleteModal}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </Admin>
  );
};

export default PicturePage;
