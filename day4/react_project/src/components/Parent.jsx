import React from "react";
// import Child from './Child';

const Parent=()=>{
    return(
        <div> 
            Parent 
            <Child name="alice" age={22} />
        </div>
    )
}

export default Parent