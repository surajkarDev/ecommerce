import React, {useContext , memo,forwardRef,useImperativeHandle} from 'react'
import { counterContext } from '../pages/Blogs';

function Blogie(props,ref) {
  console.log("comp render")
  const counter = useContext(counterContext);

  useImperativeHandle(ref,()=>{
    return {
      sayHi
    }
  })
  const sayHi = () =>{
    console.log("child function work");
  }
  return (
    
    <div>

Blog page {counter}<br/>
{props.countContent}<br/>
{/* {props.blogUseCallback()} */}
    </div>
  )
}

export default memo(forwardRef(Blogie))