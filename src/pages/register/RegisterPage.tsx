import React from 'react'
import { UserLayout } from '../../layout/userLayout'
import { RegisterForm } from './RegisterForm'

export const RegisterPage: React.FC = () => {
  return (
    <UserLayout>
      <RegisterForm />
    </UserLayout>
  )
}
