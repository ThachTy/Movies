import React from 'react'
import { Link } from 'react-router-dom'
function NotFound() {
    return (
        <div className='w-full h-screen'>
            <div className='container mx-auto'>
                <h2 className='text-2xl'>404 Not Found</h2>
                <Link to={"/"}>Back to Home</Link>
            </div>
        </div>
    )
}

export default NotFound