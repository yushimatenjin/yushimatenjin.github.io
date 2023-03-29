var AllowNotifications = pc.createScript("allowNotifications");

AllowNotifications.prototype.initialize = function () {
    this.entity.element.on("click", this.notifyMe, this);
};

function showNotification(title, options) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, options);
      notification.onclick = () => {
        // console.log('Notification clicked');
        alert("Notification clicked")
      };
    } else {
      console.error('Notification permission is not granted');
    }
  }
  

AllowNotifications.prototype.notifyMe = function () {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

        showNotification(`You have ${balance} coins !`, {
            body: "Click to play",
            icon: "/logo.png"
        });


    if (Notification.permission !== "denied") {
        Notification.requestPermission().then(() => {
            if(Notification.permission === "granted") {

               alert("Granted");
               showNotification(`You have ${balance} coins !`, {});
            }
        });
    }
};