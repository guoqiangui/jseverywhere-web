import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { GET_NOTE } from '../gql/query'
import Note from '../components/Note'

const NotePage = () => {
  const { id } = useParams()

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } })

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error! Note not found</p>

  return <Note note={data.note} />
}

export default NotePage
