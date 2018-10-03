# Surfboard
### ItsOnMe Wizard App

This project serves both the Onboard and Order wizards.


### Stack:
 - Babel + ES6
 - Webpack
 - React + Redux
 - SASS
 - MaterialUI

------

### Development Branches
Workflow:  `(feature branch)` -> `dev` -> `qa` -> `master` -> `production`


#### `dev`
The "Testing" branch.  Development branch with (ostensibly) stable feature branches merged in.  Used for integration testing.
#### `qa`
The "Staging" branch. Used for QA testing.  **(This branch will auto-deploy to QA)**
#### `master`
The "Awaiting Release" branch. Allows delaying features, if desired.  Used **only** for stable versions that have passed QA.
#### `production`
Final production branch, named to prevent unintentional deploys.  **(This branch will auto-deploy to production)**



------



# Surfboard Style Guide

Let's make this thing sexy from the inside out! 😊

### Code styling

I've included some basic ESLint rules for code styling, but here's a brief overview:

  - **Indent level:** 4 spaces
  - **Curly braces:** attached
  - **Semicolons:** never.  (except before IIFEs, but a bang `!` also works!)
  - **Quotes:** double

Also:
  - Use parenthesies around ternaries:  `var = (foo ? bar : baz)`
  - Always enclose fat-arrow function param lists in parentheses:  `const foo = (bar) => { /* code */ }`

These make the code easier to distinguish at-a-glance.


### File formatting

All `import` statements go at the top of files.  Separate each category of imports with a newline or a comment denoting the category, e.g. React, Mui Components, Actions, local files, etc.

Use two newlines between the imports and the component's class. Likewise, use two newlines between the component's class and exports, redux-specific functions (`validate()`, `mapStateToProps()`, ...), etc.  If the file is particularly long, you may use three instead to better separate these sections.

Files always end with a newline.

Within large components, put `render()` at the top, and separate out larger blocks of markup into their own render functions. Additional support logic should go beneath `render()`. This way it's easy to see at-a-glance what the component outputs.

### Component folder model

For components with lots of child content or components, put the component into its own folder and break it into multiple files:

    components/component_name/index.js
    components/component_name/child_component_a.js
    components/component_name/child_component_b.js
    components/component_name/style.scss


If necessary, break up child components further using the same nesting approach:

    components/component_name/index.js
    components/component_name/child_component_a/index.js
    components/component_name/child_component_a/sub_component1.js
    components/component_name/child_component_a/sub_component2.js
    components/component_name/child_component_a/style.scss
    components/component_name/child_component_b.js
    components/component_name/style.scss



------

That should be it!

I'll keep this updated as we settle on other best-practices.
