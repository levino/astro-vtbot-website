# Astro bag of tricks for view transitions

The bag of tricks provides components that demonstrate Astro's View Transition API.
Some of these are technical demos, some are useful tools, and some will evolve into reusable components that you can use in your own project to handle edge cases that go beyond Astro's standard features.

***For now, this is just a placeholder.*** 

Here is a small sneak preview of what you can expect in the future:

## Technical demos

* Fishbowl to demonstrate transitions in multiple directions
* The circular reveal view transition from the [MDN page on View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API#controlling_animations_with_javascript)

## Useful tools

* Visualization of transition data and processes
* A linter component to help you identify problems with transition setup in the view, such as ambiguous transition names or `astro:persist` attributes on nested elements.

## Reusable components

* Alterantive DOM Swap, which preserves elements in the original DOM to avoid reinitialization of iframes or CSS animations 
