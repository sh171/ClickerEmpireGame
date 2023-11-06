config = {
	initPage : document.getElementById("initPage"), 
	mainPage : document.getElementById("mainPage")
}

class UserAccount {
	constructor(name, age, money, days, items) {
		this.name = name;
		this.age = age;
		this.money = money;
		this.days = days;
		this.items = items;
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

const itemList = [
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


// let user = new UserAccount("Makoto", 20, 50000, 0, itemList);
// console.log(user)

function initialize() {
	let form = document.getElementById("userInfo")
	let user = new UserAccount(
		form.querySelectorAll(`input[name="playerName"]`)[0].value, 
		20, 
		50000, 
		0, 
		itemList
	)
	console.log(user)

	config.initPage.classList.add("d-none");
	config.mainPage.append(mainGamePage(user));
}

function burgerView() {
	let container = document.createElement("div");
	container.innerHTML = 
	`
		<div>
			<div class="bg-navy text-white text-center">
				<p>0 Burgers</p>
				<p>￥25/click</p>
			</div>
			<div class="d-flex justify-content-center">
				<img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width="80%" class="hover move-on-click" alt="burger">
			</div>
		</div>
	`
	return container;
}

function playerView(user) {
	let container = document.createElement("div");
	container.innerHTML = 
	`
		<div>
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
			console.log(user.items[i].name);
		});
	}

	return container;
}

function resetSaveView() {
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
		alert("reset btn");
	});

	let saveBtn = container.querySelectorAll("#save")[0];
	saveBtn.addEventListener("click", function() {
		alert("save btn");
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
	rightCon.append(resetSaveView());

	innerCon.append(leftCon, rightCon);
	outerCon.append(innerCon);

	return outerCon;
}

