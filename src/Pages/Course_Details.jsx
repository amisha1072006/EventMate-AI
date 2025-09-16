import React, { use } from 'react'
import { useParams, Link , useLocation} from 'react-router-dom'

const Course_Details = () => {

    const arr = [
        {id:'MERN001', course_name:'MERN_Stack', price: 1000, duration:'5 Months'},
        {id:'Java001', course_name:'JAVA_Stack', price: 1000, duration:'5 Months'},
        {id:'Py001', course_name:'PYTHON_Stack', price: 1000, duration:'5 Months'},
        {id:'Php001', course_name:'PHP_Stack', price: 1000, duration:'5 Months'}
       ]

    // console.log(useParams());
const {id} = useParams();
const Course_detail = arr.filter((data)=> data.id == id) 
// console.log(Course_detail);


//   console.log(useLocation());
  const location = useLocation();

  

  return (

    <>
    <div>
        {/* <h1>Course Id ={id}</h1>
        <h1>Course Name ={Course_detail[0].course_name}</h1> */}
  
  {location.pathname != "/courses/Py001" && (
    <>
         {/* <h1>Course Price ={Course_detail[0].price}</h1>
         <h1>Course Duration ={Course_detail[0].duration}</h1> */}
    </>
  )}

     
    </div>
   
   <button>
    <Link to={`/courses`}>All Courses</Link>
   </button>
    </>
    
    
  )
}

export default Course_Details