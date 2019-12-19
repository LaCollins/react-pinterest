import React from 'react';
import './BoardsContainer.scss';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import boardData from '../../helpers/data/boardData';
import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';

class BoardsContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func,
  }

  state = {
    boards: [],
    editMode: false,
    boardToEdit: {},
    showBoardForm: false,
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((errorFromBoardsContainer) => console.error({ errorFromBoardsContainer }));
  }

  addBoard = (newBoard) => {
    boardData.saveBoard(newBoard)
      .then(() => {
        this.getBoards();
        this.setState({ showBoardForm: false });
      })
      .catch((error) => console.error(error));
  }

  updateBoard = (boardId, updatedBoard) => {
    boardData.updateBoard(boardId, updatedBoard)
      .then(() => {
        this.getBoards();
        this.setState({ editMode: false, showBoardForm: false })
      })
      .catch((error) => console.error(error));
  }

  setEditMode = (editMode) => {
    this.setState({ editMode, showBoardForm: true });
  }

  setBoardToEdit = (board) => {
    this.setState({ boardToEdit: board });
  }

  setShowBoardForm = (e) => {
    e.preventDefault();
    this.setState({ showBoardForm: true });
  }

  render() {
    return (
    <div>
      <button className="btn btn-dark" onClick={this.setShowBoardForm}>Add a New Board</button>
      { this.state.showBoardForm && <BoardForm addBoard={this.addBoard} editMode={this.state.editMode} boardToEdit={this.state.boardToEdit} updateBoard={this.updateBoard} />}
      <div className="row m-2 d-flex justify-content-around">{this.state.boards.map((board) => <Board key={board.id} board={board} setSingleBoard={this.props.setSingleBoard} setEditMode={this.setEditMode} setBoardToEdit={this.setBoardToEdit} />)}</div>
    </div>);
  }
}

export default BoardsContainer;
