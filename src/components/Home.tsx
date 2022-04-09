import React from 'react';
import logo from '../logo.svg';

export default function Home(props: {openFormCB : () => void}){
    return(
        <>
        <div className='flex'>
            <img className="h-48" src={logo} alt="React Logo"/>
            <div className='flex justify-center items-center'>
                <p>Welcome to the Home Page of the react course.</p>
            </div>
        </div>
        <button 
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 m-2 rounded" 
            onClick={props.openFormCB}
            >Open Form</button>
        </>
        
    );
}