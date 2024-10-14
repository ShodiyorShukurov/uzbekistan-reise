import { Alert, Button } from "antd";
import ReviewsData from "./data/ReviewsData";
import DeleteModal from "./components/DeleteModal";
import Admin from "../../../components/Admin";
import useReviews from "../../../hooks/UseReviews";

const ReviewsPage = () => {
  const {
    data,
    error,
    isLoading,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    deleteModal,
    handleEdit,
    next,
    setNext
  } = useReviews();

  if (isLoading) {
    return (
      <Admin>
        <p>Loading...</p>
      </Admin>
    );
  }

  if (error) {
    return (
      <Admin>
        <Alert
          message="Data not found"
          type="error"
        />
      </Admin>
    );
  }

  return (
    <Admin>
      <ReviewsData openDeleteModal={openDeleteModal} handleEdit={handleEdit} data={data}/>
      <DeleteModal
        deleteModal={deleteModal}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
      />

      <div className="button-container mt-3">
        {next > 1 && (
          <Button className="me-4" onClick={() => setNext(next - 1)}>
            Previous
          </Button>
        )}

        {data?.length > 9 ? (
          <Button color="dark" onClick={() => setNext(next + 1)}>
            Next
          </Button>
        ) : (
          <Button variant="text" color="dark" disabled>
            Next
          </Button>
        )}
      </div>
    </Admin>
  );
};

export default ReviewsPage;
