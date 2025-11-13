export const TRIANGLE_SIDE_LENGTHS = {
  equilateral: { a: 6, b: 6, c: 6 },
  isosceles: { a: 7, b: 7, c: 5 },
  scalene: { a: 4, b: 6, c: 8 },
};

export const INITIAL_SHAPES = [
  { id: "s1", type: "equilateral", x: 650, y: 40, w: 160, h: 130, rotation: 0, color: "#60a5fa", selectedColor: "#1d4ed8", sideLengths: { a: 6, b: 6, c: 6 } },
  { id: "s2", type: "isosceles", y: 50, x: 450, w: 150, h: 120, rotation: 0, color: "#f97316", selectedColor: "#b45309", sideLengths: { a: 7, b: 7, c: 5 } },
  { id: "s3", type: "scalene", y: 40, x: 850, w: 160, h: 120, rotation: 0, color: "#34d399", selectedColor: "#065f46", sideLengths: { a: 4, b: 6, c: 8 } },
  { id: "s4", type: "equilateral", x: 900, y: 150, w: 140, h: 120, rotation: 60, color: "#a855f7", selectedColor: "#7c3aed", sideLengths: { a: 5, b: 5, c: 5 } },
  { id: "s5", type: "isosceles", x: 1000, y: 50, w: 150, h: 120, rotation: 120, color: "#ec4899", selectedColor: "#be185d", sideLengths: { a: 8, b: 8, c: 6 } },
  { id: "s6", type: "scalene", x: 1200, y: 80, w: 160, h: 120, rotation: 180, color: "#f59e0b", selectedColor: "#d97706", sideLengths: { a: 5, b: 7, c: 9 } },
];

const CONTAINER_WIDTH = 350;
const CONTAINER_GAP = 50;
const CONTAINER_START_X = 400;
const CONTAINER_Y = 320;
const CONTAINER_H = 180;

const containerTypes = [
  { id: "c1", label: "Equilateral Triangle", accept: "equilateral" },
  { id: "c2", label: "Isosceles Triangle", accept: "isosceles" },
  { id: "c3", label: "Scalene Triangle", accept: "scalene" },
];

export const CONTAINERS = containerTypes.map((type, index) => ({
  ...type,
  x: CONTAINER_START_X + (CONTAINER_WIDTH + CONTAINER_GAP) * index,
  y: CONTAINER_Y,
  w: CONTAINER_WIDTH,
  h: CONTAINER_H,
}));



export const DEFAULT_UNIT_SCALE = 37.795275591;

export const BOARD_HEIGHT = "100%";