import React, { Component } from 'react'
import databases from '../config'
import NoteItem from '../components/NoteItem';
import AddNote from '../components/AddNote';
import { ID } from 'appwrite';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      note: { id: "", title: "", desc: "" }
    }
    this.ref = React.createRef();
  }

  async componentDidMount() {
    await this.fetchNotes()
  }

  async fetchNotes() {
    const docs = await databases.listDocuments(
      '65829153972cd9370186',
      '6582919a51e8511b25c9'
    )
    this.setState({ notes: docs.documents });
  }

  updateNote = (noteItem) => {
    this.ref.current.click();
    this.setState({
      note: {
        id: noteItem.$id,
        title: noteItem.title,
        desc: noteItem.desc
      }
    })
  }

  handleAddNote = async (noteItem) => {
    await databases.createDocument(
      '65829153972cd9370186',
      '6582919a51e8511b25c9',
      ID.unique(),
      noteItem
    )
    this.fetchNotes();
  }

  handleUpdateNote = async () => {
    await databases.updateDocument(
      '65829153972cd9370186',
      '6582919a51e8511b25c9',
      this.state.note.id,
      {
        title: this.state.note.title,
        desc: this.state.note.desc
      }
    )
    this.fetchNotes();
    this.ref.current.click();
  }
  
  handleDeleteNote = async (id) => {
    await databases.deleteDocument('65829153972cd9370186',
    '6582919a51e8511b25c9', id)
    this.fetchNotes();
  }

  handleChange = (e) => {
    this.setState({ note: { ...this.state.note, [e.target.id]: e.target.value } })
  }

  render() {
    return (
      <>
        <div className='container my-3'>
          <h2>Add Your Note</h2>
          <AddNote addNote={this.handleAddNote} />

          <hr className="my-3" />

          <h2>Your Notes</h2>
          <div className="row mx-0">
            {this.state.notes.map((element) => {
              return <NoteItem key={element.$id} note={element} updateNote={this.updateNote} handleDeleteNote={this.handleDeleteNote} />
            })}
          </div>
        </div>

        <button ref={this.ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#editModal" hidden>
          Launch demo modal
        </button>

        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Note title</label>
                    <input type="text" className="form-control" id="title" value={this.state.note.title} onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="desc">Note desc</label>
                    <textarea rows={3} className="form-control" id="desc" value={this.state.note.desc} onChange={this.handleChange} />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.handleUpdateNote}>Update Note</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
