import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const FileUploadField = ({ question,HandleDragOver,HandleDrop,HandleDragLeave,HandleFiles,HandleDeleteField,dragging }) => {
  console.log("File Upload Component")
    return (
    <div className='space-y-6'>
    {/* Render specific tag for File Upload */}
    {question.fields.map((field, fieldIndex) => (
      <div
        key={field.id}
        className='w-full flex items-center gap-x-2'
      >
        {/* Form */}
        <form className='w-full space-y-6' action=''>
          {/* Click to Upload or drag & drop option */}
          {!field.file && (
            <div
              className={`px-6 py-4 bg-white rounded-lg border border-dashed border-gray-200 cursor-pointer ${dragging
                ? 'ring-1 ring-primary-600 opacity-40'
                : ''
                }`}
              onClick={() =>
                document
                  .getElementById('uploadPhoto')
                  .click()
              }
              onDragOver={HandleDragOver}
              onDrop={(event) =>
                HandleDrop(question.id, field.id, event)
              }
              onDragLeave={HandleDragLeave}
            >
              <div className='flex flex-col justify-center gap-3 w-full'>
                <svg
                  width='46'
                  height='46'
                  viewBox='0 0 46 46'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='self-center'
                >
                  <rect
                    x='3'
                    y='3'
                    width='40'
                    height='40'
                    rx='20'
                    fill='#F2F2F2'
                  />
                  <g clip-path='url(#clip0_690_46732)'>
                    <path
                      d='M26.3335 26.3334L23.0002 23M23.0002 23L19.6669 26.3334M23.0002 23V30.5M29.9919 28.325C30.8047 27.8819 31.4467 27.1808 31.8168 26.3322C32.1868 25.4837 32.2637 24.5361 32.0354 23.6389C31.807 22.7418 31.2865 21.9463 30.5558 21.3779C29.8251 20.8095 28.9259 20.5006 28.0002 20.5H26.9502C26.698 19.5244 26.2278 18.6186 25.5752 17.8509C24.9225 17.0831 24.1042 16.4732 23.182 16.0672C22.2597 15.6612 21.2573 15.4695 20.2503 15.5066C19.2433 15.5437 18.2578 15.8086 17.3679 16.2814C16.4779 16.7542 15.7068 17.4226 15.1124 18.2363C14.518 19.0501 14.1158 19.988 13.936 20.9795C13.7563 21.9711 13.8036 22.9905 14.0746 23.9611C14.3455 24.9317 14.8329 25.8282 15.5002 26.5834'
                      stroke='#7A797A'
                      stroke-width='1.66667'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </g>
                  <rect
                    x='3'
                    y='3'
                    width='40'
                    height='40'
                    rx='20'
                    stroke='#FCFBFB'
                    stroke-width='6'
                  />
                  <defs>
                    <clipPath id='clip0_690_46732'>
                      <rect
                        width='20'
                        height='20'
                        fill='white'
                        transform='translate(13 13)'
                      />
                    </clipPath>
                  </defs>
                </svg>

                <div className='space-y-1 text-center w-full'>
                  <h6 className='text-sm-regular text-gray-500'>
                    <span className='font-semibold text-primary-700 hover:underline'>
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </h6>
                  <p className='text-xs-regular text-gray-500'>
                    PNG or JPG or PDF(max. 1MB)
                  </p>
                </div>
              </div>
              <input
                id='uploadPhoto'
                accept='.png,.jpg,.pdf'
                type='file'
                hidden
                onChange={(value) =>
                  HandleFiles(
                    question.id,
                    field.id,
                    value
                  )
                }
                className='hidden'
              />
            </div>
          )}

          {/* Uploaded Image Box */}
          {field.file ? (
            <div className='flex justify-between gap-1 bg-white rounded-lg border border-primary-500 p-4 mt-2'>
              <div className='w-full flex items-start gap-4'>
                {field.file ? (
                  <img
                    src={URL.createObjectURL(field.file)}
                    alt={field.file.name}
                    className='w-8 h-8 rounded-full bg-gray-100'
                  />
                ) : (
                  <svg
                    width='36'
                    height='36'
                    viewBox='0 0 36 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      x='2'
                      y='2'
                      width='32'
                      height='32'
                      rx='16'
                      fill='#DEEBFB'
                    />
                    <path
                      d='M13.3333 24H22.6667C23.403 24 24 23.403 24 22.6667V13.3333C24 12.597 23.403 12 22.6667 12H13.3333C12.597 12 12 12.597 12 13.3333V22.6667C12 23.403 12.597 24 13.3333 24ZM13.3333 24L20.6667 16.6667L24 20M16.6667 15.6667C16.6667 16.219 16.219 16.6667 15.6667 16.6667C15.1144 16.6667 14.6667 16.219 14.6667 15.6667C14.6667 15.1144 15.1144 14.6667 15.6667 14.6667C16.219 14.6667 16.6667 15.1144 16.6667 15.6667Z'
                      stroke='#2F68D6'
                      stroke-width='1.33333'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <rect
                      x='2'
                      y='2'
                      width='32'
                      height='32'
                      rx='16'
                      stroke='#F1F6FD'
                      stroke-width='4'
                    />
                  </svg>
                )}

                <div className='w-full'>
                  <div>
                    <h6 className='text-xs-medium 2xl:text-sm-medium text-gray-700'>
                      {field.file.name ??
                        'Profile photo.jpeg'}
                    </h6>
                    <p className='text-xs-regular 2xl:text-sm-regular text-gray-500'>
                      {(field.file.size / 1024).toFixed(
                        0
                      ) ?? '200'}{' '}
                      KB
                    </p>
                  </div>

                  <ProgressBar progress={100} />
                </div>
              </div>

              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='0.5'
                  y='0.5'
                  width='15'
                  height='15'
                  rx='7.5'
                  fill='#2F68D6'
                />
                <path
                  d='M11.3332 5.5L6.74984 10.0833L4.6665 8'
                  stroke='white'
                  stroke-width='1.66667'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <rect
                  x='0.5'
                  y='0.5'
                  width='15'
                  height='15'
                  rx='7.5'
                  stroke='#2F68D6'
                />
              </svg>
            </div>
          ) : null}
        </form>
        <button type='button' className='p-2'>
          <FiTrash2
            className='w-4 h-4 text-gray-700'
            onClick={() =>
              HandleDeleteField(question.id, field.id)
            }
          />
        </button>
      </div>
    ))}
  </div>
  );
};

export default FileUploadField;
