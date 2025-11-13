# Triangle Classification Logic

## Overview
This application classifies triangles into three types based on their side lengths:
1. **Equilateral Triangle** - All three sides are equal
2. **Isosceles Triangle** - Exactly two sides are equal
3. **Scalene Triangle** - All three sides are different

---

## 1. Triangle Side Length Definitions

Located in `src/constants/config.js`:

```javascript
export const TRIANGLE_SIDE_LENGTHS = {
  equilateral: { a: 6, b: 6, c: 6 },  // All sides = 6 cm
  isosceles:   { a: 7, b: 7, c: 5 },  // Two sides = 7 cm, one = 5 cm
  scalene:     { a: 4, b: 6, c: 8 },  // All sides different: 4, 6, 8 cm
};
```

### Classification Rules:
- **Equilateral**: `a === b === c` (all equal)
- **Isosceles**: `(a === b && a !== c) || (a === c && a !== b) || (b === c && b !== a)` (exactly two equal)
- **Scalene**: `a !== b && a !== c && b !== c` (all different)

---

## 2. Triangle Shape Data

Each triangle in the application has a `type` property that identifies its classification:

```javascript
{ 
  id: "s1", 
  type: "equilateral",  // ← This determines the classification
  x: 650, 
  y: 40, 
  w: 160, 
  h: 130, 
  rotation: 0 
}
```

The `type` is set when the triangle is created and never changes. It determines:
- Which side lengths to use for rendering
- Which container accepts this triangle
- The triangle's default color

---

## 3. Container Acceptance Logic

Each drop zone container has an `accept` property that specifies which triangle type it accepts:

```javascript
const containerTypes = [
  { id: "c1", label: "Equilateral Triangle", accept: "equilateral" },
  { id: "c2", label: "Isosceles Triangle",   accept: "isosceles" },
  { id: "c3", label: "Scalene Triangle",     accept: "scalene" },
];
```

---

## 4. Drop Validation Logic

When a triangle is dropped into a container, the validation happens in `src/hooks/useDragAndDrop.js`:

```javascript
// Line 55: The key classification check
const isCorrect = hitContainer.accept === draggedShape.type;
```

### How it works:
1. **User drags a triangle** → Triangle's `type` property is checked
2. **Triangle is dropped** → System finds which container the triangle's center is in
3. **Validation** → Compares `container.accept` with `triangle.type`
4. **Result**:
   - ✅ **Correct**: `container.accept === triangle.type` → Triangle centers in container, border turns green
   - ❌ **Incorrect**: `container.accept !== triangle.type` → Border turns red, triangle stays where dropped

---

## 5. Visual Rendering

The triangle's side lengths are used to calculate its actual shape using geometry:

**File**: `src/utils/geometry.js`
- `calculateTriangleFromSides()` - Uses law of cosines to calculate triangle vertices from side lengths
- `getTrianglePoints()` - Scales and centers the triangle within its bounding box

**Example**:
- Equilateral triangle with sides (6, 6, 6) → All angles = 60°
- Isosceles triangle with sides (7, 7, 5) → Two equal angles, one different
- Scalene triangle with sides (4, 6, 8) → All angles different

---

## 6. Flow Diagram

```
┌─────────────────┐
│ Triangle Created│
│ type: "scalene" │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ User Drags      │
│ Triangle        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ User Drops in   │
│ Container       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Check: container.accept ===     │
│        triangle.type?           │
└────────┬────────────────────────┘
         │
    ┌────┴────┐
    │         │
   YES       NO
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│Correct │ │Incorrect│
│Green   │ │Red      │
│Centered│ │Stays    │
└────────┘ └────────┘
```

---

## 7. Key Code Locations

| File | Purpose |
|------|---------|
| `src/constants/config.js` | Defines side lengths and triangle types |
| `src/hooks/useDragAndDrop.js` | Validates drop: `hitContainer.accept === draggedShape.type` |
| `src/utils/geometry.js` | Calculates triangle shape from side lengths |
| `src/components/DropZone.jsx` | Displays containers with accept labels |
| `src/components/TriangleShape.jsx` | Renders triangle using calculated points |

---

## Summary

The classification is **pre-determined** by the triangle's `type` property, which is set when the triangle is created. The system doesn't dynamically measure or calculate the classification - it simply compares the triangle's stored `type` with the container's `accept` property to validate if the drop is correct.

The actual geometric properties (side lengths) are used only for **visual rendering** to make the triangles look geometrically correct, but the **classification validation** is based purely on string matching: `container.accept === triangle.type`.

