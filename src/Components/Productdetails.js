import React from 'react'
import {useParams} from 'react-router-dom'

const Productdetails = () => {
  const params = useParams()

  console.log(params)
  return (
    <div>
        <h1> Product details Page </h1>
        <p>{params.id}</p>
        </div>
  )
}

export default Productdetails