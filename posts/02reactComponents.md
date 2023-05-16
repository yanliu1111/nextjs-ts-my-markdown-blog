---
title: "Working with React Components"
subtitle: "My WorkNote about how to write good React Components"
date: "2023-05-06"
---

## Introduction

I want to share with you some tips I've learned from building React applications on how to write better React components. These tips might be help you write components that are more maintainable, easier to test, and more reusable. HOPEFULLY! 😅

**1.SRP: Single Responsibility Principle😃**<br>
The Single Responsibility Principle states that each React component should have only one responsibility. If a component handles multiple tasks, such as fetching data from multiple sources and displaying multiple elements, consider breaking it down into smaller, single-purpose components. By doing so, you can simplify your code, make it more modular and reusable, and also make it easier to test. For example, you could break down a complex component into multiple smaller components, each responsible for fetching and displaying data from a single source. This can help improve the overall performance and maintainability of your React application.

![images](/images/5-1.jpg)

**2. Create Presentational Components😘**<br>
Ideally, each React component should be a "dumb" component, which means it should have minimal or no logic at all. Generally, you should handle the fetch logic in one place, such as the parent component, and then create a child component that is only responsible for displaying the data in an unopinionated way.

For example, if you have a toast notification component, it should not know anything about where the data came from or how it was fetched. Instead, you can pass the title and description as props from wherever you want to display the notification. The toast notification component will then simply display whatever props you pass to it, acting as a "dumb" component. By creating these reusable, "dumb" components, you can keep your code clean, modular, and easy to maintain.

![images](/images/5-2.jpg)

**3. Don't Repeat Yourself (DRY)🥶**<br>
Avoid code repetition in React. Repeating yourself once or twice is acceptable, but if you find yourself repeating code three or more times, consider creating reusable components or breaking your logic down into separate hooks or helper functions. However, creating reusable components from the outset may not always be the best approach. It's a balancing act between avoiding code duplication and considering reusability, especially if you only plan to use a piece of code once or twice for now.

**4. Use Conditional Rendering😎**<br>
Conditional rendering is the practice of using ternary operators or if statements to determine which JSX components are conditionally displayed. It helps keep your codebase clean by ensuring that components are only rendered when necessary, rather than all at once.

**5. Use Higher-Order Components (HOCs)😯**<br>
React offers a powerful feature called higher order components (HOCs). These are components that take in other components and wrap them. A good example of this is a layout component that you create once, give it padding vertically and horizontally, and then pass in all the other components for each section of your website. This means that if you ever decide to change your layout, such as wanting the padding to be 4 pixels instead of 6, you only have to change it in one place instead of going through every component and redoing the whole layout. HOCs allow you to maintain a unified style throughout your application, making it a valuable tool for any React developer.

![images](/images/5-03.jpg)

**6. Custom Hooks👛**<br>
Be careful, not everything needs to be abstracted into a custom hook. It's fine to have a useEffect inside a component. However, when you have complex logic that you would like to use in multiple components, it can make sense to create a hook that encapsulates the logic. If you do a good job at abstracting the logic away from the component and into the hook, it will be easy to use the same hook across multiple components wherever you need the data from the hook.

**7. Code splitting🎊**<br>
When you have code in your application that is not immediately needed, consider lazy loading it, especially if it's a complex piece of code that can slow down the user's experience, such as a search bar.

For example, if you have a search bar at the top of your page that is not visible by default, consider hiding it. This applies to anything that the user can click and then shows up. Why pre-render something that the user may not even use? For example, if you have a drop-down menu that pops up and is animated in some way, and relies on an animation library, consider splitting that from your code so it's only rendered when the user actually needs it. This can help avoid using JavaScript on page load, which can slow down the user's experience.
**Before:**

```js
import { add } from "./math.js";
console.log(add(16, 26));
```

**After:**

```js
import("./math.js").then((math) => {
  console.log(math.add(16, 26));
});
```

**8. useCallback and useMemo💎**<br>
Use useCallback and useMemo, they are both super useful in certain cases. However, take it with a grain of salt and don't feel like you need to wrap everything in a useCallback or useMemo. These are React hooks that are offered to optimize performance and rendering issues, but it's important not to optimize your app prematurely.

With useCallback, you can wrap a function and React will maintain its integrity. By default, when you re-render a React component, the integrity of a function changes, which can sometimes cause errors if the function is used as a dependency in useEffect. To avoid recalculating expensive operations inside a useCallback, pass it a dependency array. If none of the values in the dependency array change, the function will return the same output until one of the elements changes.

```
useCallback(() => {
  expensiveCalculation();
}, [dependency1, dependency2]);

recalculates if dependency1 or dependency2 changes
```

Similarly, you can use useMemo to wrap entire components and React will maintain their integrity. This is useful if you have a component that is expensive to render, such as a table with a lot of data. By wrapping it in useMemo, React will only re-render the component if the dependencies change, which can help improve performance.

**9. Document your work📚**<br>
If you write functions, for example, helper functions, it is a great idea to document what they do. Now, if you write very good code, they might document themselves, but it is not a good idea to rely on that. Instead, take one minute to quickly summarize what the function does in a comment above the function. This way, you will know what the function does in a month or two, and if you ever invite a new developer to work with or maintain the repository, they will have an easier time understanding the code.

Thank you for reading, I hope you find it useful.😀

[⬆️ Back to Top](#introduction)
