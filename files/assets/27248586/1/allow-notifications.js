var AllowNotifications = pc.createScript("allowNotifications");

AllowNotifications.prototype.initialize = function () {
    this.entity.element.on("click", this.notifyMe, this);
};

AllowNotifications.prototype.notifyMe = function () {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    if (Notification.permission === "granted") {
        new Notification(`You have ${balance} coins !`);
    }

    if (Notification.permission !== "denied") {
        Notification.requestPermission().then(() => {
            new Notification(`You have ${balance} coins !`, {
                body: `You have ${balance} coins !`
            });
        });
    }
};