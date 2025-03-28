import React from 'react'
import Service from '../appwrite/config'
import { Link } from 'react-router'
import { FaCircle } from 'react-icons/fa'

function PostCard({ $id, title, featuredImage, status, showStatus = false }) {
  return (
    <Link to={`/post/${$id}`} className="group">
        <div className='w-full p-4 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200'>
            <div className='relative w-full mb-4'>
                <img 
                    src={Service.getFilePreview(featuredImage)} 
                    alt={title} 
                    className='object-cover w-full h-48 rounded-xl'
                />
                {showStatus && status && (
                    <div className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-sm
                        ${status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <FaCircle className={`text-[6px] ${status === 'active' ? 'text-green-500' : 'text-red-500'}`} />
                        {status}
                    </div>
                )}
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard