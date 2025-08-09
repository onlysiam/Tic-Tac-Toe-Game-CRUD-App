"use client";
import { usePopup } from "@contexts/UsePopup";
import { calculateResultsAndWinner } from "@lib/utils/game";
import { cn } from "@lib/utils/style";
import ActionButton from "@modules/common/ActionButton";
import ReturnButton from "@modules/common/ReturnButton";
import Heading from "@modules/common/typography/components/Heading";
import Paragraph from "@modules/common/typography/components/Paragraph";
import { pagePaths } from "@resources/paths";
import { Player, RoundResult } from "@resources/types/game";
import { headingVariants, paragraphVariants } from "@resources/types/variants";
import { useDispatch, useSelector } from "@store/hooks";
import { resetAll, resetLeaderboard } from "@store/modules/game";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TicTacToeGameLeaderboard = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(resetAll());
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen w-full max-w-[720px] mx-auto gap-5 mt-[30px]">
      <ReturnButton />
      <Heading variant={headingVariants.heading} sx="font-bold">
        Tic-Tac-Toe — Leaderboard
      </Heading>

      <div className="flex flex-col gap-5 w-full ">
        {gameState.data?.length > 0 ? (
          gameState.data
            .sort((a, b) => b.points - a.points)
            .map((data, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-bkg-light rounded"
              >
                <Paragraph content={data.winner.name} sx="font-bold" />
                <Paragraph content={`Pints: ${data.points}`} />
              </div>
            ))
        ) : (
          <Paragraph content={`No data available`} sx="text-center" />
        )}
      </div>
      <ActionButton
        label="Reset"
        isDisabled={gameState.data.length === 0}
        onClick={() => dispatch(resetLeaderboard())}
      />
    </div>
  );
};

export default TicTacToeGameLeaderboard;
