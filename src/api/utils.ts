
const IS_DEV = process.env.NODE_ENV !== 'production';
const API_ROOT = process.env.REACT_APP_API_ROOT;

const returnFakeData = <T>(dataToReturn: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataToReturn);
    }, Math.round(Math.random() * 1000) + 500);
  });
};

export { returnFakeData, IS_DEV, API_ROOT };