import CommunityCard from "../../../components/common/CommunityCard";

const Report = () => {

  const cards = [
    { id: 1, represent: true },
    { id: 2, represent: false }, 
    { id: 3, represent: false },
  ];


  return (
    <div className="w-full">
      <div className="flex h-[3rem] justify-between w-full border-b-black border-b-[0.0625rem]">
        <span className="text-[2rem]">작성글보기</span>
        <span className="h-full flex items-end">대표글 설정</span>
      </div>
      <div className="mx-[4rem]"></div>
      <div>
        <div className="flex justify-center items-center gap-[4rem] flex-wrap mt-[3rem]">
          {cards[0] ? cards.map((card) => (
            <CommunityCard key={card.id} represent={card.represent} />
          )) : <span className="mt-[10rem] text-[1.5rem]">등록된 글이 없습니다.</span>}
        </div>
      </div>
    </div>
  );
};

export default Report;
