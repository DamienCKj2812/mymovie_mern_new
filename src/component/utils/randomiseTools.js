import {loremIpsum} from "lorem-ipsum";

const randomDate = () => {
  const date = new Date(Math.random() * Date.now());
  return `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getDate()} ${date.getFullYear()}`;
};

const randomTime = () => {
  const date = new Date(Math.random() * Date.now());
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes}${ampm}`;
};

const generateShortText = () => {
    const loremText = loremIpsum({
      count: 3,                       
      units: 'words',
      format: 'plain',
      suffix: '...',
    });
  
    if (loremText.length > 10) {
      return loremText.slice(0, 10) + '...';
    }
  
    return loremText;
  };

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

export { randomDate, randomTime, generateShortText, generateRandomNumber };
