import { ParsedBook } from "../bookParser";
import { getPrideAndPrejudiceBook } from "./prideAndPrejudice";
import { getFrankensteinBook } from "./frankenstein";
import { getAliceInWonderlandBook } from "./aliceInWonderland";

export function getAllRealBooks(): ParsedBook[] {
  return [
    getPrideAndPrejudiceBook(),
    getFrankensteinBook(),
    getAliceInWonderlandBook(),
  ];
}
