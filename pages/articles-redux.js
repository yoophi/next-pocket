import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPocketArticlesRequest } from '../features/article/articleSlice'
import WithNavigation from '../shared/layouts/WithNavigation'

export default function Home() {
  const dispatch = useDispatch()
  const { articles, offset, isLoading } = useSelector(state => {
    return state.article
  })

  const loadPocketArticles = useCallback(() => {
    dispatch(fetchPocketArticlesRequest({ offset }))
  }, [offset])

  return (
    <WithNavigation>
      <pre>offset: {offset}</pre>
      <button
        onClick={() => {
          loadPocketArticles()
        }}>
        click me
      </button>
      {isLoading && <div>loading ... </div>}
      <hr />
      {articles &&
        React.Children.toArray(
          articles.map(article => (
            <pre>
              {article[0]}: {article[1].resolved_url}
            </pre>
          )),
        )}
      <hr />
      <pre>offset: {offset}</pre>
      <button
        onClick={() => {
          loadPocketArticles()
        }}>
        click me
      </button>
    </WithNavigation>
  )
}
