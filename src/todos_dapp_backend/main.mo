import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Array "mo:base/Array";

actor NotesCanister {
    
    // Define a type for storing notes
    type Notes = [Text];

    // Array of tuples to store user notes, indexed by Principal
    stable var notesStorage: [(Principal, Notes)] = [];

    public shared ({ caller }) func addNote(note: Text): async () {
        let userPrincipal = caller;

        let entry = Array.find<(Principal, Notes)>(notesStorage, func (entry) {
            let (principal, _) = entry;
            principal == userPrincipal;
        });

        notesStorage := switch (entry) {
            case (?foundEntry) {
                let (_, existingNotes) = foundEntry;
                let updatedNotes = Array.append(existingNotes, [note]);
                Array.map<(Principal, Notes), (Principal, Notes)>(notesStorage, func (entry) {
                    let (principal, _) = entry;
                    if (principal == userPrincipal) {
                        return (principal, updatedNotes);
                    } else {
                        return entry;
                    }
                });
            };
            case null {
                Array.append(notesStorage, [(userPrincipal, [note])]);
            };
        };
    };

    // Function to get the notes for the authenticated user
    public shared ({ caller }) func getNotes(): async [Text] {
        let userPrincipal = caller;
        for ((principal, notes) in Array.vals(notesStorage)) {
            if (principal == userPrincipal) {
                return notes;
            }
        };
        return [];
    };

    // Function to clear all notes for the authenticated user
    public shared ({ caller }) func clearNotes(): async () {
        let userPrincipal = caller;
        notesStorage := Array.filter<(Principal, Notes)>(notesStorage, func (entry) {
            let (principal, _) = entry;
            principal != userPrincipal;
        });
    };
}