import React from 'react'
import { ArticleListContainer } from '../containers/ArticleListContainer'
import WithNavigation from '../shared/layouts/WithNavigation'

const MyListPage = () => {
  return (
    <WithNavigation>
      <ArticleListContainer />
    </WithNavigation>
  )
}

export default MyListPage
