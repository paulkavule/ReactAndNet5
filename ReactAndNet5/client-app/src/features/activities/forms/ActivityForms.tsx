import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {  useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import CustomField from "../../../app/common/form/CustomForm";
import CustomTextArea from "../../../app/common/form/CustomTextArea";
import CustomSelect from "../../../app/common/form/CustomSelect";
import CustomDatePicker from "../../../app/common/form/CustomDatePicker";
import { CategoryOptions } from "../../../app/common/options/category_options";
import { IActivity } from "../../../app/modals/activity";
function ActivityForm(){
    const {activityStore} = useStore()
    const {loading, loadActivity, createActivity, updateActivity, loadingInitial,setLoadingInitial} = activityStore
    const history = useHistory()
    const [activity, setActivity] = useState<IActivity>({
        id:'',
        title:'',
        category:'',
        description:'',
        date: null,
        city:'',
        venue:''
    })
    const {id} = useParams<{id:string}>();
    useEffect(()=>{
        if(id){
           loadActivity(id).then(activity =>setActivity(activity!))
        }
        else{
            setLoadingInitial(false)
        }
    },[id,loadActivity,setLoadingInitial])
   
    const validationSchema = Yup.object({
        title: Yup.string().required('Activity title equired'),
        description: Yup.string().required('Description title equired'),
        category: Yup.string().required(),
        date: Yup.string().nullable().required('Date is required'),
        venue: Yup.string().required(),
        city: Yup.string().required(),


    })
    function handleFormSubmit(activity:IActivity){
       if(activity.id.length === 0){
           let newActivity = {...activity, id: uuid()}
           createActivity(newActivity).then(()=>{
            history.push(`/activities/${newActivity.id}`)
           })
          
       }else{
            updateActivity(activity).then(()=>{
                history.push(`/activities/${activity.id}`)
            })
       } 
        // console.log(activity)
    }
    
    if(loadingInitial) return <LoadingComponent content='loading...'/>

    return (
        <Segment clearing>
            <Header sub content='Activity Details' color='teal' />
            <Formik
                validationSchema = {validationSchema}
            enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" autoComplete='off'>
                        
                        <CustomField name='title' placeholder='Title'/>
                        <CustomSelect options={CategoryOptions} placeholder='Category'  name='category' />
                        <CustomDatePicker
                            name='date' 
                            placeholderText='Date' 
                            timeCaption='time' 
                            dateFormat = 'MMMM d, yyyy h:m aa'
                            showTimeSelect  />
                        <CustomTextArea rows={3} placeholder='Description'  name='description'/>
                        <Header sub content='Location Details' color='teal' />   
                        <CustomField placeholder='City' name='city'/>
                        <CustomField placeholder='Venue' name='venue'/>
                       
                        <Button 
                        disabled={isSubmitting || !isValid || !dirty}
                        loading={loading} type='Submit' floated='right' content='Submit' positive />
                        <Button type='button' floated='right' content='Cancel' as={Link} to='/activities' />
                    </Form>
                )}
            </Formik>
            
        </Segment>
    )
}

export default observer(ActivityForm)