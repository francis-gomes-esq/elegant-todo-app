import { useState } from "react"
import "./styles.css"


// App component
export default function App(){
	 // State variables
	const [newItem, setNewItem] = useState('') // State for the input value
	const [todos, setTodos] = useState([]) // State for todo items

	function handleSubmit(e){
		e.preventDefault()
		
		// Adding new todo item to the list
		setTodos((currentTodos)=> {
					return [
				...currentTodos, {id: crypto.randomUUID(), title:newItem, completed: false}, // New todo object with a unique ID, title, and completed status
			]
		})	
		setNewItem('') // Resetting the input field after adding the todo
	}	

	// Function to toggle todo item completion status
	function toggleTodo(id, completed){
		setTodos(currentTodos =>{
			// Mapping through current todos array
			return currentTodos.map(todo =>{
				// Update completion status if todo id matches the argument
				if(todo.id === id){
					return {...todo, completed} // Update completion status
				}
				return todo // Otherwise, return the todo unchanged
			})
		})
	}


	function deleteTodo(id){
		setTodos(currentTodos => { 
			// Filtering out the todo item with the provided id
			return currentTodos.filter(todo => todo.id !== id)
		})
	}

	// Rendering the component
  return (
    <>
    <form  onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input value={newItem} onChange={e => setNewItem(e.target.value)} 
				type="text" 
				id="item"/>
      </div>
      <button className="btn">Add</button>
    </form>
    <h1 className="header">Todo List</h1>
    <ul className="list">
			{todos.length === 0 && 'No Todos'}
			{todos.map(todo => {
				return  (
					<li key={todo.id}>
				<label>
        	<input type="checkbox" checked={todo.completed}
					onChange={e => toggleTodo(todo.id, e.target.checked)}
					/>					
		
        	{todo.title}
				</label>
        <button 
				onClick={() => deleteTodo(todo.id)} 
				className="btn btn-danger">
					Delete
				</button>
      </li>
				)
			})}			
    </ul>
    </>
  )
}