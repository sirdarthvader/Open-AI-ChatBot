import ChatMessage from './ChatMessage';

const ChatBox = ({ chatLog, setChatInput, handleSubmit, chatInput }) => (
  <section className='chatbox'>
    <div className='chat-log'>
      {chatLog.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
    <div className='chat-input-holder'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          rows='1'
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          className='chat-input-textarea'
        ></input>
        <button className='submit' type='submit'>
          Submit
        </button>
      </form>
    </div>
  </section>
);

export default ChatBox;
