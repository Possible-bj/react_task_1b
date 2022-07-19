import React, { useEffect, useState, useCallback } from 'react'
import MkdSDK from '../utils/MkdSDK'
import update from 'immutability-helper'
import { AuthContext, tokenExpireError } from '../authContext'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Card from '../components/Card'
import Box from '../components/Box'
import Paginate from '../components/Paginate'

const AdminDashboardPage = () => {
  let sdk = new MkdSDK()
  const { dispatch } = React.useContext(AuthContext)

  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [numPages, setNumPages] = useState(1)

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setVideos((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])
  const renderCard = useCallback((card, index) => {
    return <Card key={card.id} index={index} video={card} moveCard={moveCard} />
  }, [])

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
    <DndProvider backend={HTML5Backend}>
      <div className='nav-bar-top'>
        <div className='title'>
          <h1>APP</h1>
        </div>
        <button type='button' className='bg-white logout-btn' onClick={logout}>
          Logout
        </button>
      </div>
      <div className='heading text-white'>
        <h1>Videos</h1>
      </div>
      <div className='text-gray-700 dashboard'>
        <div className='video-headers'>
          <div className='video-sn-header'>#</div>
          <div className='video-image-header'></div>
          <div className='video-title-header'>Title</div>
          <div className='video-author-header'>Author</div>
          <div className='video-like-header'>
            Most Like <i></i>
          </div>
        </div>
        <Box>{videos.map((card, i) => renderCard(card, i))}</Box>
      </div>
      <div className='pagination'>
        <button type='button' className='bg-white' onClick={prevPage}>
          Previous
        </button>
        <Paginate pages={numPages} setPage={setPage} />
        <button type='button' className='bg-white' onClick={nextPage}>
          Next
        </button>
      </div>
    </DndProvider>
  )
}

export default AdminDashboardPage
