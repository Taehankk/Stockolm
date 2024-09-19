import { useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import ChangePassword from "./FindPassword";

// import StockOlm from "../../assets/STOCKOLM.jpg";
import { useLocation } from "react-router-dom";

const AuthPage = () => {
  const location = useLocation();
  const [imgLocation, setImgLocation] = useState(0);

  const handleImgLocation = (value: number) => {
    setImgLocation(value);
  };

  useEffect(() => {
    console.log(location);
    if (location.state.imgLocation) {
      setImgLocation(location.state.imgLocation);
    }
  }, []);

  return (
    <div className="flex justify-center items-start h-[95vh] w-[95vw]">
      <div className="absolute flex items-start h-full w-[80%]">
        {/* <img
        src={StockOlm}
        alt=""
        className={`h-[90vh] w-1/2 object-cover aspect-auto transition-transform duration-300 ${
          imgLocation === 0 ? "translate-x-0" : "translate-x-full"
        }`}
      /> */}
        <div
          className={`bg-[url('/STOCKOLM.jpg')] bg-center bg-cover h-full w-1/2 object-cover transition-transform duration-300 z-10 ${
            imgLocation === 0 ? "translate-x-0" : "translate-x-full"
          }`}
        ></div>
        <div
          className={`w-1/2 h-full flex items-center justify-center transition-transform duration-300 ${
            imgLocation === 0 ? "translate-x-0" : "translate-x-[-100%]"
          }`}
        >
          {imgLocation === 0 && (
            <div
              className={`transition-opacity duration-500 ${
                imgLocation === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              <Login handleImgLocation={handleImgLocation} />{" "}
            </div>
          )}
          {imgLocation === 1 && (
            <div
              className={`transition-opacity duration-500 ${
                imgLocation === 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              <SignUp handleImgLocation={handleImgLocation} />
            </div>
          )}
          {imgLocation === 2 && (
            <div
              className={`transition-opacity duration-500 ${
                imgLocation === 2 ? "opacity-100" : "opacity-0"
              }`}
            >
              <ChangePassword handleImgLocation={handleImgLocation} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
