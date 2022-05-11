import "./box.css";

function throttle(callback, milliseconds) {
  let throttleCheck;
  return function () {
    if (!throttleCheck) {
      throttleCheck = setTimeout(() => {
        callback(...arguments);
        throttleCheck = false;
      }, milliseconds);
    }
  };
}
function Box({
  boxInfo,
  disableClick = false,
  onClick,
  idx,
  boxSize,
  setMousePressed,
  mousePressed,
}) {
  const onBoxClick = () => {
    if (disableClick) {
      return;
    }
    throttle(() => {
      onClick?.();
    }, 500)();
  };

  return (
    <div
      className="box"
      onMouseDown={() => {
        setMousePressed?.(true);
        onBoxClick();
      }}
      onMouseOver={() => {
        if (mousePressed) {
          onBoxClick();
        }
      }}
      onMouseUp={() => {
        setMousePressed?.(false);
      }}
      style={{
        color: "blue",
        width: boxSize,
        height: boxSize,
        backgroundColor: boxInfo.isSelected ? boxInfo.color : "#ffffff",
      }}
    ></div>
  );
}
export default Box;
