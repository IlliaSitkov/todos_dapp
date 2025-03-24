import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Array "mo:base/Array";

actor NotesCanister {
    
    type Note = {
        id: Nat;
        text: Text;
        completed: Bool;
    };
    type Category = {
        id: Nat;
        name: Text;
        var notes: [Note];
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

    public shared ({ caller }) func getNotes(categoryId: Nat): async [Note] {
        let user = findUser(caller);
        switch (user) {
            case (?foundUser) {
                let category = findCategory(foundUser, categoryId);
                switch (category) {
                    case (?foundCategory) {
                        return foundCategory.notes;
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

    public shared ({ caller }) func addNote(note: Text, categoryId: Nat): async () {
        let user = findUser(caller);
        switch (user) {
            case (?foundUser) {
                let category = findCategory(foundUser, categoryId);
                switch (category) {
                    case (?foundCategory) {
                        let newNotes = Array.append<Note>(foundCategory.notes, [{ id = await generateId(); text = note; completed = false }]);
                        foundCategory.notes := newNotes;
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


    public shared ({ caller }) func updateNote(note: Text, categoryId: Nat, noteId: Nat): async () {
        let user = findUser(caller);
        switch (user) {
            case (?foundUser) {
                let category = findCategory(foundUser, categoryId);
                switch (category) {
                    case (?foundCategory) {
                        let newNotes = Array.map<Note, Note>(foundCategory.notes, func (n) {
                            if (n.id == noteId) {
                                { id = n.id; text = note; completed = n.completed };
                            } else {
                                n;
                            };
                        });
                        foundCategory.notes := newNotes;
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

    public shared ({ caller }) func toggleNote(categoryId: Nat, noteId: Nat): async () {
        let userPrincipal = caller;

        let user = findUser(userPrincipal);
        
        switch (user) {
            case (?foundUser) {
                let category = findCategory(foundUser, categoryId);
                switch (category) {
                    case (?foundCategory) {
                        let newNotes = Array.map<Note, Note>(foundCategory.notes, func (n) {
                            if (n.id == noteId) {
                                { id = n.id; text = n.text; completed = not n.completed };
                            } else {
                                n;
                            };
                        });
                        foundCategory.notes := newNotes;
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

    public shared ({ caller }) func deleteNote(categoryId: Nat, noteId: Nat): async () {
        let userPrincipal = caller;

        let user = findUser(userPrincipal);
        
        switch (user) {
            case (?foundUser) {
                let category = findCategory(foundUser, categoryId);
                switch (category) {
                    case (?foundCategory) {
                        let newNotes = Array.filter<Note>(foundCategory.notes, func (n) {
                            n.id != noteId;
                        });
                        foundCategory.notes := newNotes;
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
                let newCategories = Array.append<Category>(foundUser.categories, [{ id = await generateId(); name = name; var notes = [] }]);
                foundUser.categories := newCategories;
            };
            case null{
                let newUser = { id = userPrincipal; var categories = [{ id = 0; name = name; var notes = ([] : [Note]) }] };
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