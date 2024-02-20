import React from "react";
// import Banner from "../../components/Banner/Banner";
// import BannerBottom from "../../components/Banner/BannerBottom";
// import BestSellers from "../../components/home/BestSellers/BestSellers";
// import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
// import Sale from "../../components/home/Sale/Sale";
// import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
// import YearProduct from "../../components/home/YearProduct/YearProduct";
import ShopByPet from "../../components/home/ShopByPet/ShopByPet";
import Banner1 from "../../components/Banner/Banner1";
import Album from "../../components/home/Products/Album";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      {/* <Banner />
      <BannerBottom /> */}
      <div>
        <section style={{ marginTop: 200 }}></section>
        <ShopByPet />
        <Banner1 />
        <Album />
        {/* <Sale />
        <NewArrivals />
        <BestSellers />
        <YearProduct />
        <SpecialOffers /> */}
      </div>
    </div>
  );
};

export default Home;
