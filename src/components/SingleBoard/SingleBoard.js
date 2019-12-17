import React from 'react';
import './SingleBoard.scss';
import PropTypes from 'prop-types';
import boardData from '../../helpers/data/boardData';
import Pin from '../Pin/Pin';
import pinData from '../../helpers/data/pinData';

class SingleBoard extends React.Component {
  static propTypes = {
    selectedBoardId: PropTypes.string,
    setSingleBoard: PropTypes.func,
  }

  state = {
    board: {},
    pins: [],
  }

  componentDidMount() {
    const { selectedBoardId } = this.props;
    boardData.getSingleBoard(selectedBoardId)
      .then((request) => {
        this.setState({ board: request.data });
      })
      .catch((error) => console.error(error));

    pinData.getPinByBoardId(selectedBoardId)
      .then((pins) => {
        this.setState({ pins });
      })
      .catch((error) => console.error(error));
  }

  removeSelectedBoardId = (e) => {
    e.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  render() {
    const { board } = this.state;

    return (
      <div>
        <button className="btn btn-info m-2" onClick={this.removeSelectedBoardId}>x Close Board View</button>
        <div className="SingleBoard col-8 offset-2">
          <h2>{board.name}</h2>
          <p>{board.description}</p>
          <div className="d-flex flex-wrap">
            {this.state.pins.map((pin) => <Pin key={pin.id} pin={pin} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBoard;
