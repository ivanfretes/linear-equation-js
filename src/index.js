/**
 * @todo look case when slope is 90°
 * @param {array} point1 : i.e [1,2] - Init point of Equation
 * @param {array} point2 : i.e [3,4] - End point of Equation
 * @return {array} : [constantX, ,constantY, C] => myX + mxY + constant
 */
export const genLinearEquation = (point1,point2) => {
   const [x1, y1] = point1;
   const [x2, y2] = point2;
   
   const {a, b} = genSlopeValues([x1, y1], [x2, y2])
   const constant = (a * x1) - (b * y1)
   
   return [a, b * -1, constant * -1]
}


/**
 * Get the slop value
 * 
 * @param {array} [x,y]
 * @param {array} [x,y]
 * @return {Object} : with slote m, a and b
 */
export const genSlopeValues = ([x1,y1],[x2,y2]) => {
   const a = y2 - y1
   const b = x2 - x1
   const m = a / b
   return {m, a, b}
}


/**
 * Return the point of intersention in two Straight / linear Equation
 * @param {array} r1 : linear Equation
 * @param {array} r2 :linear Equation
 * @return {array} [ x, y ]
 */
export const getPointOfIntersection = (r1, r2) => {
   r1 = getEquationWithPositiveX(r1)
   r2 = getEquationWithPositiveX(r2)

   const [x1, y1, c1] = multiplyLinearEquation(r1, r2[0])
   const [, y2, c2] = multiplyLinearEquation(r2, r1[0] * -1)

   const y = -(c1 + c2) / (y1 + y2)
   const x = - ((y1 * y) + c1) / x1
   return [x, y]
}

/**
 * Multiply each element of the straigth by multiplier
 * 
 * @param {array} r : linear equation
 * @param {number} multiplier : is a x value element
 */
export const multiplyLinearEquation = (r, multiplier) => {
   return r.map(element => element * multiplier)   
}

/**
 * Add inverse multiply for equation, then x is positive
 */
export const getEquationWithPositiveX = (r) => {
   const [x] = r;
   if (x < 0)
      return r.map(element => element * -1)
   return r
}

/**
 * From the formula m = -a / b
 * @param {array} r : straigh / linear Equation i.e [aX, ,bY, constant] 
 * @return {number} : slope
 */
export const getStraightSlope = ([a,b]) => {
   return - a / b
}


/**
 * Get slope angle with passed the slope value
 * @param {number} slopeValue
 * @return {number}
 */
export const getSlopeAngle = (slopeValue) => {
   const s = (Math.atan(slopeValue) * 180) / Math.PI
   return s < 0 ? 180 + s : s
}


/**
 * 
 * Get the distance between two points
 * @param {number} x - only one value or substrac operation (x2 - x1) 
 * @param {number} y - only one value or substrac operation (y2 - y1)  
 * @return {number}
 */
export const getDistanceBetweenTwoPoints = (x, y) => {
   return Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
}


/**
 * Fixed to float value 
 * @example = 0,1234 fix to 0,123
 * 
 * @param {*} val 
 * @param {*} decimals
 * @returns 
 */
export const toFixedFloat = (val, decimals) => {
   const fixed = Number.parseFloat(val).toFixed(decimals)
   return parseFloat(fixed);
}


/**
 * Get clear intersection, consider only the real segment, not the projection of straight
 * @param {array} a 
 * @param {array} b 
 * @param {array} c 
 * @param {array} d 
 */
export const getPointOfIntersection2 = (a, b, c, d) => {
   // Generate the linear equation
   const r1 = genLinearEquation(a, b)
   const r2 = genLinearEquation(c, d)

   // Get the distance of two straight
   // We use "toFixedFloat" for the sqr of getDistanceBetweenTwoPoints get the minimun variant 
   const d1 = toFixedFloat(getDistanceBetweenTwoPoints(a[0] - b[0], a[1] - b[1]),10)
   const d2 = toFixedFloat(getDistanceBetweenTwoPoints(c[0] - d[0], c[1] - d[1]),10)

   // Point of intersection
   const [x,y] = getPointOfIntersection(r1, r2);
   
   // Create distances of intersectionPoint to four points
   const d_ia = getDistanceBetweenTwoPoints(a[0] - x, a[1] - y);
   const d_ib = getDistanceBetweenTwoPoints(b[0] - x, b[1] - y);
   const d_ic = getDistanceBetweenTwoPoints(c[0] - x, c[1] - y); 
   const d_id = getDistanceBetweenTwoPoints(d[0] - x, d[1] - y);

   // The sum distance of intersection
   const sum_iab = toFixedFloat(d_ia + d_ib, 10)
   const sum_icd = toFixedFloat(d_ic + d_id, 10)
   console.log(sum_iab, sum_icd);
   console.log(d1, d2);
   
   if (sum_iab === d1 && sum_icd === d2) 
      return [x,y]
      
   return null
}

export default {
   genLinearEquation,
   genSlopeValues,
   getDistanceBetweenTwoPoints,
   getSlopeAngle,
   getStraightSlope,
   multiplyLinearEquation,
   getEquationWithPositiveX,
   getDistanceBetweenTwoPoints,
   getPointOfIntersection2,
   toFixedFloat
}
