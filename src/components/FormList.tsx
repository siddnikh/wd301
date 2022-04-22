import React, {useState, useEffect, useReducer} from 'react';
import { useQueryParams, navigate, Link } from 'raviger';
import { Form } from '../types/formTypes';
import { LocalFormActions } from '../types/formActions';
import CreateForm from './CreateForm';
import Modal from './common/Modal'

export default function FormList(){

    // functions
    const getLocalForms : () => Form[] = () => {
        const localForms = localStorage.getItem("savedForms");
        const savedForms = localForms ? JSON.parse(localForms) : [];

        return savedForms;
    }

    // action reducer pattern
    const localFormReducer : (state: Form[], action: LocalFormActions) => Form[] = (state, action) => {
        switch(action.type){
            //adding a new form to local forms
            // case "add_form":
            //     const newForm: formData = {
            //         id: Number(new Date()),
            //         title: "Untitled Form",
            //         formfields: []
            //     };
            //     return([...state, newForm]);
            //removing a certain form from local storage
            case "remove_form":
                return state.filter((form) => form.id !== action.id);
            case "set_forms":
                return action.forms;
            default:
                return state;
        }
    }

    // state and initial variables
    const [newForm, setNewForm] = useState<boolean>(false);
    const [searchString, setSearchString] = useState(""); //initial search field
    const [{search}] = useQueryParams();
    const [localForms, localFormDispatch] = useReducer(localFormReducer, getLocalForms());
    const [localFormsCount, setLocalFormsCount] = useState(localForms.length);

    // background operations

    const fetchForms = async () => {
        const response = await fetch("https://tsapi.coronasafe.live/api/mock_test/");
        const jsonData = await response.json();
        localFormDispatch({type: "set_forms", forms: jsonData})
    }

    useEffect(() => {
        fetchForms();
    }, []);

    useEffect(() => {
        localStorage.setItem("savedForms", JSON.stringify(localForms));
        if(localFormsCount < localForms.length){
            let x: number = localForms[localForms.length - 1].id!;
            navigate(`/form/${x}`);
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
                    onClick={() => localFormDispatch({type: "remove_form", id: form.id!})}
                    >Remove</button>
                </div>
                <div>
                    <Link 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded"
                    href={`/form/${form.id}`}
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