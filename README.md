# TweenRex Renderers

This project contains renderers for the TweenRex project.

## Questions / Documentation
Please go to [TweenRex](https://github.com/tweenrex/tweenrex) to ask questions and find documentation.

## Contributions
Contributions are welcome.  Please create an issue on the [main TweenRex project](https://github.com/tweenrex/tweenrex/issues) prior to adding a Pull Request on this project.  See below on how to run this project locally.

### How to get the project running locally

 - Install NodeJS / NPM
 - Clone this project
 - Run ```npm install``` in the directory
 - Run ```npm start```.  This will build to the ```lib``` directory and simultaneously run all test files in the ```tests``` directory.

 > Alternately, run ```npm run test:watch``` to only watch tests, or ```npm run build:watch``` to only watch src files

### Structure of the project

| Folder | Description |
| --- | --- |
| /lib | Output for node |
| /lib.es2015 | Output as ES2015 modules |
| /src | Source files |
| /tests | Test files |
| /types | Output for TypeScript type definitions |

### Before you submit a Pull Request for code

 - Submit an issue on the [main TweenRex project](https://github.com/tweenrex/tweenrex/issues)
 - Ensure at least one new unit test exists to cover the feature/bug
 - Ensure new files are formatted property (4 space indentation)

## License
This library is licensed under MIT.