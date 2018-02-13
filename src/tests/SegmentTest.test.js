import users from '../data/users'
var S = require('../classes/segment.js')
var assert = require('assert')

var user;
var segment;

// simple segments
describe('Simple segments', function() {
  
    describe('Country = USA with user in USA', function() {
      it('should return true', function() {
        segment = new S()
        segment.addRule({"param": "Country", "op": "is", "value": "United States"})
        user = {Language: "English", Country: "United States", Device: "iPhone X"}
        assert.equal(segment.matchesUser(user), true)
      });
    });

    describe('Country = USA with user in Belguium', function() {
      it('should return false', function() {
        segment = new S()
        segment.addRule({"param": "Country", "op": "is", "value": "United States"})
        user = {Language: "English", Country: "Belguim", Device: "iPhone X"}
        assert.equal(segment.matchesUser(user), false)
      });
    });

    describe('Language = English with user speaks English', function() {
      it('should return true', function() {
        segment = new S()
        segment.addRule({"param": "Language", "op": "is", "value": "English"})
        user = {Language: "English", Country: "Belguim", Device: "iPhone X"}
        assert.equal(segment.matchesUser(user), true)
      });
    });


    describe('Language is NOT English with user speaks English', function() {
      it('should return false', function() {
        segment = new S()
        segment.addRule({"param": "Language", "op": "is not", "value": "English"})
        user = {Language: "English", Country: "Belguim", Device: "iPhone X"}
        assert.equal(segment.matchesUser(user), false)
      });
    });

    describe('Device is NOT iPhone X with user with iPhone 8', function() {
      it('should return true', function() {
        segment = new S()
        segment.addRule({"param": "Device", "op": "is not", "value": "iPhone X"})
        user = {Language: "English", Country: "Belguim", Device: "iPhone 8"}
        assert.equal(segment.matchesUser(user), true)
      });
    });

  });


// segment with OR

describe('OR segments', function() {
  
  describe('Country = USA OR Language = English with user in USA that speaks Russian', function() {
    it('should return true', function() {
      segment = new S()
      var rules = [
        {"param": "Country", "op": "is", "value": "United States"},
        {"param": "Language", "op": "is", "value": "English"}
      ]
      segment.addRules(rules)
      user = {Language: "Russian", Country: "United States", Device: "iPhone X"}
      assert.equal(segment.matchesUser(user), true)
    });
  });

  describe('Country = USA OR Language = English with user in Russia that speaks Russian', function() {
    it('should return false', function() {
      segment = new S()
      var rules = [
        {"param": "Country", "op": "is", "value": "United States"},
        {"param": "Language", "op": "is", "value": "English"}
      ]
      segment.addRules(rules)
      user = {Language: "Russian", Country: "Russia", Device: "iPhone X"}
      assert.equal(segment.matchesUser(user), false)
    });
  });

});


// segment with AND

describe('AND segments', function() {
  
  describe('Country = USA AND Language = English with user in USA that speaks Russian', function() {
    it('should return false', function() {
      segment = new S()
      segment.addRule({"param": "Country", "op": "is", "value": "United States"})
      segment.addRule({"param": "Language", "op": "is", "value": "English"})
      
      user = {Language: "Russian", Country: "United States", Device: "iPhone X"}
      assert.equal(segment.matchesUser(user), false)
    });
  });

  describe('Country = USA AND Device = iPhone X with user in USA with iPhone 8', function() {
    it('should return false', function() {
      segment = new S()
      segment.addRule({"param": "Country", "op": "is", "value": "United States"})
      segment.addRule({"param": "Device", "op": "is", "value": "iPhone X"})
      
      user = {Language: "English", Country: "United States", Device: "iPhone 8"}
      assert.equal(segment.matchesUser(user), false)
    });
  });

  describe('Country = USA AND Device = iPhone X with user in USA with iPhone X', function() {
    it('should return true', function() {
      segment = new S()
      segment.addRule({"param": "Country", "op": "is", "value": "United States"})
      segment.addRule({"param": "Device", "op": "is", "value": "iPhone X"})
      
      user = {Language: "English", Country: "United States", Device: "iPhone X"}
      assert.equal(segment.matchesUser(user), true)
    });
  });

  describe('Country = USA AND Device is NOT iPhone X with user in USA with iPhone X', function() {
    it('should return false', function() {
      segment = new S()
      segment.addRule({"param": "Country", "op": "is", "value": "United States"})
      segment.addRule({"param": "Device", "op": "is not", "value": "iPhone X"})
      
      user = {Language: "English", Country: "United States", Device: "iPhone X"}
      assert.equal(segment.matchesUser(user), false)
    });
  });

});

// kitchen sink: segment with AND and OR

describe('Kitchen sink: AND and OR segments', function() {
  
  describe('(Country = USA OR Language = English) AND Device is iPhone X with user in USA with iPhone X', function() {
    it('should return true', function() {
      segment = new S()
      var rules = [
        {"param": "Country", "op": "is", "value": "United States"},
        {"param": "Language", "op": "is", "value": "English"}
      ]
      segment.addRules(rules)

      segment.addRule({"param": "Device", "op": "is", "value": "iPhone X"})
      
      user = {Language: "Russian", Country: "United States", Device: "iPhone X"}
      assert.equal(segment.matchesUser(user), true)
    });
  });

  describe('(Country = USA OR Language = English) AND Device is iPhone X with English lang with iPhone X', function() {
    it('should return true', function() {
      segment = new S()
      var rules = [
        {"param": "Country", "op": "is", "value": "Belguim"},
        {"param": "Language", "op": "is", "value": "English"}
      ]
      segment.addRules(rules)

      segment.addRule({"param": "Device", "op": "is", "value": "iPhone X"})
      
      user = {Language: "English", Country: "United States", Device: "iPhone X"}
      assert.equal(segment.matchesUser(user), true)
    });
  });

  describe('(Country = USA OR Language = English) AND Device is NOT iPhone X with user in USA with iPhone X', function() {
    it('should return false', function() {
      segment = new S()
      var rules = [
        {"param": "Country", "op": "is", "value": "United States"},
        {"param": "Language", "op": "is", "value": "English"}
      ]
      segment.addRules(rules)

      segment.addRule({"param": "Device", "op": "is not", "value": "iPhone X"})
      
      user = {Language: "Russian", Country: "United States", Device: "iPhone X"}
      assert.equal(segment.matchesUser(user), false)
    });
  });

  describe('(Country = USA OR Language = English) AND (Device is NOT iPhone X OR iPad) with user in USA with Pixel', function() {
    it('should return true', function() {
      segment = new S()
      var rules = [
        {"param": "Country", "op": "is", "value": "United States"},
        {"param": "Language", "op": "is", "value": "English"}
      ]
      segment.addRules(rules)

      var rules2 = [
        {"param": "Device", "op": "is not", "value": "iPhone X"},
        {"param": "Device", "op": "is not", "value": "iPad"}
      ]
      segment.addRules(rules2)
      
      user = {Language: "Russian", Country: "United States", Device: "Pixel"}
      assert.equal(segment.matchesUser(user), true)
    });
  });

});


// Group of users

describe('Multiple Users', function() {
  
  describe('Country = USA', function() {
    it('should match 15 users', function() {
      segment = new S()
      segment.addRule({"param": "Device", "op": "is", "value": "iPhone X"})
      var matched = segment.matchedUsers(users)
      assert.equal(matched.length, 6)
    });
  });

  describe('Country = USA OR Language = English', function() {
    it('should match 16 users', function() {
      segment = new S()
      var rules = [
        {"param": "Country", "op": "is", "value": "United States"},
        {"param": "Language", "op": "is", "value": "English"}
      ]
      segment.addRules(rules)
      var matched = segment.matchedUsers(users)
      assert.equal(matched.length, 16)
    });
  });

  describe('Country = USA AND Device = iPhone X', function() {
    it('should return 4 users', function() {
      segment = new S()
      segment.addRule({"param": "Country", "op": "is", "value": "United States"})
      segment.addRule({"param": "Device", "op": "is", "value": "iPhone X"})
      var matched = segment.matchedUsers(users)
      assert.equal(matched.length, 4)
    });
  });

  describe('Country is NOT USA AND Device = iPhone X', function() {
    it('should return 2 users', function() {
      segment = new S()
      segment.addRule({"param": "Country", "op": "is not", "value": "United States"})
      segment.addRule({"param": "Device", "op": "is", "value": "iPhone X"})
      var matched = segment.matchedUsers(users)
      assert.equal(matched.length, 2)
    });
  });

  describe('(Country is NOT USA OR Language is NOT English) AND Device = iPhone X', function() {
    it('should return 3 users', function() {
      segment = new S()
      var rules = [
        {"param": "Country", "op": "is not", "value": "United States"},
        {"param": "Language", "op": "is not", "value": "English"}
      ]
      segment.addRules(rules)
      segment.addRule({"param": "Device", "op": "is", "value": "iPhone X"})
      var matched = segment.matchedUsers(users)
      assert.equal(matched.length, 3)
    });
  });

});