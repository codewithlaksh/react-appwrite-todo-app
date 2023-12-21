import React, { Component } from 'react'
import './AddNote.module.css'

export default class AddNote extends Component {
    constructor() {
        super();

        this.state = {
            note: { title: "", desc: "" }
        }
    }

    handleChange = (e) => {
        this.setState({ note: { ...this.state.note, [e.target.id]: e.target.value } })
    }

    render() {
        let { addNote } = this.props;
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="title">Note title</label>
                    <input type="text" className="form-control" id="title" value={this.state.note.title} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Note desc</label>
                    <textarea rows={3} className="form-control" id="desc" value={this.state.note.desc} onChange={this.handleChange} />
                </div>
                <button type="button" className="btn btn-primary" onClick={() => addNote(this.state.note)}>Add Note</button>
            </form>
        )
    }
}
