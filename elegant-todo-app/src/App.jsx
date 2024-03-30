import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

// App component
export default function App(){
	 // State variable
	const [todos, setTodos] = useState(()=>{
		const localValue = localStorage.getItem("ITEMS")
		if(localValue == null) return []

		return JSON.parse(localValue)

	})

useEffect(()=>{
	localStorage.setItem('ITEMS', JSON.stringify(todos))

}, [todos])


	function addTodo(title){
				
		// Adding new todo item to the list
		setTodos((currentTodos)=> {
					return [
				...currentTodos, {id: crypto.randomUUID(), title, completed: false}, // New todo object with a unique ID, title, and completed status
			]
		})	
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
		<NewTodoForm onSubmit={addTodo}/>  
	  <h1 className="header">Todo List</h1>
		<TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}