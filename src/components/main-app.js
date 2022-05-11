import { useEffect, useState, useContext, useMemo } from "react";
import "./main-app.css";
import PatternBox from "./patternbox";
import { addRecord } from "./back";
import { MouseContext } from "../App";
import Header from "./header";
import { useLocation } from "react-router-dom";

function MainApp({
  options,
  currentCol,
  repeatModaloptions,
  setClearList,
  clearListRef,
  boxSize,
  datasRef,
}) {
  const shafts = options.shafts;
  const treadls = options.treadls;
  const ends = options.ends;
  const picks = options.picks;
  const { mousePressed, setMousePressed } = useContext(MouseContext);
  const [treadlsColList, setTreadlsColList] = useState(
    Array(picks).fill([{ isSelected: true, color: options.weftColor }])
  );
  const [shaftsColList, setShaftsColList] = useState(
    Array(1).fill(
      Array(ends).fill({ isSelected: true, color: options.warpColor })
    )
  );
  const [treadlsList, setTreadlsList] = useState(
    Array(picks).fill(
      Array(treadls).fill({ isSelected: false, color: "black" })
    )
  );
  const [shaftsList, setShaftsList] = useState(
    Array(shafts).fill(Array(ends).fill({ isSelected: false, color: "black" }))
  );
  const [lastList, setLastList] = useState(
    Array(shafts).fill(
      Array(treadls).fill({ isSelected: false, color: "black" })
    )
  );
  datasRef.current = {
    setTreadlsColList,
    setShaftsColList,
    setTreadlsList,
    setShaftsList,
    setLastList,
  };
  function clearList() {
    setTreadlsList(
      Array(picks).fill(
        Array(treadls).fill({ isSelected: false, color: "black" })
      )
    );
    setShaftsList(
      Array(shafts).fill(
        Array(ends).fill({ isSelected: false, color: "black" })
      )
    );
    setLastList(
      Array(shafts).fill(
        Array(treadls).fill({ isSelected: false, color: "black" })
      )
    );
  }

  useEffect(() => {
    clearListRef.current = clearList;
  }, [shafts, ends, treadls, picks]);
  useEffect(() => {
    setTreadlsColList(
      Array(picks).fill([{ isSelected: true, color: options.weftColor }])
    );
  }, [picks, options.weftColor]);
  useEffect(() => {
    setShaftsColList(
      Array(1).fill(
        Array(ends).fill({ isSelected: true, color: options.warpColor })
      )
    );
  }, [ends, options.warpColor]);
  useEffect(() => {
    setTreadlsList(
      Array(picks).fill(
        Array(treadls).fill({ isSelected: false, color: "black" })
      )
    );
  }, [picks, treadls]);
  useEffect(() => {
    setShaftsList(
      Array(shafts).fill(
        Array(ends).fill({ isSelected: false, color: "black" })
      )
    );
  }, [ends, shafts]);
  useEffect(() => {
    setLastList(
      Array(shafts).fill(
        Array(treadls).fill({ isSelected: false, color: "black" })
      )
    );
  }, [shafts, treadls]);
  const {
    warpTreading,
    warpStartPosition,
    warpEndPosition,
    warpColor,
    weftTreading,
    weftStartPosition,
    weftEndPosition,
    weftColor,
  } = repeatModaloptions;
  useEffect(() => {
    if (warpTreading) {
      let repeatList = [];
      for (let col = warpStartPosition - 1; col <= warpEndPosition - 1; col++) {
        let founded = false;
        for (let row = 0; row < shaftsList.length; row++) {
          if (shaftsList[row][col].isSelected) {
            founded = true;
            repeatList.push({ ...shaftsList[row][col], row });
            break;
          }
        }
        if (!founded) {
          repeatList.push({
            ...shaftsList[0][col],
            row: -1,
          });
        }
      }
      let repeatIdx = 0;
      for (let col = warpStartPosition - 1; col < shaftsList[0].length; col++) {
        let nowRepeat = repeatList[repeatIdx];
        for (let row = 0; row < shaftsList.length; row++) {
          if (nowRepeat.row === row) {
            shaftsList[row][col] = { ...nowRepeat, row: undefined };
            repeatIdx++;
            repeatIdx %= repeatList.length;
          } else {
            shaftsList[row][col] = {
              ...nowRepeat,
              row: undefined,
              isSelected: false,
            };
          }
        }
        if (nowRepeat.row === -1) {
          repeatIdx++;
          repeatIdx %= repeatList.length;
        }
      }
      setShaftsList(JSON.parse(JSON.stringify(shaftsList)));
    }
  }, [repeatModaloptions]);

  useEffect(() => {
    if (warpColor) {
      let repeatList = [];
      for (let col = warpStartPosition - 1; col <= warpEndPosition - 1; col++) {
        let row = 0;

        repeatList.push({ ...shaftsColList[row][col], row });
      }
      let repeatIdx = 0;
      for (
        let col = warpStartPosition - 1;
        col < shaftsColList[0].length;
        col++
      ) {
        let nowRepeat = repeatList[repeatIdx];
        let row = 0;
        if (nowRepeat.row === row) {
          shaftsColList[row][col] = { ...nowRepeat, row: undefined };
          repeatIdx++;
          repeatIdx %= repeatList.length;
        } else {
          shaftsColList[row][col] = {
            ...nowRepeat,
            row: undefined,
            isSelected: false,
          };
        }
        setShaftsColList(JSON.parse(JSON.stringify(shaftsColList)));
      }
    }
  }, [repeatModaloptions]);
  useEffect(() => {
    if (weftTreading) {
      let repeatList = [];
      for (let row = weftStartPosition - 1; row <= weftEndPosition - 1; row++) {
        let founded = false;
        for (let col = 0; col < treadlsList[0].length; col++) {
          if (treadlsList[row][col].isSelected) {
            founded = true;
            repeatList.push({ ...treadlsList[row][col], col });
            break;
          }
        }
        if (!founded) {
          repeatList.push({
            ...treadlsList[row][0],
            col: -1,
          });
        }
      }
      let repeatIdx = 0;
      for (let row = weftStartPosition - 1; row < treadlsList.length; row++) {
        let nowRepeat = repeatList[repeatIdx];
        for (let col = 0; col < treadlsList[0].length; col++) {
          if (nowRepeat.col === col) {
            treadlsList[row][col] = { ...nowRepeat, col: undefined };
            repeatIdx++;
            repeatIdx %= repeatList.length;
          } else {
            treadlsList[row][col] = {
              ...nowRepeat,
              col: undefined,
              isSelected: false,
            };
          }
        }
        if (nowRepeat.col === -1) {
          repeatIdx++;
          repeatIdx %= repeatList.length;
        }
      }
      setTreadlsList(JSON.parse(JSON.stringify(treadlsList)));
    }
  }, [repeatModaloptions]);
  useEffect(() => {
    if (weftColor) {
      let repeatList = [];
      for (let row = weftStartPosition - 1; row <= weftEndPosition - 1; row++) {
        let col = 0;

        repeatList.push({ ...treadlsColList[row][col], col });
      }
      let repeatIdx = 0;
      for (
        let row = weftStartPosition - 1;
        row < treadlsColList.length;
        row++
      ) {
        let nowRepeat = repeatList[repeatIdx];
        let col = 0;
        if (nowRepeat.col === col) {
          treadlsColList[row][col] = { ...nowRepeat, col: undefined };
          repeatIdx++;
          repeatIdx %= repeatList.length;
        } else {
          treadlsColList[row][col] = {
            ...nowRepeat,
            col: undefined,
            isSelected: false,
          };
        }
        setTreadlsColList(JSON.parse(JSON.stringify(treadlsColList)));
      }
    }
  }, [repeatModaloptions]);
  const mainList = useMemo(() => {
    if (treadlsList.length !== picks || shaftsList.length !== shafts) {
      return [];
    }
    let mainList = [];
    for (let row = 0; row < picks; row++) {
      const newArr = [];
      for (let col = 0; col < ends; col++) {
        let shaftsIdx = -1;
        let treadlsIdx = -1;
        for (let shaftsRow = 0; shaftsRow < shafts; shaftsRow++) {
          if (shaftsList[shaftsRow][col].isSelected) {
            shaftsIdx = shaftsRow;
            break;
          }
        }
        for (let treadlsCol = 0; treadlsCol < treadls; treadlsCol++) {
          if (treadlsList[row][treadlsCol].isSelected) {
            treadlsIdx = treadlsCol;
            break;
          }
        }
        if (shaftsIdx === -1 || treadlsIdx === -1) {
          newArr.push({
            isSelected: false,
            color: "#ffffff",
          });
          continue;
        }
        if (lastList[shaftsIdx][treadlsIdx].isSelected) {
          newArr.push({
            isSelected: true,
            color: treadlsColList[row][0].color,
          });
        } else {
          newArr.push({
            isSelected: true,
            color: shaftsColList[0][col].color,
          });
        }
      }

      mainList.push(newArr);
    }
    return mainList;
  }, [treadlsList, shaftsList, lastList]);
  if (treadlsList.length !== picks || shaftsList.length !== shafts) {
    return <></>;
  }

  const deepCopy = (data) => {
    return JSON.parse(JSON.stringify(data));
  };
  return (
    <div>
      <div
        className="main-app"
        id="main-app"
        onClick={() => {
          addRecord(
            deepCopy(treadlsList),
            deepCopy(shaftsList),
            deepCopy(treadlsColList),
            deepCopy(shaftsColList),
            deepCopy(lastList)
          );
        }}
      >
        <div className="mainApp-row">
          <div className="main">
            <PatternBox
              row={picks}
              disableClick={true}
              column={ends}
              colorList={mainList}
              whoAmI="main"
              boxSize={boxSize}
            />
          </div>
          <div className="treadls">
            <PatternBox
              row={picks}
              column={treadls}
              colorList={treadlsList}
              setList={setTreadlsList}
              whoAmI="treadls"
              boxSize={boxSize}
            />
          </div>
          <div>
            <PatternBox
              row={picks}
              column={1}
              colorList={treadlsColList}
              currentCol={currentCol}
              setList={setTreadlsColList}
              whoAmI="treadlsColor"
              boxSize={boxSize}
              mousePressed={mousePressed}
              setMousePressed={setMousePressed}
            />
          </div>
        </div>
        <div className="mainApp-row">
          <div className="shafts">
            <PatternBox
              row={shafts}
              column={ends}
              colorList={shaftsList}
              setList={setShaftsList}
              whoAmI="shafts"
              boxSize={boxSize}
            />
          </div>
          <div className="last">
            <PatternBox
              row={shafts}
              column={treadls}
              colorList={lastList}
              setList={setLastList}
              whoAmI="last"
              boxSize={boxSize}
            />
          </div>
        </div>
        <div className="mainApp-row">
          <div>
            <PatternBox
              row={1}
              column={ends}
              colorList={shaftsColList}
              currentCol={currentCol}
              setList={setShaftsColList}
              whoAmI="shaftsColor"
              boxSize={boxSize}
              mousePressed={mousePressed}
              setMousePressed={setMousePressed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainApp;
