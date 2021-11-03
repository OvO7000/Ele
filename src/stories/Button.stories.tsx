import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import Button from '../components/Button';

const defaultButton = () => (
    <>
        <Button onClick={action('clicked')}>default Button</Button>
    </>
)

storiesOf('Button component', module)
    .add('默认 Button', defaultButton)
