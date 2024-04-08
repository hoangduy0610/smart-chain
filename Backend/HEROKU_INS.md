# COMMAND DEPLOY HEROKU

```sh
git push heroku `git subtree split --prefix Backend dev`:master --force
heroku logs --tail
```