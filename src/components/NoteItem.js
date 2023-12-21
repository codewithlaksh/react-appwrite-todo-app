import React, { Component } from 'react'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default class NoteItem extends Component {
  render() {
    let { note, updateNote, handleDeleteNote } = this.props;
    return (
      <div className="col-md-4">
        <div className="card my-2" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.desc}</p>
            <span className="btn btn-sm btn-success" onClick={() => updateNote(note)}><AiFillEdit /></span>
            <span className="btn btn-sm btn-danger mx-2" onClick={() => handleDeleteNote(note.$id)}><AiFillDelete /></span>
          </div>
        </div>
      </div>
    )
  }
}
