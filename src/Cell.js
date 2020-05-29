import React from "react";
import "./Cell.css";

function Cell({ flipCellsAroundMe, isLit, coord }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={classes} onClick={() => flipCellsAroundMe(coord)}>{isLit}</td>;
}

export default Cell;
