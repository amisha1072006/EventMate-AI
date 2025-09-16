import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Product = () => {

   const arr = [
    {id:'MERN001', course_name:'MERN_Stack', price: 1000, duration:'5 Months'},
    {id:'Java001', course_name:'JAVA_Stack', price: 1000, duration:'5 Months'},
    {id:'Py001', course_name:'PYTHON_Stack', price: 1000, duration:'5 Months'},
    {id:'Php001', course_name:'PHP_Stack', price: 1000, duration:'5 Months'}
    

   ]
 
//   console.log(useLocation());
  

  return (
    <div>
        <ul>
            {/* {arr.map((data) => <div key={data.id}>
                <li><Link to={`/courses/${data.id}`}> {data.course_name} </Link></li>
            </div>)} */}
        </ul>
    </div>
  )
}

export default Product