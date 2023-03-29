var AllowNotifications = pc.createScript("allowNotifications");

// initialize code called once per entity
AllowNotifications.prototype.initialize = function () {
  if (!window.matchMedia("(display-mode: standalone)").matches) {
    this.entity.element.on(
      "click",
      () => {
        this.notifyMe();
      },
      this
    );
  } else {
  }

  // this.entity.element.on("click", () => {
  //     alert("Element notification ons")
  // })
};
AllowNotifications.prototype.notifyMe = function () {
  // Let's check if the browser supports notifications
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification");
  //   }

  // Let's check whether notification permissions have already been granted
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification(`You have ${balance} coins !`);
  }

  // Otherwise, we need to ask the user for permission
//   if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new Notification("Hi there!");
      }
    });
//   }
};
