import { Switch } from '@headlessui/react';

export function SwitchButton({ isChecked, onChange, labelText }) {
  return (
    <Switch.Group>
      <div className='flex items-center'>
        <Switch
          checked={isChecked}
          onChange={onChange}
          className={`${
            isChecked ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className='sr-only'>{labelText}</span>
          <span
            className={`${
              isChecked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <Switch.Label className='ml-2'>{labelText}</Switch.Label>
      </div>
    </Switch.Group>
  );
}
