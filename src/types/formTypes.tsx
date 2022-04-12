
// export interface formField {
//     id: number;
//     label: string;
//     type: textFieldTypes;
//     value: string;
// }

export type textFieldTypes = "text" | "email" | "tel" | "date";
export type formKinds = "text" | "dropdown" | "radio" | "textarea" | "multi";
export type formField = TextField | DropDownField | RadioField | TextAreaField | MultiSelectField;
export interface formData {
    id: number;
    title: string;
    formfields: formField[];
}

export type TextField = {
    kind : 'text'; 
    id : number;
    label : string;
    fieldType : textFieldTypes
    value : string
}

export type DropDownField = {
    kind : 'dropdown'; 
    id : number;
    label : string;
    options : string[]
    value : string
}

type RadioField = {
    kind : "radio";
    id: number;
    label: string;
    options : string[];
    value : string;
}

type TextAreaField = {
    kind : 'textarea'; 
    id : number;
    label : string;
    fieldType : 'textarea'
    value : string
}

type MultiSelectField = {
    kind : 'multi'; 
    id : number;
    label : string;
    options : string[];
    value : string;
}