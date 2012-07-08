'use strict';

/*jsl predef:define*/
/*jsl predef:it*/

var mocha = require('mocha');
var Validator = require('../lib/validator');
var should = require('should');

describe('Formats', function () {
  beforeEach(function () {
    this.validator = new Validator();
  });

  describe('date-time', function () {
    it('should validate a valid date-time', function () {
      this.validator.validate("2012-07-08T16:41:41.532Z", {'type': 'string', 'format': 'date-time'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate an invalid date-time', function () {
      this.validator.validate("TEST2012-07-08T16:41:41.532Z", {'type': 'string', 'format': 'date-time'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });

  });

  describe('date', function () {
    it('should validate a valid date', function () {
      this.validator.validate("2012-07-08", {'type': 'string', 'format': 'date'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate an invalid date', function () {
      this.validator.validate("TEST2012-07-08", {'type': 'string', 'format': 'date'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });

  });

  describe('time', function () {
    it('should validate a valid time', function () {
      this.validator.validate("16:41:41", {'type': 'string', 'format': 'time'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate an invalid time', function () {
      this.validator.validate("16:41:41.532Z", {'type': 'string', 'format': 'time'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });

  });

  describe('utc-millisec', function () {
    it('should validate a valid utc-millisec', function () {
      this.validator.validate("-1234567890", {'type': 'string', 'format': 'utc-millisec'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate an invalid utc-millisec', function () {
      this.validator.validate("16:41:41.532Z", {'type': 'string', 'format': 'utc-millisec'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });

  });

  describe('regex', function () {
    it('should validate a valid regex', function () {
      this.validator.validate("/a/", {'type': 'string', 'format': 'regex'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    // TODO: Find a failing regex
  });

  describe('color', function () {
    it('should validate the color red', function () {
      this.validator.validate("red", {'type': 'string', 'format': 'color'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should validate the color #f00', function () {
      this.validator.validate("#f00", {'type': 'string', 'format': 'color'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should validate the color #ff0000', function () {
      this.validator.validate("#ff0000", {'type': 'string', 'format': 'color'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should validate the color rgb(255,0,0)', function () {
      this.validator.validate("rgb(255,0,0)", {'type': 'string', 'format': 'color'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate an invalid color (json)', function () {
      this.validator.validate("json", {'type': 'string', 'format': 'color'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });
  });

  describe('style', function () {
    it('should validate a valid style', function () {
      this.validator.validate("color: red;", {'type': 'string', 'format': 'style'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    // TODO: Find a failing style
  });

  describe('phone', function () {
    it('should validate a valid phone-number', function () {
      this.validator.validate("+1 202-456-1111", {'type': 'string', 'format': 'phone'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    // TODO: Find a failing phone-number
  });

  describe('uri', function () {
    it('should validate http://www.google.com/', function () {
      this.validator.validate("http://www.google.com/", {'type': 'string', 'format': 'uri'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should validate http://www.google.com/search', function () {
      this.validator.validate("http://www.google.com/search", {'type': 'string', 'format': 'uri'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate file:///Users/tdegrunt', function () {
      this.validator.validate("file:///Users/tdegrunt", {'type': 'string', 'format': 'uri'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });
  });

  describe('email', function () {
    it('should validate obama@whitehouse.gov', function () {
      this.validator.validate("obama@whitehouse.gov", {'type': 'string', 'format': 'email'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should validate barack+obama@whitehouse.gov', function () {
      this.validator.validate("barack+obama@whitehouse.gov", {'type': 'string', 'format': 'email'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate obama@', function () {
      this.validator.validate("obama@", {'type': 'string', 'format': 'email'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });
  });

  describe('ip-address', function () {
    it('should validate 192.168.0.1', function () {
      this.validator.validate("192.168.0.1", {'type': 'string', 'format': 'ip-address'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should validate 127.0.0.1', function () {
      this.validator.validate("127.0.0.1", {'type': 'string', 'format': 'ip-address'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate 192.168.0', function () {
      this.validator.validate("192.168.0", {'type': 'string', 'format': 'ip-address'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });

    it('should not validate 256.168.0', function () {
      this.validator.validate("256.168.0", {'type': 'string', 'format': 'ip-address'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });
  });

  describe('ipv6', function () {
    it('should validate fe80::1%lo0', function () {
      this.validator.validate("fe80::1%lo0", {'type': 'string', 'format': 'ipv6'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should validate ::1', function () {
      this.validator.validate("::1", {'type': 'string', 'format': 'ipv6'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate 127.0.0.1', function () {
      this.validator.validate("127.0.0.1", {'type': 'string', 'format': 'ipv6'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });

    it('should not validate localhost', function () {
      this.validator.validate("localhost", {'type': 'string', 'format': 'ipv6'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });

  });

  describe('host-name', function () {
    it('should validate localhost', function () {
      this.validator.validate("localhost", {'type': 'string', 'format': 'host-name'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should validate www.google.com', function () {
      this.validator.validate("www.google.com", {'type': 'string', 'format': 'host-name'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate www.-hi-.com', function () {
      this.validator.validate("www.-hi-.com", {'type': 'string', 'format': 'host-name'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });
  });  


  describe('alpha', function () {
    it('should validate alpha', function () {
      this.validator.validate("alpha", {'type': 'string', 'format': 'alpha'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should validate abracadabra', function () {
      this.validator.validate("abracadabra", {'type': 'string', 'format': 'alpha'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate 1test', function () {
      this.validator.validate("www.-hi-.com", {'type': 'string', 'format': 'alpha'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });
  });  

  describe('alphanumeric', function () {
    it('should validate alphanumeric', function () {
      this.validator.validate("alpha", {'type': 'string', 'format': 'alphanumeric'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should validate 123', function () {
      this.validator.validate("123", {'type': 'string', 'format': 'alphanumeric'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should validate abracadabra123', function () {
      this.validator.validate("abracadabra123", {'type': 'string', 'format': 'alphanumeric'}).should.be.true;
      this.validator.errors.should.have.length(0);
    });

    it('should not validate 1test!', function () {
      this.validator.validate("1test!", {'type': 'string', 'format': 'alphanumeric'}).should.be.false;
      this.validator.errors.should.have.length(1);
    });
  });  
});