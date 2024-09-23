import notion from "../../../../public/NOTION.svg";
import ssafy from "../../../../public/SSAFY.svg";
import github from "../../../../public/GITHUB.svg";

const Footer = () => {
  return (
    <div className="w-[70vw] h-[20vh] mx-auto my-auto flex align-top">
      <div className="flex flex-col w-[50%] gap-5">
        <div>
          <p className="text-left text-2xl font-semibold">(주) STOCKOLM</p>
        </div>
        <div>
          <p className="text-left text-xl">
            주소: 대전광역시 유성구 덕명동 124, 105호
          </p>
        </div>
        <div>
          <p className="text-left text-xl">대표: 김태한</p>
        </div>
      </div>
      <div className="w-[60%] text-end mr-11 align-top">
        <div>
          <p>
            <span className="text-TextRed text-2xl tracking-wide font-semibold">
              {" "}
              ALL IN ONE{" "}
            </span>
            <span className="text-2xl tracking-wider font-semibold">
              {" "}
              SMART TRADING
            </span>
          </p>
        </div>
        <div className="ml-16 flex justify-around">
          <div>
            <img src={notion} alt="노션" />
          </div>
          <div>
            <img src={github} alt="깃허브" />
          </div>
          <div>
            <img src={ssafy} alt="싸피" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
