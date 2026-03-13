import React from "react";

const WAVE_PATHS = {
  wave1:
    "M0,64 C320,120 640,0 960,64 C1280,128 1440,32 1440,32 L1440,320 L0,320 Z",
  wave2:
    "M0,96 C240,160 480,32 720,96 C960,160 1200,48 1440,96 L1440,320 L0,320 Z",
  wave3:
    "M0,64 C180,128 360,0 540,64 C720,128 900,16 1080,80 C1260,144 1440,48 1440,48 L1440,320 L0,320 Z",
};

const WaveDivider = ({ fromColor, toColor, variant = "wave1", flip = false, height = 80 }) => {
  const path = WAVE_PATHS[variant] || WAVE_PATHS.wave1;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
        overflow: "hidden",
        lineHeight: 0,
        backgroundColor: fromColor,
        transform: flip ? "rotate(180deg)" : "none",
        marginTop: flip ? "-1px" : 0,
        marginBottom: flip ? 0 : "-1px",
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <path d={path} fill={toColor} />
      </svg>
    </div>
  );
};

export default WaveDivider;
