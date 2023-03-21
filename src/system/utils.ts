export async function sleep(msec:number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

/** 
 * Get the 'special' price of the product with discount applied
// @param cenaDrebno - price of the product as used in store with included Vat
// @param discountPercent - discount in percent, like 20 for 20%
**/
export function getSpecialPrice(cenaDrebno:number, discountPercent:number):number {
    
  // First we take price without Vat
  // Next we apply discount
  // Next we add half of Vat to the result
  // Last we round to 2 decimal places
  let vat = 0.20;
  let halfVat = vat / 2;
  let discount = discountPercent / 100;
  let final = ((cenaDrebno / (1+vat))/(1+discount))*(1+halfVat);

  return Math.round((final+ Number.EPSILON)*100)/100;
  }