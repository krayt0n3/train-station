
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCmMU5GqooGJMGgAALH0uLKKo7k4gOFkLo",
    authDomain: "train-scheduling-122ea.firebaseapp.com",
    databaseURL: "https://train-scheduling-122ea.firebaseio.com",
    projectId: "train-scheduling-122ea",
    storageBucket: "train-scheduling-122ea.appspot.com",
    messagingSenderId: "155924952153"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  


  $("#submit").click(function(event) {
    event.preventDefault();
    let train = $("#train-name").val();
    let destination = $("#destination").val();
    let time = $("#train-time").val();
    let split = time.split(':');
    let frequency = $("#frequency").val();
    var current = new Date();
    var year = current.getFullYear();
    var month = current.getMonth();
    var day = current.getDate();
    var hour = split[0];
    var min = split[1];
    var trainTime = new Date(year, month, day, hour, min);
    var currentTimeStamp = moment(current).unix();
    var timestamp = moment(trainTime).unix();
    var convertedCurrent = moment(current).format('hh:mm');
    var convertedtrainTime = moment(trainTime).format('hh:mm');
    var difference = $((currentTimeStamp - timestamp));
    var str = JSON.stringify(difference);
    var increment = $((timestamp + frequency * 60 * 1000));
    var arrival = moment(increment).format('hh:mm');
    console.log(moment(increment).format('hh:mm')); 
    console.log(current);
    console.log(convertedCurrent);
    console.log(convertedtrainTime);
      
    database.ref().push({
      train: train,
      destination: destination,
      frequency: frequency,
      arrival: arrival,
      difference: difference
    });
  });
  
  database.ref().on(
    "child_added",
    function(snapshot) {
      console.log(snapshot.val());
      var months = moment(snapshot.val().startDate, "MM/DD/YYYY");
      //var now = moment().format(date);
      let today = moment();
      let difference = today.diff(months, "months");
      var totalBilled = difference * snapshot.val().monthlyRate;
  
      //console.log(difference);
  
      $("tbody").append(`
        <tr>
            <td id="employee-name">${snapshot.val().train}</td>
            <td id="place">${snapshot.val().destination}</td>
            <td id="multiple">${snapshot.val().frequency}</td>
            <td id="multiple">${snapshot.val().arrival}</td>
            <td id="multiple">${snapshot.val().difference}</td>
            <hr>
        </tr>
      `);
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );