import { DEFAULT_UNIT_SCALE } from "../constants/config";

export function Ruler({ position, rotation, rulerRef, onPointerDown, onRotationHandleDown, unitScale = DEFAULT_UNIT_SCALE }) {
  const rulerLengthCm = 15;
  const rulerLengthPx = rulerLengthCm * unitScale;
  const rulerHeight = 30;
  const markHeight = 14;
  const svgHeight = rulerHeight + 20;
  const handleSize = 12;

  const renderScaleMarks = () => {
    const marks = [];
    for (let i = 0; i <= rulerLengthCm * 10; i++) {
      const cm = i / 10;
      const x = (cm / rulerLengthCm) * rulerLengthPx;
      const isMajorMark = i % 10 === 0;
      const isHalfMark = i % 5 === 0 && !isMajorMark;
      
      let currentMarkHeight;
      if (isMajorMark) currentMarkHeight = markHeight;
      else if (isHalfMark) currentMarkHeight = markHeight * 0.6;
      else currentMarkHeight = markHeight * 0.3;

      marks.push(
        <line
          key={i}
          x1={x}
          y1={0}
          x2={x}
          y2={currentMarkHeight}
          stroke="#000"
          strokeWidth={isMajorMark ? 1.5 : 1}
        />
      );

      if (isMajorMark) {
        marks.push(
          <text
            key={`text-${i}`}
            x={x}
            y={rulerHeight + 12}
            textAnchor="middle"
            fontSize="10"
            fill="#000"
          >
            {cm}
          </text>
        );
      }
    }
    
   
    
    return marks;
  };

  return (
    <div
      ref={rulerRef}
      className="ruler"
      style={{
        left: position.x,
        top: position.y,
        zIndex: 80,
        position: "absolute",
        transformOrigin: "0 50%",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div
        onPointerDown={onPointerDown}
        style={{
          cursor: "move",
        }}
      >
        <svg
          width={rulerLengthPx}
          height={svgHeight}
          style={{ display: "block" }}
        >
          {renderScaleMarks()}
        </svg>
      </div>
      <div
        onPointerDown={onRotationHandleDown}
        style={{
          position: "absolute",
          left: rulerLengthPx - handleSize / 2,
          top: svgHeight / 2 - handleSize / 2,
          width: handleSize,
          height: handleSize,
          borderRadius: "50%",
          backgroundColor: "#ff0000",
          cursor: "grab",
          border: "2px solid #fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}