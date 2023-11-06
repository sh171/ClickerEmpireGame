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

function mainGamePage(user) {
	let outerCon = document.createElement("div");
	outerCon.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center");
	let innerCon = document.createElement("div");
	innerCon.classList.add("bg-navy", "col-12", "col-md-10", "p-2");

	let leftCon = document.createElement("div");
	leftCon.classList.add("col-4", "bg-dark", "p-2")
	leftCon.append(burgerView());

	let rightCon = document.createElement("div");
	rightCon.classList.add("col-8");
	let bottomCon = document.createElement("div");

	rightCon.append(bottomCon);
	innerCon.append(leftCon, rightCon);
	outerCon.append(innerCon);

	return outerCon;
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