import React, {useState, useEffect} from 'react';

interface formField {
    id: number;
    label: string;
    type: string;
    value: string;
}

interface formData {
    id: number;
    title: string;
    formfields: formField[];
}

export default function FormList(){

    const getLocalForms : () => formData[] = () => {
        const localForms = localStorage.getItem("savedForms");
        const savedForms = localForms ? JSON.parse(localForms) : [];

        return savedForms;
    }

    const [localForms, setLocalForms] = useState(() => getLocalForms());

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
    }, [localForms])

    return(
        <div>
            <div className="flex justify-center items-center">
                <p className='text-center text-xl'>List of forms saved in local storage:</p>
            </div>
            {localForms.map((field) => (
            <div className="mt-6 flex items-center">
                <div className="flex-1" key={field.id}>
                    <p
                    className="p-2 m-2 w-full">{field.title}</p>
                </div>
                <div>
                    <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded"
                    onClick={() => removeLocalForm(field.id)}
                    >Remove</button>
                </div>
                <div>
                    <a 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-6 rounded"
                    href={`/form/${field.id}`}
                    >Edit</a>
                </div>
            </div>
          ))}
          <hr className='mt-5' />
          <a 
          className="mt-9 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
          href="/"
          >Home</a>
          <button 
          className="mt-9 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={() => addNewForm()}
          >Add Form</button>
          
        </div>
    )

}