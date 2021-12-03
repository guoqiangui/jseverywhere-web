import React from 'react'
import { useHistory } from 'react-router'
import { useMutation } from '@apollo/client'

import { DELETE_NOTE } from '../gql/mutation'
import { GET_NOTES, GET_MY_NOTES } from '../gql/query'
import ButtonAsLink from './ButtonAsLink'

const DeleteNote = props => {
  const history = useHistory()

  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId
    },
    // 重新请求数据以更新缓存
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      history.push('/mynotes')
    }
  })

  return (
    <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>
  )
}

export default DeleteNote
