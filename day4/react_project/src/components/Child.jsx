import React from "react";

const Child=(props)=>{
    return(
        <div> 
           child-{">"} Name : {props.name} , Age:{props.age}
        </div>
    )
}

export default Child