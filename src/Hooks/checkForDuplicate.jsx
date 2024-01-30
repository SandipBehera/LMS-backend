// Desc: Check for duplicate in database
// Date: 8/9/2020
import _ from "lodash";

const duplicate = (arr, checker, params) => {
  if (!_.isEmpty(arr)) {
    const result = arr?.filter((item) => {
      return item[params] === checker;
    });
    if (result.length > 0) {
      return true;
    }
  }
};

export default duplicate;
