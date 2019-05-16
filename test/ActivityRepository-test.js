const chai = require('chai');
const expect = chai.expect;
const ActivityRepository = require('../src/ActivityRepository');
const sampleActivityRepo = require('../data/sample-activity-repo');

describe('ActivityRepo', function () {
  let activityRepository;
  beforeEach(function () {
    activityRepository = new ActivityRepository('../data/sample-activity-repo')
  });
  it('should be an instance of ActivityRepository', function () {
    expect(activityRepository).to.be.an.instanceof(ActivityRepository)
  });
  it('should find average step count for all users for a given date', function() {
    expect(activityRepository.getAverageSteps(sampleActivityRepo, '07/05/2019')).to.equal(5728)
  })
  it('should find average stairs climbed for all users for a given date', function() {
    expect(activityRepository.getAverageStairsClimbed(sampleActivityRepo, '07/05/2019')).to.equal(22.666666666666667)
  })
  it('should find average minutes active for all users for a given date', function() {
    expect(activityRepository.getAverageMinutesActive(sampleActivityRepo, '07/05/2019')).to.equal(142.33333333333334 )
  })
})