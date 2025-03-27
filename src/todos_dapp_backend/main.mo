import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Array "mo:base/Array";

actor TodosCanister {
    
    type Todo = {
        id: Nat;
        text: Text;
        completed: Bool;
    };
    type Category = {
        id: Nat;
        name: Text;
        var todos: [Todo];
    };
    type User = {
        id: Principal;
        var categories: [Category];
    };

    stable var userStorage: [User] = [];

    stable var nextId: Nat = 0;

    private func generateId(): async Nat {
        let currentId = nextId;
        nextId += 1;
        return currentId;
    };

    private func findUser(principal: Principal): ?User {
        Array.find<User>(userStorage, func (user) {
            user.id == principal;
        });
    };
    
    private func findCategory(user: User, categoryId: Nat): ?Category {
        Array.find<Category>(user.categories, func (category) {
            category.id == categoryId;
        });
    };

    public shared ({ caller }) func getCategory(categoryId: Nat): async ?{id : Nat; name : Text}{
        let user = findUser(caller);
        switch (user) {
            case (?foundUser) {
                findCategory(foundUser, categoryId);
            };
            case null{
                null;
            }
        };
    };
    
    public shared ({ caller }) func getTodo(categoryId: Nat, todoId: Nat): async ?Todo {
        let user = findUser(caller);
        switch (user) {
            case (?foundUser) {
                let category = findCategory(foundUser, categoryId);
                switch (category) {
                    case (?foundCategory) {
                        Array.find<Todo>(foundCategory.todos, func (todo) {
                            todo.id == todoId;
                        });
                    };
                    case null {
                        null;
                    }
                };
            };
            case null{
                null;
            }
        };
    };
        
    public shared ({ caller }) func getTodos(categoryId: Nat): async [Todo] {
        let user = findUser(caller);
        switch (user) {
            case (?foundUser) {
                let category = findCategory(foundUser, categoryId);
                switch (category) {
                    case (?foundCategory) {
                        return foundCategory.todos;
                    };
                    case null {
                        return [];
                    }
                };
            };
            case null{
                return [];
            }
        };
    };

    public shared ({ caller }) func addTodo(text: Text, categoryId: Nat): async () {
        let user = findUser(caller);
        switch (user) {
            case (?foundUser) {
                let category = findCategory(foundUser, categoryId);
                switch (category) {
                    case (?foundCategory) {
                        let newTodos = Array.append<Todo>(foundCategory.todos, [{ id = await generateId(); text = text; completed = false }]);
                        foundCategory.todos := newTodos;
                    };
                    case null {
                        return;
                    }
                };
            };
            case null{
                return;
            }
        };
    };


    public shared ({ caller }) func updateTodo(text: Text, categoryId: Nat, todoId: Nat): async () {
        let user = findUser(caller);
        switch (user) {
            case (?foundUser) {
                let category = findCategory(foundUser, categoryId);
                switch (category) {
                    case (?foundCategory) {
                        let newTodos = Array.map<Todo, Todo>(foundCategory.todos, func (todo) {
                            if (todo.id == todoId) {
                                { id = todo.id; text = text; completed = todo.completed };
                            } else {
                                todo;
                            };
                        });
                        foundCategory.todos := newTodos;
                    };
                    case null {
                        return;
                    }
                };
            };
            case null{
                return;
            }
        };
    };

    public shared ({ caller }) func toggleTodo(categoryId: Nat, todoId: Nat): async () {
        let userPrincipal = caller;

        let user = findUser(userPrincipal);
        
        switch (user) {
            case (?foundUser) {
                let category = findCategory(foundUser, categoryId);
                switch (category) {
                    case (?foundCategory) {
                        let newTodos = Array.map<Todo, Todo>(foundCategory.todos, func (todo) {
                            if (todo.id == todoId) {
                                { id = todo.id; text = todo.text; completed = not todo.completed };
                            } else {
                                todo;
                            };
                        });
                        foundCategory.todos := newTodos;
                    };
                    case null {
                        return;
                    }
                };
            };
            case null{
                return;
            }
        };
    };

    public shared ({ caller }) func deleteTodo(categoryId: Nat, todoId: Nat): async () {
        let userPrincipal = caller;

        let user = findUser(userPrincipal);
        
        switch (user) {
            case (?foundUser) {
                let category = findCategory(foundUser, categoryId);
                switch (category) {
                    case (?foundCategory) {
                        let newTodos = Array.filter<Todo>(foundCategory.todos, func (todo) {
                            todo.id != todoId;
                        });
                        foundCategory.todos := newTodos;
                    };
                    case null {
                        return;
                    }
                };
            };
            case null{
                return;
            }
        };
    };

    public shared ({ caller }) func getCategories(): async [{id : Nat; name : Text}] {
        let userPrincipal = caller;
        let user = findUser(userPrincipal);
        switch (user) {
            case (?foundUser) {
                Array.map<Category, {id : Nat; name : Text}>(foundUser.categories, func (category) {
                    { id = category.id; name = category.name };
                });
            };
            case null{
                [];
            }
        };
    };

    public shared ({ caller }) func addCategory(name: Text): async () {
        let userPrincipal = caller;
        let user = findUser(userPrincipal);
        switch (user) {
            case (?foundUser) {
                let newCategories = Array.append<Category>(foundUser.categories, [{ id = await generateId(); name = name; var todos = [] }]);
                foundUser.categories := newCategories;
            };
            case null{
                let newUser = { id = userPrincipal; var categories = [{ id = 0; name = name; var todos = ([] : [Todo]) }] };
                userStorage := Array.append<User>(userStorage, [newUser]);
            }
        };
    };

     public shared ({ caller }) func removeCategory(categoryId: Nat): async () {
        let userPrincipal = caller;
        let user = findUser(userPrincipal);
        switch (user) {
            case (?foundUser) {
                let newCategories = Array.filter<Category>(foundUser.categories, func (category) {
                    category.id != categoryId;
                });
                foundUser.categories := newCategories;
            };
            case null{
                return;
            }
        };
    };

}