---
name: Bot upgrades
description: Startup version enforcement and broad upstream updates in this custom bot project.
---

Do not run the upstream version updater without the user's approval. An upgrade can replace many core files and delete files. When the installed version is outdated, the bot may still log in but be locked from responding; the outer process may then restart it and repeat the login.

**Why:** A routine restart triggered automatic package changes and exposed the upstream version lock, while the bot process repeatedly exited and relaunched.

**How to apply:** Before upgrading, inspect the release's changed/deleted-file list and explain the impact. If the bot is locked and relaunching, stop the workflow until the user approves an upgrade or chooses another course.
