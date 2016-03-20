$(document).ready(function() {
  var apiLink = "https://api.twitch.tv/kraken/streams/";
  var channels = ["freecodecamp", "habathcx", "thomasballinger", "noobs2ninjas", "brunofin", "comster404", "ESL_SC2"];
  var channel = "";
  var callback = "?callback=?";

  for (var i = 0; i < channels.length; i++) {
    (function(i) { //  function protects i from async changes
      var offlineHTML = "", onlineHTML = "", html1 = "", html2 = "";
      $.getJSON(apiLink + channels[i] + callback, function(data) {

        offlineHTML = "<p class='channel offline lead'><a href='http://www.twitch.tv/";
        onlineHTML = "<p class='channel online lead'><a href='http://www.twitch.tv/"

        if (data.status === 422) {
          // channel no longer exists
          //console.log(channels[i] + " is dead");
          $("#streamers-box").html($("#streamers-box").html() + offlineHTML + channels[i] + "' target='_blank'>" + channels[i] + "</a>: this account has been deactivated</p>");
        } else if (data.stream === null) {
          // channel is offline
          //console.log(channels[i] + " is offline");
          $("#streamers-box").html($("#streamers-box").html() + offlineHTML + channels[i] + "' target='_blank'>" + channels[i] + "</a> is offline</p>");
        } else {
          // channel is online
          //console.log(channels[i] + " is online streaming: " + data.stream.channel.status);
          $("#streamers-box").html($("#streamers-box").html() + onlineHTML + channels[i] + "' target='_blank'>" + channels[i] + "</a> is online streaming:<br><small><em>" + data.stream.channel.status + "</em></small></p>");
        }
      });
    })(i);
  }
  
  $("button").click(function() {
    if (this.id === "button-online") {
      // toggle online items
      $(".online").toggle();
    } else {
      // toggle offline items
      $(".offline").toggle();
    }
  });
});