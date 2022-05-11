import "./menu.css";
import { PhotoshopPicker } from "react-color";
import { useState } from "react";
import { getRecord } from "./back";
import backimage from "./images/back.png";
import colchangeimage from "./images/colchange.png";
import JPGimage from "./images/JPG.png";
import newfileimage from "./images/newfile.png";
import PNGimage from "./images/PNG.png";
import repeatimage from "./images/repeat.png";
import settingimage from "./images/setting.png";
import smallimage from "./images/small.png";
import zoomimage from "./images/zoom.png";

function Menu({
  setShow,
  currentCol,
  setCurrentCol,
  setRepeatModalShow,
  onCapturePNG,
  onCaptureJPG,
  setBoxSize,
  datasRef,

  clearListRef,
}) {
  const [isColorPickerOpen, setisColorPickerOpen] = useState(false);
  const [color, setColor] = useState(currentCol);
  return (
    <div className="menu">
      <div className="menu-row">
        <div onClick={() => clearListRef.current()}>
          <img className="icon" src={newfileimage}></img>
        </div>
        <div
          onClick={() => {
            const {
              setTreadlsColList,
              setShaftsColList,
              setTreadlsList,
              setShaftsList,
              setLastList,
            } = datasRef.current;
            getRecord(
              setTreadlsList,
              setShaftsList,
              setTreadlsColList,
              setShaftsColList,
              setLastList
            );
          }}
        >
          <img className="icon" src={backimage}></img>
        </div>
      </div>
      <div className="menu-row">
        <div onClick={() => onCapturePNG()}>
          <img className="icon" src={PNGimage}></img>
        </div>
        <div onClick={() => setRepeatModalShow(true)}>
          <img className="icon" src={repeatimage}></img>
        </div>
      </div>
      <div className="menu-row">
        <div onClick={() => onCaptureJPG()}>
          <img className="icon" src={JPGimage}></img>
        </div>
        <div onClick={() => setBoxSize((s) => s - 1)}>
          <img className="icon" src={smallimage}></img>
        </div>
      </div>
      <div className="menu-row">
        <div onClick={() => setShow(true)}>
          <img className="icon" src={settingimage}></img>
        </div>
        <div onClick={() => setBoxSize((s) => s + 1)}>
          <img className="icon" src={zoomimage}></img>
        </div>
      </div>
      <div className="menu-row">
        <div></div>
        <div onClick={() => setisColorPickerOpen(true)}>
          <img className="icon" src={colchangeimage}></img>
        </div>
      </div>
      <PhotoshopPicker
        className={`photoshop-colPick ${isColorPickerOpen ? "open" : ""}`}
        color={color}
        onChangeComplete={(color) => setColor(color.hex)}
        onAccept={() => {
          setisColorPickerOpen(false);
          setCurrentCol(color);
        }}
        onCancel={() => setisColorPickerOpen(false)}
      />
    </div>
  );
}
export default Menu;
