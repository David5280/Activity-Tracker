const userRepository = new UserRepository()
const hydrationRepository = new HydrationRepository();
const sleepRepository = new SleepRepository();
const activityRepository = new ActivityRepository();

const users = userRepository.instantiateUsers();
const waters = hydrationRepository.instantiateHydration();
const sleepers = sleepRepository.instantiateSleepers();
const walkers = activityRepository.instantiateWalkers();

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



const randomId = function generateRandomId() {
  return Math.ceil(Math.random() * 50);
}

const user = userRepository.getUserDataFromId(randomId())
function compareStepGoal(user) {
  return user.dailyStepGoal > userRepository.getAverageStepGoal() ? 'above' : 'below';
}


const instantiatedUser = users.find(item => item.id === user.id)
const instantiatedWater = waters.find(item => item.id === instantiatedUser.id)
const instantiatedSleeper = sleepers.find(item => item.id === instantiatedUser.id)
const instantiatedWalker = walkers.find(item => item.id === instantiatedUser.id)

const hydrationIndex = instantiatedWater.hydrationData.findIndex(item => item.date === todaysDate);
const fluidIntakeByDate = instantiatedWater.getFluidIntakeByDate(instantiatedWater, todaysDate);

const sleepQualityByDate = instantiatedSleeper.getSleepQualityByDate(instantiatedSleeper, todaysDate)
const sleepHoursByDate = instantiatedSleeper.getSleepHoursByDate(instantiatedSleeper, todaysDate)
const sleepHoursByWeek = instantiatedSleeper.getDailySleepHoursByWeek(instantiatedSleeper, todaysDate)
const averageSleepQuality = instantiatedSleeper.getAverageSleepQuality(instantiatedSleeper)
const totalAverageSleepQuality = sleepRepository.getTotalAverageSleepQuality(sleepers)

// const yesterdaySteps = instantiatedWalker.getStepsByDate(instantiatedWalker, yesterdaysDate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// const yesterdaysActivity = instantiatedWalker.getMinutesActiveByDate(instantiatedWalker, yesterdaysDate)
// const yesterdayStairClimb = instantiatedWalker.getStairsClimbedByDate(instantiatedWalker, yesterdaysDate)
const distanceInMiles = instantiatedWalker.getMilesWalked(instantiatedWalker, yesterdaysDate)
const totalAverageStairs = activityRepository.getAverageStairsClimbed(walkers, yesterdaysDate)
const totalAverageActivity = activityRepository.getAverageMinutesActive(walkers, yesterdaysDate)
const totalAverageSteps = activityRepository.getAverageSteps(walkers, yesterdaysDate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const yesterday = getDayOfWeek(-1)
const twoDaysAgo =  getDayOfWeek(-1)
const threeDaysAgo =  getDayOfWeek(-1)
const fourDaysAgo =  getDayOfWeek(-1)
const fiveDaysAgo =  getDayOfWeek(-1)
const sixDaysAgo =  getDayOfWeek(-1)
const sevenDaysAgo =  getDayOfWeek(-1)


new Chart($('#hydration-bar-graph'), {
  type: 'bar',
  data: {
    labels: [sevenDaysAgo ,sixDaysAgo, fiveDaysAgo, fourDaysAgo, threeDaysAgo, twoDaysAgo, yesterday],
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

new Chart($('#sleep-bar-graph'), {
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


new Chart($('#sleep-donut'), {
  type: "pie",
  data: {
    datasets: [{
      backgroundColor: [
        "#3366CC",
        "#DC3912",
        "#FF9900",
        "#109618",
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

new Chart($('#activity-line-graph'), {
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
new Chart($('#steps-line-graph'), {
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
    
      ] ,
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
  })
  
  
  $('.footer-greeting-js').append(`Hello, <span id='footer-user-name'>${instantiatedUser.getFirstName()}</span>!  Your daily step goal is ${compareStepGoal(instantiatedUser)} average.`);
  
  $('.user-info').append( 
  `<p class='main-widget__address'>Address: ${instantiatedUser.address} </p>` +
  `<p class='main-widget__email'>Email: ${instantiatedUser.email} </p>` +
  `<p class='main-widget__Stride'>Stride: ${instantiatedUser.strideLength} </p>` +
  `<p class='main-widget__daily-step'>Daily Step Goal: ${instantiatedUser.dailyStepGoal}</p>` )

  $('.community-stats').append(`<p class='main-widget' id='community-stats'><h4 class=" center">Community Stats:</h4>Average User Steps: ${totalAverageSteps} <br> Average Minutes Active: ${totalAverageActivity} <br>
  Average Flights of Stairs: ${totalAverageStairs}</p>`)
});


$('.main-widget-hydration').append( 
  `<p class='main-widget'><h4 class=" center">Number of Oz Today:</h4> <span class='oz-styling'>${fluidIntakeByDate}</span> </p>`
)

$('.main-widget-activity').append(`<p class='main-widget'><h4 class="center">Latest Activity Stats:</h4><div class="sleep-data-styling">Distance (mi) walked yesterday: ${Number(distanceInMiles).toFixed(1)} </div> </p>`)


$(`<p class='main-widget'><h4 class=" center">Today's Sleep Stats:</h4><div class="sleep-data-styling">Hours Slept: ${sleepHoursByDate}  <br> Quality: ${sleepQualityByDate} / 5  </div> </p>`).insertAfter('#sleep-bar-graph')

