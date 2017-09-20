# Surfboard
### ItsOnMe Merchant-Onboarding App

Slowly but surely, this project will span the entire Merchant Tools suite.  For now, though, its only purpose is on-boarding for merchants.


### Stack:
 - Node
 - Webpack
 - React
 - Redux
 - SASS

------

### Development Branches
Workflow:  `(feature branch)` -> `dev` -> `qa` -> `master` -> `production`

**Note:** _As the server currently does not build `bundle.js` itself, do not forget to include it when pushing to `qa` and `production`!_

#### `dev`
The "Testing" branch.  Development branch with (ostensibly) stable feature branches merged in.  Used for integration testing.
#### `qa`
The "Staging" branch. Used for QA testing.  **(This branch auto-deploys to http://qaonboard.itson.me/)**
#### `master`
The "Awaiting Release" branch. Allows delaying features, if desired.  Used only for stable versions that have passed QA.
#### `production`
Final production branch, named to prevent unintentional deploys.  **(This branch auto-deploys to http://onboard.itson.me/)**
