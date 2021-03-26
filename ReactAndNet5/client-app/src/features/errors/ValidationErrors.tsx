import { Message } from "semantic-ui-react";


interface Props{
    errors: string [] | undefined
}
function ValidationErrors({errors}:Props){
    console.log(errors)
    return (
        <Message error>
            {
                errors && (
                    <Message.List>
                        {errors.map((err, ind) =>(
                            <Message.Item key={ind}>{err}</Message.Item>
                        ))}
                    </Message.List>
                )
            }
        </Message>
    )
}

export default ValidationErrors;