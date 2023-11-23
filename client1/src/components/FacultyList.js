import React from 'react'
import { useNavigate } from 'react-router-dom'
const FacultyList = ({faculty}) => {
    const navigate=useNavigate();
  return (
      <>
      <div className='card p-2 m-2 ' onClick={()=>navigate(`faculty/book-appointment/${faculty._id}`)} style={{cursor:'pointer'}}>
        <div className='card-header'>
            {faculty.firstName}
        </div>
        <div className='card-body'>
            <p><b>department:</b>  {faculty.branch}</p>
           
            <p><b>Experience:</b>             {faculty.experience}
</p>
            <p><b>Email:</b>            {faculty.email}
</p>
<p><b>Timings:</b>            {faculty.timings[0]}-{faculty.timings[1]}
</p>
        </div>

      </div>
      </>
  )
}

export default FacultyList