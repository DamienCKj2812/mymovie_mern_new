import { Link } from 'react-router-dom'; 

//images
import house from './img/house-chimney.png';
import business from './img/business.png';
import history from './img/history.png';
import envelope from './img/envelope.png';
import invoice from './img/invoice.png';
import calendar from './img/calendar.png';
import chat from './img/chat.png';
import settings from './img/settings.png';
import user from './img/user.png';



const Sidebar = () => {
  return (
    <>
      <div className='bg-[#5e4ae3] p-[1.5rem] flex flex-col gap-7 rounded-tr-[2rem] rounded-br-[2rem]'>
        <button className='block'>
          <img src={business} alt="business" className='filter invert'/>
        </button>

        <button className='block'>
          <img src={history} alt="history" className='filter invert'/>
        </button>

        <button className='block'>
          <img src={envelope} alt="envelope" className='filter invert'/>
        </button>

        <button className='block'>
          <img src={invoice} alt="invoice" className='filter invert'/>
        </button>

        <button className='block'>
          <img src={calendar} alt="calendar" className='filter invert'/>
        </button>

        <button className='block'>
          <img src={chat} alt="chat" className='filter invert'/>
        </button>

        <button className='block'>
          <img src={settings} alt="settings" className='filter invert'/>
        </button>

        <button className='block'>
          <img src={user} alt="user" className='filter invert'/>
        </button>
      </div>

    </>
    
  )
}

export default Sidebar