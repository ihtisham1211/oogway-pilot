import { useUser } from '@auth0/nextjs-auth0'
import React, { useEffect } from 'react'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

import {
    setPreviousIndex,
    setUserExceedsMaxDecisions,
} from '../../../features/decision/decisionSlice'
import useMediaQuery from '../../../hooks/useMediaQuery'
import { useAppDispatch } from '../../../hooks/useRedux'
import { useUnauthenticatedDecisionQuery } from '../../../queries/unauthenticatedDecisions'
import { inputStyle } from '../../../styles/utils'
import {
    longLimit,
    maxAllowedUnauthenticatedDecisions,
    shortLimit,
} from '../../../utils/constants/global'
import { ErrorWraper } from '../../Utils/ErrorWraper'

interface DecisionTabProps {
    deviceIp: string
}

export const DecisionTab: FC<DecisionTabProps> = ({ deviceIp }) => {
    const { register, trigger, clearErrors } = useFormContext()
    const isMobile = useMediaQuery('(max-width: 965px)')

    useEffect(() => {
        // to fix error not working on first step.
        trigger('question').then(() => {
            clearErrors('question')
        })
        return () => {
            useAppDispatch(setPreviousIndex(1))
        }
    }, [])

    // Track number of decisions made by unauthenticated users
    const { user } = useUser()
    const { data, isFetched } = useUnauthenticatedDecisionQuery(deviceIp)
    useEffect(() => {
        // Await the query to be fetched
        // If the user is unauthenticated, query the database for their
        // record of unauthenticated decisions. If it exceeds the max,
        // turn off AI.
        if (isFetched && !user) {
            if (
                data?.results?.decisions.length >=
                maxAllowedUnauthenticatedDecisions
            ) {
                useAppDispatch(setUserExceedsMaxDecisions(true))
            }
        }
    }, [isFetched, user])

    return (
        <div
            className={`flex flex-col space-y-4 ${
                isMobile
                    ? 'py-4 px-3 bg-white dark:bg-neutralDark-300 rounded-2xl shadow-md custom-box-shadow dark:custom-box-shadow-dark'
                    : ''
            }`}
        >
            <ErrorWraper errorField="question">
                <input
                    className={inputStyle}
                    type="text"
                    placeholder="Where should I move to?"
                    {...register('question' as const, {
                        required: {
                            value: true,
                            message: 'You must enter the required question.',
                        },
                        maxLength: {
                            value: shortLimit,
                            message: `Question length should be less than ${shortLimit}`,
                        },
                    })}
                />
            </ErrorWraper>
            <ErrorWraper errorField="context">
                <textarea
                    className={`${inputStyle} h-40 resize-none mb-6`}
                    placeholder="Context for your decision (optional)"
                    {...register('context', {
                        maxLength: {
                            value: longLimit,
                            message: `Context length should be less than ${longLimit}`,
                        },
                    })}
                />
            </ErrorWraper>
        </div>
    )
}
