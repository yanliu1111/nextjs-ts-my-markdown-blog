---
title: "5 HTML Tags-did you know?"
subtitle: "5 HTML Tags: addr, bdo, kbd, samp, details"
date: "2023-05-22"
---

Hi 👋, I learned 5 new HTML tags this weekend. I want to share with you.😀♥💡

## 1 abbr

```html
<!-- abbr is abriviation -->

<div class="container">
  <div class="section">
    <h1 class="is-size-1">abbr</h1>
    <p class="box">
      What the world needs is another
      <abbr title="Three Letter Acronym">TLA</abbr>
    </p>
  </div>
</div>
```

`abbr `is abbreviation which allows you to specify what an acronym stands for and then it puts dots underneath when you mouse over you get the tooltip.

## 2 bdo

`bdo` means bidirectional override. It is used to override the current text direction. `bdo` tag allows you to specify the direction of the text, so you can go right to leaf instead of left to right.

```html
<!-- bdo is bidirectional override -->

<body>
  <div class="container">
    <div class="section">
      <h1 class="is-size-1">bdo</h1>
      <p class="box">
        <bdo dir="rtl">םגדול יכלכ םינכות</bdo>
      </p>
    </div>
  </div>
</body>
```

## 3 kbd

`kbd` tag which is my fave and this one actually just denotes a key on the keyboard and it actually styles it.

```html
<!-- kbd is keyboard  -->
<body>
  <div class="container">
    <div class="section">
      <h1 class="is-size-1">kbd</h1>
      <p class="box">
        If you want to restart the computer, press
        <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Del</kbd>.
      </p>
    </div>
  </div>
</body>
```

## 4 samp

`samp` is computer output. You get the sort of mono spaced computer font here.

```html
<!-- samp is sample -->
<body>
  <div class="container">
    <div class="section">
      <h1 class="is-size-1">samp</h1>
      <p class="box">when I booted up my computer this morning, it said</p>
      <br />
      <samp>KEYBOARD FAILURE, PRESS F1 FOR HELP</samp>
    </div>
  </div>
</body>
```

## 5 details

Details tag is usually used with summary tag. It is used to show and hide the content. It is used to show the content when the user clicks on the summary tag. The summary tag let you see specify the text when it is expanded.

```html
<!-- details -->
<body>
  <div class="container">
    <div class="section">
      <h1 class="is-size-1">details</h1>
      <div class="box">
        <details>
          <summary>I made up a new word</summary>
          <p>Plagiarism</p>
        </details>
      </div>
    </div>
  </div>
</body>
```

Hope it helps you. Happy Coding! ✨💖✨
