import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, useApolloClient } from '@apollo/client'

import UserForm from '../components/UserForm'
import { SIGNUP_USER } from '../gql/mutation'

const SignUp = () => {
  useEffect(() => {
    document.title = 'Sign Up - Notedly'
  })

  const history = useHistory()
  const client = useApolloClient()

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      // 储存JWT
      localStorage.setItem('token', data.signUp)
      // 储存一些全局共享的状态，存到Apollo的local store里
      client.writeData({ data: { isLoggedIn: false } })
      // 跳转到首页
      history.push('/')
    }
  })

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  )
}

export default SignUp
