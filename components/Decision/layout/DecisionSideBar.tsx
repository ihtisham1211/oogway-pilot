import { UilArrowRight, UilCheck } from '@iconscout/react-unicons'
import { FC } from 'react'

import useMediaQuery from '../../../hooks/useMediaQuery'
import { bodyHeavy } from '../../../styles/typography'
import { decisionSideBarOptions } from '../../../utils/constants/global'
import { TabItem } from '../../../utils/types/global'

interface DecisionSideBarProps {
    className?: string
    selectedTab: number
    setSelectedTab: (n: number) => void
}

export const DecisionSideBar: FC<DecisionSideBarProps> = ({
    className,
    selectedTab,
    setSelectedTab,
}: DecisionSideBarProps) => {
    const isMobile = useMediaQuery('(max-width: 965px)')

    const desktopItem = (item: TabItem, index: number) => (
        <>
            <div
                key={`side-bar-title-${item.title}`}
                className="flex items-center pl-3 w-full"
            >
                <div
                    className={`${bodyHeavy} ${
                        selectedTab === index + 1 || index + 1 < selectedTab
                            ? 'text-primary dark:text-primaryDark bg-white  border-primary/50'
                            : 'bg-[#E2D9FC] dark:bg-neutralDark-150 text-neutral-700 dark:text-neutralDark-300 font-normal border-transparent'
                    } flex items-center justify-center w-7 h-7 rounded-full border`}
                >
                    {index + 1 < selectedTab ? (
                        <UilCheck
                            className={'fill-primary stroke-primary stroke-2'}
                        />
                    ) : (
                        item.tab
                    )}
                </div>
                <span
                    className={`${bodyHeavy} ${
                        selectedTab === index + 1
                            ? 'text-white'
                            : index + 1 < selectedTab
                            ? 'text-white dark:text-neutralDark-50 font-normal'
                            : 'text-neutral-300 font-normal'
                    }  mx-2 truncate`}
                >
                    {item.title}
                </span>
                {selectedTab === index + 1 ? (
                    <div className="justify-self-end ml-auto w-1.5 h-full bg-[#E2D9FC] dark:bg-primaryDark rounded" />
                ) : (
                    ''
                )}
            </div>
            {item.tab !== 5 ? (
                <div
                    className={`relative justify-self-start mr-auto ml-6 w-[2px] h-16  ${
                        index < selectedTab
                            ? 'bg-[#E2D9FC] dark:bg-white'
                            : 'bg-neutral-300 '
                    }`}
                />
            ) : (
                ''
            )}
        </>
    )

    const mobileItem = (item: TabItem, index: number) => (
        <>
            <div
                key={`side-bar-title-${item.title}`}
                className="flex flex-col justify-center items-center w-fit"
            >
                <div
                    className={`${bodyHeavy} ${
                        selectedTab === index + 1 || index + 1 < selectedTab
                            ? 'text-primary dark:text-neutralDark-50 bg-white dark:bg-primaryDark border-primary/50'
                            : 'bg-[#E2D9FC] dark:bg-neutralDark-150 text-neutral-700 dark:text-neutralDark-300 font-normal border-transparent'
                    } flex items-center justify-center w-7 h-7 rounded-full border  mb-3`}
                >
                    {index + 1 < selectedTab ? (
                        <UilCheck
                            className={
                                'fill-primary dark:fill-neutralDark-50 stroke-primary dark:stroke-neutralDark-50 stroke-2'
                            }
                        />
                    ) : (
                        item.tab
                    )}
                </div>
                <span
                    className={`${bodyHeavy} ${
                        selectedTab === index + 1
                            ? 'text-white'
                            : index + 1 < selectedTab
                            ? 'text-white dark:text-neutralDark-50 font-normal'
                            : 'text-neutral-300 font-normal'
                    } truncate`}
                >
                    {item.title}
                </span>
            </div>
            {item.tab !== 5 ? (
                <UilArrowRight
                    className={`${
                        index + 1 < selectedTab
                            ? 'fill-[#E2D9FC] dark:fill-white'
                            : 'fill-neutral-300'
                    } mt-1`}
                />
            ) : (
                ''
            )}
        </>
    )
    return (
        <div
            className={`flex bg-primary dark:bg-neutralDark-300 ${
                isMobile
                    ? ' p-2 justify-evenly sticky bottom-0 w-full'
                    : 'flex-col justify-center items-center h-full'
            } ${className ? className : ''}`}
        >
            {decisionSideBarOptions.map((item, index) =>
                isMobile ? mobileItem(item, index) : desktopItem(item, index)
            )}
        </div>
    )
}
