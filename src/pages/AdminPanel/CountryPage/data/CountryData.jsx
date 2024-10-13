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
    },
    {
      title: "Country Name",
      dataIndex: "country", // country deb yozildi
      key: "country",
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
        dataSource={countryData} // 'countryData' to'g'ri yozildi
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
