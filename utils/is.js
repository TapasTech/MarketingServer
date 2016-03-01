var Is = function() {
  this.regex = {
    phoneNumber: /^1[3|4|5|7|8]\d{9}$/
  }
}

Is.prototype.phoneNumber = function(num) {
  return this.regex.phoneNumber.test(num);
};

Is.prototype.limitString = function(str, len) {
  return typeof str === 'string' && str.length < len;
}

var is = new Is();

module.exports = is;
