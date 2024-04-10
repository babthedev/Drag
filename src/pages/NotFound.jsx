import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='lg:w-3/5 w-3/4 mx-auto my-8'>
      <h2 className='text-2xl'>
        Sorry, the page you are looking for does not exist 🙄
      </h2>
      <button className='border-2 bg-green-600 mt-4 text-white  rounded-xl p-2 hover:border-green-600 hover:text-green-600 hover:bg-lightGray'>
        <Link to="/">
        Back to home
        </Link>
      </button>
    </div>
  )
}

export default NotFound