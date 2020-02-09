import React, {Component} from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';

import './app.css';

export default class App extends Component {
    maxId = 100;

    state = {
        todoData: [],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done:false,
            id: this.maxId++
        };
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const ind = todoData.findIndex((el) => el.id === id);
            const newArray = [...todoData.slice(0, ind), ...todoData.slice(ind + 1)];
            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem =  this.createTodoItem(text);       
        this.setState(({todoData}) => {            
            const newArr = [
                ...todoData, newItem
            ];
            return {       
                todoData: newArr
            };
        });
    };
    toggleProperty = (arr, id, propName) => {
        const ind = arr.findIndex((el) => el.id === id);
        const oldItem = arr[ind];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [...arr.slice(0, ind), newItem, ...arr.slice(ind + 1)];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {todoData: this.toggleProperty(todoData, id, 'important')}
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {todoData: this.toggleProperty(todoData, id, 'done')}
        });
    };

    onSearchItem = (term) => {
        this.setState({term});
    };

    searchItems(items, term) {
        if(term.length === 0) {
            return items;
        }
        return items.filter((item) => {   
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    filter(items, filter) {
        switch(filter) {
            case 'all': 
                return items;
            case 'active': 
                return items.filter((item) => !item.done)
            case 'done': 
                return items.filter((item) => item.done)
            default: 
                return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    render() {
        const {todoData, term, filter} = this.state;
        const countDone = todoData.filter((el) => el.done).length;
        const countTodo = todoData.length - countDone;
        const visibleItems = this.filter(this.searchItems(todoData, term), filter);
        return (
            <div className="todo-app">
                <AppHeader toDo={countTodo} done={countDone} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchItem = {this.onSearchItem}/>
                    <ItemStatusFilter 
                    filter = {filter}
                    onFilterChange = {this.onFilterChange}
                    />
                </div>
                <TodoList 
                todos={visibleItems} 
                onDeleted={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        ) 
    } 
};