import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useRef, useEffect} from 'react'
import { useState } from 'react'

export const TailWindDropdown = ({setSelectedCategory, categoryId, selectedCategory,setCategoryId, ...props}) => {
    const categoryDropDown = ["상의","아우터","바지","스커트","원피스","모자",];
    const dropdownRef = useRef(null);

    const handleCategoryChange = ((selectedCategory) => {
        setSelectedCategory(selectedCategory);
        if(selectedCategory === '상의'){setCategoryId(1);}
        else if(selectedCategory === '아우터'){setCategoryId(2)}
        else if(selectedCategory === '바지'){setCategoryId(3)}
        else if(selectedCategory === '스커트'){setCategoryId(4)}
        else if(selectedCategory === '원피스'){setCategoryId(5)}
        else if(selectedCategory === '모자'){setCategoryId(6)}
        else setCategoryId(undefined);
      })
    
      const handleDropdownToggle = (open) => {
        if (open && dropdownRef.current) {
          // 드롭다운이 열릴 때 스크롤 조정
          dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      };

      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    return(
        <div>
            <Listbox value={selectedCategory} onChange={handleCategoryChange}>
              {({ open }) => (
                <>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" style={{ width: '120px' }}>
                      <span className="block truncate">{selectedCategory}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterEnter={() => handleDropdownToggle(open)}
                    >
                      <Listbox.Options className="list-none absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm pl-2 " style={{ width: '120px' }} ref={dropdownRef}>
                        {categoryDropDown.map((category, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-2 pr-9'
                              )
                            }
                            value={category}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                  {category}
                                </span>
                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox> 
          </div>
    )
}