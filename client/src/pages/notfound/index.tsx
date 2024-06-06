import { Link } from 'react-router-dom';
function NotFound() {
    return (
        <div className='w-full h-screen grid place-items-center'>
            <div className=''>
                <h2 className='text-6xl mb-6'>404 Not Found</h2>
                <Link className=" underline text-2xl" to={"/"}>Back to Home</Link>
            </div>
        </div>
    )
}

export default NotFound