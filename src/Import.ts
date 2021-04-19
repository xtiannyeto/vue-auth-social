import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import { App } from 'vue';

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|ts)$/
);

export default (app: App<Element>): App<Element> => {
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const componentName = upperFirst(
      camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
    );
    app.component(componentName, componentConfig.default || componentConfig);
  });
  return app;
};
