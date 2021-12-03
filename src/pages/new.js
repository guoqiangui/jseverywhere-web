import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useMutation } from '@apollo/client'
import { GET_NOTES, GET_MY_NOTES } from '../gql/query'

import NoteForm from '../components/NoteForm'
import { NEW_NOTE } from '../gql/mutation'

const NewNote = () => {
  useEffect(() => {
    document.title = 'New Note - Notedly'
  })

  const history = useHistory()

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    // 重新请求数据以更新缓存
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      history.push(`note/${data.newNote.id}`)
    }
  })

  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data} />
    </React.Fragment>
  )
}

export default NewNote
