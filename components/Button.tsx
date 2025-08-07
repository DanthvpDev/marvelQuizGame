import { Href, Link } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps {
  buttonStyles: string;
  text: string;
  textStyles: string;
  link?: Href;
}

export default function NavigationButton({
  buttonStyles,
  text,
  textStyles,
  link,
}: ButtonProps) {
  return (
    link ? (
      <Link href={link} asChild>
      <Pressable className={buttonStyles}>
        <Text className={textStyles}>{text}</Text>
      </Pressable>
    </Link>
    )
    :
    <Pressable className={buttonStyles}>
        <Text className={textStyles}>{text}</Text>
    </Pressable>
  );
}
