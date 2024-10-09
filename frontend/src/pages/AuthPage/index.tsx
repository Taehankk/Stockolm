import { useEffect, useState } from "react";

import Login from "./Login";
import SignUp from "./SignUp";
import ChangePassword from "./ChangePassword";

// import StockOlm from "../../assets/STOCKOLM.jpg";
import { useLocation } from "react-router-dom";
import { AuthContextProvider } from "../../components/auth/AuthContext";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const location = useLocation();
  const [imgLocation, setImgLocation] = useState(0);

  const handleImgLocation = (value: number) => {
    setImgLocation(value);
  };

  useEffect(() => {
    if (location.state.imgLocation) {
      setImgLocation(location.state.imgLocation);
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[95vh] w-[95vw]">
      <div className="absolute top-0 left-1/2 transform -translate-x-2/3 mt-4 flex text-PrimaryRed font-bold text-3xl items-start">
        <Link to={"/"}>STOCKOLM</Link>
      </div>
      <div className="absolute border border-[#D9D9D9] flex justify-center h-[80%] w-[70%]">
        <div
          className={`bg-[url('/src/assets/RedUp.webp')] bg-center bg-cover h-full w-1/2 object-cover transition-transform duration-300 z-10 ${
            imgLocation === 0 ? "translate-x-0" : "translate-x-full"
          }`}
        ></div>
        <div
          className={`mt-2 h-full w-1/2 tansition-transform duration-300 ${
            imgLocation === 0 ? "translate-x-0" : "translate-x-[-100%]"
          }`}
        >
          {imgLocation === 0 && <Login handleImgLocation={handleImgLocation} />}
          <AuthContextProvider>
            {imgLocation === 1 && (
              <SignUp handleImgLocation={handleImgLocation} />
            )}
            {imgLocation === 2 && (
              <div className="w-[35vw]">
                <ChangePassword handleImgLocation={handleImgLocation} />
              </div>
            )}
          </AuthContextProvider>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
