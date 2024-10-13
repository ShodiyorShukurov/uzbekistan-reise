import React from "react";
import { Table, Button, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import useTour from "../../../hooks/UseTour";

const TourData = ({ openDeleteModal }) => {
  const { data: tours } = useTour();
  console.log(tours);

  // Updated data source with image URLs
  const dataSource =
    tours?.length > 0
      ? tours.map((tour) => ({
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
        <>
          <Button type="link">
            <NavLink to={`/tour/${record.id}`}>More Info</NavLink>
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

  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default TourData;
