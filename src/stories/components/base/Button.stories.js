import React from 'react';
import Button from '../../../components/base/Button';
import PropTypes from 'prop-types';

export default {
  title: 'Component/base/Button',
  component: Button,
  argTypes: {
    children: { options: ['h1', 'Bold', 'Italic'],
      mapping: {
        h1: <h1>hello</h1>,
        Bold: <b>hello</b>,
        Italic: <i>hello</i>
      }
    },
    backgroundColor: { control: 'color' },
    width: { control: 'text' },
    height: { control: 'text' },
    onClick: { action: 'clicked' },
    borderColor: { contorl: 'color' },
    borderRadius: { contorl: 'text' },
    borderWidth: { contorl: 'text' }
  }
};

const BaseButton = props => {

  return (
    <Button {...props}>
    </Button>
  );
};

BaseButton.propTypes = {
  children: PropTypes.object.isRequired
};

export const Default = BaseButton.bind({});
