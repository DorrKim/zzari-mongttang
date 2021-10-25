import React from 'react';
import Button from '@components/base/Button';

export default {
  title: 'Component/base/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    width: { control: 'text' },
    height: { control: 'text' },
    onClick: { action: 'clicked' },
    border: { contorl: 'text' },
    borderWidth: { contorl: 'text' },
    children: { options: ['h1', 'Bold', 'Italic'],
      mapping: {
        h1: <h1>hello</h1>,
        Bold: <b>hello</b>,
        Italic: <i>hello</i>
      }
    }
  }
};

const BaseButton = props => {
  return (
    <Button {...props}>
    </Button>
  );
};

export const Default = BaseButton.bind({});
