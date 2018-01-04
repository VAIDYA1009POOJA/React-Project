
// Todo Reducer
function todosReducer(state, action) {
    if (typeof state === 'undefined') {
        return {todos: []}
    }

    var nextState = Object.assign({}, state);

    switch (action.type) {
        case 'NEW':
            nextState.todos.push(action.payload)
            return nextState;
            break;
        case 'DELETE':
            nextState.todos.pop();
            return nextState;
            break;
        case 'DELETE_ALL':
            nextState.todos = []
            return nextState;
            break;
        default:
            return state
    }
}

// STORE
var store = Redux.createStore(todosReducer);
var todosInput = document.getElementById('todos');
var todosList = document.getElementById('todosList');

function render() {
    var state = store.getState()
    renderList(state);
}

function renderList(state) {
    todosList.innerHTML = '';
    for (var i = 0; i < state.todos.length; i++) {
        var li = document.createElement('li');
        var todo = state.todos[i];
        li.innerHTML = todo.toString()
        todosList.appendChild(li);
    }
}

render()
store.subscribe(render)

// ACTIONS
document.getElementById('new')
    .addEventListener('click', function () {
        store.dispatch({type: 'NEW', payload: todosInput.value})
    })

document.getElementById('delete')
    .addEventListener('click', function () {
        store.dispatch({type: 'DELETE'})
    })

document.getElementById('delete_all')
    .addEventListener('click', function () {
        store.dispatch({type: 'DELETE_ALL'})
    })