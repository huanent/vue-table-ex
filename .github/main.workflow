workflow "New workflow" {
  on = "push"
  resolves = ["pack"]
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
