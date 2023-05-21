---
title: "Best answer I got why we need to maintain migration files"
subtitle: "QA talk in InceptionU tech group"
date: "2023-05-23"
---

## Introduction

Hi 👋, this is my second QA post in my blog, because I felt this is very good answer and probably can help some Jr. developer. I learned a lot from InceptionU tech group, very lucky to talk many skilled dev there. 🍀

## ❓ Let's get started

I kept a question, how important to build migration file for ORM (Object relational mapping), because in bootcamp we didn't consider ORM in full stack project. But, for now, when I did some full stack projects, I would follow the tutorial to build ORM every time before deploy. So I asked this question in InceptionU tech group.

I also did some research, and want to find more resource. Such as:

1. Some [example](https://github.com/railwayapp/railway-images/tree/master/prisma/migrations) from railway, also I used SQLAlchemy management ORM before I deployed to Render.
2. Here is [prisma](https://www.prisma.io/docs/concepts/components/prisma-migrate) for migration data.
3. Here is [knex](https://knexjs.org/guide/migrations.html#migration-cli) for migration database

## _Answer from @facilitator_ [Greg Fenton](https://github.com/gregfenton) :

So it is what I expected -- the Prisma "database migration" is really a set of instructions (or a capture of the "data model changes") allowing you to take data from an earlier version of your data model and "migrate that data" to newer versions of your data model.

Whether maintaining migration files is important or not depends entirely on your project.

Usually during rapid development one does NOT maintain migration files because the schema is changing rapidly and there's not much point in "migrating" development data. Better off just to blow away the database and re-import the seed data.

But once you have stability in your environments (TESTING, STAGING and ultimately PRODUCTION), then you want to maintain migration files so that someone can upgrade the data in one of those environments without wiping the database.

BTW: "maintaining a schema" is something one does for relational databases (SQL), but typically you do NOT maintain migration for non-relational (NoSQL) database. Rather for NoSQL one typically builds the "migration" concept directly into the app. When the app reads an "older versioned record", then the app knows how to interpret that older record and when the app updates/saves an older record it will save it with the newer version (i.e. add required fields, update persisted calculations, etc.)

This is the same approach as using "migration" but it means that data migrates over time and use, unlike with SQL where you have to upgrade all the data when the database schema changes -- there is no "staggered updates" in the world of SQL.

**Hope that helps.** ✨💖✨

[⬆️ Back to Top](#introduction)
