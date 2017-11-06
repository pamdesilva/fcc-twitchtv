var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

var logos = {
	'ESL_SC2': 'https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_image-d6db9488cec97125-70x70.jpeg',
	'OgamingSC2': 'https://static-cdn.jtvnw.net/jtv_user_pictures/ogamingsc2-profile_image-9021dccf9399929e-70x70.jpeg',
	'cretetion': 'https://static-cdn.jtvnw.net/jtv_user_pictures/cretetion-profile_image-12bae34d9765f222-70x70.jpeg',
	'freecodecamp': 'https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-70x70.png',
	'habathcx': 'https://static-cdn.jtvnw.net/jtv_user_pictures/habathcx-profile_image-d75385dbe4f42a66-70x70.jpeg',
	'RobotCaleb': 'https://static-cdn.jtvnw.net/jtv_user_pictures/robotcaleb-profile_image-9422645f2f0f093c-70x70.png',
	'noobs2ninjas': 'https://static-cdn.jtvnw.net/jtv_user_pictures/noobs2ninjas-profile_image-34707f847a73d934-70x70.png'
};

function getChannelData() {

	usernames.forEach(function(user) {
		$.ajax({
			url: "https://wind-bow.gomix.me/twitch-api/streams/" + user + "?callback?",
			dataType: 'jsonp',
			success: function(data) {
				var channelUrl = "https://go.twitch.tv/" + user;
				console.log(data);
				if (data.stream === null) {
					$('#channel-list').append(
						`<tr class="offline">
							<td><img src="${logos[user]}"></td>
							<td><a href="${channelUrl}" target="_blank">${user}</a></td>
							<td>Offline</td>
							</tr>`);
				} else {
					$('#channel-list').append(
						`<tr class="online">
							<td><img src="${logos[user]}"></td>
							<td><a href="${channelUrl}" target="_blank">${user}<br> <p class ="watch">Watch LIVE 👀</p></br></a></td>
							<td>${data.stream.channel.game}: ${data.stream.channel.status}</td>
							</tr>`);
				}
			}
		});
	});
}

$(document).ready(function() {

	getChannelData();

	// Show online channels only
	$('#btn-on').click(function() {
		$('.offline').hide();
		$('.online').show();
	});

	// Show offline channels only
	$('#btn-off').click(function() {
		$('.online').hide();
		$('.offline').show();
	});

	// Show all channels
	$('#btn-all').click(function() {
		$('.online').show();
		$('.offline').show();
	});

});
