import React from 'react'
import Container from '../../../Components/Containers/Container'
import { Outlet } from 'react-router'

export default function index() {
  return (
    <Container fullWidth >
      <Outlet/>
    </Container>
  )
}
