export default {
  actions: {
    add_todo({ commit, state }, new_todo) {
      if (state.selection.length) {
        const _cb = (node) => {
          if (Array.isArray(node)) {
            node.forEach((n) => _cb(n));
          } else {
            if (state.selection.indexOf(node.id) !== -1) {
              let _new_todo = {
                id: Math.random().toString(16).substring(2, 8),
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
          return node;
        };
        state.todos = _cb(state.todos);
        // update todos state
        commit("UPDATE_TODOS", state.todos);
      } else {
        let _new_todo = {
          id: Math.random().toString(16).substring(2, 8),
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
    remove_todos({ commit, state }) {
      if (state.selection.length) {
        const _cb = (node) => {
          if (!state.selection.length) return;
          if (Array.isArray(node)) {
            node = node.filter((n) => state.selection.indexOf(n.id) === -1);
            node.forEach((n) => _cb(n));
          } else {
            if (node.children) {
              node.children = node.children.filter(
                (n) => state.selection.indexOf(n.id) === -1
              );
              node.children.forEach((child) => {
                _cb(child);
              });
            }
          }
          return node;
        };
        state.todos = _cb(state.todos);
        commit("UPDATE_TODOS", state.todos);
        commit("UPDATE_SELECTION", []);
      }
    },
    remove_todo({ commit, state, getters }, id) {
      const _cb = (node) => {
        if (Array.isArray(node)) {
          node = node.filter((n) => n.id !== id);
          node.forEach((n) => _cb(n));
        } else {
          if (node.children) {
            node.children = node.children.filter((n) => n.id !== id);
            node.children.forEach((child) => {
              _cb(child);
            });
          }
        }
        return node;
      };
      state.todos = _cb(state.todos);
      commit("UPDATE_TODOS", state.todos);
      if (getters.total_todo_nodes === 0) {
        commit("RESET_SELECTION");
      }
    },
    update_todo({ commit, state }, id) {
      const _cb = (node) => {
        if (Array.isArray(node)) {
          node.forEach((n) => _cb(n));
        } else {
          if (node.id === id) {
            // update node
            node.completed = !node.completed;
            node.updated = Date.now();
          }
          if (node.children) {
            node.children.forEach((child) => {
              _cb(child);
            });
          }
        }
        return node;
      };
      state.todos = _cb(state.todos);
      commit("UPDATE_TODOS", state.todos);
    },
    reset_todos({ commit }) {
      commit("RESET_TODOS");
      commit("RESET_SELECTION");
    },
    toggle_all({ commit, getters }) {
      // if all items is selected - deselect all
      if (getters.selection.length === getters.total_todo_nodes) {
        commit("UPDATE_SELECTION", []);
      } else {
        const _cb = (node) => {
          if (Array.isArray(node)) {
            node.forEach((n) => _cb(n));
          } else {
            commit("ADD_SELECTION", node.id);
            if (node.children) {
              node.children.forEach((c) => {
                _cb(c);
              });
            }
          }
        };
        _cb(getters.todos);
      }
    },
    toggle_open_nodes({ commit, getters }) {
      if (getters.open_nodes.length === getters.total_todo_nodes) {
        commit("UPDATE_OPEN_NODES", []);
      } else {
        const _cb = (node) => {
          if (Array.isArray(node)) {
            node.forEach((n) => _cb(n));
          } else {
            commit("ADD_OPENED_NODE", node.id);
            if (node.children) {
              node.children.forEach((c) => _cb(c));
            }
          }
        };
        _cb(getters.todos);
      }
    },
  },
  mutations: {
    INIT_TODOS(state) {
      try {
        state.todos = JSON.parse(localStorage.todos);
      } catch (e) {
        localStorage.todos = JSON.stringify(state.todos);
      }
    },
    RESET_TODOS(state) {
      localStorage.todos = JSON.stringify([]);
      state.todos = [];
    },
    UPDATE_TODOS(state, todos) {
      state.todos = todos;
      if (localStorage.todos) {
        localStorage.todos = JSON.stringify(state.todos);
      }
    },
    ADD_TODO(state, todo) {
      state.todos.unshift(todo);
      if (localStorage.todos) {
        localStorage.todos = JSON.stringify(state.todos);
      }
    },
    ADD_OPENED_NODE(state, node) {
      state.open_nodes.unshift(node);
    },
    UPDATE_OPEN_NODES(state, nodes) {
      state.open_nodes = nodes;
    },
    UPDATE_SELECTION(state, selection) {
      state.selection = selection;
    },
    ADD_SELECTION(state, selection) {
      state.selection.unshift(selection);
    },
    REMOVE_SELECTION(state, selection) {
      state.selection = state.selection.filter((s) => s.id !== selection);
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
    completed_todos: null,
    selection_return_type: false,
    selection_type: "independent",
    total_todo_nodes: 0,
    selection: [],
    open_nodes: [],
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
    completed_nodes: (state) => {
      let completed = 0;
      const _cb = (node) => {
        if (Array.isArray(node)) {
          node.forEach((n) => _cb(n));
        } else {
          if (node.completed) {
            completed++;
          }
          if (node.children) {
            node.children.forEach((c) => _cb(c));
          }
        }
      };
      _cb(state.todos);
      return completed;
    },
    open_nodes: (state) => state.open_nodes,
  },
};
