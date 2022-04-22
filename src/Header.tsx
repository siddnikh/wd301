import React, { useState } from 'react';
import logo from './logo.svg';
import { checkLogin } from './utils/loginUtils';
import { ActiveLink } from 'raviger';

export default function Header(){

    const [loginStatus] = useState<boolean>(checkLogin());
 
    return(
        <div className='flex gap-2 items-center'>
            <img 
            src={logo}
            className="animate-spin h-16 w-16"
            alt="logo" 
            style={{animation: "spin 2s linear infinite"}}
            />
            <ActiveLink href="/" className='text-lg mr-3' exactActiveClass='text-blue-500 mr-3 text-lg'>Home</ActiveLink>
            <ActiveLink href="/forms" className='text-lg mr-3' activeClass='text-blue-500 mr-3 text-lg'>Forms</ActiveLink>
            {loginStatus ? (<ActiveLink href="/logout" className='text-lg mr-3' activeClass='text-blue-50 mr-3 text-lg'>Logout</ActiveLink>) : 
            (<ActiveLink href="/login" className='text-lg mr-3' activeClass='text-blue-500 mr-3 text-lg'>Login</ActiveLink>)}
        </div>
    )
}