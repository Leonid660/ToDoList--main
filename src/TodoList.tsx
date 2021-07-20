import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValueType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
    const {filter} = props
    const taskJSXElements = props.tasks.map(t => {
        const taskClasses: string = t.isDone ? "is-done" : "";
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (title: string) =>
            props.changeTaskTitle(t.id, title, props.todoListID)
        return (
            <li key={t.id}>
               <span className={taskClasses}>
                <Checkbox
                    color={"primary"}
                    onChange={changeTaskStatus}
                    checked={t.isDone}
                />

                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                </span>
                <IconButton
                    onClick={removeTask}
                    color={"secondary"}
                >
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    const onClickAllFilter = () => {
    props.changeTodoListFilter("all",props.todoListID)
    }
    const onClickActiveFilter = () => {
        props.changeTodoListFilter("active",props.todoListID)
    }
    const onClickCompletedFilter = () => {
        props.changeTodoListFilter("completed",props.todoListID)
    }
    const onClickRemoveTodoList = ()=> props.removeTodoList(props.todoListID)
    const addTask =(title:string)=>props.addTask(title,props.todoListID)
    const changeTodoListTitle=(title:string)=>props.changeTodoListTitle(title,props.todoListID)
    return (
        <div>
            <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    onClick={onClickRemoveTodoList}
                    color={"secondary"}
                >
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle:"none",paddingLeft:"0px"}}>
                {taskJSXElements}
            </ul>

            <div>
                <Button
                    style={{marginLeft:"3px"}}
                    size={"small"}
                    variant={filter === "all" ? "outlined" : "contained"}
                    color={"primary"}
                    onClick={onClickAllFilter}>All
                </Button>
                <Button
                    style={{marginLeft:"3px"}}
                    size={"small"}
                    variant={filter === "active" ? "outlined" : "contained"}
                    color={"primary"}
                    onClick={onClickActiveFilter}>Active
                </Button>
                <Button
                    style={{marginLeft:"3px"}}
                    size={"small"}
                    variant={filter ===  "completed" ? "outlined" : "contained"}
                    color={"primary"}
                    onClick={onClickCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;

