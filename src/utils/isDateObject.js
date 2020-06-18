function isDateObject(arg) {
  return Object.prototype.toString.call(arg) === '[object Date]';
}

export default isDateObject;
