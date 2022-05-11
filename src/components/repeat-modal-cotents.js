import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Box from "./box";
import "./repeat-modal-contents.css";
import { CompactPicker } from "react-color";

function RepeatModalContents({ setSelectedOptions }) {
  const [warpTreading, setWarpTreading] = useState(true);
  const [warpColor, setWarpColor] = useState(true);
  const [warpStartPosition, setWarpStartPosition] = useState(1);
  const [warpEndPosition, setWarpEndPosition] = useState(1);
  const [weftTreading, setWeftTreading] = useState(true);
  const [weftColor, setWeftColor] = useState(true);
  const [weftStartPosition, setWeftStartPosition] = useState(1);
  const [weftEndPosition, setWeftEndPosition] = useState(1);
  useEffect(() => {
    setSelectedOptions({
      warpTreading,
      warpColor,
      warpStartPosition,
      warpEndPosition,
      weftTreading,
      weftColor,
      weftStartPosition,
      weftEndPosition,
    });
  }, [
    warpTreading,
    warpColor,
    warpStartPosition,
    warpEndPosition,
    weftTreading,
    weftColor,
    weftStartPosition,
    weftEndPosition,
  ]);
  console.log(warpTreading);
  return (
    <div className="repeatModal">
      <div>
        <div className="repeatModalRow">
          <input
            type="checkbox"
            id="warp-threading"
            checked={warpTreading}
            onChange={(e) => setWarpTreading(e.target.checked)}
          />
          <label htmlFor="warp-threading">Threading</label>
          <input
            type="checkbox"
            id="warp-color"
            checked={warpColor}
            onChange={(e) => setWarpColor(e.target.checked)}
          />
          <label htmlFor="warp-color">Warp Color</label>
        </div>
        <div className="repeatSource">
          <div className="repeatPositionWrapper">
            <label htmlFor="warp-startingPosition">Start Position</label>
            <input
              className="repeatPosition"
              type="number"
              id="warp-startingPosition"
              value={warpStartPosition}
              onChange={(e) => setWarpStartPosition(e.target.valueAsNumber)}
            />
          </div>
          <div className="repeatPositionWrapper">
            <label htmlFor="warp-endPosition">End Position</label>
            <input
              className="repeatPosition"
              type="number"
              id="warp-endPosition"
              value={warpEndPosition}
              onChange={(e) => setWarpEndPosition(e.target.valueAsNumber)}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="repeatModalRow">
          <input
            type="checkbox"
            id="weft-threading"
            checked={weftTreading}
            onChange={(e) => setWeftTreading(e.target.checked)}
          />
          <label htmlFor="weft-threading">Threading</label>
          <input
            type="checkbox"
            id="weft-color"
            checked={weftColor}
            onChange={(e) => setWeftColor(e.target.checked)}
          />
          <label htmlFor="weft-color">Weft Color</label>
        </div>
        <div className="repeatSource">
          <div className="repeatPositionWrapper">
            <label htmlFor="weft-startingPosition">Start Position</label>
            <input
              className="repeatPosition"
              type="number"
              id="weft-startingPosition"
              value={weftStartPosition}
              onChange={(e) => setWeftStartPosition(e.target.valueAsNumber)}
            />
          </div>
          <div className="repeatPositionWrapper">
            <label htmlFor="weft-endPosition">End Position</label>
            <input
              className="repeatPosition"
              type="number"
              id="weft-endPosition"
              value={weftEndPosition}
              onChange={(e) => setWeftEndPosition(e.target.valueAsNumber)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default RepeatModalContents;
