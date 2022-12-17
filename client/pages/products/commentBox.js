const CommentBox = ({text, date}) => {

    return (
        <div className="space-y-4 m-3">
      
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://i.pinimg.com/474x/8f/1b/09/8f1b09269d8df868039a5f9db169a772.jpg" alt=""/>
            </div>
            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <strong>Anon</strong> <span className="text-xs text-gray-400">{date}</span>
              <p className="text-sm">
                {text}
              </p>
              <div className="mt-4 flex items-center">
              </div>
            </div>
          </div>
        </div>
        )
}

export default CommentBox