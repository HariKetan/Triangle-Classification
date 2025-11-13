import { getTrianglePoints } from "../utils/geometry";
import {TRIANGLE_SIDE_LENGTHS, DEFAULT_UNIT_SCALE } from "../constants/config";

export function TriangleShape({ type, w, h, selected, color, selectedColor, sideLengths, dropStatus, unitScale }) {
  const sides = sideLengths ;
  const scale = unitScale || DEFAULT_UNIT_SCALE;
  const points = getTrianglePoints(type, w, h, sides, scale);
  const fillColor = color || "#34d399";
  const strokeColor = selected ? (selectedColor || "#065f46") : fillColor;

  const showTick = dropStatus?.correct === true;
  const showCross = dropStatus?.correct === false;
  const centerX = w / 3;
  const centerY = h / 3;
  const iconSize = Math.min(w, h) * 0.1;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shape-svg">
      <polygon
        points={points}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={selected ? 2 : 4}
      />
      {showTick && (
        <g transform={`translate(${centerX}, ${centerY})`}>
          <path
            d={`M ${-iconSize * 0.4} 0 L ${-iconSize * 0.1} ${iconSize * 0.3} L ${iconSize * 0.4} ${-iconSize * 0.3}`}
            stroke="#10b981"
            strokeWidth={iconSize * 0.15}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      )}
      {showCross && (
        <g transform={`translate(${centerX}, ${centerY})`}>
          <line
            x1={-iconSize * 0.4}
            y1={-iconSize * 0.4}
            x2={iconSize * 0.4}
            y2={iconSize * 0.4}
            stroke="#ef4444"
            strokeWidth={iconSize * 0.15}
            strokeLinecap="round"
          />
          <line
            x1={iconSize * 0.4}
            y1={-iconSize * 0.4}
            x2={-iconSize * 0.4}
            y2={iconSize * 0.4}
            stroke="#ef4444"
            strokeWidth={iconSize * 0.15}
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}
