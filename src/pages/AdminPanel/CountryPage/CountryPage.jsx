import { Alert } from "antd";
import CountryData from "./data/CountryData";
import useCountry from "../../../hooks/UseCountry";
import CarouselModal from "./components/CountryModal";
import DeleteModal from "./components/DeleteModal";
import Admin from "../../../components/Admin";

const CountryPage = () => {
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
    handleEdit,
    selectItem,
    refreshData,
  } = useCountry();

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
            selectItem={selectItem}
            refreshData={refreshData}
          />
          <h1>Data not found</h1>
        </Admin>
      );
    }
    return (
      <Admin>
        <CarouselModal
          isModalVisible={isModalVisible}
          showModal={showModal}
          handleCancel={handleCancel}
          selectItem={selectItem}
          refreshData={refreshData}
        />
        <Alert
          message="An error occurred while loading the images"
          type="error"
        />
      </Admin>
    );
  }

  return (
    <Admin>
      <CarouselModal
        isModalVisible={isModalVisible}
        showModal={showModal}
        handleCancel={handleCancel}
        selectItem={selectItem}
        refreshData={refreshData}
      />
      <CountryData openDeleteModal={openDeleteModal} handleEdit={handleEdit} />
      <DeleteModal
        deleteModal={deleteModal}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </Admin>
  );
};

export default CountryPage;
