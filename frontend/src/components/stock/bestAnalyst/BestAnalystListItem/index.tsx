import face from "../../../../assets/face.jpg";

const BestAnalystListItem = () => {
  return (
    <div className="bg-white flex px-2 py-1 border-t border-b border-gray-200 ">
      <div className="flex items-center">
        <div className="flex-1">
          <img
            className="w-[50px] h-[50px] rounded-full border"
            src={face}
          ></img>
        </div>
        <div className="flex-col flex-4 mx-5">
          <span className="block font-normal">김싸피</span>
          <span className="text-gray-400">신뢰도 99%</span>
        </div>
        <div className="flex-2">
          <span className="px-2 py-1 bg-red-400 rounded-lg text-white text-small">
            매수추천
          </span>
        </div>
      </div>
    </div>
  );
};
export default BestAnalystListItem;
