/* eslint-disable max-len */
const randomId = function generateRandomId() {
  return Math.ceil(Math.random() * 50);
}

const userRepository = new UserRepository()
const hydrationRepository = new HydrationRepository();
const sleepRepository = new SleepRepository();
const activityRepository = new ActivityRepository();

const users = userRepository.instantiateUsers();
const userHydration = hydrationRepository.instantiateHydration();
const userSleep = sleepRepository.instantiateSleepers();
const userActivity = activityRepository.instantiateWalkers();

const date = new Date();
const todaysDate = (("0" + date.getDate()).slice(-2)) + "/" + (("0" + (date.getMonth() + 1)).slice(-2)) + "/" + (date.getFullYear());
const yesterdaysDate =  (("0" + date.getDate()).slice(-2) - 1 ) + "/" + (("0" + (date.getMonth() + 1)).slice(-2)) + "/" + (date.getFullYear())
const getDayOfWeek = (days = 0) => {
  const fixedDate = date.setDate(date.getDate() + days);
  const dateOfInterest = new Date(fixedDate).getDay();
  var day;
  if (dateOfInterest === 0) {
    day = 'SUN';
  } else if (dateOfInterest === 1) {
    day = 'MON';
  } else if (dateOfInterest === 2) {
    day = 'TUE';
  } else if (dateOfInterest === 3) {
    day = 'WED';
  } else if (dateOfInterest === 4) {
    day = 'THU';
  } else if (dateOfInterest === 5) {
    day = 'FRI';
  } else {
    day = 'SAT';
  }
  return day;
}

const user = userRepository.getUserDataFromId(randomId())

const instantiatedUser = users.find(item => item.id === user.id)
const instantiatedWater = userHydration.find(item => item.id === instantiatedUser.id)
const instantiatedSleeper = userSleep.find(item => item.id === instantiatedUser.id)
const instantiatedWalker = userActivity.find(item => item.id === instantiatedUser.id)

const hydrationIndex = instantiatedWater.hydrationData.findIndex(item => item.date === todaysDate);
const fluidIntakeByDate = instantiatedWater.getFluidIntakeByDate(instantiatedWater, todaysDate);

const sleepQualityByDate = instantiatedSleeper.getSleepQualityByDate(instantiatedSleeper, todaysDate)
const sleepHoursByDate = instantiatedSleeper.getSleepHoursByDate(instantiatedSleeper, todaysDate)
const sleepHoursByWeek = instantiatedSleeper.getDailySleepHoursByWeek(instantiatedSleeper, todaysDate)
const averageSleepQuality = instantiatedSleeper.getAverageSleepQuality(instantiatedSleeper)
const totalAverageSleepQuality = sleepRepository.getTotalAverageSleepQuality(userSleep)

const distanceInMiles = instantiatedWalker.getMilesWalked(instantiatedWalker, yesterdaysDate)
const totalAverageStairs = activityRepository.getAverageStairsClimbed(userActivity, yesterdaysDate)
const totalAverageActivity = activityRepository.getAverageMinutesActive(userActivity, yesterdaysDate)
const totalAverageSteps = activityRepository.getAverageSteps(userActivity, yesterdaysDate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const yesterday = getDayOfWeek(-1)
const twoDaysAgo =  getDayOfWeek(-1)
const threeDaysAgo =  getDayOfWeek(-1)
const fourDaysAgo =  getDayOfWeek(-1)
const fiveDaysAgo =  getDayOfWeek(-1)
const sixDaysAgo =  getDayOfWeek(-1)
const sevenDaysAgo =  getDayOfWeek(-1)

function compareStepGoal(user) {
  return user.dailyStepGoal > userRepository.getAverageStepGoal() ? 'above' : 'below';
}

new Chart(
  $('#hydration-bar-graph'), {
    type: 'bar',
    data: {
      labels: [sevenDaysAgo, sixDaysAgo, fiveDaysAgo, fourDaysAgo, threeDaysAgo, twoDaysAgo, yesterday],
      datasets: [{
        label: 'Past Days',
        data: instantiatedWater.getDailyFluidIntakeByWeek(instantiatedWater, hydrationIndex),
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(234, 3, 222)'
        ],
        borderColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(234, 3, 222)'
        
        ],
        borderWidth: 3
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Water Consumption this Week (Oz)',
        fontColor: 'black',
        fontSize: 16
      },  
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

new Chart(
  $('#sleep-bar-graph'), {
    type: 'bar',
    data: {
      labels: [sevenDaysAgo, sixDaysAgo, fiveDaysAgo, fourDaysAgo, threeDaysAgo, twoDaysAgo, yesterday],
      datasets: [{
        label: 'Past Days',
        data: sleepHoursByWeek,
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(234, 3, 222)'
        ],
        borderColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(234, 3, 222)'
        ],
        borderWidth: 3
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Hours Slept This Week',
        fontColor: 'black',
        fontSize: 16
      },  
      legend: {
        display: false
      },
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });


new Chart(
  $('#sleep-donut'), {
    type: "polarArea",
    data: {
      datasets: [{
        backgroundColor: [
          "#990099",
          "#3B3EAC"],
        hoverBackgroundColor: [
          "#3366CC",
          "#DC3912",
          "#FF9900",
          "#109618",
          "#990099",
          "#3B3EAC"
        ],
        data: [
          Number(averageSleepQuality).toFixed(2),
          Number(totalAverageSleepQuality).toFixed(2)
        ]
      }],
      labels: [
        "Your Average Sleep Quality",
        "All Users Average Sleep Quality"
      ]
    }
  });

new Chart(
  $('#activity-line-graph'), {
    type: 'line',
    data: {
      labels: [sevenDaysAgo, sixDaysAgo, fiveDaysAgo, fourDaysAgo, threeDaysAgo, twoDaysAgo, yesterday],
      datasets: [{
        label: 'Minutes Active',
        data: instantiatedWalker.getMinutesActiveForWeek(instantiatedWalker, todaysDate),
        backgroundColor: [
          'rgba(255, 255, 255, 0.1)',
          'rgba(255, 0, 255, 0.1)'
        ],
        borderColor: [
          'rgba(255, 0, 0, 0.5)',
          'rgba(255, 255, 0, 0.5)',
        ],
        borderWidth: 3
      }, {
        label: 'Flights of Stairs Climbed',
        data: instantiatedWalker.getStairsClimbedForWeek(instantiatedWalker, todaysDate),
        backgroundColor: [
        // 'rgba(255, 255, 255, 0.1)',
        ],
        borderColor: [
        // 'rgba(255, 0, 0, 0.5)',
        
        ],
        borderWidth: 3,

      }]
    },
    options: {
      title: {
        display: true,
        text: 'This Weeks Activity',
        fontColor: 'black',
        fontSize: 16
      },  
      legend: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

new Chart(
  $('#steps-line-graph'), {
    type: 'line',
    data: {
      labels: [sevenDaysAgo, sixDaysAgo, fiveDaysAgo, fourDaysAgo, threeDaysAgo, twoDaysAgo, yesterday],
      datasets: [{
        label: 'Steps Taken',
        data: instantiatedWalker.getStepsSteppedForWeek(instantiatedWalker, todaysDate),
        backgroundColor: [
          'rgba(0, 0, 255, .5)',
        ],
        borderColor: [
          'rgba(255, 99, 132)',
    
        ],
        borderWidth: 3,

      }]
    },
    options: {
      title: {
        display: true,
        text: 'This Weeks Activity',
        fontColor: 'black',
        fontSize: 16
      },  
      legend: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

$(document).ready(() => {
  $('#header-todays-date').append(todaysDate);
  
  $('.header-dropbtn').click(function () {
    $('.community-stats, .user-info, .main-widget-sleep, .main-widget-hydration, .main-widget-activity').toggleClass('hide')
    let text = $('.header-dropbtn').text();
    $('.header-dropbtn').text(text === 'More Info' ? 'My Dashboard' : 'More Info')
  });
  
  $('.footer-greeting-js').append(`Hello, <span id='footer-user-name'>${instantiatedUser.getFirstName()}</span>!  Your daily step goal is ${compareStepGoal(instantiatedUser)} average.`);
  
  $('.user-info').append( 
    `<h3 class='main-widget-title '><span class='bold'>Your Information</span></h3>` +
    `<p class='main-widget__address'><span class='bold'>Address:</span> ${instantiatedUser.address} </p>` +
  `<p class='main-widget__email'><span class='bold'>Email:</span> ${instantiatedUser.email} </p>` +
  `<p class='main-widget__Stride'><span class='bold'>Stride:</span> ${instantiatedUser.strideLength} </p>` +
  `<p class='main-widget__daily-step'><span class='bold'>Daily Step Goal:</span> ${instantiatedUser.dailyStepGoal}</p>`);

  $('.community-stats').append(`<h3 class='main-widget-title'>Community Statistics</h3>` + 
  `<p class='main-widget' id='community-stats'>
  <span class='bold'>Average User Steps:</span> ${totalAverageSteps} <br> <span class='bold'>Average Minutes Active:</span> ${totalAverageActivity} <br>
  <span class='bold'>Average Flights of Stairs:</span> ${totalAverageStairs}</p>`);

  $('.main-widget-hydration').append( 
    `<h3 class='main-widget-title'></h3>` +
    `<p class='main-widget'>
    <h4 class=" center">Number of Oz Today:</h4>
    <span class='oz-styling'>${fluidIntakeByDate}</span> 
    </p>`);

  $('.main-widget-activity').append(`<p class='main-widget'><h4 class="center">Latest Activity Stats:</h4><div class="sleep-data-styling">Distance (mi) walked yesterday: ${Number(distanceInMiles).toFixed(1)} </div> </p>`);

  $(`<p class='main-widget'><h4 class=" center">Today's Sleep Stats:</h4><div class="sleep-data-styling">Hours Slept: ${sleepHoursByDate}  <br> Quality: ${sleepQualityByDate} / 5  </div> </p>`).insertAfter('#sleep-bar-graph');
});




