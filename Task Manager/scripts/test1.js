

// Object literal

let dog={
    name: "Wayne",
    age: 3,
    color:"red"

};

let cat={
    name: "fred",
    age: 5
}

console.log(dog);
console.log(cat);


//object Constructor

function Pet(name, age, color){
    this.name=name; //this is equal to name i'm recieving
    this.age=age;
    this.color=color;

}



let lion = new Pet ("Eric", 3, "Orange");  
console.log(lion);

let zebra = new Pet ("zeboro", 5, "black/white");
console.log(zebra);

//class

class Animal{
    // executed automatically when a new object is created
    constructor(name, age,){
        this.name = name;
        this.age=age;

    }

    doSomething(){
        console.log("I'm doing it"); //make new animal do something
    }
}


let wildcat=new Animal("Will, 3");
console.log(wildcat);


