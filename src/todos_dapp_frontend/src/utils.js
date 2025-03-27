export const isEmpty = (obj) => {
  return (
    obj === null ||
    obj === undefined ||
    obj === "" ||
    Object.keys(obj).length === 0 ||
    obj.length === 0
  );
};
