export function DropZone({ container, dropStatus }) {
  const occupying = Object.entries(dropStatus).find(
    ([, v]) => v.containerId === container.id
  );
  const borderClass = occupying
    ? occupying[1].correct
      ? "container-zone-correct"
      : "container-zone-incorrect"
    : "container-zone-empty";

  return (
    <div
      className={`container-zone ${borderClass}`}
      style={{
        left: container.x,
        top: container.y,
        width: container.w,
        height: container.h,
      }}
    >
      <div className="container-label">{container.label}</div>
      {/* <div className="container-accept">accepts: {container.accept}</div> */}
    </div>
  );
}

