export const toNumber = ({ data, value }) => {
  return { ...data, [value]: Number(data[value]) };
};
