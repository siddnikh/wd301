import React from 'react';
import logo from '../logo.svg';

export default function Home(){
    return(
        <div className='flex'>
            <img className="h-48" src={logo} alt="React Logo"/>
            <div className='flex justify-center items-center'>
                <p>Welcome to the Home Page of the react course.</p>
            </div>
        </div>
    );
}