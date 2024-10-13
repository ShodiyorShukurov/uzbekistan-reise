import useTour from "../../hooks/UseTour";
import { Alert } from "antd";
import AddTourModal from "./components/AddTourModal";
import DeleteModal from "./components/DeleteModal";
import TourData from "./data/TourData";
import "./tour.css";

const AdminTour = () => {
  const {
    isLoading,
    error,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    deleteModal,
  } = useTour();

  if (isLoading) {
    return (
      <>
        <p>Yuklanmoqda...</p>
      </>
    );
  }

  if (error) {
    if (error.status === 404) {
      return (
        <>
          <AddTourModal />
          <h1>Ma&apos;lumot yo&apos;q </h1>
        </>
      );
    }else{
    return (
      <>
        <Alert message="Rasmlarni yuklashda xatolik yuz berdi" type="error" />
      </>
    );
    }
    
  }

  return (
    <div>
      <AddTourModal />
      <TourData openDeleteModal={openDeleteModal} />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        deleteModal={deleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AdminTour;
