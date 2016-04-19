
/*!
 * Expose.
 */

module.exports = function next(arr, id) {
  id = id || 0;

  return arr.filter((el) => {
    if (el.parentId == id) {
      var children = next(arr, el.id);
      children.length && (el.children = children);
      return true;
    }
  });
};
