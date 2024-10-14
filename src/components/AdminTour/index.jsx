import useTour from "../../hooks/UseTour";
import { Alert, Button } from "antd";
import AddTourModal from "./components/AddTourModal";
import DeleteModal from "./components/DeleteModal";
import TourData from "./data/TourData";
import "./tour.css";

const AdminTour = () => {
  const {
    data,
    isLoading,
    error,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    deleteModal,
    setNext,
    next
  } = useTour();
   console.log("Current Page:", next);

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
          <h1>Data not found </h1>
        </>
      );
    }else{
    return (
      <>
        <Alert message="Tourni yuklashda xatolik bor  " type="error" />
      </>
    );
    }
    
  }

  return (
    <div>
      <AddTourModal />
      <TourData openDeleteModal={openDeleteModal} data={data} />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        deleteModal={deleteModal}
        handleDelete={handleDelete}
      />

      <div className="button-container mt-3">
        {next > 1 && (
          <Button className="me-4" onClick={() => setNext(next - 1)}>Previous</Button>
        )}

        {data?.length > 9 ? (
          <Button  color="dark" onClick={() => setNext(next + 1)}>
            Next
          </Button>
        ) : (
          <Button variant="text" color="dark" disabled>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminTour;
