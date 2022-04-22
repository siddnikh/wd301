import { useRoutes } from 'raviger';
import Home from '../components/Home';
import Form from '../components/Form';
import FormList from '../components/FormList';
import Preview from '../components/Preview';
import Login from '../components/Login';
import Logout from '../components/Logout';

export default function AppRouter() { 

    const routes = {
        "/" : () => <Home />,
        "/logout": () => <Logout />,
        "/login" : () => <Login />,
        "/forms" : () => <FormList />,
        "/form/:id" : ({ id } : { id : string}) => <Form id={Number(id)} />,
        "/preview/:id" : ({ id } : { id : string}) => <Preview id={Number(id)}/>
    }

    let routeResult = useRoutes(routes);
    return routeResult;
}