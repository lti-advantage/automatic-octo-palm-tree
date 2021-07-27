import { Feature, Polygon } from "@turf/helpers";
import { getGeom } from "@turf/invariant";

/**
 * Takes a polygon and return true or false as to whether it is concave or not.
 *
 * @name booleanConcave
 * @param {Feature<Polygon>} polygon to be evaluated
 * @returns {boolean} true/false
 * @throws {Error} if input polygon has null geometry
 * @example
 * var convexPolygon = turf.polygon([[[0,0],[0,1],[1,1],[1,0],[0,0]]]);
 *
 * turf.booleanConcave(convexPolygon)
 * //=false
 */
export default function booleanConcave(polygon: Feature<Polygon> | Polygon) {
  // Taken from https://stackoverflow.com/a/1881201 & https://stackoverflow.com/a/25304159
  const geom = getGeom(polygon);
  if (geom === null) throw new Error("Input polygon must have a geometry");
  const coords = geom.coordinates;
  if (coords[0].length <= 4) {
    return false;
  }

  let sign = false;
  const n = coords[0].length - 1;
  for (let i = 0; i < n; i++) {
    const dx1 = coords[0][(i + 2) % n][0] - coords[0][(i + 1) % n][0];
    const dy1 = coords[0][(i + 2) % n][1] - coords[0][(i + 1) % n][1];
    const dx2 = coords[0][i][0] - coords[0][(i + 1) % n][0];
    const dy2 = coords[0][i][1] - coords[0][(i + 1) % n][1];
    const zcrossproduct = dx1 * dy2 - dy1 * dx2;
    if (i === 0) {
      sign = zcrossproduct > 0;
    } else if (sign !== zcrossproduct > 0) {
      return true;
    }
  }
  return false;
}
