import Box from "./box";
import "./patternbox.css";
import { useContext, useState, memo } from "react";
import { MouseContext } from "../App";
function PatternBox({
  row,
  column,
  colorList,
  disableClick = false,
  setList,
  whoAmI,
  currentCol,
  boxSize,
  mousePressed,
  setMousePressed,
}) {
  return (
    <div
      onMouseLeave={() => {
        setMousePressed?.(false);
      }}
      className={`pattern-box ${
        whoAmI === "treadls" || whoAmI === "main" || whoAmI === "treadlsColor"
          ? "direction-column"
          : ""
      }`}
    >
      {colorList.map((list, rowIdx) => {
        return (
          <div
            className={`pattern-row ${
              whoAmI === "shafts" ||
              whoAmI === "main" ||
              whoAmI === "shaftsColor"
                ? "direction-row"
                : ""
            }`}
            key={rowIdx}
          >
            {list.map((boxInfo, columnIdx) => {
              return (
                <Box
                  idx={columnIdx + rowIdx * column}
                  key={columnIdx}
                  boxInfo={boxInfo}
                  disableClick={disableClick}
                  boxSize={boxSize}
                  mousePressed={
                    whoAmI === "shaftsColor" || whoAmI === "treadlsColor"
                      ? mousePressed
                      : undefined
                  }
                  setMousePressed={
                    whoAmI === "shaftsColor" || whoAmI === "treadlsColor"
                      ? setMousePressed
                      : undefined
                  }
                  onClick={() => {
                    setList?.((s) => {
                      const newS = [];
                      let row = -1;
                      let col = -1;
                      for (let i = 0; i < s.length; i++) {
                        const newArr = [];
                        for (let j = 0; j < s[0].length; j++) {
                          if (i === rowIdx && j === columnIdx) {
                            row = i;
                            col = j;
                          }
                          newArr.push({
                            ...s[i][j],
                          });
                        }
                        newS.push(newArr);
                      }
                      const isSelected = newS[row][col].isSelected;
                      if (whoAmI === "treadls") {
                        for (
                          let treadlsCol = 0;
                          treadlsCol < s[0].length;
                          treadlsCol++
                        ) {
                          newS[row][treadlsCol].isSelected = false;
                        }
                      }
                      if (whoAmI === "shafts") {
                        for (
                          let shaftsRow = 0;
                          shaftsRow < s.length;
                          shaftsRow++
                        ) {
                          newS[shaftsRow][col].isSelected = false;
                        }
                      }
                      if (["treadls", "shafts", "last"].includes(whoAmI)) {
                        newS[row][col].isSelected = !isSelected;
                      } else {
                        newS[row][col].isSelected = true;
                      }

                      if (currentCol) {
                        newS[row][col].color = currentCol;
                      }

                      return newS;
                    });
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
export default memo(PatternBox);
