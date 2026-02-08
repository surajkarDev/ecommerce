import React, { useContext, memo, forwardRef, useImperativeHandle, useCallback, useState } from 'react';
import { counterContext } from '../pages/Blogs';
import PropTypes from 'prop-types';

function Blogie(props, ref) {
  let time;
  let [eventStop,setEventStop] = useState(false);
  console.log("comp render");
  const counter = useContext(counterContext);
  const sayHi = useCallback(() => {
    console.log("child function work");
  }, []);
  useImperativeHandle(ref, () => ({
    sayHi
  }));

  const throttling = ()=>{
    if(eventStop) return
    setEventStop(false);
    setTimeout(()=>{
      console.log("throttling function");
      setEventStop(true);
    },1000)
  }

  return (
    <div>
      Blog page {counter}<br />
      {props.countContent}<br />
      {/* {props.blogUseCallback()} */}
      <h2>All Props Example</h2>
      <p><b>String:</b> {props.text}</p>
      <p><b>Number:</b> {props.number}</p>
      <p><b>Boolean:</b> {props.isActive ? "True" : "False"}</p>
      <p><b>Array:</b> {(props.list || []).join(", ")}</p>
      <p><b>Object Content:</b> {props.obj.Name}</p>
      <p><b>Function:</b> <button onClick={props.onClick}>Click Me</button></p>
      <p><b>Node:</b> {props.content}</p>
      <p><b>Element:</b> {props.element}</p>
      <p><b>OneOf:</b> {props.size}</p>
      <p><b>ArrayOf Strings:</b> {(props.stringArray || []).join(" | ")}</p>
      <p><b>Shape:</b> {(props.user?.name || "N/A")} ({props.user?.age ?? "N/A"} years old)</p>
    </div>
  );
}

// Wrap with memo and forwardRef
const BlogieComponent = memo(forwardRef(Blogie));

// Prop validation
BlogieComponent.propTypes = {
  countContent: PropTypes.string.isRequired,
  counter: PropTypes.number,
  text: PropTypes.string.isRequired,
  number: PropTypes.number,
  isActive: PropTypes.bool,
  list: PropTypes.array,
  obj: PropTypes.object,
  onClick: PropTypes.func,
  content: PropTypes.node,
  element: PropTypes.element,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  stringArray: PropTypes.arrayOf(PropTypes.string).isRequired, // PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }))  it for multiple values comes in array
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number
  }) //is used to validate that a prop is an object with a specific structure (shape).
};

// Default props
BlogieComponent.defaultProps = {
  countContent: "Default content",
  counter: 0,
  text: "Hello World",
  number: 42,
  isActive: true,
  list: [1, 2, 3],
  obj: { key: "value" },
  onClick: () => alert("Button clicked!"),
  content: <span>This is a node</span>,
  element: <strong>I am a React element</strong>,
  size: "medium",
  stringArray: ["One", "Two", "Three"],
  user: { name: "Suraj", age: 26 }
};

export default BlogieComponent;