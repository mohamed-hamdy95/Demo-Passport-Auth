const _ = require("lodash");

exports.format = (user) => {
  return _.omit({ ...user._doc, id: user._id, image: user.image ? user.image.replace("./storage", "/files") : "" }, [
    "password",
    "referral_code",
    "__v",
    "_id",
  ]);
};
