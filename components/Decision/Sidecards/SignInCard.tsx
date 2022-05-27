import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { bodyHeavy } from '../../../styles/typography'
import Button from '../../Utils/Button'

interface SignInCardProps {
    className?: string
}

export const SignInCard: FC<SignInCardProps> = ({
    className,
}: SignInCardProps) => {
    const router = useRouter()

    const signIn = () => {
        router.push('/api/auth/login')
    }
    return (
        <div
            className={`flex flex-col bg-white rounded-2xl p-3 dark:bg-neutralDark-500 mb-4 custom-box-shadow dark:custom-box-shadow-dark  ${
                className ? className : ''
            }`}
        >
            <span
                className={
                    'text-base font-bold leading-6 text-primary dark:text-primaryDark md:text-2xl'
                }
            >
                AI suggestions
            </span>

            <span
                className={`${bodyHeavy} my-3 text-neutral-700 dark:text-neutralDark-150 font-normal text-center`}
            >
                Sign in to keep using AI and latest features.
            </span>

            <Button
                onClick={signIn}
                addStyle={`rounded-full w-full justify-center py-2 md:py-3 text-white bg-primary dark:bg-primaryDark hover:bg-primaryActive active:bg-primaryActive dark:hover:bg-primaryActive dark:active:bg-primaryActive font-bold mx-auto`}
                text="Sign In"
                keepText={true}
                icon={null}
                type="button"
            />
        </div>
    )
}
