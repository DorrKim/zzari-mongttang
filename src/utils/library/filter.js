

export const filterSpecialSymbols = value => value.match(/[^!@#$%^&*()-_+=\\}|{\][}'";:/?.>,<`~]/g)?.join('');
