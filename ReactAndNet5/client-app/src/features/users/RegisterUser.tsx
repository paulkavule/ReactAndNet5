import { ErrorMessage, Form, Formik } from "formik"
import { observer } from "mobx-react-lite"
import { Button, Header } from "semantic-ui-react"
import CustomField from "../../app/common/form/CustomForm"
import { useStore } from "../../app/stores/store"
import ValidationErrors from '../errors/ValidationErrors'
import * as Yup from 'yup'
function RegisterUser(){
    const {userStore} =  useStore()
    return (
        <Formik 
        initialValues={{email:'', password:'', displayName:'',  username:'', error:null}} 
        onSubmit={(values,{setErrors}) =>userStore.registerUser(values)
        .catch((error) => {
            console.log(error)
            setErrors({error})
        })}
        
        validationSchema={
            Yup.object({
                username: Yup.string().required(),
                password: Yup.string().required(),
                email: Yup.string().required().email(),
                displayName: Yup.string().required(),

            })
        }
        >
            {({handleSubmit, isSubmitting, isValid, dirty, errors})=>(
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Sign up' color='teal' textAlign='center' />
                    <CustomField name='email' placeholder='email'/>
                    <CustomField name='username' placeholder='username'/>
                    <CustomField name='password' placeholder='password' type='password'/>
                    <CustomField name='displayName' placeholder='display name'/>
                    
                    <ErrorMessage name='error' 
                        render={() => <ValidationErrors errors={errors.error}/>}
                    />
                    <Button loading={isSubmitting} disabled={!isValid || !dirty || isSubmitting} type='submit' content='Register' positive fluid/>
                </Form>
            )}
        </Formik>
    )
}

export default observer(RegisterUser) 