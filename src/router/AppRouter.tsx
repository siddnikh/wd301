import { useRoutes } from 'raviger';
import Home from '../components/Home';
import Form from '../components/Form';
import FormList from '../components/FormList';

export default function AppRouter() { 

    const routes = {
        "/" : () => <Home />,
        "/forms" : () => <FormList />,
        "/form/:id" : ({ id } : { id : string}) => <Form id={Number(id)} />
    }

    let routeResult = useRoutes(routes);
    return routeResult;
}