"use client";
import React, {
  FC,
  forwardRef,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  useRef,
} from "react";
import Heading from "./typography/components/Heading";
import { headingVariants, paragraphVariants } from "@resources/types/variants";
import Paragraph from "./typography/components/Paragraph";
import { cn } from "@lib/utils/style";

interface TextAreaProps {
  heading?: string;
  description?: string;
  value?: string | null;
  rows?: number;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onPasteHandler?: (event: ClipboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  wordLimit?: number;
  sx?: string;
  textareaSx?: string;
  children?: React.ReactNode;
  resetEditor?: boolean;
  error?: string;
}

const TextArea: FC<TextAreaProps> = ({
  heading,
  description,
  value,
  placeholder,
  wordLimit,
  onChange,
  error,
}) => {
  return (
    <section className="flex flex-col gap-[5px]">
      {heading && (
        <Heading variant={headingVariants.cardHeading} sx="font-bold">
          {heading}
        </Heading>
      )}
      {description && (
        <Paragraph
          content={description}
          variant={paragraphVariants.meta}
          sx="text-content-dark-secondary"
        />
      )}
      <TextAreaInput
        value={value}
        placeholder={placeholder}
        wordLimit={wordLimit}
        onChange={(e) => onChange && onChange(e)}
      />
      {typeof error === "string" && (
        <Paragraph
          content={error}
          variant={paragraphVariants.meta}
          sx="text-sm text-danger whitespace-nowrap text-start"
        />
      )}
    </section>
  );
};

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      value,
      rows = 4,
      placeholder = "Write here...",
      onChange,
      onKeyDown,
      disabled,
      wordLimit,
      sx,
      textareaSx,
      children,
      resetEditor,
    },
    ref
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [content, setContent] = useState<string>("");
    const [textAreaRows, setTextAreaRows] = useState<number>(rows);
    const [wordCount, setWordCount] = useState<number>(0);
    const [wordLimitReached, setWordLimitReached] = useState<boolean>(false);

    useEffect(() => {
      if (resetEditor) {
        setContent("");
        setWordCount(0);
      }
    }, [resetEditor]);

    useEffect(() => {
      if (rows) {
        setTextAreaRows(rows);
      }
    }, [rows]);

    useEffect(() => {
      if (value) {
        setContent(value);
        setWordCount(value.split(" ").length);
      } else if (!value) {
        setContent("");
      }
    }, [value]);

    useEffect(() => {
      if (textAreaRef?.current) {
        if (textAreaRef?.current.scrollHeight > textAreaRef?.current.clientHeight) {
          if (textAreaRows < 20) {
            setTextAreaRows(
              (prevRows) =>
                prevRows +
                Math.ceil(
                  (textAreaRef?.current!.scrollHeight - textAreaRef?.current!.clientHeight) / 27
                )
            );
          }
        }
      }
    }, [content]);

    const onInputChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      const newValLn = newValue.split(" ").length;
      if (wordLimit && newValLn < wordLimit) {
        setWordCount(newValue.split(" ").length);
        setWordLimitReached(false);
      } else if (wordLimit && newValLn === wordLimit) {
        setWordLimitReached(true);
      }

      if (!wordLimit || newValLn < wordLimit) {
        calculateRows(event);
        setContent(newValue);
        onChange && onChange(event);
      }
    };
    const calculateRows = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (!event.target.value) {
        setTextAreaRows(rows);
      }

      if (event.target.scrollHeight > event.target.clientHeight) {
        if (textAreaRows < 20) {
          setTextAreaRows(
            (prevRows) =>
              prevRows + Math.ceil((event.target.scrollHeight - event.target.clientHeight) / 27)
          );
        }
      }
    };
    return (
      <section className={cn("relative flex w-full items-start justify-center rounded", sx)}>
        <textarea
          ref={ref ?? textAreaRef}
          value={content}
          rows={textAreaRows}
          onChange={onInputChangeHandler}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "box-border w-full bg-bkg-light border border-border-light outline-0 rounded p-4 text-content-dark placeholder-content-dark/40 text-body resize-none transition-all duration-300 ease focus:outline-none",
            textareaSx
          )}
        />
        {children}
        {wordLimit && wordLimitReached && (
          <Paragraph
            content={wordLimitReached ? "Word limit reached!" : `${wordCount}/${wordLimit}`}
            variant={paragraphVariants.meta}
            sx={cn("absolute right-2 bottom-0 text-content-dark-secondary duration-150", {
              "text-danger": wordLimitReached,
            })}
          />
        )}
        {wordLimit && !wordLimitReached && (
          <Paragraph
            content={`${wordCount}/${wordLimit}`}
            variant={paragraphVariants.meta}
            sx={cn("absolute right-2 bottom-0 text-content-dark-secondary duration-150", {
              "text-danger": wordLimitReached,
            })}
          />
        )}
      </section>
    );
  }
);

export default TextArea;
