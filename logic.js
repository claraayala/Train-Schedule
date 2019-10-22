var config = 
{
    apiKey: "AIzaSyAaKJ9zG5AVN3CLwNYwDvVj8iPAx0zEz-Q",
    authDomain: "https://train-scheduler-9ac1e.firebaseapp.com/",
  databaseURL: "https://train-scheduler-9ac1e.firebaseio.com/",  
  storageBucket: "train-scheduler-9ac1e.appspot.com",
  messagingSenderId: "495413106344"
};

firebase.initializeApp(config);

var trainData = firebase.database();

$("#addTrainBtn").on("click", function(){
var trainName = $("#trainNameInput").val.trim();
var destination = $("#destinationInput").val.trim();
var firstTrain = moment($("#firstTrainInput").val.trim(),"HH:mm").subtract(10,"years").format("X");
var frequency = $("#frequencyInput").val.trim();


var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
}

trainData.ref().push(newTrain);

alert("train added!");

$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#firstTrainInput").val("");
$("#frequencyInput").val("");

return false;
})

trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
var destination = snapshot.val().destination;
var firstTrain = snapshot.val().firstTrain;
var frequency = snapshot.val().frequency ;


var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
var minutes = frequency - remainder;
var arrival = moment().add(minutes,"m").format("hh:mm A");

cosole.log(remainder);
cosole.log(minutes);
cosole.log(arrival);

$("#trainTable > tBody").append("<tr><td>"+name+"</tr></td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

})