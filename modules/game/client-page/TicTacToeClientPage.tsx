"use client";
import { useDispatch, useSelector } from "@store/hooks";
import PlayerInputForm from "../PlayerInputForm";
import { playerJoin, playerReset, startGame } from "@store/modules/game";
import { cn } from "@lib/utils/style";
import ActionButton from "@modules/common/ActionButton";
import { pagePaths } from "@resources/paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { headingVariants } from "@resources/types/variants";
import Heading from "@modules/common/typography/components/Heading";

const TicTacToeClientPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const gameStates = useSelector((state) => state.game);

  useEffect(() => {
    if (gameStates.current?.isStarted) {
      router.push(pagePaths.startTicTacToeGame);
    }
  }, [gameStates]);
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-[720px] mx-auto gap-[30px]">
      <Heading variant={headingVariants.heading} sx="font-bold">
        Tic Tac Toe
      </Heading>

      <div className="flex items-center justify-center gap-5">
        <PlayerInputForm
          heading="Player 1"
          value={gameStates.pendingPlayerName.first}
          inputPlaceholder="Input Player Name"
          onSubmit={(name) => {
            dispatch(playerJoin({ firstName: name }));
          }}
          onEdit={() => {
            dispatch(playerReset({ firstName: null }));
          }}
          isJoined={gameStates.pendingPlayerName.first ? true : false}
          sx={cn("[&>button]:bg-action", {
            "[&>p]:text-action": gameStates.pendingPlayerName.first,
          })}
        />
        <i className="ic-versus text-[40px]" />
        <PlayerInputForm
          heading="Player 2"
          value={gameStates.pendingPlayerName.second}
          inputPlaceholder="Input Player Name"
          onSubmit={(name) => {
            dispatch(playerJoin({ secondName: name }));
          }}
          onEdit={() => {
            dispatch(playerReset({ secondName: null }));
          }}
          isJoined={gameStates.pendingPlayerName.second ? true : false}
          sx={cn("[&>button]:bg-action", {
            "[&>p]:text-action-secondary": gameStates.pendingPlayerName.second,
          })}
        />
      </div>
      {gameStates.current && (
        <ActionButton
          label="Start"
          sx="max-w-[300px]"
          onClick={() => {
            dispatch(startGame());
          }}
        />
      )}
    </div>
  );
};

export default TicTacToeClientPage;
