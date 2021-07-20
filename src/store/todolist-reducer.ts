import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    todolistID: string
}
type AddTodolistAT = {
    type: "ADD_TODOLIST"
    title: string
}
type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todolistID: string
}
type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValueType
    todolistID: string
}

export const todoListsReducer =
    (todoLists: Array<TodoListType>, action: RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT): Array<TodoListType> => {
        switch (action.type) {
            case "REMOVE-TODOLIST":
                return todoLists.filter(tl => tl.id !== action.todolistID)
            case "ADD_TODOLIST":
                const newTodoListID = v1()
                const newTodoList: TodoListType = {id: newTodoListID, title:action.title, filter: "all"}
                return [...todoLists, newTodoList]
            case "CHANGE-TODOLIST-TITLE":
                return todoLists.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl)
            case "CHANGE-TODOLIST-FILTER":
                return todoLists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)
            default:
                return todoLists
        }
    }