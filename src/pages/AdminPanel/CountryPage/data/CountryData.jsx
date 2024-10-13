import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types"; // Import PropTypes for validation
import useCountry from "../../../../hooks/UseCountry";

const CountryData = ({ openDeleteModal, handleEdit }) => {
  const { data } = useCountry();

  const countryData = data.map((country) => ({
    id: country.id,
    country: country.name,
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Country Name",
      dataIndex: "country", // The data index is correctly labeled as 'country'
      key: "country",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: "8px" }}
          >
            Edit
          </Button>
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
    <Table
      style={{ marginTop: "20px" }}
      columns={columns}
      dataSource={countryData} // 'countryData' is correctly referenced
      rowKey="id"
      pagination={false}
    />
  );
};

CountryData.propTypes = {
  openDeleteModal: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default CountryData;
