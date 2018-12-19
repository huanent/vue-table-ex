workflow "New workflow" {
  on = "push"
  resolves = ["publish"]
}

action "install" {
  uses = "actions/npm@c555744"
  runs = "npm i"
}

action "pack" {
  uses = "actions/npm@c555744"
  needs = ["install"]
  runs = "npm run pack"
}

action "publish" {
  uses = "actions/npm@c555744"
  needs = ["pack"]
  secrets = ["npm_token"]
  runs = "npm token $npm_token && npm publish"
}
