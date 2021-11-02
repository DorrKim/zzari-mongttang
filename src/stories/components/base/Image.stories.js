import React from 'react';
import Image from '../../../components/base/Image';

export default {
  title: 'Component/base/Image',
  component: Image,
  argTypes: {
    width: { 
      control: { 
        type: 'range',
        min: 100,
        max: 1000,
        step: 10 }
    },
    height: { 
      control: { 
        type: 'range',
        min: 100,
        max: 1000,
        step: 10 }
    },
    type: {
      control: {
        type: 'radio',
        options: ['circle', 'square']
      }
    }
  }
};


export const Default = props => {
  return <Image src="https://picsum.photos/500" {...props} />;
};

export const Lazy = props => {
  
  return (
    <>
      <Image src="https://picsum.photos/300" width={300} height={300} lazy {...props} />
      <Image src="https://picsum.photos/300" width={300} height={300} lazy {...props} />
      <Image src="https://picsum.photos/300" width={300} height={300} lazy {...props} />
      <Image src="https://picsum.photos/300" width={300} height={300} lazy {...props} />
      <Image src="https://picsum.photos/300" width={300} height={300} lazy {...props} />
      <Image src="https://picsum.photos/300" width={300} height={300} lazy {...props} />
      <Image src="https://picsum.photos/300" width={300} height={300} lazy {...props} />
      <Image src="https://picsum.photos/300" width={300} height={300} lazy {...props} />
      <Image src="https://picsum.photos/300" width={300} height={300} lazy {...props} />
      <Image src="https://picsum.photos/300" width={300} height={300} lazy {...props} />
    </>
  );
};
