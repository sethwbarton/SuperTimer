/*$(document).ready( function () {

  $('#submit').click( function (e) {

    e.preventDefault();
    today = new Date();
    targetDate = new Date($('#year').val(),$('#month').val(),$('#day').val());
    console.log(targetDate);

  });


});*/

var app = new Vue ({
  el: '#timerApp',
  data: {
    targetDate: '',
    currentDate: '',
    timeLeft: '',
    dateSelected: false,

  },

  computed: {
    seconds() {
    return (((this.timeLeft / 1000) % 60).toFixed(2));
  },

  minutes() {
    return Math.trunc((this.timeLeft / 1000) / 60) % 60;
  },

  hours() {
    return Math.trunc((this.timeLeft / 1000) / 60 / 60) % 24;
  },

  days() {
    return Math.trunc((this.timeLeft / 1000) / 60 / 60 / 24);
  }

  },

  methods: {
    setDate: function () {
      this.dateSelected = true;
      this.currentDate = new Date();
      this.targetDate =  new Date($('#year').val(),$('#month').val(),$('#day').val());
    },

    countDown: function () {
      this.timeLeft = this.targetDate -  new Date();
    }

  }

})

setInterval(app.countDown, 1)
