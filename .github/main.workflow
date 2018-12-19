workflow "New workflow" {
  on = "push"
  resolves = ["pack"]
}

action "pack" {
  uses = "actions/npm@c555744"
  runs = "npm run pack"
}
