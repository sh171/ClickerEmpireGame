config = {
	initPage : document.getElementById("initPage"), 
	mainPage : document.getElementById("mainPage")
}

class UserAccount {
	constructor(name, age, money, days, burgerCount, burgerPerPrice, earnMoneyPerSec, items) {
		this.name = name;
		this.age = age;
		this.money = money;
		this.days = days;
		this.burgerCount = burgerCount;
		this.burgerPerPrice = burgerPerPrice;
		this.earnMoneyPerSec = earnMoneyPerSec;
		this.items = items;
	}

	burgerIncome() {
		this.burgerCount++;
		this.money += this.burgerPerPrice;
	}

	dayTime() {
		this.days++;
		if (this.days % 365 == 0) this.age++;
	}

	purchaseItem(price, cntVal, index) {
		this.money -= price;
		this.items[index].currAmount += cntVal;
	}

	updateEarnMoney(price, cntValue, i) {
        if (this.items[i].type === "ability") {
            this.burgerPerPrice += this.items[i].perPrice * cntValue;
        }
        else if (this.items[i].type === "investment") {
            if (this.items[i].name === "ETF Stock") {
                this.items[i].price = Math.floor(this.items[i].price * Math.pow(1 + this.items[i].perPrice, cntValue));
                this.earnMoneyPerSec += Math.floor(price * this.items[i].perPrice);
            }
            else if (this.items[i].name === "ETF Bond") {
                this.earnMoneyPerSec += Math.floor(price * this.items[i].perPrice);
            }
        }
        else if (this.items[i].type === "realEstate") {
            this.earnMoneyPerSec += this.items[i].perPrice * cntValue;
        }
    }

    incomeGain() {
    	this.money += this.earnMoneyPerSec;
    }
}

class Items {
	constructor(name, type, currAmount, maxAmount, perPrice, price, imgUrl) {
		this.name = name;
		this.type = type;
		this.currAmount = currAmount;
		this.maxAmount = maxAmount;
		this.perPrice = perPrice;
		this.price = price;
		this.imgUrl = imgUrl;
	}
}

function initializeItem() {
	let itemList = [
		new Items("Flip Machine", "ability", 0, 500, 25, 15000, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"), 
	    new Items("ETF Stock", "investment", 0, Infinity, 0.1, 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"), 
	    new Items("ETF Bond", "investment", 0, Infinity, 0.07, 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"), 
	    new Items("Lemonade Stand", "realEstate", 0, 1000, 30, 30000, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"), 
	    new Items("Icd Cream Truck", "realEstate", 0, 500, 120, 100000, "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"), 
	    new Items("House", "realEstate", 0, 100, 32000, 20000000, "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png"), 
	    new Items("TownHouse", "realEstate", 0, 100, 64000, 40000000, "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png"), 
	    new Items("Mansion", "realEstate", 0, 20, 500000, 250000000, "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png"), 
	    new Items("Industrial Space", "realEstate", 0, 10, 2200000, 1000000000, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"), 
	    new Items("Hotel Skyscraper", "realEstate", 0, 5, 25000000, 10000000000, "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png"), 
	    new Items("Bullet-Speed Sky RailWay", "realEstate", 0, 1, 30000000000, 10000000000000, "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png") 
	]
	return itemList;
}

function initializeData(userName) {
    let user = new UserAccount(
        userName, 
        20, 
        50000, 
        0, 
        0, 
        25, 
        0, 
        initializeItem()
    )
    return user;
}

function initialize() {
    let newGameBtn = config.initPage.querySelectorAll("#newGame")[0];            
    newGameBtn.addEventListener("click", function(e){
        e.preventDefault();
        let name = config.initPage.querySelector(`input[name="playerName"]`).value;
        if (name == "") {
            alert("Please put your name");
        }
        else {
            let user = initializeData(name);
            gameStart(user);
        }
    })

    let loginBtn = config.initPage.querySelectorAll("#login")[0];
    loginBtn.addEventListener("click", function(e){
        e.preventDefault();
        let name = config.initPage.querySelector(`input[name="playerName"]`).value;
        if(name == "") {
            alert("Please put your name");
        } 
        else {
            let user = getData(name);
            let userData = loading(user);
            if (user == null) alert("There is no data.");
            else gameStart(userData);
        }            
    })
}

function loading(user) {
    let userAccount = new UserAccount(
        user.name, 
        user.age, 
        user.money, 
        user.days, 
        user.burgerCount, 
        user.burgerPerPrice, 
        user.earnMoneyPerSec, 
        user.items
    )
    return userAccount;
}

function gameStart(user) {
    config.initPage.classList.add("d-none");
    config.mainPage.append(mainGamePage(user));
    
    startTimer(user)
}

function burgerView(user) {
	let container = document.createElement("div");
	container.innerHTML = 
	`
		<div id="burger">
			<div class="bg-navy text-white text-center">
				<p>${user.burgerCount} Burgers</p>
				<p>￥${user.burgerPerPrice}/click</p>
			</div>
			<div class="d-flex justify-content-center">
				<img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width="80%" class="hover move-on-click" id="burger" alt="burger">
			</div>
		</div>
	`
	let clickB = container.querySelectorAll("#burger")[0];
	clickB.addEventListener("click", function() {
		updateBurgerAmount(user);
	});
	return container;
}

function playerView(user) {
	let container = document.createElement("div");
	container.innerHTML = 
	`
		<div id="player">
			<div class="d-flex flex-wrap text-white text-center p-1">
				<div class="col-6 bg-navy b-dark">
					<p>${user.name}</p>
				</div>
				<div class="col-6 bg-navy b-dark">
					<p>${user.age}</p>
				</div>
				<div class="col-6 bg-navy b-dark">
					<p>${user.days} days</p>
				</div>
				<div class="col-6 bg-navy b-dark">
					<p>￥${user.money}</p>
				</div>
			</div>
		</div>
	`
	return container;
}

function itemsView(user) {
	let container = document.createElement("div");
	container.classList.add("bg-dark", "scrollbar");
	for (let i=0; i<user.items.length; i++) {
		container.innerHTML += 
		` 
			<div class="d-flex align-items-center bg-navy m-2 items-click" id="itemBtn">
				<div class="d-none d-sm-block">
					<img src="${user.items[i].imgUrl}" class="img-fixed">
				</div>
				<div class="col-sm-9">
					<div class="d-flex justify-content-between text-white">
						<h4>${user.items[i].name}</h4>
						<p>${user.items[i].currAmount}</p>
					</div>
					<div class="d-flex justify-content-between">
						<p class="text-white">￥${user.items[i].price}</p>
						<p class="text-success">￥${user.items[i].perPrice}/${getItemType(user.items[i].type)}</p>
					</div>
				</div>
			</div>
		`
	}

	for (let i=0; i<user.items.length; i++) {
		container.querySelectorAll("#itemBtn")[i].addEventListener("click", function() {
			container.innerHTML = "";
			container.append(itemPurchaseView(user, i));
		});
	}
	return container;
}

function itemPurchaseView(user, i) {
	let container = document.createElement("div");
	container.innerHTML = 
	`
		<div class="bg-navy m-2 p-2 text-white">
			<div class="d-flex justify-content-center align-items-center col-12">
				<div class="col-6">
					<h4>${user.items[i].name}</h4>
					<p>Max purchases: ${user.items[i].maxAmount}</p>
					<p>Price: ￥${user.items[i].price}</p>
					<p>Get ￥${user.items[i].perPrice}/${getItemType(user.items[i].type)}</p>
				</div>
				<div class="col-6">
					<img src="${user.items[i].imgUrl}" class="img-fixed">
				</div>
			</div>
			<p>How many would you like to buy?</p>
			<input class="col-12 number-input" type="number" name="" placeholder="0" min="1" max=${user.items[i].maxAmount}>
			<p class="text-right" id="totalPrice">total: ￥0</p>
			<div class="d-flex mb-3">
				<div class="col-6 pl-0">
					<button type="button" class="btn btn-outline-primary bg-light col-12 back-Btn">Go Back</button>
				</div>
				<div class="col-6 pr-0">
					<button type="button" class="btn btn-primary col-12 purchase-Btn">purchase</button>
				</div>
			</div>
		</div>
	`

	let backBtn = container.querySelectorAll(".back-Btn")[0];
	backBtn.addEventListener("click", function() {
		container.innerHTML = "";
		container.append(itemsView(user));
	});

	let numberInput = container.querySelectorAll(".number-input")[0];
	numberInput.addEventListener("change", function() {
		document.getElementById("totalPrice").innerHTML = "total: ￥" + getTotalPrice(user.items[i], numberInput.value);
	});

	let purchaseBtn = container.querySelectorAll(".purchase-Btn")[0];
	purchaseBtn.addEventListener("click", function() {
		let totalPrice = getTotalPrice(user.items[i], parseInt(numberInput.value));
        if (user.money < totalPrice) alert("You don't have enough money.");
        else if (user.items[i].maxAmount < parseInt(numberInput.value) + user.items[i].currAmount) alert("You can't buy anymore.");
        else if (numberInput.value == 0 || numberInput.value < 0) alert("Invalid Number");
        else {
            user.purchaseItem(totalPrice, parseInt(numberInput.value), i);
            user.updateEarnMoney(totalPrice, numberInput.value, i);

            config.mainPage.innerHTML = "";
            config.mainPage.append(mainGamePage(user));
        }
	});
	return container;
}

function getTotalPrice(item, cntVal) {
	let total = 0;
	if (item.name === "ETF Stock") {
		// Every purchase increases the price by 10%
        for (let i=0; i<cntVal; i++) {
            total += Math.floor(item.price * Math.pow(1 + item.perPrice, i));
        }
        return total;
    }
    else if (cntVal > 0) return total += item.price * cntVal;
    else return total;
}

function resetSaveView(user) {
	let container = document.createElement("div");
	container.innerHTML = 
	`
		<div class="d-flex justify-content-end pt-2">
			<div class="b-white text-white p-2 mr-2 hover move-on-click" id="reset">
				<i class="fa-solid fa-arrow-rotate-left fa-2x"></i>
			</div>
			<div class="b-white text-white p-2 hover move-on-click" id="save">
				<i class="fa-regular fa-floppy-disk fa-2x"></i>
			</div>
		</div>
	`

	let resetBtn = container.querySelectorAll("#reset")[0];
	resetBtn.addEventListener("click", function() {
		alert("RESET DATA");

		let resetUser = initializeData(user.name);
        stopTimer();
        config.mainPage.innerHTML = "";
        config.mainPage.append(gameStart(resetUser));
	});

	let saveBtn = container.querySelectorAll("#save")[0];
	saveBtn.addEventListener("click", function() {
		saveData(user);
		stopTimer();
		config.initPage.classList.remove("d-none");
		config.mainPage.innerHTML = "";
	});

	return container;
}

function getItemType(type) {
	if (type === "ability") return "click";
    else if (type === "investment") return "sec";
    else if (type === "realEstate") return "sec";
}

function mainGamePage(user) {
	let outerCon = document.createElement("div");
	outerCon.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center");
	let innerCon = document.createElement("div");
	innerCon.classList.add("bg-navy", "col-12", "col-md-10", "p-2", "d-flex");

	let leftCon = document.createElement("div");
	leftCon.classList.add("col-4", "bg-dark", "p-2")
	leftCon.append(burgerView(user));

	let rightCon = document.createElement("div");
	rightCon.classList.add("col-8");
	rightCon.append(playerView(user));
	rightCon.append(itemsView(user));
	rightCon.append(resetSaveView(user));

	innerCon.append(leftCon, rightCon);
	outerCon.append(innerCon);

	return outerCon;
}

function startTimer(user) {
	timerInterval = setInterval(function() {
		user.dayTime();
		user.incomeGain();
		updatePlayerInfo(user);
	}, 1000)
}

function stopTimer() {
	clearInterval(timerInterval);
}

function updatePlayerInfo(user) {
	let playerId = config.mainPage.querySelectorAll("#player")[0];
	playerId.innerHTML = "";
	playerId.append(playerView(user));
}

function updateBurgerView(user) {
	let burgerId = config.mainPage.querySelectorAll("#burger")[0];
	burgerId.innerHTML = "";
	burgerId.append(burgerView(user));
}

function updateBurgerAmount(user) {
	user.burgerIncome();

	updateBurgerView(user);
	updatePlayerInfo(user);
}

function saveData(user) {
	let userJsonString = JSON.stringify(user);
    localStorage.setItem(user.name, userJsonString);
    alert("Saved");
}

function getData(userName) {
    let userLocalStorage = JSON.parse(localStorage.getItem(userName));
    return userLocalStorage;
}

initialize();