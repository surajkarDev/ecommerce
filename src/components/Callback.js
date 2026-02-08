import React from "react";
import { memo } from "react";
const Callback = (props) => {
    console.log("Callback rendered");
    return (
        <>
            <button onClick={props.onClick}>{props.label}</button>
        </>
    )
}

export default memo(Callback);