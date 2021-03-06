require('dotenv').config();
const express   = require('express');
const request   = require('request');
const rp        = require('request-promise');
const q         = require('q');

const app         = express();

const battleTag     = 'Toothonius-1398'
const requestParams = {
  method: 'GET'
, url: ''
, json: true
, qs: {
    
    // EVENTUALLY CHANGE LOCALE (should default to US)
    locale: 'en_US'
  , apikey: process.env.DIABLO_KEY
  }
}


// get account info
app.get('/api/account/:battleTag', function(req, res) {
  const deferred  = q.defer();
  let battleTag   = req.params.battleTag;
  let reqParams   = requestParams;
  reqParams.url   = 'https://us.api.battle.net/d3/profile/' + battleTag + '/';
  
  rp(reqParams)
  .then(function(data) {
    let appData = pruneAcctData(data);
    deferred.resolve(res.send({data: appData}));
  })
  .catch(function(err) {
    console.log('error in get account info', err);
    deferred.reject(res.send({err: err}) );
  })
  
  return deferred.promise;
});

// get single char info
app.get('/api/character/:battleTag/:charId', function(req, res) {
  const deferred  = q.defer();
  let battleTag   = req.params.battleTag;
  let charId      = req.params.charId;
  let reqParams   = requestParams;
  reqParams.url   = 'https://us.api.battle.net/d3/profile/' + battleTag + '/hero/' + charId
  
  rp(reqParams)
  .then(function(data) {
    deferred.resolve(res.send({data: data}));
  })
  .catch(function(err) {
    console.log('error in get single char',err);
    deferred.reject(err);
  });

  return deferred.promise;
});

const port = process.env.PORT || 9001;

app.listen(port, function() {
  console.log(`express app listening on port ${port}`);
});

function pruneAcctData(data) {
  return {
    battleTag               : data.battleTag
  , guildName               : data.guildName
  , heroes                  : data.heroes
  , highestHardcoreLevel    : data.highestHardcoreLevel
  , paragonLevel            : data.paragonLevel
  , timePlayed              : data.timePlayed
  };
}