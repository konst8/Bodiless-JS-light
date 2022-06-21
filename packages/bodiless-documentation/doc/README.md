# BodilessJS light

Simplified version of [Bodiless-JS](https://github.com/johnsonandjohnson/Bodiless-JS/): basically, just [GatsbyJS](https://www.gatsbyjs.com/) with edit interface.

Currently in development.

Roadmap:
1. Get rid of:
- tailwind (instead of classes, add clear ids for page elements)
- docs
- lerna
- anything hosting related (e.g. p.sh configs, jenkins files etc.)
- example sites, keep just one
- unnecessary scripts and utilities

2. Upgrade (if needed):
- general packages (gatsby, express etc.)

3. Refactor:
- backend
- types (may be)
- tests
- unify structure of packages
- clean up log (build and runtime)

4. Reduce functionality
- alerts
- review and refactor everything related to look and feel
- review flow container
- may be remove i18n, search
- may be also slate editor, menu system

5. Try to improve performance of
- setup
- build
- page load