import React, { useEffect, useState } from 'react'
import MkdSDK from '../utils/MkdSDK'
import { useNavigate } from 'react-router-dom'
import { AuthContext, tokenExpireError } from '../authContext'

const AdminDashboardPage = () => {
  let sdk = new MkdSDK()
  const navigate = useNavigate()
  const { dispatch, state } = React.useContext(AuthContext)

  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [numPages, setNumPages] = useState(1)

  useEffect(() => {
    ;(async function () {
      const role = localStorage.getItem('role')
      const tokenValidlity = await sdk.check(role)
      if (tokenValidlity.error) {
        tokenExpireError(dispatch, 'TOKEN_EXPIRED')
      }
    })()
    ;(async function fetchData() {
      sdk.setTable('video')
      const data = await sdk.callRestAPI(
        { payload: {}, page, limit },
        'PAGINATE',
      )
      setVideos((prevState) => [...data.list])
      setNumPages(data.num_pages)
    })()
  }, [dispatch, page, limit])

  const nextPage = () => {
    if (page === numPages) {
      return
    }
    setPage((prevState) => prevState + 1)
  }
  const prevPage = () => {
    if (page === 1) {
      return
    }
    setPage((prevState) => prevState - 1)
  }
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <>
      <button type='button' className='bg-white logout-btn' onClick={logout}>
        Logout
      </button>
      <div className='w-full flex justify-center items-center text-gray-700 dashboard'>
        <table className='video_table'>
          <thead>
            <th>id</th>
            <th>title</th>
            <th>photo</th>
            <th>user id</th>
            <th>username</th>
            <th>create at</th>
            <th>updated at </th>
            <th>like</th>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={index + 1}>
                <td>{video.id}</td>
                <td>{video.title}</td>
                <td>{video.photo}</td>
                <td>{video.user_id}</td>
                <td>{video.username}</td>
                <td>{video.create_at}</td>
                <td>{video.update_at} </td>
                <td>{video.like}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pagination'>
        <button type='button' className='bg-white' onClick={prevPage}>
          Previous
        </button>

        <button type='button' className='bg-white' onClick={nextPage}>
          Next
        </button>
      </div>
    </>
  )
}

export default AdminDashboardPage
// text-7xl h-screen
