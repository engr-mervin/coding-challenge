const sortStringDescending = function (input: any): any {
  if (typeof input !== "string") return input;
  const charArray = input.split("");
  const sortedArray = charArray.sort(
    (a, b) => b.charCodeAt(0) - a.charCodeAt(0)
  );
  const sortedString = sortedArray.join("");
  return sortedString;
};

export const deepCopyWithCount = function (obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item: any) => deepCopyWithCount(item));
  }

  const newObj: Record<string, any> = {
    objectCount: Object.keys(obj).length,
  };
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[sortStringDescending(key)] = deepCopyWithCount(
        sortStringDescending(obj[key])
      );
    }
  }

  return newObj;
};
