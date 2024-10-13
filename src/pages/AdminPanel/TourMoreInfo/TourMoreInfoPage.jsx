import { useParams } from "react-router-dom";
import Admin from "../../../components/Admin";
import { useEffect, useState } from "react";
import Api from "../../../api";
import "./TourMoreInfoPage.scss"; // Importing SCSS file

const TourMoreInfoPage = () => {
  const { id } = useParams();
  const [tourDetails, setTourDetails] = useState(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const res = await Api.get("/tour/" + id);
        setTourDetails(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTourDetails(tourDetails);
  }, [id]);

  console.log(tourDetails);
  if (!tourDetails) {
    return <Admin>Loading...</Admin>;
  }

  return (
    <Admin>
      <div className="tour-details">
        <div className="tour-info mt-5">
          <h3>Tour ID: {tourDetails.id}</h3>
          <p>Day Count: {tourDetails.day}</p>
        </div>
        <h1 className="tour-title">{tourDetails.location}</h1>
        <img
          className="main-image"
          src={tourDetails.main_image_url}
          alt={tourDetails.main_image_name}
        />

        <h2 className="text text-center">Tour Description</h2>
        <div
          className="tour-description"
          dangerouslySetInnerHTML={{ __html: tourDetails.data }}
        />
      </div>
    </Admin>
  );
};

export default TourMoreInfoPage;
