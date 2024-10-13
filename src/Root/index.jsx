import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login.jsx";
import PrivateRoute from "../utils/PrivateRoute";
import PicturePage from "../pages/AdminPanel/PicturePage/PicturePage.jsx";
import CountryPage from "../pages/AdminPanel/CountryPage/CountryPage.jsx";
import TourPage from "../pages/AdminPanel/TourPage.jsx";
import AdminCarousel from "../pages/AdminPanel/Carousel/AdminCarousel.jsx";
import ReviewsPage from "../pages/AdminPanel/ReviewsPage/ReviewsPage.jsx";
import TourMoreInfoPage from '../pages/AdminPanel/TourMoreInfo/TourMoreInfoPage.jsx'

const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/carousel" element={<AdminCarousel />} />
          <Route path="/images" element={<PicturePage />} />
          <Route path="/country" element={<CountryPage />} />
          <Route path="/tour" element={<TourPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/tour/:id" element={<TourMoreInfoPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Root;
