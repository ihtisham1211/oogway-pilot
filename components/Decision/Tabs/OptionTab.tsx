import { UilPlus, UilTrash } from '@iconscout/react-unicons'
import React, { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { inputStyle } from '../../../styles/utils'
import { shortLimit } from '../../../utils/constants/global'

export const OptionTab: FC = () => {
    const { register, control } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options',
    })
    return (
        <>
            {fields.map((item, index) => (
                <div key={item.id} className={'flex items-center w-full'}>
                    <input
                        key={item.id}
                        className={inputStyle}
                        type="text"
                        placeholder={`Enter your Option ${index + 1}`}
                        {...register(`options.${index}.name` as const, {
                            required: {
                                value: true,
                                message: 'You must enter the required Option.',
                            },
                            maxLength: {
                                value: shortLimit,
                                message: `Option length should be less than ${shortLimit}`,
                            },
                        })}
                    />
                    {index === 0 ? (
                        <button
                            className="p-1 ml-3 align-middle bg-primary rounded-full"
                            type="button"
                            onClick={() => append({ name: '', score: 0 })}
                        >
                            <UilPlus className={'fill-white'} />
                        </button>
                    ) : (
                        <button
                            className="p-1 ml-3"
                            type="button"
                            onClick={() => remove(index)}
                        >
                            <UilTrash className={'fill-neutral-700'} />
                        </button>
                    )}
                </div>
            ))}
        </>
    )
}