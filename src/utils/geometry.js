import { TRIANGLE_SIDE_LENGTHS } from "../constants/config";

function calculateTriangleFromSides(a, b, c, scale) {
  const aPx = a * scale;
  const bPx = b * scale;
  const cPx = c * scale;

  const p1 = { x: 0, y: 0 };
  const p2 = { x: aPx, y: 0 };
  
  const cosAngle = (bPx * bPx + aPx * aPx - cPx * cPx) / (2 * aPx * bPx);
  const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
  const p3 = {
    x: bPx * Math.cos(angle),
    y: bPx * Math.sin(angle)
  };

  return [p1, p2, p3];
}

export function getTrianglePoints(type, w, h, sideLengths = null, scale = 37.795275591) {
  const sides = sideLengths || TRIANGLE_SIDE_LENGTHS[type] || TRIANGLE_SIDE_LENGTHS.equilateral;
  const [p1, p2, p3] = calculateTriangleFromSides(sides.a, sides.b, sides.c, scale);

  const minX = Math.min(p1.x, p2.x, p3.x);
  const maxX = Math.max(p1.x, p2.x, p3.x);
  const minY = Math.min(p1.y, p2.y, p3.y);
  const maxY = Math.max(p1.y, p2.y, p3.y);
  const triangleWidth = maxX - minX;
  const triangleHeight = maxY - minY;

  const scaleX = w / triangleWidth;
  const scaleY = h / triangleHeight;
  const scaleFactor = Math.min(scaleX, scaleY) * 0.9;

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  const transformPoint = (p) => {
    const scaledX = (p.x - centerX) * scaleFactor + w / 2;
    const scaledY = (p.y - centerY) * scaleFactor + h / 2;
    return { x: scaledX, y: scaledY };
  };

  const tp1 = transformPoint(p1);
  const tp2 = transformPoint(p2);
  const tp3 = transformPoint(p3);

  return `${tp1.x},${tp1.y} ${tp2.x},${tp2.y} ${tp3.x},${tp3.y}`;
}

export function isPointInRect(point, rect) {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.w &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.h
  );
}

export function isShapeInContainer(shape, container) {
  const centerX = shape.x + shape.w / 2;
  const centerY = shape.y + shape.h / 2;
  return isPointInRect({ x: centerX, y: centerY }, container);
}

export function getCenteredPosition(shape, container) {
  return {
    x: container.x + (container.w - shape.w) / 2,
    y: container.y + (container.h - shape.h) / 2,
  };
}

export function getShapeMeasurements(shape) {
  return {
    widthPx: Math.round(shape.w),
    heightPx: Math.round(shape.h),
  };
}

export function pixelsToCm(pixels, scale) {
  return pixels / scale;
}