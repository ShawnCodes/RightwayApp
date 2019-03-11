import React, { Component } from 'react';
import queryString from 'query-string';

class UploadForm extends Component{
  constructor(props) {
    super(props);
    const values = queryString.parse(this.props.location.search);
    this.state = {
      name: '',
      description: '',
      isEmpty: true,
      file: null,
      email: values.email
    }
  }

  componentWillMount() {
    const data = {
      url: window.location
    }
    fetch('/uploads/validation', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
      .catch(err => {
        console.log(err);
        alert('Invalid link');
        window.location = '/login';
      })
  }

  handleChange = (e) => {
    if (e.target.name === 'name' || e.target.name === 'description') {
      this.setState({
        [e.target.name] : e.target.value
      });
      return;
    }

    const isSelected = this.bookCoversField.files.length > 0;
    this.setState({
      isEmpty: !isSelected,
      file: isSelected ? this.bookCoversField.files[0] : null
    });
  }

  render() {
    return(
      <div className='form'>
        <form onSubmit={(e) => this.props.handleUploadSubmit(e, this.state)}>
          <input name='name' value={this.state.name} onChange={this.handleChange} />
          <input name='description' value={this.description} onChange={this.handleChange} />
          <input type='file' ref={ field => (this.bookCoversField = field) } onChange={this.handleChange}/>
          <input type='submit' value='Upload' disabled={this.state.isEmpty} />
        </form>
      </div>
    )
  }
}
export default UploadForm;
