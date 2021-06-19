import { consumerKey, accessTokenUrl } from "../../../config";
import QueryString from "qs";
import axios from "axios";

const fetchAccessToken = async (consumerKey, code) => {
  const params = {
    consumer_key: consumerKey,
    code: code,
  };
  const response = await axios.post(accessTokenUrl, params);
  return QueryString.parse(response.data);
};

export default async (req, res) => {
  const { id } = req.query;
  const { access_token, username } = await fetchAccessToken(
    consumerKey,
    req.cookies[id]
  );

  res.setHeader("Set-Cookie", [
    `access_token=${access_token}; path=/; SameSite=Lax`,
    `username=${username}; path=/; SameSite=Lax`,
  ]);

  res.redirect("/");
};
