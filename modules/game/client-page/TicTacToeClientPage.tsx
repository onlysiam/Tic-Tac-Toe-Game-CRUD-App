"use client";
import PlayerInputForm from "../PlayerInputForm";

const TicTacToeClientPage = () => {
  return (
    <div className="flex items-center justify-center h-screen max-w-[720px] mx-auto gap-5">
      <PlayerInputForm
        heading="Player 1"
        inputPlaceholder="Input Player Name"
        sx="[&>button]:bg-action"
        onSubmit={() => {}}
      />
      <i className="ic-versus text-[40px]" />
      <PlayerInputForm
        heading="Player 2"
        inputPlaceholder="Input Player Name"
        sx="[&>button]:bg-action"
        onSubmit={() => {}}
      />
    </div>
  );
};

export default TicTacToeClientPage;
