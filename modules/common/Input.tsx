"use client";

import React, { ChangeEvent, FocusEvent, RefObject, useEffect, useState } from "react";
import { cn } from "@lib/utils/style";
import { paragraphVariants, ParagraphVariant } from "@resources/types/variants";
import Paragraph from "@modules/common/typography/components/Paragraph";

interface InputProps {
  label?: string;
  prefix?: string;
  inputRef?: RefObject<HTMLInputElement>;
  value: string;
  type?: string;
  isSearch?: boolean;
  icon?: string;
  inputIcon?: string;
  characterLimit?: number;
  inputPlaceholder?: string;
  paragraphVariant?: ParagraphVariant;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean | string;
  isDisabled?: boolean;
  onFocusHandler?: (e: FocusEvent<HTMLInputElement> | MouseEvent) => void;
  onBlurHandler?: (e: FocusEvent<HTMLInputElement>) => void;
  sx?: string;
  inputSx?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  prefix,
  inputRef,
  value,
  type = "text",
  isSearch = false,
  icon,
  inputIcon,
  characterLimit,
  inputPlaceholder,
  paragraphVariant = paragraphVariants.regular,
  onChange,
  error,
  isDisabled = false,
  onFocusHandler = () => {},
  onBlurHandler = () => {},
  sx,
  inputSx,
}) => {
  const [content, setContent] = useState<string>("");
  const [characterCount, setCharacterCount] = useState<number>(0);

  useEffect(() => {
    setContent(value);
    if (value) setCharacterCount(value.length);
  }, [value]);

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (!characterLimit || newVal.length <= characterLimit || newVal.length <= content.length) {
      setContent(newVal);
      if (characterLimit) setCharacterCount(newVal.length);
      onChange?.(e);
    }
  };

  return (
    <section
      className={cn("relative flex w-full items-start justify-center flex-col gap-[5px]", sx)}
    >
      {label && (
        <Paragraph
          content={label}
          variant={paragraphVariants.meta}
          sx="text-left text-content-dark-secondary text-[15px] font-semibold"
        />
      )}
      {icon && <i className={`ic-${icon} text-regular ml-4 text-content-dark-secondary`} />}
      <div
        className={cn(
          "relative flex w-full items-center rounded-lg border border-border-light [&>input]:px-5 [&>input]:py-[10px] h-[46px] overflow-hidden",
          inputSx,
          { "h-[55px]": characterLimit },
          { "border-danger": !!error },
          { "bg-bkg-disabled/10 text-content-dark": isDisabled }
        )}
      >
        {isSearch && <i className="ic-search text-regular ml-4 shrink-0 text-gray-300" />}
        {prefix && (
          <>
            <Paragraph
              content={prefix}
              variant={paragraphVariants.regular}
              sx="text-content-dark-secondary px-[10px]"
            />
            <div className="border-r border-border-light h-full" />
          </>
        )}
        {inputIcon && (
          <i
            className={`ic-${inputIcon} text-regular ml-2 ${
              isDisabled ? "cursor-default" : "cursor-pointer"
            } text-content-dark-secondary`}
          />
        )}
        <input
          ref={inputRef}
          type={type}
          className={cn(
            "flex h-full w-full bg-transparent text-start outline-none text-content-dark placeholder:text-gray-300",
            {
              "text-[18px]": paragraphVariant === paragraphVariants.regular,
              "text-xs lg:text-sm": paragraphVariant === (paragraphVariants as any).description,
              "text-content-dark-secondary": isDisabled,
            }
          )}
          value={content}
          onChange={onInputChangeHandler}
          placeholder={inputPlaceholder}
          disabled={isDisabled}
          onFocus={(e) => onFocusHandler(e)}
          onBlur={(e) => onBlurHandler(e)}
        />
      </div>
      {characterLimit && (
        <Paragraph
          content={`${characterCount}/${characterLimit}`}
          variant={paragraphVariants.meta}
          sx="absolute right-2 bottom-0 text-content-dark/60"
        />
      )}
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

export default Input;
