import { AllGeoJSON, Coord } from "@turf/helpers";

/**
 * http://turfjs.org/docs/#transformrotate
 */
declare function transformRotate<T extends AllGeoJSON>(
  geojson: T,
  angle: number,
  options?: {
    pivot?: Coord;
    mutate?: boolean;
  }
): T;

export { transformRotate };
export default transformRotate;
