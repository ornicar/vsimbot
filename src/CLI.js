'use strict';

var bot;

var commands = {
  connect: function() { bot.connect(function() { console.log('*** connected.'.info); }); },
  disconnect: function() { bot.disconnect(); },
  join: function(channel) { bot.join(channel); },
  part: function(channel) { bot.part(channel); },
  say: function(args) {
    var matches = args.match(/^(#\w+)\s(.*)/); // #[channelname] [message]
    var channel, message;

    if (!matches) { return; }

    channel = matches[1];
    message = matches[2];

    bot.say(channel, message);
  }
};

var CLI = {
  init: function(ircClient) {
    if (typeof ircClient === 'undefined') { return; }

    bot = ircClient;

    process.openStdin().on('data', function(chunk) {
      var chunk = chunk + '';
      var matches = chunk.match(/^\/(\w+)\s(.*)/);
      var command, args;

      if (!matches) { return; }

      command = matches[1];
      args = matches[2];

      if (command in commands) {
        commands[command](args);
      } else {
        console.log('Unrecognized command: %s'.error, command);
      }
    });
  }
};

console.message = function() {
  console.log.call(this, arguments);
};



module.exports = CLI;
