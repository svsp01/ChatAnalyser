
function ChatInput({handleChange, handleSubmit, input}: any) {


  return (
    <div className=" bottom-0 left-0 w-full bg-darkBackground p-4 shadow-lg">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type your message..."
          className="flex-grow p-2 border text-textColor border-textColor placeholder:text-textColor rounded-lg mr-2 bg-darkBackground focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="bg-darkBackground border border-textColor  text-textColor p-2 rounded-lg "
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
