import axios from 'axios'
import { AES } from 'crypto-js'
import QueryString from 'qs'
import { authorizeUrl, consumerKey, redirectUri, requestTokenUrl, secretKey } from '../../../config'

const fetchRequestToken = async (consumerKey, redirectUri) => {
  const params = {
    consumer_key: consumerKey,
    redirect_uri: redirectUri,
  }
  const response = await axios.post(requestTokenUrl, params)
  return QueryString.parse(response.data).code
}

export default async (req, res) => {
  const requestToken = await fetchRequestToken(consumerKey, redirectUri)
  const token = AES.encrypt(requestToken, secretKey).toString()
  const params = {
    request_token: requestToken,
    redirect_uri: `${redirectUri}?${QueryString.stringify({ token })}`,
  }

  res.redirect(`${authorizeUrl}?${QueryString.stringify(params)}`)
}
