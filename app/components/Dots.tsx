"use client"

import { motion, MotionValue, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { useDebounceValue, useWindowSize } from "usehooks-ts";
const cellSize = 40;
const dotSize = 4;
const proximityRadius = 5 * cellSize; // 5 cells radius

export interface DotProps {
  xPos: number;
  yPos: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

// Add touch detection
const isTouchDevice = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;

// In the Dot component, adjust spring settings based on device
const getDotSpringConfig = (isTouch: boolean) => ({
  stiffness: isTouch ? 150 : 100,
  damping: isTouch ? 25 : 20,
  mass: isTouch ? 0.8 : 1.5,
  restSpeed: 0.5,
});

const Dot = ({ xPos, yPos, mouseX, mouseY }: DotProps) => {
  const isTouch = isTouchDevice();
  const springConfig = getDotSpringConfig(isTouch);

  const scale = useSpring(1, springConfig);
  const translateX = useSpring(0, springConfig);
  const translateY = useSpring(0, springConfig);

  useEffect(() => {
    let frameId: number;

    const updatePosition = (mouseXPos: number, mouseYPos: number) => {
      const distance = Math.sqrt(Math.pow(mouseXPos - xPos, 2) + Math.pow(mouseYPos - yPos, 2));

      const animate = () => {
        if (distance > proximityRadius * 1.5) {
          scale.set(1);
          translateX.set(0);
          translateY.set(0);
          return;
        }

        const newScale = Math.max(
          0.2,
          Math.min(1, distance < proximityRadius ? 1 - ((proximityRadius - distance) / proximityRadius) * 0.8 : 1)
        );

        if (distance < proximityRadius) {
          const distanceFactor = (proximityRadius - distance) / proximityRadius;
          const directionX = mouseXPos - xPos;
          const directionY = mouseYPos - yPos;
          const pullX = Math.max(-cellSize, Math.min(cellSize, directionX * distanceFactor * 0.5));
          const pullY = Math.max(-cellSize, Math.min(cellSize, directionY * distanceFactor * 0.5));
          translateX.set(pullX);
          translateY.set(pullY);
        } else {
          translateX.set(0);
          translateY.set(0);
        }

        scale.set(newScale);
      };

      frameId = requestAnimationFrame(animate);
    };

    const unsubscribeX = mouseX.on("change", (x) => {
      updatePosition(x, mouseY.get());
    });

    const unsubscribeY = mouseY.on("change", (y) => {
      updatePosition(mouseX.get(), y);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [mouseX, mouseY, xPos, yPos, scale, translateX, translateY]);

  const redOffset = 2;
  const blueOffset = 2;

  return (
    <>
      <motion.div
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          position: "absolute",
          left: xPos,
          top: yPos,
          scale,
          x: translateX.get() + redOffset,
          y: translateY.get() + redOffset,
          zIndex: 1,
        }}
      />
      <motion.div
        style={{
          backgroundColor: "rgba(0, 0, 255, 0.5)",
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          position: "absolute",
          left: xPos,
          top: yPos,
          scale,
          x: translateX.get() - blueOffset,
          y: translateY.get() - blueOffset,
          zIndex: 1,
        }}
      />
      <motion.div
        className="dot--white"
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          position: "absolute",
          left: xPos,
          top: yPos,
          scale,
          x: translateX,
          y: translateY,
          zIndex: 2,
        }}
      />
    </>
  );
};

function Dots() {
  const { width, height } = useWindowSize();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [debouncedWidth] = useDebounceValue(width, 50);
  const [debouncedHeight] = useDebounceValue(height, 50);

  const gridData = useMemo(() => {
    const safeWidth = debouncedWidth - (debouncedWidth % cellSize);
    const safeHeight = debouncedHeight - (debouncedHeight % cellSize);
    const totalCells = (safeWidth / cellSize) * (safeHeight / cellSize);

    return {
      safeWidth,
      safeHeight,
      totalCells,
    };
  }, [debouncedWidth, debouncedHeight]);

  const isTouchActiveRef = useRef(false);

  // Adjust spring mouse settings based on device
  const getMouseSpringConfig = (isTouch: boolean) => ({
    stiffness: isTouch ? 150 : 75,
    damping: isTouch ? 25 : 15,
    mass: isTouch ? 0.3 : 1,
  });

  const isTouch = isTouchDevice();
  const mouseSpringConfig = getMouseSpringConfig(isTouch);

  const springMouseX = useSpring(mouseX, mouseSpringConfig);
  const springMouseY = useSpring(mouseY, mouseSpringConfig);

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);

    return () => window.removeEventListener("resize", setVH);
  }, []);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (containerRef.current) {
      isTouchActiveRef.current = "touches" in e;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      mouseX.set(clientX - rect.left);
      mouseY.set(clientY - rect.top);
    }
  };

  const handleTouchEnd = () => {
    if (isTouchActiveRef.current) {
      const offScreenPositions = [
        [-300, -300],
        [-300, debouncedHeight + 300],
        [debouncedWidth + 300, -300],
        [debouncedWidth + 300, debouncedHeight + 300],
      ];
      const [randomX, randomY] = offScreenPositions[Math.floor(Math.random() * offScreenPositions.length)];

      springMouseX.set(randomX);

      springMouseY.set(randomY);
      isTouchActiveRef.current = false;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#202021",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "calc(var(--vh, 1vh) * 100)",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        MozUserSelect: "none",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: gridData.safeWidth,
          height: gridData.safeHeight,
          position: "relative",
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none",
          MozUserSelect: "none",
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseMove}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleTouchEnd}
      >
        {Array.from({ length: gridData.totalCells }).map((_, index) => {
          const columnsPerRow = gridData.safeWidth / cellSize;
          const rowIndex = Math.floor(index / columnsPerRow);
          const columnIndex = index % columnsPerRow;

          const xPos = columnIndex * cellSize + (cellSize - dotSize) / 2;
          const yPos = rowIndex * cellSize + (cellSize - dotSize) / 2;

          return <Dot key={index} xPos={xPos} yPos={yPos} mouseX={springMouseX} mouseY={springMouseY} />;
        })}
      </div>
    </div>
  );
}

export default Dots;
