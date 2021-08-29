const snakeToCamel = (str) => str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('_', ''))
export const snakeToCamelKeys = (o) => Object.keys(o).reduce((c, k) => (c[snakeToCamel(k)] = o[k], c), {})
