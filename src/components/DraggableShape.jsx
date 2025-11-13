import { TriangleShape } from "./TriangleShape";

export function DraggableShape({ shape, selected, dropStatus, onPointerDown, onClick, unitScale }) {
  const { rotation = 0 } = shape;
  
  return (
    <div
      className="shape-wrapper"
      onPointerDown={(e) => onPointerDown(e, shape)}
      onClick={onClick}
      style={{
        left: shape.x,
        top: shape.y,
        width: shape.w,
        height: shape.h,
        zIndex: selected ? 40 : 20,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center',
      }}
    >
      <TriangleShape
        type={shape.type}
        w={shape.w}
        h={shape.h}
        selected={selected}
        color={shape.color}
        selectedColor={shape.selectedColor}
        sideLengths={shape.sideLengths}
        dropStatus={dropStatus}
        unitScale={unitScale}
      />
    </div>
  );
}
