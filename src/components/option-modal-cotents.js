import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Box from "./box";
import "./option-modal-contents.css";
import { CompactPicker } from "react-color";

function OptionModalContents({ setSelectedOptions }) {
  const [warpColor, setWarpColor] = useState("#000000");
  const [weftColor, setWeftColor] = useState("#B3B3B3");
  const [shafts, setShafts] = useState(4);
  const [treadls, setTreadls] = useState(8);
  const [ends, setEnds] = useState(150);
  const [picks, setPicks] = useState(170);
  useEffect(() => {
    setSelectedOptions({ warpColor, weftColor, shafts, treadls, ends, picks });
  }, [warpColor, weftColor, shafts, treadls, ends, picks]);
  return (
    <div>
      <div className="optionModalRow">
        <div>
          <span className="optionalMargin">shafts</span>
          <input
            type="number"
            max="20"
            min="2"
            value={shafts}
            onChange={(e) => {
              setShafts(e.target.valueAsNumber);
            }}
          />
        </div>
        <div>
          <span className="optionalMargin">treadls</span>
          <input
            type="number"
            max="20"
            min="2"
            value={treadls}
            onChange={(e) => {
              setTreadls(e.target.valueAsNumber);
            }}
          />
        </div>
      </div>
      <div className="optionModalRow">
        <div>
          <span className="optionalMargin">ends</span>
          <input
            type="number"
            max="500"
            min="2"
            value={ends}
            onChange={(e) => {
              setEnds(e.target.valueAsNumber);
            }}
          />
        </div>
        <div>
          <span className="optionalMargin">picks</span>
          <input
            type="number"
            max="500"
            min="2"
            value={picks}
            onChange={(e) => {
              setPicks(e.target.valueAsNumber);
            }}
          />
        </div>
      </div>
      <div className="optionModalRow">
        <CompactPicker
          color={warpColor}
          onChange={(color) => {
            setWarpColor(color.hex);
          }}
        />
      </div>
      <div className="optionModalRow">
        <CompactPicker
          color={weftColor}
          onChange={(color) => {
            setWeftColor(color.hex);
          }}
        />
      </div>
    </div>
  );
}
export default OptionModalContents;
