import axios from "axios";

export const fetchRankings = async (
  rankValue: string | null,
  page: number = 1,
  size: number = 5,
  sort: string | null = null,
  analystName?: string
) => {
  const params = {
    rankValue,
    page: page - 1,
    size,
    sort,
    analystName,
  };

  const response = await axios.get("/api/v1/rank", { params });
  return response.data;
};
