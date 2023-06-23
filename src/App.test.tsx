import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { matrixSum, range } from './Util/number-functions';
import LifeMatrix from './service/LifeMatrix';
test("sum of matrix", () => {
  expect(matrixSum([[1,2,3],
                    [4,5,6]])).toEqual(21)
})
test("range test", () => {
 expect(range(1,3)).toEqual([1,2])
})
              
test("stable matrix test", () => {
  let expected = [[0,0,0,0],
                 [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0],
                          ];
const lifeMatrix = new LifeMatrix(expected);
const nextLifeMatrix = lifeMatrix.next();
console.log(lifeMatrix.numbers,"\n", nextLifeMatrix);
  expect(lifeMatrix.numbers).toEqual(nextLifeMatrix)
 })

 test("loop matrix test", () => {
  const expected = [[0,1,0],
                    [0,1,0],
                    [0,1,0],
                            ];
  const startValue = [[0,0,0],
                      [1,1,1],
                      [0,0,0],
                              ];
const lifeMatrix = new LifeMatrix(startValue);
const nextLifeMatrix = lifeMatrix.next();
console.log(startValue,"\n", nextLifeMatrix);

 })