import React from 'react';
import { useRoutes } from 'raviger';
//import Preview from '../components/Preview';
import Login from '../components/Login';
import Logout from '../components/Logout';

const Home = React.lazy(() => import("../components/Home"));
const Form = React.lazy(() => import("../components/Form"));
const FormList = React.lazy(() => import('../components/FormList'));

export default function AppRouter() { 

    const routes = {
        "/" : () => <React.Suspense fallback={<div>Loading...</div>}><Home /></React.Suspense>,
        "/logout": () => <Logout />,
        "/login" : () => <Login />,
        "/forms" : () => <React.Suspense fallback={<div>Loading...</div>}><FormList /></React.Suspense>,
        "/forms/:id" : ({ id } : { id : string}) => <React.Suspense fallback={<div>Loading...</div>}><Form id={Number(id)} /></React.Suspense>,
        //"/preview/:id" : ({ id } : { id : string}) => <Preview id={Number(id)}/>
    }

    let routeResult = useRoutes(routes);
    return routeResult;
}