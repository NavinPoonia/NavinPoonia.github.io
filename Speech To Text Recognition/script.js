function runSpeechRecognition() {
    var textbox = document.getElementById("textbox");
    var button= document.getElementById("button");
    var instructions = document.getElementById("instructions");
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.continuous=true;
    recognition.onstart = function() {
        button.innerHTML = "<small>Please speak...</small>";
        instructions.innerHTML="";
    };
    recognition.onspeechend = function() {
        recognition.stop();
    }
    recognition.onresult = function(event) {
        var confidence = event.results[0][0].confidence;
        var transcript = event.results[0][0].transcript;
        textbox.innerText = "Your Text : "+ transcript;
        if (confidence>0.75) {
            instructions.innerHTML = "<br/> <b>You spoke well, your Confidence is :</b> " + confidence*100+"%";
        }
        else{
            instructions.innerHTML = "<br/> <b>Please Speak Louder and Clear,Your Confidence Level is :</b> " + confidence*100+"%";
        }
        button.innerHTML = "<small>Start Again</small>";
    };
    recognition.start();
}