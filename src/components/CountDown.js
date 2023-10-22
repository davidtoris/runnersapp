'use client'
import React, { useEffect, useState } from 'react';

const CountDown = ({ closeDate, todayDate, size }) => {
  const calculateTimeLeft = (num) => {
    const serverTime = new Date(todayDate);
    const closeTime = new Date(closeDate);
    // const closeTime = new Date('2022-11-26 08:00:00');
    // const serverTime = new Date('2022-09-30 16:33:00');

    const diff = closeTime - serverTime - num;
    let timeLeft = {};

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timeLeft = {
      days: days < 0 ? 0 : days,
      hours: hours < 0 ? 0 : hours,
      minutes: minutes < 0 ? 0 : minutes,
      seconds: seconds < 0 ? 0 : seconds,
    };
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({});
  const [initialNum, SetInitialNum] = useState(0);
  calculateTimeLeft(initialNum);
  useEffect(() => {
    const timer = setInterval(() => {
      SetInitialNum(initialNum + 1000);
      setTimeLeft(calculateTimeLeft(initialNum));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, closeDate, todayDate]);

  const sizeCounter = () => {
    let widthCounter;
    if (size === 'middle' && timeLeft.days > 0) {
      widthCounter = 'd-flex bd-primary br-1 w-70 count-down-middle bg-white ';
    } else if (size === 'middle' && timeLeft.days <= 0) {
      widthCounter = 'd-flex bd-primary br-1 w-71 count-down-middle bg-white';
    } else {
      widthCounter = 'd-flex bd-primary br-1 count-down bg-white';
    }
    return widthCounter;
  };

  return (
    <>
      <div>
        <div className="text-grayCustom">
          <div className="flex">
            {timeLeft.days > 0 ? (
              <div className="font-bold text-4xl hours">
                <span className='mr-1'>{timeLeft.days}</span>
                <span className="font-light ft-16 ml-1 text-xl ">días</span>
              </div>
            ) : ''}

            <div className="font-bold text-4xl hours ml-4">
              <span className='mr-1'>{timeLeft.hours}</span>
              <span className="font-light ft-16 text-xl">hrs</span>
            </div>

            <div className="font-bold text-4xl minutes ml-4">
              <span className='mr-1'>{timeLeft.minutes}</span>
              <span className="font-light ft-16 ml-1 text-xl">min</span>
            </div>
            {timeLeft.days > 0 ? '' : (
              <div className="font-bold text-4xl seconds ml-3">
                {timeLeft.seconds}
                <span className="font-light ft-16 ml-1 ">segs</span>
              </div>
            ) }
          </div>
        </div>
      </div>
    </>
  );
};

export default CountDown;