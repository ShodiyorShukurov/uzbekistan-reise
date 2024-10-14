import { Table, Button, Image, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const TourData = ({ openDeleteModal, data}) => {
  // const { data: tours } = useTour();

  const dataSource =
    data?.length > 0
      ? data.map((tour) => ({
          id: tour.id,
          day: tour.day,
          location: tour.location,
          image: tour.main_image_url,
          countryId: tour.country_id,
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
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (text, record) => (
        <Image width={50} src={record.image} alt={record.name} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="large">
          <NavLink to={`/tour/${record.id}`}>
            <Button type="primary" dashed>
              More Info
            </Button>
          </NavLink>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => openDeleteModal(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
      align: "center",
    },
  ];

  return <Table style={{marginTop: "20px"}} dataSource={dataSource} columns={columns} pagination={false} />;
};

TourData.propTypes = {
  openDeleteModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default TourData;
