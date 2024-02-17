import React, { Fragment } from 'react'
import { CloudLightning } from 'react-feather';
import { IoIosAddCircle } from "react-icons/io";

export default function BookAdding({addBook}) {
    console.log(addBook)
  return (
<Fragment>
<IoIosAddCircle color="success" className="text-success" style={{fontSize:"3rem"}}/>
</Fragment>  )
}
