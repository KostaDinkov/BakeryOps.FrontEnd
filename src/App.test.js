import { render, screen } from '@testing-library/react';

import {getSpecialPrice} from './system/utils.ts';

let cases = [[10, 7.33], [14.4, 10.56], [17.7, 12.98],[15.2, 11.15],[28,20.53],[30,22]]
test.each(cases)('For priceDrebno = %p, special price  should be %p', () => {
  
  let discount = 25;
  let cenaDrebno = 10;
  let expectedPrice = 7.33;
  let actualPrice = getSpecialPrice(cenaDrebno, discount);
  
  expect(actualPrice).toBeCloseTo(expectedPrice,3);
});


