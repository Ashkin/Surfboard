# Surfboard
### ItsOnMe Merchant-Onboarding App

This project only serves the onboarding wizard.  No (or very few) changes will be made to this project.

ItsOnMe/Ferrari is a fork (well, clone) of this repo, and is being actively developed to (eventually) replace the entire Merchant Tools suite.


### Stack:
 - ES6
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
The "Staging" branch. Used for QA testing.  **(This branch auto-deploys to http://qaonboard.itson.me/)**
#### `master`
The "Awaiting Release" branch. Allows delaying features, if desired.  Used only for stable versions that have passed QA.
#### `production`
Final production branch, named to prevent unintentional deploys.  **(This branch auto-deploys to http://onboard.itson.me/)**
