import { Criteria, Options } from '../utils/types/global'

export interface UtilsSliceStates {
    fileSizeTooLarge: boolean
    feedState: string
    compareForm: {
        comparePostType: string
        compareFormExpanded: boolean
        textCompareLeft: string
        textCompareRight: string
        labelCompareLeft: string
        labelCompareRight: string
        imageCompareLeft: string | ArrayBuffer | null | undefined
        imageCompareRight: string | ArrayBuffer | null | undefined
        hasPreviewedCompare: boolean
        leftPreviewImage: string
        rightPreviewImage: string
        imageToPost: string | ArrayBuffer | null | undefined
    }
    notificationsState: boolean
    jumpToCommentId: string
}

export interface Suggestions {
    optionsList: Options[]
    criteriaList: Criteria[]
    copyOptionsList: Options[]
    copyCriteriaList: Criteria[]
}
export interface FormCopy {
    question: ''
    context: ''
    options: Options[]
    criteria: Criteria[]
}

export interface DecisionSliceStates {
    decisionEngineOptionTab: number
    decisionEngineBestOption: string | undefined
    decisionRatingUpdate: boolean
    loadingAiSuggestions: boolean
    isSuggestionsEmpty: boolean
    ratingTabChecker: boolean[]
    previousIndex: number
    suggestions: Suggestions
    formCopy: FormCopy
    decisionCriteriaQueryKey: string | undefined
    decisionActivityId: string | undefined
    decisionQuestion: string | undefined
    userExceedsMaxDecisions: boolean
    criteriaMobileIndex: number
    sideCardStep: number
}
