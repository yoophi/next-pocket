import axios from "axios";
import { customAlphabet } from "nanoid";

import QueryString from "qs";
import {
  authorizeUrl,
  consumerKey,
  redirectUri,
  requestTokenUrl,
} from "../../../config";

const fetchRequestToken = async (consumerKey, redirectUri) => {
  const params = {
    consumer_key: consumerKey,
    redirect_uri: redirectUri,
  };
  const response = await axios.post(requestTokenUrl, params);
  console.log({ "response.data": response.data });
  return QueryString.parse(response.data).code;
};

export default async (req, res) => {
  const requestToken = await fetchRequestToken(consumerKey, redirectUri);
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);
  const id = nanoid();
  const params = {
    request_token: requestToken,
    redirect_uri: `${redirectUri}?${QueryString.stringify({ id })}`,
  };

  res.setHeader("Set-Cookie", `${id}=${requestToken}; path=/; SameSite=Lax`);
  res.redirect(`${authorizeUrl}?${QueryString.stringify(params)}`);
};
