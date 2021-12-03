import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useApolloClient, useMutation } from '@apollo/client'

import UserForm from '../components/UserForm'
import { SIGNIN_USER } from '../gql/mutation'

const SignIn = () => {
  useEffect(() => {
    document.title = 'Sign In - Notedly'
  })

  const history = useHistory()

  const client = useApolloClient()
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn)
      client.writeData({ data: { isLoggedIn: true } })
      history.push('/')
    }
  })

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin"  />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  )
}

export default SignIn
