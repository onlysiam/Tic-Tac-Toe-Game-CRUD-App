"use client";
import { usePopup } from "@contexts/UsePopup";
import { calculateResultsAndWinner } from "@lib/utils/game";
import { cn } from "@lib/utils/style";
import ActionButton from "@modules/common/ActionButton";
import Heading from "@modules/common/typography/components/Heading";
import Paragraph from "@modules/common/typography/components/Paragraph";
import { pagePaths } from "@resources/paths";
import { Player, RoundResult } from "@resources/types/game";
import { headingVariants, paragraphVariants } from "@resources/types/variants";
import { useDispatch, useSelector } from "@store/hooks";
import {
  playerBoardInput,
  resetAll,
  resetCurrentBoard,
  setLeaderboardData,
  startGame,
} from "@store/modules/game";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TicTacToeGameClientPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);

  const { gameResultPopup } = usePopup();

  useEffect(() => {
    if (!gameState.current) {
      router.push(pagePaths.ticTacToeGame);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState.current) {
      const calc = calculateResultsAndWinner(
        gameState.current.results,
        {
          firstId: gameState.current.player.first.id,
          secondId: gameState.current.player.second.id,
        },
        5
      );
      if (calc?.guaranteedWinnerId || gameState.current?.isFinished) {
        const player = Object.values(gameState.current.player).find(
          (p) => p.id === calc?.guaranteedWinnerId
        );
        if (player) {
          gameResultPopup.open({});
          if (!gameState.data.find((r) => r.winner.id === player.id)) {
            dispatch(
              setLeaderboardData({
                winner: player,
                points: calc.totals[player.id],
              })
            );
          }
        }
      }
    }
  }, [gameState.current]);

  const handlePlayerInput = (row: number, col: number) => {
    if (!gameState.current || !gameState.current.isStarted) return;
    if (gameState.current.board[row][col]) return;
    dispatch(playerBoardInput({ row: row, col: col }));
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen w-full max-w-[720px] mx-auto gap-5 mt-[30px]">
      <Heading variant={headingVariants.heading} sx="font-bold">
        Tic-Tac-Toe — 5 Rounds
      </Heading>

      {gameState.current && (
        <RoundHeader
          currentRound={gameState.current.round}
          firstPlayer={gameState.current.player.first}
          secondPlayer={gameState.current.player.second}
          currentTurn={gameState.current.turn}
          results={gameState.current.results}
        />
      )}

      <Board
        board={gameState.current?.board!}
        isDisabled={!gameState.current || !gameState.current.isStarted}
        onPlayerInput={handlePlayerInput}
      />
    </div>
  );
};

const Board = ({
  board,
  isDisabled,
  onPlayerInput,
}: {
  board: ("1" | "2" | null)[][];
  isDisabled: boolean;
  onPlayerInput: (row: number, col: number) => void;
}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-[5px] w-full mx-auto">
        {Array.from({ length: 3 }).map((_, row) =>
          Array.from({ length: 3 }).map((__, col) => {
            const value = board?.[row]?.[col] ?? null;
            const isFirstPlayer = value === "1";
            const isSecondPlayer = value === "2";
            return (
              <button
                key={`${row}-${col}`}
                onClick={() => onPlayerInput(row, col)}
                disabled={isDisabled || Boolean(value)}
                className={`h-24 w-24 flex items-center justify-center text-3xl font-semibold rounded border border-border-light-secondary bg-bkg-light shrink-0 cursor-pointer duration-150
                    ${value ? "cursor-default" : "hover:bg-bkg-disabled/30"}`}
              >
                {isFirstPlayer && <span className="text-action">X</span>}
                {isSecondPlayer && <span className="text-action-secondary">O</span>}
              </button>
            );
          })
        )}
      </div>
      <div className="flex gap-5 w-full">
        <ActionButton label="Reset Game" onClick={() => dispatch(resetCurrentBoard())} />
        <ActionButton label="Cancel" onClick={() => dispatch(resetAll())} />
      </div>
    </div>
  );
};

const RoundHeader = ({
  currentRound,
  currentTurn,
  firstPlayer,
  secondPlayer,
  results,
}: {
  results: RoundResult[];
  currentRound: number;
  currentTurn: string;
  firstPlayer: Player;
  secondPlayer: Player;
}) => {
  return (
    <div className="grid grid-cols-3 border border-border-light rounded bg-bkg-light px-4 py-[10px] w-full">
      <div className="flex flex-col items-center justify-center">
        <Paragraph
          content={"Player 1"}
          variant={paragraphVariants.meta}
          sx="text-content-dark-secondary"
        />
        <Paragraph
          isHtml
          content={`${firstPlayer.name}<span>X</span>`}
          sx="font-semibold [&>span]:text-action [&>span]:font-bold [&>span]:ml-2"
        />
        <RoundResults isFirstPlayer player={firstPlayer} results={results} />
      </div>

      <div className="flex flex-col items-center justify-center gap-[10px]">
        <div className="flex flex-col items-center justify-center">
          <Paragraph
            content={"Round"}
            variant={paragraphVariants.meta}
            sx="text-content-dark-secondary"
          />
          <Paragraph content={currentRound} sx="font-semibold" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Paragraph
            content={"Turn"}
            variant={paragraphVariants.meta}
            sx="text-content-dark-secondary"
          />
          <Paragraph
            content={currentTurn === "first" ? firstPlayer.name : secondPlayer.name}
            sx="font-semibold"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Paragraph
          content={"Player 2"}
          variant={paragraphVariants.meta}
          sx="text-content-dark-secondary"
        />
        <Paragraph
          isHtml
          content={`${secondPlayer.name}<span>O</span>`}
          sx="font-semibold [&>span]:text-action-secondary [&>span]:font-bold [&>span]:ml-2"
        />
        <RoundResults isFirstPlayer={false} player={secondPlayer} results={results} />
      </div>
    </div>
  );
};

const RoundResults = ({
  results,
  player,
  isFirstPlayer,
}: {
  results: RoundResult[];
  player: Player;
  isFirstPlayer: boolean;
}) => {
  return (
    <div className="flex gap-1">
      {results.map((row, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center justify-center h-6 w-6 border border-border-light rounded-full bg-bkg-light",
            {
              "bg-action": isFirstPlayer && row.winnerId === player.id,
              "bg-danger": row.winnerId && row.winnerId !== player.id,
              "bg-bkg-disabled": !row.winnerId,
              "bg-action-secondary": !isFirstPlayer && row.winnerId === player.id,
            }
          )}
        >
          {row.winnerId ? (
            <Paragraph
              content={row.winnerId === player.id ? "W" : "L"}
              variant={paragraphVariants.meta}
              sx="text-content-light"
            />
          ) : (
            <Paragraph content={"-"} variant={paragraphVariants.meta} sx="text-content-light" />
          )}
        </div>
      ))}
    </div>
  );
};

export default TicTacToeGameClientPage;
