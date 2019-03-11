import React, { Component } from 'react';
import Auth from '../modules/Auth'

class UploadList extends Component{
  constructor() {
    super();
    this.state = {
      uploadList: null,
      uploadListLoaded: false
    }
  }

  componentDidMount() {
    fetch('/uploads')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          uploadList: res.uploads,
          uploadListLoaded: true
        })
      }).catch(err => console.log(err));
  }

  renderUploads(){
    return this.state.uploadList.map(upload => {
      console.log(upload)
      return (
        <div>
          <h1>Recent Uploads</h1>
        <div className="upload" key={upload.id}>
          <ul>
          <li><b>User: </b> {upload.name}</li>
          <li><b>File Description: </b>{upload.description}</li>
          <li><b>file content type: </b>{upload.file_content_type}</li>
          </ul>
        </div>
      </div>
      )
    })
  }

  render() {
    return (
      <div className="container">
        {(this.state.uploadListLoaded)
          ? this.renderUploads()
          : <p> Loading</p> }
      </div>
    )
  }
}

export default UploadList;
