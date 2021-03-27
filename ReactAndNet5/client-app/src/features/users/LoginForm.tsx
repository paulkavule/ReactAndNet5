import { ErrorMessage, Form, Formik } from "formik"
import { observer } from "mobx-react-lite"
import { Button, Header, Label } from "semantic-ui-react"
import CustomField from "../../app/common/form/CustomForm"
import { useStore } from "../../app/stores/store"

function LoginForm(){
    const {userStore} =  useStore()
    return (
        <Formik 
        initialValues={{email:'', password:'', error:null}} 
        onSubmit={(values,{setErrors}) =>userStore.login(values)
        .catch((error) => {
            setErrors({error:'Invalid email or password'})
        })}>
            {({handleSubmit, isSubmitting, errors})=>(
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Login' color='teal' textAlign='center' />
                    <CustomField name='email' placeholder='email'/>
                    <CustomField name='password' placeholder='password' type='password'/>
                    <ErrorMessage name='error' 
                        render={() => <Label style={{marginTop:10, marginBottom:10, color:'red'}} content={errors.error} />}
                    />
                    <Button loading={isSubmitting} type='submit' content='Login' positive fluid/>
                </Form>
            )}
        </Formik>
    )
}

export default observer(LoginForm) 