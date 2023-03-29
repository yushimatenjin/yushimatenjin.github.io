var AllowNotifications = pc.createScript("allowNotifications");

AllowNotifications.prototype.initialize = function () {
  this.entity.element.on("click", this.notifyMe, this);
};

function showNotification(title, options) {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options);
    notification.onclick = () => {
      // console.log('Notification clicked');
      alert("Notification clicked");
    };
  } else {
    console.error("Notification permission is not granted");
  }
}

AllowNotifications.prototype.notifyMe = function () {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    showNotification(`You have ${balance} coins !`, {
      body: "Click to play",
      icon: "/logo.png",
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(() => {
      if (Notification.permission === "granted") {
        alert("プッシュ通知が許可されました。");
        showNotification(`You have ${balance} coins !`, {
            body: "Click to play",
            icon: "/logo.png",
        });
      }
    });
  }
};
