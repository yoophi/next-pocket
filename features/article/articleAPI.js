import axios from "axios";

export async function fetchPocketArticles(offset = 0) {
  const params = {
    count: 10,
    detailType: "complete",
  };
  if (offset) {
    params.offset = offset;
  }
  const response = await axios.post("/api/proxy/getpocket.com/v3/get", params);
  const data = response.data.list;

  return Object.keys(data).map((key) => [key, data[key]]);
}
