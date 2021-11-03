import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import React from 'react'
import '../src/styles/index.scss'

addDecorator(withInfo);

const wrapperStyle = {
  padding: '20px 40px',
  width: '500px'
}

const storyWrapper = (stroyFn) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: { inline: true, header: false}})

const loaderFn = () => {
  const allExports = [];
  const req = require.context('../src/stories', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};
configure(loaderFn, module);
