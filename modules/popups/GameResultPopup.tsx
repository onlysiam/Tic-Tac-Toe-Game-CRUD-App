//context
import { usePopup } from "@contexts/UsePopup";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "@store/hooks";
import { useRouter } from "next/navigation";
import ReactConfetti from "react-confetti";
import Modal from "@modules/modal/modal";
import Heading from "@modules/common/typography/components/Heading";
import { headingVariants } from "@resources/types/variants";
import Paragraph from "@modules/common/typography/components/Paragraph";
import ActionButton from "@modules/common/ActionButton";
import { resetAll } from "@store/modules/game";
import { pagePaths } from "@resources/paths";
import { CalculateResult, calculateResultsAndWinner } from "@lib/utils/game";

const GameResultPopup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentGame = useSelector((state) => state.game.current);
  const { gameResultPopup } = usePopup();

  const [showConfetti, setShowConfetti] = useState(false);
  const [popupContents, setPopupContents] = useState<any | null>(null);
  const [gameResult, setGameResult] = useState<CalculateResult | null>(null);

  useEffect(() => {
    if (gameResultPopup.show) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [gameResultPopup.show]);

  const handleActionBtnHandler = () => {
    router.push(pagePaths.ticTacToeGameLeaderboard);
    gameResultPopup.close();
  };

  useEffect(() => {
    if (gameResultPopup.show && currentGame?.results) {
      const calc = calculateResultsAndWinner(
        currentGame.results,
        { firstId: currentGame.player.first.id, secondId: currentGame.player.second.id },
        5
      );
      setGameResult(calc);
    }
  }, [gameResultPopup.show, currentGame?.results]);

  if (!gameResultPopup.show) return null;

  return (
    <Modal open={gameResultPopup.show}>
      <section className="relative flex gap-[30px] flex-col mx-auto p-[30px] w-[90vw] md:w-[500px] min-h-[430px] overflow-auto bg-bkg-light rounded-[20px]">
        <ReactConfetti
          className="h-full w-full"
          run={showConfetti}
          recycle={false}
          gravity={0.3}
          width={500}
          height={450}
          numberOfPieces={200}
          tweenDuration={1000}
          onConfettiComplete={() => {
            setShowConfetti(false);
          }}
        />

        <div className="flex flex-col gap-5 my-auto">
          <Heading variant={headingVariants.cardHeading} sx="font-semibold text-center">
            {"Winner"}
          </Heading>
          {currentGame && gameResult?.guaranteedWinnerId && (
            <Heading variant={headingVariants.sectionHeading} sx="!font-bold text-center">
              {
                Object.values(currentGame?.player).find(
                  (p) => p.id === gameResult?.guaranteedWinnerId
                )?.name
              }
            </Heading>
          )}
          <Paragraph
            content={`Won the game in ${5 - (gameResult?.remainingRounds ?? 0)} rounds with ${
              gameResult?.totals[gameResult?.guaranteedWinnerId!]
            } points.`}
            sx="text-center"
          />
        </div>

        <div className="flex gap-[20px] mt-auto">
          <ActionButton
            label="Close"
            onClick={() => {
              gameResultPopup.close();
              dispatch(resetAll());
            }}
          />
          <ActionButton label="Leaderboard" onClick={handleActionBtnHandler} />
        </div>
      </section>
    </Modal>
  );
};

export default GameResultPopup;
