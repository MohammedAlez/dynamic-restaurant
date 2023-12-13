'use client'
import React from 'react'
import Countdown from 'react-countdown'

const date = new Date('2024-12-12')

const CountDown = () => {
    return <Countdown className='text-4xl font-bold text-yellow-400' date={date}/>
}

export default CountDown