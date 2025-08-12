import "../styles/CardNewsPage.css";

import SideBar from "../components/SideBar";
import bannerImg from "../assets/cardnews/banner_img.png";
import CardNewsHeader from "../components/CardNewsHeader";

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
        <CardNewsHeader text="어떤 SNS 카드 뉴스를 만들까요?" />
        <div className="select-boxs">
          <div className="select-box noti">
            <div className="box"></div>
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
        <CardNewsHeader text="SNS 카드 뉴스에 넣고 싶은 텍스트를 입력하세요." />
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
        <CardNewsHeader text="변환 결과" />
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
      <div className="cardnews-box cardnews-templete">
        <CardNewsHeader text="원하는 템플릿을 선택해주세요." />
        <div className="templete-list">
          <div className="templete-box">
            <div className="store-name">업장 이름</div>
            <div className="store-content">본문</div>
          </div>
          <div className="templete-img-box">
            <div className="templete-box">
              <div className="templete-text bottom">이미지</div>
              <div className="store-name bottom">업장 이름</div>
              <div className="store-content bottom">본문</div>
            </div>
            <input type="file" className="upload"></input>
          </div>
          <div className="templete-img-box">
            <div className="templete-box">
              <div className="templete-text right">이미지</div>
              <div className="store-name right">업장 이름</div>
              <div className="store-content right">본문</div>
            </div>
            <input type="file" className="upload"></input>
          </div>
        </div>
      </div>
      <div className="cardnews-box cardnews-ratio">
        <CardNewsHeader text="원하는 비율을 선택해주세요." />
        <div className="select-boxs">
          <div className="select-box noti">
            <div className="box"></div>
            <p className="select-box-title">1:1 비율</p>
          </div>
          <div className="select-box new">
            <div className="box"></div>
            <p className="select-box-title">4:5 비율(가로)</p>
          </div>
          <div className="select-box intro">
            <div className="box"></div>
            <p className="select-box-title">4:5 비율(세로)</p>
          </div>
        </div>
      </div>
      <div className="cardnews-box cardnews-them">
        <CardNewsHeader text="원하는 테마를 선택해주세요." />
        <div className="them-list">
          <div className="them-box">
            <p>따뜻하고 편안한 분위기</p>
            <div className="color-box">
              <p>빙그레 Bold체</p>
              <p>배경 색상 #D8B384</p>
              <div className="color"></div>
            </div>
          </div>
          <div className="them-box">
            <p>깔끔하고 모던한 분위기</p>
            <div className="color-box">
              <p>빙그레 Bold체</p>
              <p>배경 색상 #D8B384</p>
              <div className="color"></div>
            </div>
          </div>
          <div className="them-box">
            <p>활기차고 밝은 분위기</p>
            <div className="color-box">
              <p>빙그레 Bold체</p>
              <p>배경 색상 #D8B384</p>
              <div className="color"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardNewsPage;
