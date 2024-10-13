import { Carousel, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useCarousel from "../../../../hooks/UseCarousel";
import PropTypes from "prop-types";
import '../carousel.scss'


const CarouselData = ({ openDeleteModal }) => {
  const { data: carousel } = useCarousel();

  return (
    <div className="admin_main">
      {carousel?.length > 0 ? (
        <Carousel autoplay>
          {carousel.map((image) => (
            <div key={image.id} className="admin_main__carousel">
              <img src={image.image_url} alt={image.image_name} width="100%" />
              <Button
                className="admin_main__carousel__btn"
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => openDeleteModal(image.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>Rasm yo&apos;q</p>
      )}
    </div>
  );
};

CarouselData.propTypes = {
  openDeleteModal: PropTypes.func.isRequired,
};

export default CarouselData;


