import { useState, useEffect, useRef } from "react";

export function useRuler(initialPosition = { x: 600, y: 600 }, initialRotation = 0) {
  const [rulerPos, setRulerPos] = useState(initialPosition);
  const [rulerRotation, setRulerRotation] = useState(initialRotation);
  const [rulerDragging, setRulerDragging] = useState(false);
  const [rulerRotating, setRulerRotating] = useState(false);
  const [rulerDragOffset, setRulerDragOffset] = useState({ x: 0, y: 0 });
  const rulerRef = useRef(null);

  const getClientCoords = (e) => ({
    x: e.clientX ?? (e.touches?.[0]?.clientX),
    y: e.clientY ?? (e.touches?.[0]?.clientY),
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    const { x: clientX, y: clientY } = getClientCoords(e);
    setRulerDragOffset({
      x: clientX - rulerPos.x,
      y: clientY - rulerPos.y,
    });
    setRulerDragging(true);
  };

  const handleRotationHandleDown = (e) => {
    e.stopPropagation();
    setRulerRotating(true);
  };

  useEffect(() => {
    if (!rulerDragging) return;

    const handleMove = (e) => {
      const { x: clientX, y: clientY } = getClientCoords(e);
      setRulerPos({
        x: clientX - rulerDragOffset.x,
        y: clientY - rulerDragOffset.y,
      });
    };

    const handleUp = () => setRulerDragging(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [rulerDragging, rulerDragOffset]);

  useEffect(() => {
    if (!rulerRotating || !rulerRef.current) return;

    const handleMove = (e) => {
      const { x: clientX, y: clientY } = getClientCoords(e);
      const rect = rulerRef.current.getBoundingClientRect();
      const pivotX = rect.left;
      const pivotY = rect.top + rect.height / 2;
      
      const dx = clientX - pivotX;
      const dy = clientY - pivotY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setRulerRotation(angle);
    };

    const handleUp = () => setRulerRotating(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [rulerRotating, rulerPos]);

  return {
    rulerPos,
    rulerRotation,
    rulerRef,
    handlePointerDown,
    handleRotationHandleDown,
  };
}

