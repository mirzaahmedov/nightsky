import { AnimatePresence } from "framer-motion";
import React from "react";

import Modal from "./components/Modal";

import "./styles.css";

const initialCanvasSize = {
  width: 0,
  height: 0,
};
const initialNewStar = {
  name: "",
};

const stars: {
  x: number;
  y: number;
  radius: number;
  fillStyle: string;
  lifeSpan: number;
  name?: string;
}[] = [];

function App() {
  const canvas = React.useRef<HTMLCanvasElement>(null);

  const [canvasSize, setCanvasSize] = React.useState(initialCanvasSize);
  const [timeSpan, setTimeSpan] = React.useState(50);

  const [newStar, setNewStar] = React.useState(initialNewStar);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  function onAddNewStarClick() {
    function random(min: number, max: number) {
      return min + Math.random() * (max - min);
    }

    stars.push({
      x: random(0, canvasSize.width),
      y: random(0, canvasSize.height),
      radius: random(1, 2),
      fillStyle: `rgba(255, 255, 255, ${Math.random()})`,
      lifeSpan: random(50, 1000),
      name: newStar.name,
    });

    setIsAddDialogOpen(false);
  }

  React.useEffect(function () {
    function resizeCanvas() {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();

    return window.removeEventListener("resize", resizeCanvas);
  }, []);
  React.useEffect(
    function () {
      if (!canvas.current) return;

      function random(min: number, max: number) {
        return min + Math.random() * (max - min);
      }

      const ctx = canvas.current.getContext("2d");
      if (!ctx) return;

      ctx.shadowColor = "#FFFFFF";
      ctx.shadowBlur = 10;

      for (let index = 0; index < 500; index++) {
        stars[index] = {
          x: random(0, canvasSize.width),
          y: random(0, canvasSize.height),
          radius: random(1, 2),
          fillStyle: `rgba(255, 255, 255, ${Math.random()})`,
          lifeSpan: random(50, 100000),
        };
      }
    },
    [canvasSize]
  );
  React.useEffect(
    function () {
      if (!canvas.current) return;

      function random(min: number, max: number) {
        return min + Math.random() * (max - min);
      }

      function renderStar(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number,
        fillStyle: string
      ) {
        ctx.beginPath();

        ctx.fillStyle = fillStyle;

        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
      }
      function renderText(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        text: string
      ) {
        ctx.fillStyle = "#04acaf";
        ctx.font = "40px Orbitron";
        ctx.fillText(text, x, y);
      }

      const ctx = canvas.current.getContext("2d");
      if (!ctx) return;

      const interval = setInterval(function () {
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

        for (let index = 0; index < stars.length; index++) {
          stars[index].lifeSpan -= timeSpan;

          if (stars[index].lifeSpan <= 0) {
            stars[index] = {
              x: random(0, canvasSize.width),
              y: random(0, canvasSize.height),
              radius: random(1, 2),
              fillStyle: `rgba(255, 255, 255, ${Math.random()})`,
              lifeSpan: random(50, 1000),
            };
          }
          renderStar(
            ctx,
            stars[index].x,
            stars[index].y,
            stars[index].radius,
            stars[index].fillStyle
          );
          if (stars[index].name !== undefined) {
            renderText(
              ctx,
              stars[index].x,
              stars[index].y,
              stars[index].name as string
            );
          }
        }
      }, 50);

      return () => clearInterval(interval);
    },
    [canvasSize, timeSpan]
  );

  return (
    <div>
      <canvas
        width={canvasSize.width}
        height={canvasSize.height}
        id="canvas"
        ref={canvas}
      ></canvas>
      <div className="dialog">
        <div className="dialog__group">
          <label className="dialog__label" htmlFor="time-span">
            DAYS / SECOND {timeSpan}
          </label>
          <input
            type="range"
            className="range"
            min="5"
            max="100"
            value={timeSpan}
            onChange={(event) => setTimeSpan(event.target.valueAsNumber)}
          />
        </div>
        <div className="dialog__group">
          <button className="button" onClick={() => setIsAddDialogOpen(true)}>
            ADD YOUR OWN STAR
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isAddDialogOpen && (
          <Modal
            title="create your own star"
            onConfirm={onAddNewStarClick}
            onClose={() => setIsAddDialogOpen(false)}
          >
            <input
              value={newStar.name}
              onChange={(event) =>
                setNewStar((state) => ({ ...state, name: event.target.value }))
              }
              type="text"
              name="name"
              className="textfield"
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
