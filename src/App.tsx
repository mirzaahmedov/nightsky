import React, { createContext } from "react";

import "./styles.css";

const initialCanvasSize = {
  width: 0,
  height: 0,
};

function App() {
  const canvas = React.useRef<HTMLCanvasElement>(null);

  const [canvasSize, setCanvasSize] = React.useState(initialCanvasSize);
  const [starsArray, setStarsArray] = React.useState(Array(100).fill(0));

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

      function drawRandomStar(ctx: CanvasRenderingContext2D) {
        const { width, height } = canvasSize;

        const random = (value: number) => Math.random() * value;

        ctx.moveTo(random(width), random(height));

        ctx.fillStyle = "#FFFFFF";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = "rgba(255,255,255,0.15)";
        ctx.shadowBlur = 30;

        ctx.arc(random(width), random(height), random(5), 0, 2 * Math.PI);
        ctx.fill();
      }

      const ctx = canvas.current.getContext("2d");
      if (!ctx) return;

      for (let index = 0; index < 100; index++) {
        drawRandomStar(ctx);
      }
    },
    [canvasSize]
  );

  return (
    <canvas
      width={canvasSize.width}
      height={canvasSize.height}
      style={{
        display: "block",
        backgroundColor: "black",
      }}
      ref={canvas}
    ></canvas>
  );
}

export default App;
