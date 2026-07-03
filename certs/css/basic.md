# CSS Basic Answers

## 1. CSS Animation

**Question:** Which of the following would create the animation where moving the mouse over the div doubles its size over 500ms?

**Answer:**

```css
.greyBall:hover { transform: scale(2); transition: 500ms transform; }
.greyBall:hover { transform: scale(2); transition: 0.5s; }
```

> `:hover` handles the mouse-over state, `transform: scale(2)` doubles the element size, and `transition` makes the change animate over 500ms. `animate` is not a valid CSS property for this.

## 2. CSS object-fit

**Question:** Which of the following are true about the CSS property `object-fit`?

**Answer:**

```css
object-fit: contain;
object-fit: cover;
```

Correct statements:

- `object-fit: contain;` preserves the aspect ratio of the image and makes sure no clipping happens to the whole image.
- `object-fit: cover;` avoids the image getting squeezed, but it could end up clipping the image.

> `contain` fits the whole image inside the container while preserving aspect ratio. `cover` fills the container while preserving aspect ratio, so parts of the image may be clipped.

## 3. CSS Ellipsis

**Question:** If an element extends beyond the allocated width, how do you truncate the sentence with an ellipsis `...` using CSS?

**Answer:**

```css
{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

> `white-space: nowrap` keeps the text on one line, `overflow: hidden` hides the extra text, and `text-overflow: ellipsis` displays the `...` at the cutoff point.

## 4. CSS Text Coloring

**Question:** Which of the following renders the text red?

```html
<p id="tagId">Please color me red</p>
```

**Answer:**

```css
:root { --text-color: red; } p { color: var(--text-color); }
#tagId { color: red; } p { color: blue; }
p { color: red !important; } #tagId { color: blue; }
```

> CSS variables must be used with `var()`. Also, `#tagId` has higher specificity than `p`, so it stays red even if `p` is declared later. `!important` on the `p` rule also beats a normal `#tagId` rule.

## 5. CSS Selection

**Question:** How do you prevent the user from selecting the text rendered inside the following element?

```html
<p>I should not be selectable</p>
```

**Answer:**

```css
p { user-select: none; }
```

> `user-select: none` prevents the text from being selected. `pointer-events: none` disables pointer targeting, but it is not the proper CSS property for disabling text selection.

## 6. CSS Input Placeholder

**Question:** How do you hide the `placeholder` text of an `<input>` field?

**Answer:**

```css
input::placeholder { color: transparent; }
input::placeholder { visibility: hidden; }
```

> Styling the `::placeholder` pseudo-element with `color: transparent` hides the placeholder text while keeping the input field visible and usable. `visibility: hidden` also hides the placeholder text. `display: none` does not reliably apply to placeholder text, and `visibility: clip` is not a valid `visibility` value.

## 7. CSS Centering

**Question:** Which of the following options can position the div with the class name `child` exactly at the center of the page?

```html
<div class="parent" style="width: 100vw; height: 100vh;">
  <div class="child" style="height: 100px; width: 100px; background: black"></div>
</div>
```

**Answer:**

```css
.parent { display: flex; justify-content: center; align-items: center; }
```

```css
.parent { position: relative; }
.child { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
```

> Flexbox centers the child horizontally with `justify-content: center` and vertically with `align-items: center`. The absolute-positioning method needs `transform: translate(-50%, -50%)` because `top: 50%; left: 50%` alone places the child’s top-left corner at the center, not the child itself.

## 8. CSS vertical-align

**Question:** Which of the following are true about the CSS property `vertical-align`?

```html
<p>
  Let's
  <span class="heroWord">Hack</span>
  <img src="" />
</p>
```

**Answer:**

```css
.heroWord { vertical-align: 25px; }
p img { vertical-align: text-bottom; }
```

Correct statements:

- `.heroWord { vertical-align: 25px; }` moves the word `Hack` to the top, 25px higher than the `<p>` tag baseline.
- `p img { vertical-align: text-bottom; }` moves the image to the bottom with respect to the text line.

> A positive length value for `vertical-align` raises an inline element above the baseline. `vertical-align: text-bottom` affects inline images and aligns the image with the text bottom.

