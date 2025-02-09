import { string } from "yup"

type Image = {
    id: string
    name: string
    img: string

}

type FormModel = {
    imgList: Image[]
    [key: string]: unknown
}



type TaskImagesProps = {
    values: FormModel
    touched: boolean
}

interface INode {
    id?: string
    name?: string
    tag?: string
    children?: INode[]
    isExpanded?: Boolean
    color?: string
    description?: string
    category?: string
    status?: string
    time_spent?: string
    wasted_time?: string
    focus_rate?: string
    satisfaction_rate?: string
    reason_for_satisfaction?: string
    taken_extra_time_to_finish?: string
    notes?: string
    hour?: string
    childFormType?: string
    estimated_time?:string
    nestedLevelOff?: boolean
    mergeId?: string
    assignedTime?: number
    [key:string]:string
}


interface TreeProps {
    data: INode; // Expecting an array of INode
    key?: string | number;
    fetchData?: () => void
}
interface IFormTree {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}
interface ExtendedTreeProps extends TreeProps {
    formRef?: React.RefObject<HTMLFormElement>;
    handleSubmit?: (record: NodeFormSchema) => void;
    handleClose: () => void;
    onSubmitBtn: () => void;
}

interface NodeFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
    handleSubmit: (value: NodeFormSchema) => void
    data: INode,
    fetchData: () => void
}

type NodeFormSchema = {
    name?: string
    children?: INode[]
    isExpanded?: boolean
    color?: string
    tag?: string
    description?: string
    category?: string
    status?: string
    time_spent?: string
    wasted_time?: string
    estimated_time?:string
    focus_rate?: string
    satisfaction_rate?: string
    reason_for_satisfaction?: string
    notes?: string
    hour?: string
    childFormType: string | undefined
}


interface IOption {
    label: string
    value: string
}


interface IRowNestedFormState {
    data: INode,
    action: string
}



interface IFormField {
    title: string;
    type?: string;
    option?: { label: string; value: string }[];
    max_length?: number
}

interface ITaskForm {
    [key: string]: IFormField;
}

interface IChildFormField {
    [key: string]: ITaskForm;
}
