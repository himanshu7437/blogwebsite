import React from 'react'
import Service from '../appwrite/config'
import {Link} from 'react-router'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full p-4 bg-gray-100 rounded-xl'>
            <div className='justify-center mb-4 wfull'>
                <img src={Service.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
