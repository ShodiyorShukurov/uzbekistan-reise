import { Modal, Button } from "antd";
import PropTypes from "prop-types";

const DeleteModal = ({ deleteModal, closeDeleteModal, handleDelete }) => {
  return (
    <Modal
      title="Delete"
      open={deleteModal}
      onCancel={closeDeleteModal}
      style={{ top: 20 }}
      footer={[
        <Button key="back" onClick={closeDeleteModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" danger onClick={handleDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this tour?</p>
    </Modal>
  );
};

DeleteModal.propTypes = {
  deleteModal: PropTypes.bool.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
