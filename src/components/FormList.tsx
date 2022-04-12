import React, {useState, useEffect} from 'react';
import { useQueryParams, navigate, Link } from 'raviger';
import { formData } from '../types/formTypes';

export default function FormList(){

    const [searchString, setSearchString] = useState(""); //initial search field
    const [{search}, setQuery] = useQueryParams();

    const getLocalForms : () => formData[] = () => {
        const localForms = localStorage.getItem("savedForms");
        const savedForms = localForms ? JSON.parse(localForms) : [];

        return savedForms;
    }

    const [localForms, setLocalForms] = useState(() => getLocalForms());
    const [localFormsCount, setLocalFormsCount] = useState(localForms.length);

    const removeLocalForm : (id : number) => void = (id) => {
        const updatedForms = localForms.filter((form) => form.id !== id)
        
        setLocalForms(updatedForms);
        localStorage.setItem("savedForms", JSON.stringify(updatedForms));
    }

    const addNewForm : () => void = () => {
        const newForm: formData = {
            id: Number(new Date()),
            title: "Untitled Form",
            formfields: []
        };
        setLocalForms([...localForms, newForm]);
    }

    useEffect(() => {
        localStorage.setItem("savedForms", JSON.stringify(localForms));
        if(localFormsCount < localForms.length){
            let x: number = localForms[localForms.length - 1].id;
            navigate(`/form/${x}`);
            setLocalFormsCount(localForms.length);
        }
        else{
            setLocalFormsCount(localForms.length);
        }
    }, [localForms, localFormsCount])

    return(
        <div>
            <div className="flex justify-center items-center">
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
            {localForms.filter((form) => {return form.title.toLowerCase().includes(search?.toLowerCase() || "")}
                ).map((field) => (
            <div className="mt-6 flex items-center">
                <div className="flex-1" key={field.id}>
                    <p
                    className="p-2 m-2 w-full">{field.title}</p>
                </div>
                <div>
                    <Link 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded"
                    href={`/preview/${field.id}`}
                    >Preview</Link>
                </div>
                <div>
                    <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded"
                    onClick={() => removeLocalForm(field.id)}
                    >Remove</button>
                </div>
                <div>
                    <Link 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded"
                    href={`/form/${field.id}`}
                    >Edit</Link>
                </div>
            </div>
          ))}
          <hr className='mt-5' />
          <Link
          className="mt-9 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
          href="/"
          >Home</Link>
          <button 
          className="mt-9 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={() => addNewForm()}
          >Add Form</button>
          
        </div>
    )

}