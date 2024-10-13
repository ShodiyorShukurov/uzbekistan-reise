import { Alert } from "antd";
import CountryData from "./data/CountryData";
import useCountry from "../../../hooks/UseCountry";
import DeleteModal from "./components/DeleteModal";
import Admin from "../../../components/Admin";

const ReviewsPage = () => {
  const {
    isLoading,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    deleteModal,
    handleEdit,
  } = useCountry();

  if (isLoading) {
    return (
      <Admin>
        <p>Yuklanmoqda...</p>
      </Admin>
    );
  }

  // if (error) {
  //   return (
  //     <Admin>
  //       <Alert
  //         message="Rasmlarni yuklashda xatolik yuz berdi"
  //         type="error"
  //       />
  //     </Admin>
  //   );
  // }

  return (
    <Admin>
      <CountryData openDeleteModal={openDeleteModal} handleEdit={handleEdit} />
      <DeleteModal
        deleteModal={deleteModal}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </Admin>
  );
};

export default ReviewsPage;
