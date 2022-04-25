import React, {useState, useEffect} from 'react';
import { useQueryParams, Link } from 'raviger';
import { Form } from '../types/formTypes';
import CreateForm from './CreateForm';
import Modal from './common/Modal'
import { listForms, deleteForm } from '../utils/apiUtils';
import { Pagination } from '../types/common';

export default function FormList(){

    // functions
    const getLocalForms : () => Form[] = () => {
        const localForms = localStorage.getItem("savedForms");
        const savedForms = localForms ? JSON.parse(localForms) : [];

        return savedForms;
    }

    const removeForm = async (id: number, state: Form[], setLocalFormsCB: (state: Form[]) => void) => {
        try{
            await deleteForm(id);
            setLocalFormsCB(state.filter((form) => form.id !== id));
        } catch(error) {
            console.error(error);
        }
    }

    // state and initial variables
    const [newForm, setNewForm] = useState<boolean>(false);
    const [searchString, setSearchString] = useState(""); //initial search field
    const [{search}] = useQueryParams();
    const [localForms, setLocalForms] = useState(() => getLocalForms());
    const [localFormsCount, setLocalFormsCount] = useState(localForms.length);

    // background operations

    const fetchForms = async () => {
        try{
            const data: Pagination<Form> = await listForms({offset: 0});
            setLocalForms(data.results);
        } catch(error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    useEffect(() => {
        localStorage.setItem("savedForms", JSON.stringify(localForms));
        if(localFormsCount < localForms.length){
            //let x: number = localForms[localForms.length - 1].id!;
            //navigate(`/form/${x}`);
            setLocalFormsCount(localForms.length);
        }
        else{
            setLocalFormsCount(localForms.length);
        }
    }, [localForms, localFormsCount]);

    return(
        <div>
            <div className="my-6 flex justify-center items-center">
                <p className='text-center text-xl'>List of forms saved in local storage:</p>
            </div>
            <form>
                <label>Search:</label>
                <input
                    name="search"
                    className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                    type="text"
                    value={searchString}
                    onChange={(e) => {setSearchString(e.target.value)}}
                />
            </form>
            {localForms.filter((form: Form) => {return form.title.toLowerCase().includes(search?.toLowerCase() || "")}
                ).map((form: Form) => (
            <div className="mt-6 flex items-center" key={form.id}>
                <div className="flex-1">
                    <p
                    className="p-2 m-2 w-full">{form.title}</p>
                </div>
                <div>
                    <Link 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded"
                    href={`/preview/${form.id}`}
                    >Preview</Link>
                </div>
                <div>
                    <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded"
                    onClick={() => removeForm(form.id!, localForms, setLocalForms)}
                    >Remove</button>
                </div>
                <div>
                    <Link 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded"
                    href={`/forms/${form.id}`}
                    >Edit</Link>
                </div>
            </div>
          ))}
          <hr className='mt-5' />
          <button 
          className="mt-9 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={() => setNewForm(true)}
          >Add Form</button>
          <Modal open={newForm} closeFormCB={() => setNewForm(false)}>
              <CreateForm/>
          </Modal>
        </div>
    )

}