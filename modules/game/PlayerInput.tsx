import ActionButton from "@modules/common/ActionButton";
import Input from "@modules/common/Input";
import Heading from "@modules/common/typography/components/Heading";
import { buttonTypes } from "@resources/types/button";
import { headingVariants } from "@resources/types/variants";
import { useState } from "react";
import Form from "./PlayerInputForm";

const PlayerInput = () => {
  const [name, setName] = useState<string>("");
  return (
    <div className="flex flex-col gap-5 p-[30px] w-full items-center justify-center rounded bg-bkg-light border border-border-light drop-shadow-[0px_2px_2px_rgba(45,45,45,.05)] inset-shadow-[0px_-1px_0px_rgba(0,0,0,.1)]">
      <Heading variant={headingVariants.cardHeading} sx="font-semibold">
        Player 1
      </Heading>
      <Input
        value={name}
        inputPlaceholder="Input Player Name"
        onChange={(event) => setName(event.target.value)}
      />
      <ActionButton buttonType={buttonTypes.dark} label="Create" sx={"bg-action"} />
      <Form
        heading="Player 1"
        inputPlaceholder="Input Player Name"
        sx="[&>button]:bg-action"
        onSubmit={() => {}}
      />
      <Form
        heading="Player 1"
        inputPlaceholder="Input Player Name"
        sx="[&>button]:bg-action"
        onSubmit={() => {}}
      />
    </div>
  );
};

export default PlayerInput;
