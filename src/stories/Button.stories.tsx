import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import Button from '../components/Button';

const defaultButton = () => (
    <>
        <Button onClick={action('clicked')}>default Button</Button>
    </>
)

const buttonWithSize = ()=>(
    <>
        <Button size='sm'>small Button</Button>
        <Button size='md'>middle Button</Button>
        <Button size='lg'>large Button</Button>
    </>
)
const buttonWithType = ()=>(
    <>
        <Button btnType='default'>default Button</Button>
        <Button btnType='primary'>primary Button</Button>
        <Button btnType='danger'>danger Button</Button>
        <Button btnType='link' href='www.baidu.com'>link Button</Button>
    </>
)

storiesOf('Button component', module)
    .add('默认 Button', defaultButton)
    .add('不同 size 的 Button', buttonWithSize)
    .add('不同 type 的 Button', buttonWithType)
