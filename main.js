var todoComponent = Vue.extend({
    data: function () {
        return {
            editMode: false
        }
    },
    props: ['item'],
    template: '<font><span v-show="!editMode" @dblclick="clicked()" title="Double click to edit">Task {{ item.id }}: {{ item.name }} </span> <input class="form-control input-sm" v-on:keyup.enter="saveEdit()" v-model="item.name" v-show="editMode" /></font>',
    methods: {
        clicked: function () {
            this.editMode = true
        },
        saveEdit: function () {
            this.editMode = false
        }
    }
});
Vue.component('todo-list', todoComponent);
new Vue({
    el: '#app',
    data: {
        todoText: '',
        addId: 1,
        todos: [
            { id: 0, name: 'This default message', status: false }
        ],
        isAll: true,
        isActive: false,
        isComplete: false
    },
    computed: {
        activeTodoList: function (todos) {
            return this.todos.filter(function (todo) {
                return !todo.status;
            });
        },
        completeTodoList: function (todos) {
            return this.todos.filter(function (todo) {
                return todo.status;
            });
        },

    },
    methods: {
        addTodo: function () {
            var todoText = this.todoText.trim();
            if (todoText) {
                let id = this.addId++;
                this.todos.push({ id: id, name: todoText, status: false });
                this.todoText = '';
            }
        },
        deleteTodo: function (item) {
            var pos = this.todos.indexOf(item);
            this.todos.splice(pos, 1);
        },
        completeTodo: function (item) {
            item.status = !item.status;
        },
        allTodoList: function () {
            this.isAll = true;
            this.isActive = false;
            this.isComplete = false;
        },
        activeList: function () {
            this.isAll = false;
            this.isActive = true;
            this.isComplete = false;
        },
        completeList: function () {
            this.isAll = false;
            this.isActive = false;
            this.isComplete = true;
        },
        deleteAllComplete: function () {
            this.todos.splice(0, this.completeTodoList.length + 1);
        }
    }
});