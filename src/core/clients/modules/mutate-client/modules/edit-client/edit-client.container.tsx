import React from "react";

interface Props {
  ccNumber: string;
}

const EditClientContainer = ({ ccNumber }: Props) => {
  return <div>{ccNumber}</div>;
};

export default EditClientContainer;
