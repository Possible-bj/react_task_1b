import React from 'react'

const Card = ({ video }) => {
  return (
    <div className='card'>
      <div>{video.id}</div>
      <img src={video.photo} />
      <div className='video-title'>{video.title}</div>
      <div className='video-author'>{video.username}</div>
      <div className='video-like'>{video.like}</div>
    </div>
  )
}

export default Card
