export const convertMapToObject = (map: Map<string, Map<string, boolean>>): { [key: string]: { [key: string]: boolean } } => {
    const obj: { [key: string]: { [key: string]: boolean } } = {};
    map.forEach((value, key) => {
      obj[key] = Array.from(value.entries()).reduce<{ [key: string]: boolean }>((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {});
    });
    return obj;
  };