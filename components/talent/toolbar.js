import { ALetter } from '@/icons/a-letter';
import { Bold } from '@/icons/bold';
import { ColorPalette } from '@/icons/color-palette';
import { Italic } from '@/icons/italic';
import { StrikeThrough } from '@/icons/strikethrough';
import { TextLink } from '@/icons/text-link';
import { Underline } from '@/icons/underline';
import React, { useCallback, useEffect, useState } from 'react';
import { OutsideAlerter } from '../outside-alerter';

const colors = [
  {
    id: 1,
    textColor: '#231F20',
    textHighlightColor: '#FFFFFF',
  },
  {
    id: 2,
    textColor: '#7A797A',
    textHighlightColor: '#FFFFFF',
  },
  {
    id: 3,
    textColor: '#2F68D6',
    textHighlightColor: '#FFFFFF',
  },
  {
    id: 4,
    textColor: '#3F951B',
    textHighlightColor: '#FFFFFF',
  },
  {
    id: 5,
    textColor: '#E9C009',
    textHighlightColor: '#FFFFFF',
  },
  {
    id: 6,
    textColor: '#FD853A',
    textHighlightColor: '#FFFFFF',
  },
  {
    id: 7,
    textColor: '#ED2E15',
    textHighlightColor: '#FFFFFF',
  },
  {
    id: 8,
    textColor: '#231F20',
    textHighlightColor: '#FFFFFF00',
  },
  {
    id: 9,
    textColor: '#231F20',
    textHighlightColor: '#F2F2F2',
  },
  {
    id: 10,
    textColor: '#231F20',
    textHighlightColor: '#DEEBFB',
  },
  {
    id: 11,
    textColor: '#231F20',
    textHighlightColor: '#DEF7D0',
  },
  {
    id: 12,
    textColor: '#231F20',
    textHighlightColor: '#FEFDC3',
  },
  {
    id: 13,
    textColor: '#231F20',
    textHighlightColor: '#FFEAD5',
  },
  {
    id: 14,
    textColor: '#231F20',
    textHighlightColor: '#FFE3DF',
  },
  {
    id: 15,
    textColor: '#FCFCFD',
    textHighlightColor: '#231F20',
  },
  {
    id: 16,
    textColor: '#FCFCFD',
    textHighlightColor: '#7A797A',
  },
  {
    id: 17,
    textColor: '#FCFCFD',
    textHighlightColor: '#2F68D6',
  },
  {
    id: 18,
    textColor: '#FCFCFD',
    textHighlightColor: '#54BB27',
  },
  {
    id: 19,
    textColor: '#FCFCFD',
    textHighlightColor: '#E9C009',
  },
  {
    id: 20,
    textColor: '#FCFCFD',
    textHighlightColor: '#FD853A',
  },
  {
    id: 21,
    textColor: '#FCFCFD',
    textHighlightColor: '#ED2E15',
  },
];

function Toolbar({ editor }) {
  const [color, setColor] = useState(colors[0]);
  const [showColorPaletteMenu, setShowColorPaletteMenu] = useState(false);

  const ToggleLink = (e) => {
    e.preventDefault();

    const previousUrl = editor.getAttributes('link').href;
    if (previousUrl) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .toggleLink({ href: url })
      .run();
  };

  const handleColor = (e, value) => {
    e.preventDefault();
    setColor(value);
    editor.chain().focus().setColor(value.textColor).run();
    editor
      .chain()
      .focus()
      .toggleHighlight({ color: value.textHighlightColor })
      .run();
  };

  const handleColorPaletteMenu = (e) => {
    e.preventDefault();
    setShowColorPaletteMenu(!showColorPaletteMenu);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className='flex gap-x-1'>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`w-8 h-8 flex justify-center items-center rounded-md ${
          editor.isActive('bold') ? 'bg-primary-100' : ''
        }`}
      >
        <Bold
          width='11'
          height='14'
          color={editor.isActive('bold') ? '#084CD0' : '#B4B5B6'}
        />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`w-8 h-8 flex justify-center items-center rounded-md ${
          editor.isActive('italic') ? 'bg-primary-100' : ''
        }`}
      >
        <Italic
          width='12'
          height='14'
          color={editor.isActive('italic') ? '#084CD0' : '#B4B5B6'}
        />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`w-8 h-8 flex justify-center items-center rounded-md ${
          editor.isActive('underline') ? 'bg-primary-100' : ''
        }`}
      >
        <Underline
          width='16'
          height='17'
          color={editor.isActive('underline') ? '#084CD0' : '#B4B5B6'}
        />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`w-8 h-8 flex justify-center items-center rounded-md ${
          editor.isActive('strike') ? 'bg-primary-100' : ''
        }`}
      >
        <StrikeThrough
          width='18'
          height='16'
          color={editor.isActive('strike') ? '#084CD0' : '#B4B5B6'}
        />
      </button>
      <OutsideAlerter outsideClick={() => setShowColorPaletteMenu(false)}>
        <div className='relative'>
          <button
            onClick={handleColorPaletteMenu}
            className={`w-8 h-8 flex justify-center items-center rounded-md ${
              showColorPaletteMenu ? 'bg-primary-100' : ''
            }`}
            data-testid='colorPalette'
          >
            <ColorPalette
              width='20'
              height='20'
              color={
                editor.isActive('textStyle', { color: '#084CD0' })
                  ? '#084CD0'
                  : '#B4B5B6'
              }
            />
          </button>

          {showColorPaletteMenu && (
            <div className='bg-white mt-[3px] w-[224px] absolute left-1/2 -translate-x-1/2 z-50 p-[18px] rounded-xl border border-gray-200 shadow-lg'>
              <div className='grid grid-cols-7 gap-2'>
                {colors.map((colorObj) => (
                  <button
                    key={colorObj.id}
                    className={`w-5 h-5 flex items-center justify-center rounded-[2.5px] border ${
                      colorObj.id === color.id
                        ? `border-primary-600`
                        : 'border-gray-200'
                    }`}
                    style={{
                      backgroundColor: colorObj.textHighlightColor,
                    }}
                    onClick={(e) => handleColor(e, colorObj)}
                  >
                    <ALetter color={colorObj.textColor} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </OutsideAlerter>
      <button
        onClick={ToggleLink}
        className={`w-8 h-8 flex justify-center items-center rounded-md ${
          editor.isActive('link') ? 'bg-primary-100' : ''
        }`}
      >
        <TextLink
          width='20'
          height='10'
          color={editor.isActive('link') ? '#084CD0' : '#B4B5B6'}
        />
      </button>
    </div>
  );
}

export default Toolbar;
