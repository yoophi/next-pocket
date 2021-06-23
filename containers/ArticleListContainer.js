import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

export const ArticleListContainer = () => {
  const [list, setList] = useState([])
  const [posts, setPosts] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    setOffset(list.length)
  }, [list])

  useEffect(() => {
    const fetchPosts = async () => {
      const params = {
        count: 10,
        detailType: 'complete',
      }
      const response = await axios.post('/api/proxy/getpocket.com/v3/get', params)
      const data = response.data.list
      const array = Object.keys(data).map(key => [key, data[key]])

      setList([...list, ...array])
      setPosts([...posts, response.data])
    }

    fetchPosts()
  }, [])

  const loadMorePosts = useCallback(async () => {
    const params = {
      count: 10,
      detailType: 'complete',
      offset,
    }
    const response = await axios.post('/api/proxy/getpocket.com/v3/get', params)
    const data = response.data.list
    const array = Object.keys(data).map(key => [key, data[key]])
    setList([...list, ...array])
    setPosts([...posts, response.data])
  }, [offset])

  return (
    <>
      <div>
        <button onClick={() => loadMorePosts()}>load more</button>
      </div>
      <pre>{JSON.stringify({ offset }, null, 2)}</pre>
      <hr />
      <ul>
        {list.map(item => {
          const [id, article] = item
          return (
            <li
              style={{
                border: '1px solid black',
                margin: '1em 0',
                padding: '0.5em',
              }}>
              {article['image'] && (
                <div>
                  <img src={article['image']['src']} style={{ width: '200px' }} />
                </div>
              )}
              <code>#{id}</code> : {article['resolved_title']}
              <br />
              <code>{article['resolved_url']}</code>
              {article['tags'] && <pre>{JSON.stringify(article['tags'], null, 2)} </pre>}
            </li>
          )
        })}
      </ul>
      <hr />
      <div>
        <button onClick={() => loadMorePosts()}>load more</button>
      </div>
    </>
  )
}
