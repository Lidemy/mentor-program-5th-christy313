import styled from "styled-components";
import Square from "./Components/Square";
import useBoard from "./useBoard.js";

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
`;

const Message = styled.div`
  text-align: center;
  font-size: 24px;
`;

const Button = styled.button`
  display: flex;
  margin: 20px auto;
  border-radius: 3px;
  font-size: 18px;
  padding: 8px;
  border-radius: 5px;
  background: grey;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  margin: 0 auto;
`;

const Board = styled.div`
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
`;

export default function App() {
  const { board, winner, handlePieceClick, playAgain } = useBoard();

  return (
    <div className="App">
      <Title>Gomoku</Title>
      {winner && <Message>The Winner is: {winner}!</Message>}
      <Button onClick={playAgain}>Play again</Button>
      <Wrapper>
        <Board>
          {board.map((row, rowIndex) => {
            return (
              <Row key={rowIndex}>
                {row.map((col, colIndex) => {
                  return (
                    <Square
                      key={colIndex}
                      value={board[rowIndex][colIndex]}
                      row={rowIndex}
                      col={colIndex}
                      onClick={handlePieceClick}
                    />
                  );
                })}
              </Row>
            );
          })}
        </Board>
      </Wrapper>
    </div>
  );
}
