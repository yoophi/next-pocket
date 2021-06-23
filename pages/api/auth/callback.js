import axios from 'axios'
import { serialize } from 'cookie'
import { AES, enc } from 'crypto-js'
import QueryString from 'qs'
import { accessTokenUrl, consumerKey, secretKey } from '../../../config'

const fetchAccessToken = async (consumerKey, code) => {
  const params = {
    consumer_key: consumerKey,
    code: code,
  }
  const response = await axios.post(accessTokenUrl, params)
  return QueryString.parse(response.data)
}

export default async (req, res) => {
  const { token } = req.query
  const requestToken = AES.decrypt(token, secretKey).toString(enc.Utf8)
  const { access_token, username } = await fetchAccessToken(consumerKey, requestToken)

  res.setHeader('Set-Cookie', [
    serialize('access_token', access_token, {
      path: '/',
      SameSite: 'Lax',
    }),
    serialize('username', username, {
      path: '/',
      SameSite: 'Lax',
    }),
  ])

  res.redirect('/')
}
