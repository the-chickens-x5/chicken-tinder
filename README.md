# Chicken Tinder
This is the monorepo for Chicken Tinder.

Product Vision: For friend groups who can’t decide where to eat in a timely manner, Chicken Tinder is a web app that collects food preferences within groups and picks a restaurant catered to the group’s preferences. Unlike Yelp, our product enables collaboration within customizable groups of users.

## Artifacts
UI prototypes and designs are located [in Figma](https://www.figma.com/file/NYJDxRDX5nzyrkO2d03S7I/Chicken-Tinder?type=design&node-id=0%3A1&mode=design&t=a2ww8RXXaC2aStSE-1)

Class diagram: ![here](./docs/schema.jpg)

## Development
Clone and configure the repo: 
```
git clone git@github.com:bernicelau430/chicken-tinder.git
cd chicken-tinder
npm install
echo 'DB_PASSWORD=copy_password_here' > ./packages/backend/config/.env
echo 'REACT_APP_API_URL=http://localhost:8000' > ./packages/frontend/.env
```

To start up local instances: 
```
npm run backend
npm run frontend
```

Before commiting/pushing, maintain style conventions with:
```
npm run format
npm run lint
```

### Frontend Environment Variables
In general, if you want to add your own env variable, use `REACT_APP_{varname}={varval}`. Then you can read it with `process.env.REACT_APP_{varname}`.
