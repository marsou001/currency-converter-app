function LoaderDots() {
  return (
    <div className="flex space-x-1">
      <span className='sr-only'>Loading...</span>
      <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-4 w-4 bg-black rounded-full animate-bounce'></div>
    </div>
  )
}


export default LoaderDots;