import { Image, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import usePicture from "../../../../hooks/UsePicture";
import PropTypes from "prop-types";
import "../picture.css";

const PictureData = ({ openDeleteModal }) => {
  const { data } = usePicture();

  return (
    <div className="picture-page">
      {data?.length > 0 ? (
        data.map((src) => (
          <div key={src.id} className="image-container">
            <Image width={200} src={src.image_url} alt={src.image_name} />
            <Button
              className="delete-btn"
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => openDeleteModal(src.id)}
            />
          </div>
        ))
      ) : (
        <div className="no-data">
          <p>Not Image</p>
        </div>
      )}
    </div>
  );
};

PictureData.propTypes = {
  openDeleteModal: PropTypes.func.isRequired,
};

export default PictureData;
