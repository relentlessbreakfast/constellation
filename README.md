# Constellation

> Cut though the confusion

## Team

  - __Product Owner__: Austin Liu
  - __Scrum Master__: Justin Webb
  - __Frontend Development Lead__: Charlie Hwang 
  - __Backend Development Lead__: Katrina Uychaco 

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.12.2

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

For postgres database setup:

```sh
which psql  # verify PostgreSQL is installed
createdb constellation # create database for application
```

To interact with database from the command line:

```sh
psql constellation
```

To reset database in order to test changes made:

```sh
dropdb constellation; createdb constellation; gulp; gulp
```


### Tasks

From within the root directory:

```
Configure Database
Start Build
```

### Roadmap

View the project roadmap [here](https://github.com/relentlessbreakfast/nodachi/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
