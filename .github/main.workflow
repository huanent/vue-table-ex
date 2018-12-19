workflow "New workflow" {
  on = "push"
  resolves = ["publish"]
}

action "install" {
  uses = "actions/npm@c555744"
  args = "npm i"
}

action "pack" {
  uses = "actions/npm@c555744"
  needs = ["install"]
  args = "npm run pack"
}

action "publish" {
  uses = "actions/npm@c555744"
  needs = ["pack"]
  secrets = ["npm_token"]
  args = "publish --access public"
}
