import { useState } from "react"


export function NewTodoForm({onSubmit}){
  onSubmit
  const [newItem, setNewItem] = useState('') // State for the input value
  function handleSubmit(e){
		e.preventDefault()
    if(newItem === "") return

    onSubmit(newItem)

		setNewItem('') // Resetting the input field after adding the todo
	}	

  return(
    <form  onSubmit={handleSubmit} className="new-item-form">
    <div className="form-row">
      <label htmlFor="item">Add Item</label>
      <input value={newItem} onChange={e => setNewItem(e.target.value)} 
      type="text" 
      id="item"/>
    </div>
    <button className="btn">ADD</button>
  </form>
  )
}