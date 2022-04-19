
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

export type FormActions = AddField | UpdateField | UpdateOptions | RemoveField | ChangeTitle;

type RemoveForm = {
    type: "remove_form";
    id: number
}

type AddForm = {
    type: "add_form";
}

export type LocalFormActions = RemoveForm | AddForm;