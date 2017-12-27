//passprot module用第3方驗證處理模組
//@author Ryo
/*jshint esversion: 6 */
(function() {
  'use strict';
 
 
 const SECRET = require('../config.json');
 
 let FacebookStrategy = require('passport-facebook').Strategy;
 
 module.exports = function(passport){

   passport.serializeUser(function(sToken, callback){
     callback(null, sToken);
   });
   passport.deserializeUser(function(sToken, callback){
     callback(null, sToken);
   });

   passport.use(new FacebookStrategy({
     clientID : SECRET.clientID, //應用程式編號
     clientSecret : SECRET.clientSecret, //應用程式金鑰
     callbackURL : SECRET.callbackURL //FB回呼URL
   },
   function(accessToken, refreshToken, profile, callback){
 
     console.log('FB accessToken',accessToken);
     console.log('FB profile', profile);

     return callback(null, accessToken);
   }));
 
 };
 
 }());
 