import { useField } from "formik"
import { Form, Label } from "semantic-ui-react"


interface Props {
    placeholder : string,
    name: string,
    lable?: string
    type?:string
}

function CustomField(props:Props){
    const [field,meta] = useField(props.name)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.lable}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (<Label basic color='red' content={meta.error} />) : null}
        </Form.Field>
    )
}

export default CustomField