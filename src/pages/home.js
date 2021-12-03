import React from 'react'
import { useQuery } from '@apollo/client'

import { GET_NOTES } from '../gql/query'

import NoteFeed from '../components/NoteFeed'
import Button from '../components/Button'

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES)

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error!</p>

  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button onClick={() => {
          fetchMore({
            variables: { cursor: data.noteFeed.cursor },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              return {
                noteFeed: {
                  cursor: fetchMoreResult.noteFeed.cursor,
                  hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                  notes: [
                    ...previousResult.noteFeed.notes,
                    ...fetchMoreResult.noteFeed.notes
                  ],
                  __typename: 'NoteFeed'
                }
              }
            }
          })
        }}>Load more</Button>
      )}
    </React.Fragment>
  )
}

export default Home
