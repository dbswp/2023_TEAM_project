import React from "react";
import Button from "./Button";

export default function BlackButton({ text, clickEvent }) {
  return (
    <Button text={text} clickEvent={clickEvent} mainColor="#333" color="#fff" />
  );
}
