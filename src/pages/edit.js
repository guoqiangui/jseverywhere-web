import React from 'react'
import { useParams, useHistory } from 'react-router'
import { useQuery, useMutation } from '@apollo/client'

import { GET_NOTE, GET_ME } from '../gql/query'
import { EDIT_NOTE } from '../gql/mutation'
import NoteForm from '../components/NoteForm'

const EditNote = () => {
  const { id } = useParams()
  const history = useHistory()

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } })
  const { data: userdata } = useQuery(GET_ME)

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      history.push(`/note/${id}`)
    }
  })

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error! Note not found</p>

  if(userdata && userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>
  }
  return <NoteForm content={data.note.content} action={editNote} />
}

export default EditNote
