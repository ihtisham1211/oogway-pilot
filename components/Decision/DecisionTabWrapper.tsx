import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { useAppSelector } from '../../hooks/useRedux'

interface DecisionTabWrapperProps {
    className?: string
    title: string
    currentTab: number
    children: JSX.Element
}

export const DecisionTabWrapper: FC<DecisionTabWrapperProps> = ({
    className,
    title,
    currentTab,
    children,
}: DecisionTabWrapperProps) => {
    const { getValues } = useFormContext()

    const bestOption = useAppSelector(
        state => state.utilsSlice.decisionEngineBestOption
    )
    const optionIndex = useAppSelector(
        state => state.utilsSlice.decisionEngineOptionTab
    )

    return (
        <div
            className={`flex flex-col pt-5 space-y-xl items-center w-full  ${
                className ? className : ''
            }`}
        >
            <h3 className="text-2xl font-bold text-neutral-700 dark:text-neutralDark-150">
                {title}
                {currentTab === 5 && bestOption && (
                    <span className="text-primary dark:text-primaryDark">
                        {' '}
                        {bestOption}
                    </span>
                )}
                {currentTab === 4 && (
                    <span className="text-neutral-700 dark:text-neutralDark-150">
                        How does{' '}
                        <span className="text-primary dark:text-primaryDark">
                            {getValues('options')[optionIndex].name}
                        </span>{' '}
                        score on each criteria?
                    </span>
                )}
            </h3>
            {children}
        </div>
    )
}
