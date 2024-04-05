import React, { useState } from 'react'
import { SwitchButton } from '@/components/talent/Forms/switch-button';

const MultipleChoiceField = () => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className='space-y-6'>
    <SwitchButton
      isChecked={isChecked}
      onChange={(value) => {
        if (value) {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }
      }}
      labelText='Allow custom text'
    />
  </div>
  )
}

export default MultipleChoiceField