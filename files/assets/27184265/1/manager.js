/*jshint esversion: 6, asi: true, laxbreak: true*/
const Manager = pc.createScript("manager");

// Coins
Manager.attributes.add("Coins", { type: "entity", array: true });

// Main
Manager.attributes.add("Balance", { type: "entity" })
let balance = 30;
let limit = 5;

// Utils
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Slots
Manager.attributes.add("probabilityOf", { type: "number", default: 50 });
let stockLimit = 3;
let stock = 0;
let isRotating = false;

Manager.prototype.initialize = function () {
    this.coinManager();
    this.mainManager();
    this.slotManager();
    this.menuManager();
    this.app.fire("main:limit:sync")
    this.app.fire("main:balance:sync")
    this.app.fire("main:stock:sync")
    setInterval(() => {
        if (balance < 5) {
            this.app.fire("main:balance:add");
        }
        this.app.fire("main:limit:add")
    }, 700)

    setInterval(() => {
        if (stock > 0 && !isRotating) {

            this.app.fire("main:stock:take");
        }
    }, 1000)
};

Manager.prototype.menuManager = function(){
    // this.app.on("game:")
}

Manager.prototype.slotManager = function () {
    const lottery = () => {
        if (Math.random() * 100 < this.probabilityOf) {
            return true;
        }
        return false;
    }
    // Stock
    this.app.on("main:stock:sync", () => {
        const stocks = this.app.root.findByTag("stock");
        for (const [index, val] of stocks.entries()) {
            if (stock > index) {
                val.script.barscrollingTexture.speed.y = 3
            } else {
                val.script.barscrollingTexture.speed.y = 0.3
            }
        }
    })
    this.app.on("main:stock:add", () => {
        if (stock >= stockLimit) return;
        stock = stock + 1
        this.app.fire("main:stock:sync")
    })
    this.app.on("main:stock:take", () => {
        if (stock < 0) return;
        stock = stock - 1;
        this.app.fire("game:slot:start");
        this.app.fire("main:stock:sync")
    })

    // Slots
    this.app.on("game:slot:start", async () => {
        //  [x] 回転の処理を加える
        isRotating = true
        await delay(3000)
        this.app.fire("game:slot:stop")


    })

    this.app.on("game:slot:win", async (type = 3) => {
        // winのときの処理
        // this.app.fire("game:slot:stop")
        const array = new Array(9);
        for (let val of array) {
            await delay(100);
            const x = Math.random() * (2 - (-2)) + (-2)
            const y = Math.random() * (6 - (5)) + (5)

            const position = new pc.Vec3(x, y, 1)
            this.app.fire("game:coin:create", position, type)
        }
    })
    this.app.on("game:slot:rotate:all", () => {

    })

    this.app.on("game:slot:stop", async () => {
        const stopOffsets = [0, 0.25, 0.5, 0.75, 1];

        const isWin = lottery()
        const offset = stopOffsets[Math.floor(Math.random() * stopOffsets.length)];
        const reels = this.app.root.findByTag("reel");
        isRotating = false;
        if (isWin) {
            this.app.fire("game:slot:win")
            for (let reel of reels) {
                reel.script.reelscrollingTexture.stop(offset)
            }
        } else {
            for (let reel of reels) {
                const random = stopOffsets[Math.floor(Math.random() * stopOffsets.length)];
                console.log(random, "random")
                console.log(reel)
                reel.script.reelscrollingTexture.stop(random)
            }
        }
        await delay(2000)
    })


}
Manager.prototype.mainManager = function () {
    this.app.on("main:balance:sync", () => {
        this.Balance.element.text = String(balance)
    })
    this.app.on("main:balance:add", () => {
        balance = balance + 1;
        this.app.fire("main:balance:sync")

    })
    this.app.on("main:balance:take", () => {
        balance = balance - 1;
        this.app.fire("main:balance:sync")
        this.app.fire("main:limit:take")

    })
    this.app.on("main:limit:sync", () => {
        const limits = this.app.root.findByTag("limit");
        for (const [index, val] of limits.entries()) {
            if (limit > index) {
                val.element.opacity = 1;
            } else {
                val.element.opacity = 0.56;
            }

        }
    })
    this.app.on("main:limit:add", () => {
        if (limit >= 5) return;
        limit = limit + 1;
        this.app.fire("main:limit:sync")

    })
    this.app.on("main:limit:take", () => {
        if (limit < 0) return;
        limit = limit - 1;
        this.app.fire("main:limit:sync")


    })

}

Manager.prototype.coinManager = function () {
    this.app.on(
        "game:coin:create",
        (position, type = 0) => {
            if (type === 0) {
                if (balance > 0 && limit > 0) {
                    const coin = this.Coins[type].clone();
                    coin.setPosition(position);
                    coin.enabled = true;
                    this.app.fire("main:balance:take")
                }
            }
            if (type === 3) {
                const coin = this.Coins[type].clone();
                coin.setPosition(position);
                coin.enabled = true;
            }

        },
        this
    );

    this.app.on(
        "game:coin:delete",
        entity => {
            entity.destroy();
        },
        this
    );
};
