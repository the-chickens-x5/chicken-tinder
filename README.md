# Chicken Tinder

This is the monorepo for Chicken Tinder.
Use `npm run format` and `npm run lint` before commiting/pushing.

## Product Vision

For friend groups who can’t decide where to eat in a timely manner, Chicken Tinder is a web app that collects food preferences within groups and picks a restaurant catered to the group’s preferences. Unlike Yelp, our product enables collaboration within customizable groups of users.

## User Interface Prototypes

[in Figma](https://www.figma.com/file/NYJDxRDX5nzyrkO2d03S7I/Chicken-Tinder?type=design&node-id=0%3A1&mode=design&t=a2ww8RXXaC2aStSE-1)

## Configure the repo

Run `npm install` to install dependencies.
Run `npm run backend` and `npm run frontend` to start up servers locally.

## Configure the backend

Create a file `./packages/backend/config/.env`
With contents:

```
DB_PASSWORD=[copy-password-here]
```

## Configure React Environment

Create `./packages/frontend/.env`
With contents:

```
REACT_APP_API_URL=http://localhost:8000
```

In general, if you want to add your own env variable, use `REACT_APP_{varname}={varval}`. Then you can read it with `process.env.REACT_APP_{varname}`.

## Class (Data Model) Diagrams

![Schema](https://drive.google.com/file/d/1M_X629jj6EgxytR4sn7AzZuW8pZHu7tv/view?usp=sharing)
