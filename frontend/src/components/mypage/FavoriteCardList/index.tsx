import FavoriteCard from "../../elements/FavoriteCard";

import CardArrow from "/src/assets/cardArrow.svg"
import CardArrowReverse from "/src/assets/cardArrowReverse.svg"

interface FavoriteCardData {
    id?: string;
    name: string;
    reliability: number;
    accuracy: number;
    rank: number;
}
    
interface FavoriteCardProps {
    dataProps: FavoriteCardData[];
}

const FavoriteCardList = ({
    dataProps,
}: FavoriteCardProps) => {

  const cards = dataProps || [
    {
        id: "1",
        name: "백지헌",
        reliability: "90",
        accuracy: "79",
        rank: "1",
    },
    {
        id: "2",
        name: "카리나",
        reliability: "86",
        accuracy: "71",
        rank: "2",
    },
    {
        id: "3",
        name: "장원영",
        reliability: "70",
        accuracy: "99",
        rank: "3",
        },
  ];
  
  return(
    <div className="flex justify-center items-center gap-[4rem] w-full mt-[3rem]">
        <img src={CardArrow}></img>
        <div className="flex justify-center items-center gap-[3rem]">
          {cards.length > 0 ? cards.map((card) => (
             <FavoriteCard  key={card.id} name={card.name} reliability={card.reliability} accuracy={card.accuracy} rank={card.rank} />
          )) : <span className="mt-[5rem] text-[1.5rem]">좋아하는 분석가가 없습니다.</span>}
        </div>
        <img src={CardArrowReverse}></img>
    </div>
  );
};

export default FavoriteCardList;