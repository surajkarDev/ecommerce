import React, {useContext , memo} from 'react'
import { counterContext } from '../context/context'

function Blogie(props) {
  console.log("comp render")
  // const counter = useContext(counterContext);
  return (
    
    <div>

{/* {counter}<br/> */}
{props.countContent}<br/>
{/* {props.blogUseCallback()} */}
    </div>
  )
}

export default memo(Blogie)