export const epsilon = function (value) {
  return Math.abs(value) < Number.EPSILON ? 0 : value
}

export const getCameraCSSMatrix = function (matrix) {
  const elements = matrix.elements

  return `matrix3d(
    ${epsilon(elements[0])},
    ${epsilon(-elements[1])},
    ${epsilon(elements[2])},
    ${epsilon(elements[3])},
    ${epsilon(elements[4])},
    ${epsilon(-elements[5])},
    ${epsilon(elements[6])},
    ${epsilon(elements[7])},
    ${epsilon(elements[8])},
    ${epsilon(-elements[9])},
    ${epsilon(elements[10])},
    ${epsilon(elements[11])},
    ${epsilon(elements[12])},
    ${epsilon(-elements[13])},
    ${epsilon(elements[14])},
    ${epsilon(elements[15])}
  )`
}

export const getObjectCSSMatrix = function (matrix) {
  const elements = matrix.elements

  return 'translate3d(-50%,-50%,0) matrix3d(' +
    epsilon(elements[ 0 ]) + ',' +
    epsilon(elements[ 1 ]) + ',' +
    epsilon(elements[ 2 ]) + ',' +
    epsilon(elements[ 3 ]) + ',' +
    epsilon(-elements[ 4 ]) + ',' +
    epsilon(-elements[ 5 ]) + ',' +
    epsilon(-elements[ 6 ]) + ',' +
    epsilon(-elements[ 7 ]) + ',' +
    epsilon(elements[ 8 ]) + ',' +
    epsilon(elements[ 9 ]) + ',' +
    epsilon(elements[ 10 ]) + ',' +
    epsilon(elements[ 11 ]) + ',' +
    epsilon(elements[ 12 ]) + ',' +
    epsilon(elements[ 13 ]) + ',' +
    epsilon(elements[ 14 ]) + ',' +
    epsilon(elements[ 15 ]) +
    ')'
}
