
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
    let frequency = $("#frequency").val();
  
    database.ref().push({
      train: train,
      destination: destination,
      frequency: frequency
    });
  });
  
  database.ref().on(
    "child_added",
    function(snapshot) {
      console.log(snapshot.val());
      var months = moment(snapshot.val().startDate, "MM/DD/YYYY");
      var now = moment().format(date);
      let today = moment();
      let difference = today.diff(months, "months");
      var totalBilled = difference * snapshot.val().monthlyRate;
  
      console.log(difference);
  
      $("tbody").append(`
        <tr>
            <td id="employee-name">${snapshot.val().train}</td>
            <td id="place">${snapshot.val().destination}</td>
            <td id="multiple">${snapshot.val().frequency}</td>
            <hr>
        </tr>
      `);
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );