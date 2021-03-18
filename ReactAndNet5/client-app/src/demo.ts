let x : number | string = 4; // variable x can be a string or a numebr
x = "hello";

// to make a property optional for any object that implements iduck, use the questionmark sign
export interface IDuck{
    name:string,
    numLegs:number,
    flys?:boolean,
    makeSound:(sound: string) => void 
}

const duck1: IDuck = {
    name : "huey",
    numLegs: 2,
    makeSound: (sound:any) => console.log(sound)
}

const duck2: IDuck = {
    name : "kent",
    numLegs: 2,
    flys:true,
    makeSound: (sound:any) => console.log(sound)
}

export const ducks = [duck1, duck2]