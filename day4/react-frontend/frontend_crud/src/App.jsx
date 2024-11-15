import { useEffect } from 'react';
import react,{ useState } from 'react';
import './App.css'
import Axios from 'axios'

function App() {
  const[foodname,setFoodName]=useState("");
  const[dayiate,setDays]=useState();
  
  const[newfoodname,setNewFoodName]=useState("");
  const[foodList,setFoodList]=useState([])
 
  useEffect(()=>{
    Axios.get("http://localhost:3000/read").then((response=>{
      setFoodList(response.data);
    }))
  },[foodList]);

  const addToList=()=>{
    Axios.post("http://localhost:3000/insert",{
      foodname:foodname,
      dayiate:dayiate,
    })
  }

  const updateFood=(id)=>{
    Axios.put("http://localhost:3000/update",{
      id:id,
       foodname:newfoodname
    })
  }

  const deleteFood=(id)=>{
    Axios.delete(`http://localhost:3000/delete/${id}`,{
      id:id,
    })
  }


  return (
    <>
      <div className='App'>
        <h1>CRUD APPLICATION</h1>
        <label>Food name</label>
        <input type="text" onChange={(e)=>setFoodName(e.target.value)}/>
        <label>Days</label>
        <input type='number' onChange={(e)=>setDays(e.target.value)}/>
        <button onClick={addToList}>Add To List</button>

        <h1>Food List</h1>
        {
          foodList.map((val,key)=>{
            return(
              <div className='food' key={key}>
                 <h1>{val.foodname}</h1>
                 <h1>{val.dayiate}</h1>{""}
                 <input type="text" placeholder='new food name...' onChange={(e)=>setNewFoodName(e.target.value)} />
                 <button onClick={()=>updateFood(val._id)}>Update</button>
                 <button onClick={()=>deleteFood(val._id)}>Delete</button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
