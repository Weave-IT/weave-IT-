import "./App.css";
import MainApp from "./components/main-app";
import Header from "./components/header";
import OptionModal from "./components/option-modal";
import RepeatModal from "./components/repeat-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useEffect, useRef, useState } from "react";
import Menu from "./components/menu";
import html2canvas from "html2canvas";
import { Routes, Route, useLocation } from "react-router-dom";
import HowTo from "./components/howto";
import MainPage from "./components/mainPage";
const onSaveAs = (uri, filename) => {
  const link = document.createElement("a");
  document.body.appendChild(link);
  link.href = uri;
  link.download = filename;
  link.click();
  document.body.removeChild(link);
};
export const MouseContext = createContext({});
function App() {
  const [show, setShow] = useState(true);
  const [repeatModalShow, setRepeatModalShow] = useState(false);
  const [currentCol, setCurrentCol] = useState("#ffffff");
  const [options, setOptions] = useState({});
  const [repeatModaloptions, setRepeatModalOptions] = useState({});
  const clearListRef = useRef();
  const [boxSize, setBoxSize] = useState(15);
  const mainAppWrapperRef = useRef();
  const [mousePressed, setMousePressed] = useState(false);
  const datasRef = useRef();
  const cellWidth = 15;
  const { pathname } = useLocation();

  const onCapturePNG = () => {
    html2canvas(document.getElementById("main-app"), {
      width: options.ends * cellWidth + options.treadls * cellWidth + 80,
      height: options.picks * cellWidth + options.shafts * cellWidth + 80,
    }).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), "image.png");
    });
  };
  const onCaptureJPG = () => {
    html2canvas(document.getElementById("main-app"), {
      width: options.ends * cellWidth + options.treadls * cellWidth + 80,
      height: options.picks * cellWidth + options.shafts * cellWidth + 80,
    }).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/jpg"), "image.jpg");
    });
  };
  useEffect(() => {
    setTimeout(() => {
      mainAppWrapperRef.current.scrollTo(9999, 9999);
    }, 1);
  }, [options, boxSize, pathname]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage></MainPage>} />
        <Route
          path="/app"
          element={
            <div className="contents">
              <Header></Header>
              <div className="innercontents">
                <OptionModal
                  setOptions={setOptions}
                  show={show}
                  setShow={setShow}
                />
                <RepeatModal
                  setOptions={setRepeatModalOptions}
                  show={repeatModalShow}
                  setShow={setRepeatModalShow}
                />
                <Menu
                  setShow={setShow}
                  setCurrentCol={setCurrentCol}
                  currentCol={currentCol}
                  setRepeatModalShow={setRepeatModalShow}
                  onCapturePNG={onCapturePNG}
                  onCaptureJPG={onCaptureJPG}
                  clearListRef={clearListRef}
                  setBoxSize={setBoxSize}
                  datasRef={datasRef}
                />
                <MouseContext.Provider
                  value={{ mousePressed, setMousePressed }}
                >
                  <div ref={mainAppWrapperRef} className="mainAppWrapper">
                    <MainApp
                      options={options}
                      currentCol={currentCol}
                      repeatModaloptions={repeatModaloptions}
                      clearListRef={clearListRef}
                      boxSize={boxSize}
                      datasRef={datasRef}
                    />
                  </div>
                </MouseContext.Provider>
              </div>
            </div>
          }
        />
        <Route path="/howto" element={<HowTo />} />
      </Routes>
    </div>
  );
}

export default App;
