---
title: "Static Instance Methods in TypeScript"
subtitle: "QA talk in InceptionU tech group"
date: "2023-03-04"
---

## Introduction

> Hi 😀 I would like to share my answers and replys from InceptionU discord, I got many facilitators' help before 6 months. Normally what I did is to write down my answers and replies in my personal markdown notebook. But until I build my Code blog, I would like to share some important session from my note, it would be a good way to review my learning process and also to share my learning with who has the same question.

## About InceptionU 🏡

> InceptionU is a learning experience organization based in downtown Calgary, dedicated to providing a unique approach to learning that addresses the evolving demands of the IT field. Our flagship program, Evolve Full Stack Developer, is a 6-month, full-time project-based learning environment that prepares learners with the technical and essential skills needed to excel in a full stack developer role. Through hands-on experience and expert instruction, we empower our students to thrive in the dynamic world of technology. Check out the [website](https://www.inceptionu.com/)

## Let's start

**Question1:** static instance: `ListTemplate = new ListTemplate()`; I am not sure static instance is necessary build in Class, same as 'constructor'? When I have to set instance? I did some research note `why static? because I want to create a single instance of the class, so that the class can be used as a singleton, and keep referring to that instance, because we only have one list in our application` but I am not sure if I understand it correctly.

```ts
export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }
...

```

**Answer from @facilitator** [Greg Fenton](https://github.com/gregfenton) :
A "static instance" means that there is one instance of the variable created globally -- that one instance of that variable is shared across all objects created for this class.

```ts
class Person {
  static totalPopulation: number = 0;
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    Person.totalPopulation++;
  }
  // ....
}
```

In the above, name and age are created for each object created by `new Person(name, age)`. name and age are NOT created until `new Person(...)` is called. The code above simply declares that there is a class named Person but it does not actually create an instance of that class.

However, there is only ONE `totalPopulation` that gets created when the class is first declared -- that is, when the above code runs. That one variable is accessible by all instances of the `Person` class, and when one instance changes the value then that updated value is accessible by all other instances.

```ts
Person fred = new Person("Fred", 42);
console.log("Num persons:", fred.totalPopulation); // << Num persons; 1
Person bob = new Person("Bob", 33);
console.log("Num persons:", bob.totalPopulation); //  << Num persons; 2
console.log("Num persons:", fred.totalPopulation); // << Num persons; 2
```

Notice the last line is using `fred.totalPopulation`

**Question2:** I am confuse about you said instances. My understand was: when I ONLY have one instance of the class, I use static instance, which called `singleton`. I connect this to your explain, `there is only ONE totalPopulation`. So, in this class, `there is only one instance`, when new person update, it is like trigger , to run this ONE instance.

I am confused to see, you continued to say `That one variable (I think you mentioned totalPopulation) is accessible by all instances ( what all instances? I think there is only one static instance? ) of the Person class, and when one instance changes the value then that updated value is accessible by all other instances.` 😵‍💫 Why there has other instances?

**Answer from @facilitator:** A "singleton" is a design pattern where you code your class such that only one instance of that class can ever be created.
You typically use a Singleton pattern in your code for some resource that is meant to be restricted.

For example, you might use Singleton for your Database class -- you only want the code to create a SINGLE connection to the database and not have different parts of your code (accidentally) creating their own connections to that same resource.
The benefit of the Singleton pattern is that anywhere in your code you can just "get the singleton". You don't have to create an instance and then store it in some global variable somewhere and hope that all of the coders in your team remember to "look for the global variable".

Instead you have a method on your Singleton class, for example: Database.getInstance()

Everyone can call Database.getInstance() from anywhere in your code. That function would only create an instance the very first time it is called. Subsequent calls to that function would return the ONE instance that was already created.

**Question3:**
I searched this example, there is example about one class with three instances,

```ts
class ClassWithStaticMethod {
  static staticProperty = "someValue";
  static staticMethod() {
    return "static method has been called.";
  }
  static {
    console.log("Class static initialization block called");
  }
}
console.log(ClassWithStaticMethod.staticProperty);
// Expected output: "someValue"
console.log(ClassWithStaticMethod.staticMethod());
// Expected output: "static method has been called."
```

> **My questions are**<br>
> 1st, how to definition create instance, the syntax is "static instanceName"? In above example, there are 3 instances in the class?<br>
> 2nd, I still misunderstand, your example, there was one static totalPopulation, which means ONLY one instance in the class, why you said That one variable is accessible by all instances of the Person class, and when one instance changes the value then that updated value is accessible by all other instances. Why you said instances.<br>
> 3rd, how to know the instance is global variable? You mentioned Everyone can call Database.getInstance() from anywhere in your code. is it same as export and import, can used other model file?<br>
> 4th, about Singleton pattern, just want to make sure, you mentioned You don't have to create an instance and then store it in some global variable. One static instance means a singleton instance? In your example totalPopulationis a singleton variable? How to not create instance and store, and then used by other coders?

**Answer from @facilitator**

1. Yes, in your very first example the symbol instance was the name of a variable of type ListTemplate.<br>
   "instance" is NOT a keyword in the TypeScript language.

2. in my above example, fred and bob are 2 instances of the class Person. A synonym of "instance" is "object". Person is the Class.<br>fred and bob are **instances of the class Person**.<br>fred and bob are **objects of the class Person**.
3. the only way to tell if something is a static instance is to either look at the code or read the documentation (assuming someone wrote documentation for the class they created....which they should, of course!)
4. you can use static for any type of variable. They could hold any type of JS data: string, number, boolean, array, object, function, etc.<br><u>Where a static becomes a Singleton is when:</u>
   1. the static is declared as being an instance of the class itself
   2. you write the class in such as way that only one instance of it gets created.

BTW: you can write a normal class with a static variable of type of that class itself but NOT limit the creation of other instances of the class. This would not be a "Singleton" (because it allows creation of multiple instances, not just a SINGLE instance), but would still have a static variable holding an instance of the class that all other instances of that class would leverage -- all instances would have access to the SAME static variable/value.

[⬆️ Back to Top](#introduction)
