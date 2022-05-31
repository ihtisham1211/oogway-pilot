import { UilTimes } from '@iconscout/react-unicons'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import useMediaQuery from '../../../hooks/useMediaQuery'
import { bodyHeavy, bodyXSmall, caption } from '../../../styles/typography'
import { shortLimit, warningTime } from '../../../utils/constants/global'
import { Options } from '../../../utils/types/global'
import { ErrorWraperField } from '../../Utils/ErrorWraperField'
import { BaseCard } from '../common/BaseCard'
import { TabsMenu } from '../common/TabsMenu'

interface OptionID extends Options {
    id: string
}
interface OptionCardProps {
    index: number
    item: OptionID
    onClickRemove: () => void
}
export const OptionCard = ({ item, index, onClickRemove }: OptionCardProps) => {
    const [isEdit, setEdit] = useState(false)
    const isMobile = useMediaQuery('(max-width: 965px)')

    const {
        register,
        trigger,
        formState: { errors },
        clearErrors,
        getValues,
    } = useFormContext()

    return isMobile ? (
        <BaseCard
            key={item.id}
            className="flex items-center p-3 w-full bg-white dark:bg-neutralDark-300"
        >
            <div className="flex items-center w-full truncate">
                <span
                    className={`${bodyHeavy} text-neutral-800 dark:text-white whitespace-nowrap mr-2 `}
                >
                    {getValues(`options.${index}.name`)}
                </span>
                {item.isAI ? (
                    <span
                        className={`${caption} text-primary px-2 border-l border-l-neutral-700`}
                    >
                        AI
                    </span>
                ) : null}
            </div>
            <TabsMenu
                firstItemText={'Edit Option'}
                secondItemText={'Delete Option'}
                onClickFirst={() => {
                    setEdit(true)
                }}
                onClickSecond={onClickRemove}
                isAI={item.isAI}
            />
        </BaseCard>
    ) : (
        <BaseCard
            key={item.id}
            className="flex flex-col bg-white dark:bg-neutralDark-300"
        >
            {isEdit ? (
                <ErrorWraperField
                    errorField={
                        errors?.options && errors?.options[index]?.name?.message
                            ? errors?.options[index]?.name?.message
                            : ''
                    }
                    textClass="text-sm"
                >
                    <div className="flex justify-center items-center m-2 rounded-lg border border-neutral-700 dark:border-white">
                        <input
                            className="px-2 w-full h-8 font-bold rounded-lg outline-none"
                            {...register(`options.${index}.name` as const, {
                                required: {
                                    value: true,
                                    message:
                                        'You must enter the required Option.',
                                },
                                maxLength: {
                                    value: shortLimit,
                                    message: `Option length should be less than ${shortLimit}`,
                                },
                            })}
                        />
                        <UilTimes
                            className={
                                'mx-2 cursor-pointer fill-neutral-700 dark:fill-white'
                            }
                            onClick={async () => {
                                await trigger(`options.${index}.name`)
                                if (errors?.options && errors?.options.length) {
                                    setTimeout(
                                        () => clearErrors(['options']),
                                        warningTime
                                    )
                                    return false
                                } else {
                                    setEdit(false)
                                }
                            }}
                        />
                    </div>
                </ErrorWraperField>
            ) : (
                <div
                    className={`flex items-center p-3 ${
                        item.isAI ? 'border-b border-neutral-150' : ''
                    }`}
                >
                    <span
                        className={`${bodyHeavy} text-neutral-800 dark:text-white whitespace-nowrap truncate w-full`}
                    >
                        {getValues(`options.${index}.name`)}
                    </span>
                    <TabsMenu
                        firstItemText={'Edit Option'}
                        secondItemText={'Delete Option'}
                        onClickFirst={() => {
                            setEdit(true)
                        }}
                        onClickSecond={onClickRemove}
                        isAI={item.isAI}
                    />
                </div>
            )}
            {item.isAI ? (
                <span
                    className={`${bodyXSmall} text-primary dark:text-primaryDark text-center pt-1 pb-4`}
                >
                    AI Suggestion
                </span>
            ) : null}
        </BaseCard>
    )
}