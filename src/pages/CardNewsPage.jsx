import "../styles/CardNewsPage.css";

import SideBar from "../components/SideBar";
import bannerImg from "../assets/cardnews/banner_img.png";
import categoryImg from "../assets/cardnews/category.png";

function CardNewsPage() {
  return (
    <>
      <SideBar />
      <div className="cardnews-banner">
        <img src={bannerImg} className="banner-img" />
        <h1 className="banner-title">어웨이 커피</h1>
        <p className="banner-content">
          를 위한 SNS 카드 뉴스를 만들어드릴게요.
        </p>
      </div>
      <div className="cardnews-box cardnews-category">
        <div className="cardnews-box-header">
          <img src={categoryImg} className="cardnews-box-ico" />
          <div className="cardnews-box-title">
            어떤 SNS 카드 뉴스를 만들까요?
          </div>
        </div>
        <div className="select-boxs">
          <div className="select-box noti">
            <div className="box select"></div>
            <p className="select-box-title">공지</p>
          </div>
          <div className="select-box new">
            <div className="box"></div>
            <p className="select-box-title">신제품 홍보</p>
          </div>
          <div className="select-box intro">
            <div className="box"></div>
            <p className="select-box-title">매장 소개</p>
          </div>
        </div>
      </div>
      <div className="cardnews-box cardnews-text">
        <div className="cardnews-box-header">
          <img src={categoryImg} className="cardnews-box-ico" />
          <div className="cardnews-box-title">
            SNS 카드 뉴스에 넣고 싶은 텍스트를 입력하세요.
          </div>
        </div>
        <div className="cardnews-text-box">
          <input
            className="cardnews-text-input"
            type="text"
            placeholder="텍스트를 입력하세요."
          />
          <button className="text-button cardnews-text-button">
            문구 생성
          </button>
        </div>
      </div>
      <div className="cardnews-box cardnews-text-reulst">
        <div className="cardnews-box-header">
          <img src={categoryImg} className="cardnews-box-ico" />
          <div className="cardnews-box-title">변환 결과</div>
        </div>
        <div className="cardnews-text-result-box">
          <div className="text-result-show">
            창가 쪽에서 안쪽으로 찍으면 자연광이 인물과 공간을 부드럽게
            비춥니다. 역광보다는 측광·순광이 좋아요. 나무, 초록 식물, 따뜻한
            조명이 있으면 사진 분위기가 한층 좋아질거에요. 가로사진은 3:2 비율,
            세로사진은 4:5 비율이 SNS에서 가장 반응이 좋아요. 오전 10시~오후 3시
            사이가 가장 자연광이 예쁘게 들어오는 시간이기 때문에 이 시간대에
            사진을 촬영하는 것을 추천해요.
          </div>
          <button className="text-button cardnews-text-result-button">
            재생성하기
          </button>
        </div>
      </div>
    </>
  );
}

export default CardNewsPage;
