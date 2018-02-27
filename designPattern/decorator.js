function Monkey() {
    console.log('泼猴出生');
}

Monkey.prototype = {
    sayName: function () {
        console.log('我是天生石猴');
    },
    attack: function () {
        console.log('挠你...');
    },
    defend: function () {
        console.log('我跳跳跳');
    }
};

// 装饰器方法
function Decorator(monkey) {
    this.monkey = monkey;
}

Decorator.prototype = {
    sayName: function () {
        this.monkey.sayName();
    },
    attack: function () {
        this.monkey.attack();
    },
    defend: function () {
        this.monkey.defend();
    }
};

// 为每一个功能创建装饰者对象
var DecorateGoldenCudgel = function (monkey) {
    Decorator.call(this, monkey);
    console.log('获得金箍棒');
};
DecorateGoldenCudgel.prototype = new Decorator(monkey);
DecorateGoldenCudgel.prototype.sayName = function () {
    console.log('我有金箍棒了');
};
DecorateGoldenCudgel.prototype.attack = function () {
    console.log('吃俺老孙一棒');
    this.monkey.attack();
};

// 为每一个功能创建装饰者对象
var DecorateSharpEyes = function (monkey) {
    Decorator.call(this, monkey);
    console.log('获得火眼金睛');
};
DecorateSharpEyes.prototype = new Decorator(monkey);
DecorateSharpEyes.prototype.sayName = function () {
    console.log('我是孙行者');
};
DecorateSharpEyes.prototype.findMonster = function () {
    console.log('妖怪，现身');
    this.monkey.attack();
};

// 使用装饰器来装饰泼猴
var monkey = new Monkey();
monkey.sayName();
monkey.attack();
monkey.defend();

var monkeyGod = new DecorateGoldenCudgel(monkey);
monkeyGod.sayName();
monkeyGod.attack();

var monkeySun = new DecorateSharpEyes(monkey);
monkeySun.sayName();
monkeySun.findMonster();

// TODO：？？？
/*function sayYourName(target, key, descriptor) {
    descriptor.value = ()=> {
        console.log('我是泼猴');
    };
    console.log('报上名来！');
    return descriptor;
}

class Monkey {
    // ES7 中装饰器
    @sayYourName
    toString() {}
}

const monkey = new Monkey();
monkey.toString();
// 依次打印出：报上名来！我是泼猴
*/




