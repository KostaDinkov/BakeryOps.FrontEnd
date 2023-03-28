import { getSpecialPrice } from "../Components/OrderForm/OrderFormHelperFunctions";
import ProductDTO from "../Types/ProductDTO";

let products = [
  {
    priceDrebno: 10,
    hasDiscount: true,
    keepPriceDrebno: false,
  },
  {
    priceDrebno: 14.4,
    hasDiscount: true,
    keepPriceDrebno: false,
  },
  {
    priceDrebno: 17.7,
    hasDiscount: true,
    keepPriceDrebno: false,
  },
  {
    priceDrebno: 15.2,
    hasDiscount: true,
    keepPriceDrebno: false,
  },
  {
    priceDrebno: 28,
    hasDiscount: true,
    keepPriceDrebno: false,
  },
  {
    priceDrebno: 30,
    hasDiscount: true,
    keepPriceDrebno: false,
  },
  {
    priceDrebno: 0,
    hasDiscount: true,
    keepPriceDrebno: false,
  },
  {
    priceDrebno: 35,
    hasDiscount: false,
    keepPriceDrebno: false,
  },
  {
    priceDrebno: 33.44,
    hasDiscount: false,
    keepPriceDrebno: true,
  },
];

let cases = [
  [products[0], 7.33],
  [products[1], 10.56],
  [products[2], 12.98],
  [products[3], 11.15],
  [products[4], 20.53],
  [products[5], 22],
  [products[6], 0],
  [products[7], 32.08],
  [products[8], 33.44],
];

test.each(cases)(
  "For product %p, special price  should be %p",
  (product, expectedPrice) => {
    let discount = 25;

    let actualPrice = getSpecialPrice(product as ProductDTO, discount);

    expect(actualPrice).toBeCloseTo(expectedPrice as number, 3);
  }
);
