const chai = require('chai');
const expect = chai.expect;
const sampleActivity = require('../data/sample-activity');
const sampleUser = require('../data/sample-user')
const ActivityGoals = require('../src/ActivityGoals');

describe('Activity goals', function () {
  let activityGoals
  beforeEach(function () {
    activityGoals = new ActivityGoals(sampleActivity, sampleUser);
  })
  // it('should get miles walked for a given date', function () {
  //   expect(activityGoals.getMilesWalked())
  // })
})
