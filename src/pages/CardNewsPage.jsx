import "../styles/CardNewsPage.css";

import SideBar from "../components/SideBar";
import bannerImg from "../assets/cardnews/banner_img.png";

function CardNewsPage() {
  return (
    <>
      <SideBar />
      <div className="cardnews-banner">
        <img src={bannerImg} className="banner-img" />
        <h1>어웨이 커피</h1>
        <p>를 위한 SNS 카드 뉴스를 만들어드릴게요.</p>
      </div>
    </>
  );
}

export default CardNewsPage;
