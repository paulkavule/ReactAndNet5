import { useField } from "formik"
import { Form, Label, Select } from "semantic-ui-react"


interface Props {
    placeholder : string,
    name: string,
    lable?: string

    options:any
}

function CustomSelect(props:Props){
    const [field, meta, helpers] = useField(props.name)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.lable}</label>
            <Select 
            clearable
            name={props.name}
            placeholder={props.placeholder}
            options={props.options} 
            value={field.value || null} 
            onBlur={()=>helpers.setTouched(true)}
            onChange={(event, data) => helpers.setValue(data.value)} />
            
            {meta.touched && meta.error ? (<Label basic color='red' content={meta.error} />) : null}
        </Form.Field>
    )
}

export default CustomSelect