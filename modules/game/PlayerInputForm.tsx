import { cn } from "@lib/utils/style";
import ActionButton from "@modules/common/ActionButton";
import Input from "@modules/common/Input";
import Heading from "@modules/common/typography/components/Heading";
import Paragraph from "@modules/common/typography/components/Paragraph";
import { buttonTypes } from "@resources/types/button";
import { headingVariants, paragraphVariants } from "@resources/types/variants";
import { useState } from "react";

interface FormButtonProps {
  heading: string;
  value: string | null;
  inputPlaceholder?: string;
  onSubmit: (value: string) => void;
  onEdit?: () => void;
  isJoined: boolean;
  sx?: string;
}

const PlayerInputForm: React.FC<FormButtonProps> = ({
  heading,
  value,
  inputPlaceholder,
  onSubmit,
  isJoined,
  onEdit,
  sx,
}) => {
  const [content, setContent] = useState<string>("");
  return (
    <div
      className={cn(
        "flex flex-col gap-5 p-[30px] min-h-[300px]  min-w-[400px] items-center justify-center rounded bg-bkg-light border border-border-light drop-shadow-[0px_2px_2px_rgba(45,45,45,.05)] inset-shadow-[0px_-1px_0px_rgba(0,0,0,.1)]",
        sx
      )}
    >
      {isJoined ? (
        <>
          <i
            className="ic-edit absolute top-4 right-4 text-content-dark-secondary cursor-pointer"
            onClick={() => onEdit && onEdit()}
          />
          <Paragraph
            content={heading}
            variant={paragraphVariants.meta}
            sx="text-content-light-secondary"
          />

          {value && (
            <Heading variant={headingVariants.cardHeading} sx="font-semibold text-center">
              {value}
            </Heading>
          )}
        </>
      ) : (
        <>
          <Heading variant={headingVariants.cardHeading} sx="font-semibold">
            {heading}
          </Heading>
          <Input
            value={content}
            inputPlaceholder={inputPlaceholder}
            onChange={(event) => setContent(event.target.value)}
            onEnter={() => onSubmit(content)}
          />
          <ActionButton
            buttonType={buttonTypes.dark}
            label="Join"
            isDisabled={!content.trim()}
            onClick={() => onSubmit(content)}
          />
        </>
      )}
    </div>
  );
};

export default PlayerInputForm;
