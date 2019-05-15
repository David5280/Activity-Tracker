const chai = require('chai');
const expect = chai.expect;
const SleepRepository = require('../src/SleepRepository')


describe('SleepRepository', function() {
  let sampleSleepData;

  beforeEach(function() {
    sampleSleepData = [
      {
        "userID": 1,
        "sleepData": [
          {
            "date": "06/05/2019",
            "hoursSlept": 8,
            "sleepQuality": 4.8
          },
          {
            "date": "07/05/2019",
            "hoursSlept": 10.7,
            "sleepQuality": 4.8
          },
          {
            "date": "08/05/2019",
            "hoursSlept": 8.1,
            "sleepQuality": 1.9
          },
          {
            "date": "09/05/2019",
            "hoursSlept": 4.5,
            "sleepQuality": 3.4
          },
          {
            "date": "10/05/2019",
            "hoursSlept": 10.7,
            "sleepQuality": 4.3
          },
          {
            "date": "11/05/2019",
            "hoursSlept": 5.6,
            "sleepQuality": 3.5
          },
          {
            "date": "12/05/2019",
            "hoursSlept": 10.1,
            "sleepQuality": 1.7
          }
        ]
      },
      {
        "userID": 2,
        "sleepData": [
          {
            "date": "06/05/2019",
            "hoursSlept": 6.3,
            "sleepQuality": 2.2
          },
          {
            "date": "07/05/2019",
            "hoursSlept": 9.2,
            "sleepQuality": 4.8
          },
          {
            "date": "08/05/2019",
            "hoursSlept": 6.6,
            "sleepQuality": 4.5
          },
          {
            "date": "09/05/2019",
            "hoursSlept": 6.8,
            "sleepQuality": 1.4
          },
          {
            "date": "10/05/2019",
            "hoursSlept": 9.3,
            "sleepQuality": 4.8
          },
          {
            "date": "11/05/2019",
            "hoursSlept": 8.5,
            "sleepQuality": 1.7
          },
          {
            "date": "12/05/2019",
            "hoursSlept": 5.9,
            "sleepQuality": 3.2
          }
        ]
      }, 
      {
        "userID": 3,
        "sleepData": [
          {
            "date": "06/05/2019",
            "hoursSlept": 7.2,
            "sleepQuality": 5
          },
          {
            "date": "07/05/2019",
            "hoursSlept": 5.4,
            "sleepQuality": 4.1
          },
          {
            "date": "08/05/2019",
            "hoursSlept": 4.7,
            "sleepQuality": 1.2
          },
          {
            "date": "09/05/2019",
            "hoursSlept": 10.2,
            "sleepQuality": 1.7
          },
          {
            "date": "10/05/2019",
            "hoursSlept": 7.9,
            "sleepQuality": 2.7
          },
          {
            "date": "11/05/2019",
            "hoursSlept": 5.6,
            "sleepQuality": 3.7
          },
          {
            "date": "12/05/2019",
            "hoursSlept": 10.2,
            "sleepQuality": 2.4
          }
        ]
      }
    ]
  })


  it('should instantiate SleepRepository', function() {
    const sleepRepository = new SleepRepository('../data/sleep');
    expect(sleepRepository).to.be.an.instanceOf(SleepRepository)
  });
  it('should get average sleep quality for each user', function() {
    const sleepRepository = new SleepRepository('../data/sleep');
    expect(sleepRepository.getAverageSleepQuality(sampleSleepData)).to.eql([3.4857142857142853, 3.228571428571428, 2.971428571428571])
  })
  it('should get total average sleep quality for all users', function() {
    const sleepRepository = new SleepRepository('../data/sleep');
    expect(sleepRepository.getTotalAverageSleepQuality(sampleSleepData)).to.equal(3.228571428571428)

  })
  // it('should get userIDs whose average sleep quality for any given week is above 3', function() {
  //   const sleepRepository = new SleepRepository('../data/sleep');
  //   expect(sleepRepository.getSleepQualityAboveThree('13/05/2019')).to.eql([1, 3])
  // })
  // it('should get the person or people who slept the most on any given day', function () {
  //   const sleepRepository = new SleepRepository('../data/sleep');
  //   expect(sleepRepository.getLaziestPerson(sampleSleepData, '11/05/2019')).to.eql(2)

  // })
});