// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { consumerKey } from "../../../config";
import axios from "axios";

export default async (req, res) => {
  const targetUrl = `https://${req.query.path.join("/")}`;
  const { method, body, query, headers, cookies } = req;
  const { access_token } = cookies;

  if (method === "POST") {
    const response = await axios({
      method: method,
      url: targetUrl,
      data: {
        ...body,
        access_token,
        consumer_key: consumerKey,
      },
    });
    res.status(200).json(response.data);
  } else {
    res.status(200).json({ name: "John Doe" });
  }
};
