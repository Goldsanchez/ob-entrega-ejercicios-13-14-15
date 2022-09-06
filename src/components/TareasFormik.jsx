import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { modelTasks } from '../models/modelTasks';

const TaskSchema = Yup.object().shape({
  task: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const TareasFormik = () => {

  let createTask = new modelTasks()

  const initialCredentials = {
    task: '',
  }

  return (
    <div className='m-3'>

      <Formik

        initialValues={initialCredentials}
        validationSchema={TaskSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(values, null, 2));
          // We save the data in the localstorage
          localStorage.setItem('credentials', values)
        }}
      >

        {({ values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur }) => (
          <Form>
            <label htmlFor="task"></label>
            <Field name="task" type="text" placeholder="Enter Task" />
            {/* Task Errors */}
            {errors.task && touched.task && 
             (<ErrorMessage name="task" component='div'></ErrorMessage>)
            }

            <button type='submit' >Add Task</button>
            {isSubmitting ? (<p>Sending your credentials...</p>) : null}
          </Form>
        )}

      </Formik>
    </div>
  )
}

export default TareasFormik;