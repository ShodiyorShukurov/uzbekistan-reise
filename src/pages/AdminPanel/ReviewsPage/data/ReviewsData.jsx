import { Table, Button, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types"; 

const ReviewsData = ({ openDeleteModal, handleEdit, data }) => {

  const reviewData =
    data?.length > 0
      ? data.map((review) => ({
          id: review.id,
          name: review.name,
          text: review.text,
          status: review.status,
        }))
      : [];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
      align: "center",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Checkbox
          checked={record.status}
          onChange={() => handleEdit(record.id, !record.status)}
        />
      ),
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => openDeleteModal(record.id)}
          >
            Delete
          </Button>
        </>
      ),
      align: "center",
    },
  ];

  return (
    <div className="p-1">
      <Table
        columns={columns}
        dataSource={reviewData}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

ReviewsData.propTypes = {
  openDeleteModal: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ReviewsData;
