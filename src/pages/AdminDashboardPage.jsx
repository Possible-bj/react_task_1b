import React, { useEffect, useState } from 'react'
import MkdSDK from '../utils/MkdSDK'
// import { useNavigate } from 'react-router-dom'
import { AuthContext, tokenExpireError } from '../authContext'
// import { GlobalContext } from '../globalContext'
import testData from '../testData'
import Paginate from '../components/Paginate'

const AdminDashboardPage = () => {
  let sdk = new MkdSDK()

  const { dispatch } = React.useContext(AuthContext)

  const [videos, setVideos] = useState(testData)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [numPages, setNumPages] = useState(1)

  useEffect(async () => {
    const role = localStorage.getItem('role')
    const tokenValidlity = await sdk.check(role)
    if (tokenValidlity.error) {
      tokenExpireError(dispatch, 'TOKEN_EXPIRED')
    }
    sdk.setTable('video')
    const data = await sdk.callRestAPI({ payload: {}, page, limit }, 'PAGINATE')
    setVideos((prevState) => [...data.list])
    setNumPages(data.num_pages)
  }, [dispatch, page, limit])

  const nextPage = () => {
    if (page === numPages) {
      return
    }
    setPage(prevState => prevState + 1)
  }
  const prevPage = () => {
    if (page === 1) {
      return
    }
    setPage(prevState => prevState - 1)
  }
  

  return (
    <>
      <div className='w-full flex justify-center items-center text-gray-700 '>
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
                <td>{video.updated_at} </td>
                <td>{video.like}</td>
              </tr>
            ))}
          </tbody>
        </table>
              <button 
              type='button'
              className='bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white  dark:hover:bg-gray-700'
              onClick={prevPage}>Previous</button>
        <Paginate
          pages={numPages}
          nextPage={nextPage}
          prevPage={prevPage}
          setPage={setPage}
        />
              <button 
              type='button'
              className='bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white  dark:hover:bg-gray-700'
              onClick={nextPage}>Next</button>
      </div>
    </>
  )
}

export default AdminDashboardPage
// text-7xl h-screen
