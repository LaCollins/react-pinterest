import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    addPin: PropTypes.func,
    boardId: PropTypes.string,
  }

  state = {
    pinImage: '',
    pinTitle: '',
  }

  savePinEvent = (e) => {
    const { addPin } = this.props;
    e.preventDefault();
    const newPin = {
      imageUrl: this.state.pinImage,
      title: this.state.pinTitle,
      uid: authData.getUid(),
      boardId: this.props.boardId,
    };
    addPin(newPin);
  }

  urlChange = (e) => {
    e.preventDefault();
    this.setState({ pinImage: e.target.value });
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  render() {
    return (
      <form className='col-6 offset-3 PinForm'>
          <div className="form-group">
            <label htmlFor="pin-title">Pin Title:</label>
            <input
              type="text"
              className="form-control"
              id="pin-title"
              placeholder="Title Goes Here"
              value={this.state.pinTitle}
              onChange={this.titleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pin-image-url">Pin Image Url:</label>
            <input
              type="text"
              className="form-control"
              id="pin-image-url"
              placeholder="https://www.google.com"
              value={this.state.pinImage}
              onChange={this.urlChange}
            />
          </div>
          <button className="btn btn-secondary" onClick={this.savePinEvent}>Add Pin</button>
      </form>
    );
  }
}

export default PinForm;
