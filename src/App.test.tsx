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
// const lifeMatrix = new LifeMatrix(expected);
// let expected = [[0,0,0,0],
//                 [0,1,1,0],
//                 [0,1,1,0],
//                 [0,0,0,0],
//               ]
// test("range test", () => {
//   expect(expected ).toEqual(lifeMatrix.current.next())
//  })