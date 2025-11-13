import { useState, useEffect, useRef } from "react";
import { isShapeInContainer } from "../utils/geometry";

export function useDragAndDrop(
  shapes,
  onShapesChange,
  containers,
  onDropStatusChange,
  onShapeSelect
) {
  const [dragging, setDragging] = useState(null);
  const boardRef = useRef(null);

  const getClientCoords = (e) => ({
    x: e.clientX ?? (e.touches?.[0]?.clientX),
    y: e.clientY ?? (e.touches?.[0]?.clientY),
  });

  const handlePointerDown = (e, shape) => {
    e.preventDefault();
    if (!boardRef.current) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const { x: clientX, y: clientY } = getClientCoords(e);
    const offsetX = clientX - boardRect.left - shape.x;
    const offsetY = clientY - boardRect.top - shape.y;

    setDragging({ id: shape.id, offsetX, offsetY });
    onShapeSelect?.(shape.id);
    boardRef.current.setPointerCapture?.(e.pointerId);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e) => {
      if (!boardRef.current) return;
      e.preventDefault();
      const boardRect = boardRef.current.getBoundingClientRect();
      const { x: clientX, y: clientY } = getClientCoords(e);
      const newX = clientX - boardRect.left - dragging.offsetX;
      const newY = clientY - boardRect.top - dragging.offsetY;
      onShapesChange((prev) =>
        prev.map((s) => (s.id === dragging.id ? { ...s, x: newX, y: newY } : s))
      );
    };

    const handleUp = () => {
      const draggedShape = shapes.find((s) => s.id === dragging.id);
      if (draggedShape) {
        const hitContainer = containers.find((c) =>
          isShapeInContainer(draggedShape, c)
        );
        if (hitContainer) {
          const isCorrect = hitContainer.accept === draggedShape.type;
          onDropStatusChange((prev) => ({
            ...prev,
            [draggedShape.id]: { correct: isCorrect, containerId: hitContainer.id },
          }));
        } else {
          onDropStatusChange((prev) => ({
            ...prev,
            [draggedShape.id]: { correct: false, containerId: null },
          }));
        }
      }
      setDragging(null);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [dragging, shapes, containers, onShapesChange, onDropStatusChange]);

  return {
    boardRef,
    handlePointerDown,
  };
}