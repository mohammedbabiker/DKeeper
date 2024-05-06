import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {

  // canded ui
  // http://127.0.0.1:4943/?canisterId=cgpjn-omaaa-aaaaa-qaakq-cai&id=cuj6u-c4aaa-aaaaa-qaajq-cai

  // create data type
  public type Note = {
    title: Text;
    content: Text;
  };

  // stable to make it never change
  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(noteTitle: Text, noteContent: Text) {
  
    let newNote: Note = {
      title = noteTitle;
      content = noteContent;
    };

    notes := List.push(newNote, notes);
    // Debug.print(debug_show(notes));

  };

  public query func getNotes() : async [Note] {
    return List.toArray(notes);
  };

  public func deleteNote(id: Nat) {
    let listF = List.take(notes, id);
    let listB = List.drop(notes, id + 1);
    notes := List.append(listF, listB);
  };

}
