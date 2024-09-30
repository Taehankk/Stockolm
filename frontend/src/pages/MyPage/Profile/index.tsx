import person from "/src/assets/person.svg"
import category from "/src/assets/category.svg"
import StockInfoList from "../../../components/common/StockInfoList";
import FavoriteCardList from "../../../components/mypage/FavoriteCardList";
import DonutChart from "../../../components/elements/DonutChart";
import BarChart from "../../../components/elements/BarChart";

const Profile = () => {

    const role: string = "USE";

  return (
    <div className="mt-[-5rem] w-full h-[100vh]">
        {role === "USER" ? <div className="w-full h-[200px] mb-[4rem]">
            <div className="h-[2rem] flex mb-[2rem]">
              <img src={person} className="flex h-[1.7rem] self-end"></img>
              <div className="text-[1.75rem] ml-[1rem] mb-[2rem]">관심 분석가</div>
            </div>
            <FavoriteCardList dataProps={[]} />
        </div> :
        <div className="w-full h-[200px] mb-[4rem]">
        <div className="h-[2rem] flex mb-[2rem]">
          <img src={person} className="flex h-[1.7rem] self-end"></img>
          <div className="text-[1.75rem] ml-[1rem] mb-[2rem]">내 통계</div>
        </div>
        <div className="flex w-full gap-[4rem]">
            <div className="flex flex-col justify-center items-center gap-[1rem]">
              <span className="text-[1.3rem]">신뢰도</span>
              <DonutChart color="#FFD2D2" value={90}></DonutChart>
            </div>
            <div className="flex flex-col justify-center items-center gap-[1rem]">
              <span className="text-[1.3rem] text-center ">정확도</span>
              <DonutChart color="#FFF3CB" value={55}></DonutChart>
            </div>
            <div className="flex flex-col items-center gap-[0.4rem] ml-[1rem]">
              <span className="text-[1.3rem]">산업군</span>
              <BarChart color="#FFABAB" value={60} children="반도체"></BarChart>
              <BarChart color="#FFABAB" value={20} children="IT"></BarChart>
              <BarChart color="#FFABAB" value={20} children="자동차"></BarChart>
            </div>
          </div>
        </div> 
        }

        <div className="flex flex-col items-center w-full mt-[10rem] h-[200px]">
            <div className="flex self-start h-[2rem] mb-[2rem]">
              <img src={category} className="flex h-[1.7rem] self-end"></img>
              <div className="text-[1.75rem] ml-[1rem] mb-[2rem]">{role === "USER" ? "관심 종목" : "분석 종목"}</div>
            </div>
            <StockInfoList dataProps={[]} />
        </div>
    </div>
  );
};

export default Profile;
