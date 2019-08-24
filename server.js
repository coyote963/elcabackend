var app = require('./app');
var PORT = process.env.PORT || 3000;



var server = app.listen(PORT, function() {
	console.log('Express server listening on port ' + PORT);
});
const io = require("socket.io")(server)
io.on("connection", socket => {
	console.log(socket.id)
	socket.on('SEND_MESSAGE', function (data) {
		io.emit('RECEIVE_MESSAGE', data)
	})
	socket.on('DISCONNECT', () => {
		io.emit('DISCONNECT')
	})
	socket.on('JOIN', (data) => {
		io.emit('RECEIVE_MESSAGE', {first_name : data.first_name,
			last_name : data.last_name,
			first_name : data.first_name,
			message : 'has joined',
			type : 'join'
		})
	})
})