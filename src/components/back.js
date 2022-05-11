const record = [];
let lastIdx = 0;
export const addRecord = (treadls, shafts, treadlsCol, shaftsColor, last) => {
  if (record.length === 3) {
    record.splice(0, 1);
  }
  record.push({
    treadls,
    shafts,
    treadlsCol,
    shaftsColor,
    last,
  });
};
export const getRecord = (
  setTreadls,
  setShafts,
  setTreadlsCol,
  setShaftsColor,
  setLast
) => {
  if (record.length === 0) {
    return;
  }
  const currentData = record[record.length - 1];
  setTreadls(currentData.treadls);
  setShafts(currentData.shafts);
  setTreadlsCol(currentData.treadlsCol);
  setShaftsColor(currentData.shaftsColor);
  setLast(currentData.last);
  record.splice(record.length - 1, 1);
};
