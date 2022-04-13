import { navigate } from 'raviger';
import React, { useState } from 'react';

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


export default function Preview(props: {id : number}) {

    const getForm : () => formData = () => {
        const localForms = localStorage.getItem("savedForms");
        const savedForms = localForms ? JSON.parse(localForms) : [];
        const currentForm = savedForms.filter((form: formData) => form.id === props.id)[0];
        return currentForm;
    }

    const [formState] = useState(() => getForm());
    const [inputNumber, setInputNumber] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);

    const updateAnswer = (value: string, index : number) => {
        const newArray = answers.slice();
        newArray[index] = value;
        setAnswers(
           newArray
        );
        // setFormState({
        //     ...formState,
        //     formfields: 
        //     formState.formfields.map((field) => {
        //         if(field.id === id) return {...field, value: value};
        //         return field;
        //     }),
        // });
    }

    return(
        <div>
            <div className="flex justify-center items-center">
                <p className='text-center font-black text-blue-600 text-xl'>{formState.title}</p>
            </div>
            <div>
                <label>{formState.formfields[inputNumber].label}</label>
                <input
                    required
                    className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                    type={formState.formfields[inputNumber].type}
                    value={answers.length > inputNumber ? answers[inputNumber] : ""}
                    onChange={(e) => {
                        updateAnswer(e.target.value, inputNumber);
                    }}
                    />
            </div>
            <div className='w-full flex justify-between'>
                <button 
                className='text-xl text-blue-600'
                onClick={() => {
                    if(inputNumber !== 0) setInputNumber(inputNumber - 1);
                }}
                >&#x2190;</button>
                {(inputNumber === formState.formfields.length - 1) ? 
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
                onClick={() => navigate('/')}
                >Save</button>
                :
                <button
                className='text-xl text-blue-600'
                onClick={() => {
                    if(inputNumber !== formState.formfields.length - 1) setInputNumber(inputNumber + 1);
                }}
                >&#x2192;</button>
            }
        </div>
    </div>
    )
}