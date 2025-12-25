import { FaHeart } from 'react-icons/fa'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className='footer py-8 text-center mt-auto bg-white/50 backdrop-blur-sm border-t border-gray-200'>
      <div className='container mx-auto px-4'>
        <p className='text-gray-600 font-medium mb-2'>
          &copy; {year} Expense Tracker. All rights reserved.
        </p>
        <p className='flex items-center justify-center gap-2 text-lg font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent animate-pulse'>
          This is made with <FaHeart className='text-red-500 animate-bounce' /> by Sujay
        </p>
      </div>
    </footer>
  )
}

export default Footer
