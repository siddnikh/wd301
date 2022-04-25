import { Form, FormField } from './formTypes';

type AddField = {
    type: "add_field";
}

type UpdateField = {
    type: "update_field";
    value: string;
    id: number
}

type UpdateOptions = {
    type: "update_options";
    id: number;
    options: string
}

type RemoveField = {
    type: "remove_field";
    id: number
}

type ChangeTitle = {
    type: "change_title";
    value: string;
}

type SetFields = {
    type: "set_fields";
    value: FormField[]
}

export type FormActions = AddField | UpdateField | UpdateOptions | RemoveField | SetFields;