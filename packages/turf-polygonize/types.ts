import { lineString } from "@turf/helpers";
import { polygonize } from "./index";

const line = lineString([
  [10, 10],
  [0, 0],
  [3, -5],
  [10, 10],
]);
polygonize(line);
