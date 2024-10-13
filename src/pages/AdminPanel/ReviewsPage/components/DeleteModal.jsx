import { Modal, Button } from "antd";
import PropTypes from "prop-types";

const DeleteModal = ({
  deleteModal,
  closeDeleteModal,
  handleDelete,
}) => {
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
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <p id="delete-modal-description">
        Are you sure you want to delete?
      </p>
    </Modal>
  );
};

DeleteModal.propTypes = {
  deleteModal: PropTypes.bool.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  itemName: PropTypes.string, // Optional: add itemName to show the name of the item
};

export default DeleteModal;
