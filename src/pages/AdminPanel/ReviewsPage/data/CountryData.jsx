import { Table, Button, Checkbox } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { useState } from "react"; // Import useState for state management

const CountryData = ({ openDeleteModal, handleEdit }) => {
  // State to manage country data
  const [data, setData] = useState([
    { id: 1, country: "Uzbekistan", text: "Uzbekistan", status: false },
    { id: 2, country: "Kazakhstan", text: "Kazakhstan", status: false },
    { id: 3, country: "Kyrgyzstan", text: "Kyrgyzstan", status: false },
    { id: 4, country: "Tajikistan", text: "Tajikistan", status: false },
    { id: 5, country: "Turkmenistan", text: "Turkmenistan", status: false },
    { id: 6, country: "Russia", text: "Russia", status: false },
    { id: 7, country: "China", text: "China", status: false },
  ]);


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Country Name",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Checkbox
          checked={record.status}
          onChange={() => handleEdit("id", "status")}
        />
      ),
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
            O&apos;chirish
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="picture-page">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

CountryData.propTypes = {
  openDeleteModal: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default CountryData;
