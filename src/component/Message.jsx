import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import phoneCall from './img/phone-call.png';
import videoCall from './img/video-call.png';
import more from './img/more.png';
import at from './img/at.png';
import underline from './img/underline.png';
import clip from './img/clip.png';
import emoji from './img/emoji.png';
import picture from './img/picture.png';
import file from './img/file.png';
import send from './img/send.png';


const Message = ({ userDetails }) => {
  const { username, profileImage, position, id } = userDetails;
  const [searchChat, setSearchChat] = useState('');

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reply, setReply] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/api/chatSystem/chatByUserId/${id}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          setMessages([response.data]);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function getTimeAgo(timestamp) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - timestamp;

    const millisecondsPerMinute = 1000 * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerMonth = millisecondsPerDay * 31;
    const millisecondsPerYear = millisecondsPerMonth * 12;

    const minutesAgo = Math.floor(timeDifference / millisecondsPerMinute);
    const hoursAgo = Math.floor(timeDifference / millisecondsPerHour);
    const daysAgo = Math.floor(timeDifference / millisecondsPerDay);
    const monthsAgo = Math.floor(timeDifference / millisecondsPerMonth);
    const yearsAgo = Math.floor(timeDifference / millisecondsPerYear);

    if (yearsAgo > 0) {
      return yearsAgo + (yearsAgo === 1 ? ' Year Ago' : ' Years Ago');
    } else if (monthsAgo > 0) {
        return monthsAgo + (monthsAgo === 1 ? ' Month Ago' : ' Months Ago');
    } else if (daysAgo > 0) {
        return daysAgo + (daysAgo === 1 ? ' Day Ago' : ' Days Ago');
    } else if (hoursAgo > 0) {
        return hoursAgo + (hoursAgo === 1 ? ' Hour Ago' : ' Hours Ago');
    } else {
        const minutesAgo = Math.floor(timeDifference / (1000 * 60));
        return minutesAgo + (minutesAgo === 1 ? ' Minute Ago' : ' Minutes Ago');
    }
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; 

  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + formattedMinutes + ' ' + ampm;
}

const submitHandler = async () => {
  try {
    const response = await fetch('/api/chatSystem/chat/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id, message: reply }),
    });

    if (response.ok) {
      console.log('Message sent successfully!');
      setReply('');

      axios.get(`/api/chatSystem/chatByUserId/${id}`)
        .then(response => {
          if (Array.isArray(response.data)) {
            setMessages(response.data);
          } else {
            setMessages([response.data]);
          }
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    } else {
      console.error('Failed to send message');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
    <>
    {/* Top part */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={profileImage} alt="Profile" className="h-12 w-12 rounded-full mt-[0.5rem] ml-[1rem]" />

          <div className="">
            <div className="text-black mt-[0.3rem] font-bold pl-[1rem]">{username}</div>
            <div className="text-gray-500 mt-[0.3rem] pl-[1rem]">{position}</div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchChat}
            onChange={e => setSearchChat(e.target.value)}
            className='mx-[0.5rem] my-[0.5rem] bg-[#eaedf2] px-3 py-2 rounded text-gray-400'
          />

        <div className="flex gap-4 ml-3">
          <div className="border border-gray-300 rounded-full p-1 mr-1 hover:bg-gray-100 cursor-pointer">
            <img src={phoneCall} alt="phone call" className="h-6 w-6" />
          </div>
          <div className="border border-gray-300 rounded-full p-1 mr-1 hover:bg-gray-100 cursor-pointer">
            <img src={videoCall} alt="video call" className="h-6 w-6" />
          </div>
          <div className="border border-gray-300 rounded-full p-1 mr-4 hover:bg-gray-100 cursor-pointer">
            <img src={more} alt="more" className="h-6 w-6" />
          </div>
        </div>
        </div>
      </div>

    <br/>
    <hr/>

    {/* Main section */}
    <main className="overflow-auto max-h-[30rem]">
      <div className="px-[2rem]">
        {messages.map(message => (
          <div key={message.id} className='py-[1rem] flex justify-end'>
            <div className="flex flex-col">
              <div className="flex gap-2 justify-end">
                <div className="text-gray-500 text-xs">{formatTime(message.timestamp)}</div>
                <div className="text-gray-500 text-xs">{getTimeAgo(message.timestamp)}</div>
                <div className="text-black font-bold text-sm">{username}</div>
              </div>

              <div className="flex flex-col mt-3 bg-[#5e4ae3] rounded-lg">
                <div className="flex justify-end">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Message"
                      className="max-w-[300px] min-w-[300px] max-h-[400px] min-h-[200px] rounded-xl pt-3 px-4"
                    />
                  )}
                </div>
                <div className="flex justify-end text-white py-2 px-4">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>

            <img src={profileImage} alt="Profile" className="h-12 w-12 rounded-full mt-[0.5rem] ml-[1rem]" />
          </div>
        ))}
      </div>

      <hr />
    </main>
    
    {/* Reply Section */}
    <div className="ml-4 mt-4 flex justify-between items-center">
      <div className="relative">
        <textarea
          placeholder="Type a message here .."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="outline-none bg-transparent placeholder-gray-400 focus:placeholder-transparent resize-none min-h-[4rem] min-w-[25rem]"
        />
      </div>

      <div className="flex gap-4">
        <img src={at} alt="at" className="h-6 w-6 cursor-pointer" />
        <img src={underline} alt="underline" className="h-6 w-6 cursor-pointer" />
        <img src={clip} alt="clip" className="h-6 w-6 cursor-pointer" />
        <img src={emoji} alt="emoji" className="h-6 w-6 cursor-pointer" />
        <img src={picture} alt="picture" className="h-6 w-6 cursor-pointer" />
        <img src={file} alt="file" className="h-6 w-6 cursor-pointer" />
      </div>

      <div className="flex items-center pr-5">
        <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center" onClick={submitHandler}>
          <img src={send} alt="send" className="h-5 w-5 cursor-pointer filter invert" />
        </div>
      </div>
    </div>




    </>
  );
};

export default Message;
