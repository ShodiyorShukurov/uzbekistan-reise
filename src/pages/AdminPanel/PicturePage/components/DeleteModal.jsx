import { Modal, Button } from "antd";
import PropTypes from "prop-types";

const DeleteModal = ({ deleteModal, closeDeleteModal, handleDelete }) => {
  return (
    <Modal
      title="O'chirish"
      open={deleteModal}
      onCancel={closeDeleteModal}
      style={{ top: 20 }}
      footer={[
        <Button key="back" onClick={closeDeleteModal}>
          Bekor qilish
        </Button>,
        <Button key="submit" type="primary" danger onClick={handleDelete}>
          O&apos;chirish
        </Button>,
      ]}
    >
      <p>Rasmni o&apos;chirmoqchimisiz?</p>
    </Modal>
  );
};

DeleteModal.propTypes = {
  deleteModal: PropTypes.bool.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
