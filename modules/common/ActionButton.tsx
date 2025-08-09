"use client";

import React, { MouseEvent } from "react";
import Link from "next/link";
import { cn } from "@lib/utils/style";
import { buttonTypes, ButtonType } from "@resources/types/button";
import { paragraphVariants, ParagraphVariant } from "@resources/types/variants";
import Paragraph from "./typography/components/Paragraph";

interface CommonProps {
  label?: string;
  href?: string;
  icon?: string;
  paragraphVariant?: ParagraphVariant;
  sx?: string;
  isDisabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface LoadingProps {
  isLoading?: boolean;
}

interface ActionButtonProps extends CommonProps, LoadingProps {
  buttonType?: ButtonType;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  buttonType = buttonTypes.light,
  href,
  paragraphVariant = paragraphVariants.regular,
  label,
  icon,
  isLoading,
  isDisabled,
  sx,
  onClick,
}) => {
  if (buttonType === buttonTypes.dark || buttonType === buttonTypes.light) {
    return (
      <Button
        label={label}
        href={href}
        paragraphVariant={paragraphVariant}
        buttonType={buttonType}
        icon={icon}
        onClick={onClick}
        isLoading={isLoading}
        isDisabled={isDisabled}
        sx={sx}
      />
    );
  } else if (buttonType === buttonTypes.text) {
    return (
      <TextButton
        href={href}
        paragraphVariant={paragraphVariant}
        label={label}
        icon={icon}
        onClick={onClick}
        isDisabled={isDisabled}
        sx={sx}
      />
    );
  }

  return null;
};

export default ActionButton;

interface ButtonProps extends CommonProps, LoadingProps {
  buttonType: ButtonType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  href,
  buttonType,
  paragraphVariant = paragraphVariants.regular,
  icon,
  onClick,
  isLoading,
  isDisabled,
  sx,
}) => {
  const content = (
    <>
      {icon && !isLoading && (
        <i
          className={cn(`ic-${icon}`, "text-[20px] duration-150", {
            "text-content-light": buttonType === buttonTypes.dark,
            "text-content-dark-secondary": buttonType === buttonTypes.light,
          })}
        />
      )}
      <Paragraph
        content={label}
        variant={paragraphVariant}
        sx={cn(`w-max capitalize ${isLoading ? "text-loading" : ""}`, {
          "text-content-light": buttonType === buttonTypes.dark,
          "text-content-dark": buttonType === buttonTypes.light,
        })}
      />
    </>
  );

  if (href) {
    return (
      <Link
        className={cn(
          "flex w-full items-center justify-center gap-[10px] rounded px-[15px] py-[5px] text-content-light duration-150 cursor-pointer disabled:cursor-default",
          {
            "bg-bkg-dark hover:drop-shadow-none hover:inset-shadow-none drop-shadow-[0px_2px_2px_rgba(45,45,45,.2)] inset-shadow-[0px_-1px_0px_rgba(0,0,0,.2)]":
              buttonType === buttonTypes.dark,
            "bg-bkg-light border border-border-light hover:drop-shadow-none hover:inset-shadow-[0px_0px_0px_rgba(0,0,0,.1)] drop-shadow-[0px_2px_2px_rgba(45,45,45,.05)] inset-shadow-[0px_-1px_0px_rgba(0,0,0,.1)]":
              buttonType === buttonTypes.light,
            "h-[45px]": paragraphVariant === paragraphVariants.regular,
            "h-[40px]": paragraphVariant === paragraphVariants.meta,
            "!bg-bkg-disabled [&>i]:text-content-dark/40 [&>p]:text-content-dark/40 cursor-default hover:bg-bkg-disabled inset-shadow-none drop-shadow-none":
              isDisabled || isLoading,
          },
          sx
        )}
        href={isDisabled || isLoading ? "#" : href}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(
        "flex w-full items-center justify-center gap-[10px] rounded px-[15px] py-[5px] text-content-light cursor-pointer disabled:cursor-default duration-200",
        {
          "bg-bkg-dark hover:drop-shadow-none hover:inset-shadow-none drop-shadow-[0px_2px_2px_rgba(45,45,45,.2)] inset-shadow-[0px_-1px_0px_rgba(0,0,0,.2)]":
            buttonType === buttonTypes.dark,
          "bg-bkg-light border border-border-light hover:drop-shadow-none hover:inset-shadow-[0px_0px_0px_rgba(0,0,0,.1)] drop-shadow-[0px_2px_2px_rgba(45,45,45,.05)] inset-shadow-[0px_-1px_0px_rgba(0,0,0,.1)]":
            buttonType === buttonTypes.light,
          "h-[45px]": paragraphVariant === paragraphVariants.regular,
          "h-[40px]": paragraphVariant === paragraphVariants.meta,
          "!bg-bkg-disabled/20 text-content-dark/40 [&>p]:text-content-dark/40 inset-shadow-none drop-shadow-none":
            isDisabled || isLoading,
        },
        sx
      )}
      onClick={(e) => {
        e.preventDefault();
        if (!isDisabled && !isLoading && onClick) onClick(e);
      }}
      disabled={isDisabled || isLoading}
    >
      {content}
    </button>
  );
};

interface TextButtonProps extends CommonProps {}

const TextButton: React.FC<TextButtonProps> = ({
  label,
  href,
  paragraphVariant = paragraphVariants.regular,
  icon,
  onClick,
  isDisabled,
  sx,
}) => {
  const commonClasses = cn(
    "flex w-full items-center gap-[5px] duration-150 group rounded",
    isDisabled ? "[&>p,i]:text-content-dark/30" : "cursor-pointer",
    sx
  );

  const iconClasses = cn(`ic-${icon}`, "text-content-dark-secondary text-[17px] duration-150", {
    "group-hover:translate-x-[3px] group-hover:text-action": !isDisabled,
  });

  const labelNode = label && (
    <Paragraph
      content={label}
      variant={paragraphVariant}
      sx={cn(`w-max capitalize group-hover:text-action duration-150 leading-[.9em]`)}
    />
  );

  if (href) {
    return (
      <Link className={commonClasses} href={isDisabled ? "#" : href}>
        {icon && <i className={iconClasses} />}
        {labelNode}
      </Link>
    );
  }

  return (
    <button
      className={commonClasses}
      onClick={(e) => {
        if (!isDisabled && onClick) onClick(e);
      }}
      disabled={isDisabled}
    >
      {icon && <i className={iconClasses} />}
      {labelNode}
    </button>
  );
};
