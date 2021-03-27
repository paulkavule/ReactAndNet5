import { useField } from "formik"
import { Form, Label } from "semantic-ui-react"
import DatePikcer, {ReactDatePickerProps} from 'react-datepicker'

function CustomDatePicker(props: Partial<ReactDatePickerProps>){
    const [field,meta, helpers] = useField(props.name!)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePikcer
                {...field}
                {...props}
                selected={(field.value && new Date(field.value))|| null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (<Label basic color='red' content={meta.error} />) : null}
        </Form.Field>
    )
}

export default CustomDatePicker