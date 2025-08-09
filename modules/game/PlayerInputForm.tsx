import { cn } from "@lib/utils/style";
import ActionButton from "@modules/common/ActionButton";
import Input from "@modules/common/Input";
import Heading from "@modules/common/typography/components/Heading";
import { buttonTypes } from "@resources/types/button";
import { headingVariants } from "@resources/types/variants";
import { useState } from "react";

interface FormButtonProps {
  heading: string;
  inputPlaceholder?: string;
  onSubmit: (value: string) => void;
  sx?: string;
}

const PlayerInputForm: React.FC<FormButtonProps> = ({
  heading,
  inputPlaceholder,
  onSubmit,
  sx,
}) => {
  const [content, setContent] = useState<string>("");
  return (
    <div
      className={cn(
        "flex flex-col gap-5 p-[30px] w-full items-center justify-center rounded bg-bkg-light border border-border-light drop-shadow-[0px_2px_2px_rgba(45,45,45,.05)] inset-shadow-[0px_-1px_0px_rgba(0,0,0,.1)]",
        sx
      )}
    >
      <Heading variant={headingVariants.cardHeading} sx="font-semibold">
        {heading}
      </Heading>
      <Input
        value={content}
        inputPlaceholder={inputPlaceholder}
        onChange={(event) => setContent(event.target.value)}
      />
      <ActionButton
        buttonType={buttonTypes.dark}
        label="Join"
        isDisabled={!content.trim()}
        onClick={() => onSubmit(content)}
      />
    </div>
  );
};

export default PlayerInputForm;
