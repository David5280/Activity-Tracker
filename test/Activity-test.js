const chai = require('chai');
const expect = chai.expect;
const Activity = require('../src/Activity');
const sampleActivity = require('../data/sample-activity');


describe('Activity', function () {
  let activity;
  beforeEach(function () {
    activity = new Activity(sampleActivity)
  });
  it('should be an instance of Activity', function() {
    expect(activity).to.be.an.instanceOf(Activity)
  });
  it('should convert a user\'s number of steps to miles for a specific day', function () {
    expect(activity.getMilesWalked(sampleActivity, '07/05/2019')).to.equal(2.7407765151515155)
  });
  it('should get the total minutes active for any given date', function() {
    expect(activity.getMinutesActiveByDate(sampleActivity, '07/05/2019')).to.equal(115);
  });
  it('should get the average minutes active for a given week', function() {
    expect(activity.getAverageMinutesActiveForWeek(sampleActivity, '13/05/2019')).to.equal(176.42857142857142)
  });
  it('should return whether or not a user accomplished their step goal on a given day', function () {
    expect(activity.compareStepsToStepGoal(sampleActivity, '13/05/2019')).to.equal(false)
  });
  it('should return all days where the user exceeded their step goal', function () {
    expect(activity.getDaysThatExceedStepGoal(sampleActivity)).to.eql(['10/05/2019', '12/05/2019'])
  });
  it('should get a given users all time step climb record', function() {
    expect(activity.getStairClimbRecord(sampleActivity)).to.equal(46)
  });
  it('should get the most active day for a user based off minutesActive', function() {
    expect(activity.getMinutesActiveRecord(sampleActivity)).to.equal(294)
  })
});