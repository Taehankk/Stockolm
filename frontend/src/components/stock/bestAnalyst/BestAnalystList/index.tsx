import BestAnalystListItem from "../BestAnalystListItem";

const bestAnalystList = () => {
  return (
    <div className="flex-col px-5 py-2 w-[23vw] h-[33vh] border border-b-1 rounded-2xl overflow-y-scroll">
      <span className="flex justify-center text-xl mb-2 ">Best 분석가</span>
      <div>
        <BestAnalystListItem></BestAnalystListItem>
        <BestAnalystListItem></BestAnalystListItem>
        <BestAnalystListItem></BestAnalystListItem>
        <BestAnalystListItem></BestAnalystListItem>
        <BestAnalystListItem></BestAnalystListItem>
        <BestAnalystListItem></BestAnalystListItem>
      </div>
    </div>
  );
};

export default bestAnalystList;
