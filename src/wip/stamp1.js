import StampIt from '../../../lazer/node_modules/stampit/dist/stampit.js';

//  stampit test 1

const Logger = stampit({
  methods: {
    log: console.log
  }
});

Logger.log('booyaa');
