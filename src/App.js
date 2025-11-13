import { useState } from "react";
import "./App.css";
import { INITIAL_SHAPES, CONTAINERS, DEFAULT_UNIT_SCALE } from "./constants/config";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useRuler } from "./hooks/useRuler";
import { DraggableShape } from "./components/DraggableShape";
import { DropZone } from "./components/DropZone";
import { Ruler } from "./components/Ruler";


export default function App() {
  const [shapes, setShapes] = useState(INITIAL_SHAPES);
  const [dropStatus, setDropStatus] = useState({});
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [unitScale, setUnitScale] = useState(DEFAULT_UNIT_SCALE);

  const { boardRef, handlePointerDown } = useDragAndDrop(
    shapes,
    setShapes,
    CONTAINERS,
    setDropStatus,
    setSelectedShapeId
  );

  const { rulerPos, rulerRotation, rulerRef, handlePointerDown: handleRulerPointerDown, handleRotationHandleDown } = useRuler();

  const selectedShape = shapes.find((s) => s.id === selectedShapeId);

  const handleReset = () => {
    setShapes(INITIAL_SHAPES);
    setDropStatus({});
    setSelectedShapeId(null);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Triangle Classification</h1>
      <div className="app-layout">
        <div className="app-main">
          
          <div className="board" ref={boardRef}>
            {CONTAINERS.map((container) => (
              <DropZone
                key={container.id}
                container={container}
                dropStatus={dropStatus}
              />
            ))}

            {shapes.map((shape) => (
              <DraggableShape
                key={shape.id}
                shape={shape}
                selected={selectedShapeId === shape.id}
                dropStatus={dropStatus[shape.id]}
                onPointerDown={handlePointerDown}
                onClick={() => setSelectedShapeId(shape.id)}
                unitScale={unitScale}
              />
            ))}

            <Ruler
              position={rulerPos}
              rotation={rulerRotation}
              rulerRef={rulerRef}
              onPointerDown={handleRulerPointerDown}
              onRotationHandleDown={handleRotationHandleDown}
              unitScale={unitScale}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
