const uid = require("lodash.uniqueid");

export default {
  actions: {
    add_todo({ commit, state }, new_todo) {
      if (state.selection.length) {
        const _cb = (node) => {
          if (Array.isArray(node)) {
            node.forEach((n) => _cb(n));
          } else {
            if (state.selection.indexOf(node.id) !== -1) {
              console.log("new_todo", new_todo);
              let _new_todo = {
                id: Number.parseInt(uid()),
                name: new_todo.name,
                created: new_todo.created,
                updated: null,
                icon: new_todo.icon,
                completed: false,
                children: [],
              };
              node.children.push(_new_todo);
              const index = state.selection.indexOf(node.id);
              state.selection.splice(index, 1);
            }
            if (node.children) {
              node.children.forEach((child) => {
                _cb(child);
              });
            }
          }
        };
        _cb(state.todos);
        // update todos state
        commit("UPDATE_TODOS", state.todos);
      } else {
        let _new_todo = {
          id: Number.parseInt(uid()),
          name: new_todo.name,
          created: new_todo.created,
          updated: null,
          icon: new_todo.icon,
          completed: false,
          children: [],
        };
        commit("ADD_TODO", _new_todo);
      }
    },
    remove_todos({ commit, getters }) {
      if (getters.selection.length) {
        let todos = getters.todos;
        const _cb = (node) => {
          if (Array.isArray(node)) {
            node = node.filter((n) => getters.selection.indexOf(n.id) === -1);
            node.forEach((n) => _cb(n));
          } else {
            if (node.children) {
              node.children = node.children.filter(
                (n) => getters.selection.indexOf(n.id) === -1
              );
              node.children.forEach((child) => {
                _cb(child);
              });
            }
          }
          return node;
        };
        todos = _cb(todos);
        commit("UPDATE_TODOS", todos);
        commit("UPDATE_SELECTION", []);
      }
    },
    reset_todos({ commit }) {
      commit("RESET_TODOS");
      commit("RESET_SELECTION");
    },
  },
  mutations: {
    INIT_TODOS(state) {
      console.log("INIT_TODOS");
      try {
        if (localStorage.todos) {
          state.todos = JSON.parse(localStorage.todos);
        } else {
          localStorage.todos = JSON.stringify(state.todos);
        }
      } catch (e) {
        console.log(e);
      }
    },
    RESET_TODOS(state) {
      console.log("RESET_TODOS");
      localStorage.todos = JSON.stringify([]);
      state.todos = [];
    },
    UPDATE_TODOS(state, todos) {
      console.log("UPDATE_TODOS");
      state.todos = todos;

      if (localStorage.todos) {
        localStorage.todos = JSON.stringify(state.todos);
      }
    },
    ADD_TODO(state, todo) {
      console.log("ADD_TODO");
      state.todos.unshift(todo);

      if (localStorage.todos) {
        localStorage.todos = JSON.stringify(state.todos);
      }
    },
    UPDATE_SELECTION(state, selection) {
      state.selection = selection;
    },
    RESET_SELECTION(state) {
      state.selection = [];
    },
    UPDATE_TOTAL_NODES_COUNT(state, total_nodes) {
      state.total_todo_nodes = total_nodes;
    },
    UPDATE_SELECTION_TYPE(state, type) {
      state.selection_type = type;
    },
    UPDATE_SELECTION_RETURN_TYPE(state, return_type) {
      state.selection_return_type = return_type;
    },
  },
  state: {
    selection_return_type: false,
    selection_type: "independent",
    total_todo_nodes: 0,
    selection: [],
    todos: [],
    todo: null,
  },
  getters: {
    selection_return_type: (state) => state.selection_return_type,
    selection_type: (state) => state.selection_type,
    todos: (state) => state.todos,
    selection: (state) => state.selection,
    total_todo_nodes: (state) => {
      let toTreeCount = (data = [], countField = "count") =>
        data.reduce(
          (total, cur) =>
            total +
            (cur[countField] = toTreeCount(cur.children || [], countField)),
          data.length
        );
      return toTreeCount(state.todos, "childCount");
    },
  },
};
