# Day17Workshop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Creation Steps
1. Create a new project
```bash
ng new ng-promise
```
2. Install Angular Material Design
```bash
ng add @angular/material
```

3.Install gesture component
```bash
npm install --save hammerjs
```

4. More install
```bash
npm install --save moment
npm install --save @angular/material-moment-adapter
npm install --save @angular/flex-layout
```

5. Additional fix for flex-layout and rxjs 
```bash
npm install --save @angular/flex-layout hammerjs
npm install --save rxjs@6.2.2
npm install --save @angular/flex-layout@6.0.0-beta.17
```

6. Add 
```ts
import 'hammerjs';
```
 in main.ts

7. Add PWA
```bash
ng add @angular/pwa
```
8. Copy import.module.ts

9. Import 
```ts
import { importModule } from './import.module';
```
to app.module.ts

10.import 
```ts
@import "@angular/material/prebuilt-themes/deeppurple-amber.css";
```
to style.css

11.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
