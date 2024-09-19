//1,2번 실습
// function sum(a: number, b?: number, c?: number): number {
//     return a + (b ?? 0) + (c ?? 0);
// }

// console.log(sum(1, 2));

//3번 실습
// let sum: (a: number, b?: number, c?: number) => number;

// sum = function (a, b, c) {
//     return a + (b ?? 0) + (c ?? 0);
// };

// console.log(sum(10));
// console.log(sum(10, 20));
// console.log(sum(10, 20, 30));

//4번 실습
// interface Developer {
//     name: string;
//     skill: string;
// }
// interface Person {
//     name: string;
//     age: number;
// }
// const introduce = (): Developer | Person => {
//     return { name: "Kim", age: 20, skill: "React" };
// };

// let kim = introduce();

// const isDeveloper = (target: Developer | Person): target is Developer => {
//     return (target as Developer).skill !== undefined;
// };

// if (!isDeveloper(kim)) {
//     console.log(kim.age);
// } else {
//     console.log(kim.skill);
// }

//5번 실습 인터페이스1

// interface Sum {
//     (a: number, b: number): number;
// }

// const sum: Sum = (a, b) => {
//     return a + b;
// };
// console.log(sum(1, 2));

//6번 실습 인터페이스2

interface Person {
    name: string;
    age: number;
}

interface Me extends Person {
    phone: string;
}

const me: Me = {
    name: "gaeun",
    age: 25,
    phone: "010-9968-0436",
};

console.log(me);
