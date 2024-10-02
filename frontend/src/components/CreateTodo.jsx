import { useState } from 'react'

export function CreateTodo(){
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    return <div>
        <input onChange={function(e){
            setTitle(e.target.value)
        }} style={{padding:20,margin: 10}} type="text" placeholder="title" /> <br />

        <input onChange={function(e){
            setDesc(e.target.value)
        }} style={{padding:20,margin: 10}} type="text" placeholder="description"/><br />

        <button onClick={function(){
                    fetch("http://localhost:3000/todo",{
                        method:"POST",body:JSON.stringify({
                            title:title,
                            description:desc
                        }),headers:{
                            "content-type":"application/json"
                        }
                    }).then(async function(res){
                        const json=await res.json();
                        alert("Todo added")
                    })
                }}>Add to do</button>
    </div>
}