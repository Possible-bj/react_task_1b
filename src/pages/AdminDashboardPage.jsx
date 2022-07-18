import React, { useEffect } from 'react'
import MkdSDK from '../utils/MkdSDK'
// import { useNavigate } from 'react-router-dom'
import { AuthContext, tokenExpireError } from '../authContext'
import { GlobalContext } from '../globalContext'

const AdminDashboardPage = ({ value }) => {
  const { dispatch } = React.useContext(AuthContext)
  const { state } = React.useContext(GlobalContext)
  console.log(state)
  useEffect(async () => {
    let sdk = new MkdSDK()
    const role = localStorage.getItem('role')
    const tokenValidlity = await sdk.check(role)
    if (tokenValidlity.error) {
      tokenExpireError(dispatch, 'TOKEN_EXPIRED')
    }
  }, [dispatch])

  return (
    <>
      <div className='w-full flex justify-center items-center text-7xl h-screen text-gray-700 '>
        Dashboard
      </div>
    </>
  )
}

export default AdminDashboardPage
