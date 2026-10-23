// Must be served from the site ROOT: https://your-site/firebase-messaging-sw.js
// Settings are read from config.js (the only file you edit).
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js","/config.js");
firebase.initializeApp(TA_CONFIG.firebase);
const messaging=firebase.messaging();
// The server sends data-only messages, so we show the notification ourselves
messaging.onBackgroundMessage(function(p){
  var d=p.data||{};
  self.registration.showNotification(d.title||"Thamheed Academy",{
    body:d.body||"",icon:"/icon-192.png",badge:"/icon-192.png",data:{url:d.url||"/"}});
});
self.addEventListener("notificationclick",function(e){
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url||"/"));
});
