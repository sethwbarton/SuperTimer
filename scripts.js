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
  },

  targetFormatted() {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = this.targetDate.getDate();
    var monthIndex = this.targetDate.getMonth();
    var year = this.targetDate.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;

  },
  created: function() {
    this.getItems();
  },

  },

  methods: {
    setDate: function () {
      this.dateSelected = true;
      this.currentDate = new Date();
      this.targetDate =  new Date($('#year').val(),$('#month').val() - 1,$('#day').val());
      // Add this item to the server.
      axios.post("/api/items", {
        targetDate: this.targetDate,
        timeLeft: this.timeLeft,
        currentDate: this.currentDate,
      }).then(response => {
        this.text = "";
        this.priorityLevel = "";
        this.getItems();
        return true;
      }).catch(err => {
      });
    },

    countDown: function () {
      this.timeLeft = this.targetDate -  new Date();
    },

    DeleteTimer: function () {
      // Deletes a timer from the server.
    },
    getItems: function() {
        axios.get("/api/items").then(response => {
        this.items = response.data;
        return true;
      }).catch(err => {
      });
    },

  }

})

setInterval(app.countDown, 1)
