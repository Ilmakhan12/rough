import React, { useState, useEffect } from 'react';
import { getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, app } from '../Firebase';

const db = getFirestore(app);

const Home = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  return (
    
    <div className="w-full mt-6">
         <button className="bg-white rounded-[10px] p-3 mb-8" onClick={() => auth.signOut()}>
          Logout
        </button>
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>
      <div className="max-w-2xl mx-auto border-2 shadow-md rounded-md mt-5">
        <div className="flex flex-col">
          <p className="bg-slate-600 text-white w-full text-center text-xl py-2 font-bold">
            Customer Support
          </p>
          <div className="max-h-[400px] min-h-[400px] overflow-y-auto border">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex w-full justify-${message.sender === 'user' ? 'end' : 'start'} mt-2 px-2`}
              >
      {message.data.uid !== user.uid && (
                    <img className="w-8 h-8 rounded-full mr-2" src={message.data.photoURL} alt={message.data.displayName} />
                  )}
                
                {/* <p className={`bg-${message.sender === 'user' ? 'gray-100' : 'blue-500'} ${message.sender === 'user' ? 'rounded-tr-none mx-2' : 'text-white'} w-[40%] px-2 py-1 border rounded-md`}>
                  {message.data.text}
                </p> */}
                <div className={`flex ${message.data.uid === user.uid ? 'justify-end' : 'justify-start'} w-[100%]`}>
                    <p className={`bg-${message.data.uid === user.uid ? 'blue-500' : 'gray-100'} ${message.data.uid === user.uid ? 'text-white' : 'text-black'} ${message.data.uid === user.uid ? 'rounded-tr-none ml-2' : 'rounded-tl-none mr-2'} px-2 py-1 border rounded-md text-right`}>
                      {message.data.text}
                    </p>
                  </div>
                  {message.data.uid === user.uid && (
                    <img className="w-8 h-8 rounded-full ml-2" src={message.data.photoURL} alt={message.data.displayName} />
                  )}
                  
              </div>
            ))}
          </div>

          <div className="flex w-full justify-between px-8 py-4">
            <input
              className="bg-slate-100 py-2 px-4 font-medium w-[80%] border rounded-md"
              type="text"
              placeholder="Enter text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-blue-900 text-white px-4 py-1 border rounded-md"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;



