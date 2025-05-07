import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

import { SliceType } from '@island.is/island-ui/contentful'
import {
  Box,
  Button,
  GridColumn,
  GridContainer,
  GridRow,
  Link,
  LinkV2,
  RadioButton,
  Select,
  Stack,
  Text,
} from '@island.is/island-ui/core'
import { isRunningOnEnvironment } from '@island.is/shared/utils'
import { Webreader } from '@island.is/web/components'
import { Stepper as StepperSchema } from '@island.is/web/graphql/schema'
import { useNamespace } from '@island.is/web/hooks'
import { useI18n } from '@island.is/web/i18n'
import { webRichText } from '@island.is/web/utils/richText'

import {
  renderStepperAndStepConfigErrors,
  StepperHelper,
} from '../StepperHelper/StepperHelper'
import {
  getCurrentStepAndStepType,
  getStepBySlug,
  getStepOptions,
  getStepperMachine,
  getStepQuestion,
  resolveStepType,
  STEP_TYPES,
  StepOption,
  StepperMachine,
  validateStepConfig,
  validateStepperConfig,
} from '../utils'
import * as styles from './Stepper.css'

const ANSWER_DELIMITER = ','
export const STEPPER_HELPER_ENABLED_KEY = 'show-stepper-config-helper'

const STEPPER_HELPER_ENABLED =
  isRunningOnEnvironment('dev') || isRunningOnEnvironment('local')

interface StepperProps {
  stepper: StepperSchema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optionsFromNamespace: { slug: string; data: Record<string, any>[] }[]
  scrollUpWhenNextStepAppears?: boolean
  namespace: Record<string, string>
  showWebReader?: boolean
  webReaderClassName?: string
}

interface QuestionAndAnswer {
  question: string
  answer: string
  slug: string
  links?: { label?: string; href?: string }[]
}

const getInitialStateAndAnswersByQueryParams = (
  stepper: StepperSchema,
  stepperMachine: StepperMachine,
  query: ParsedUrlQuery,
  activeLocale: string,
  optionsFromNamespace: StepperProps['optionsFromNamespace'],
) => {
  let initialState = stepperMachine.initialState
  const questionsAndAnswers: QuestionAndAnswer[] = []

  const answerString = (query?.answers ?? '') as string

  // If the query parameter is not a string then we just skip checking further
  if (typeof answerString !== 'string')
    return { initialState, questionsAndAnswers }

  const answers = answerString.split(ANSWER_DELIMITER)

  for (const answer of answers) {
    const stateNode = stepperMachine.states[initialState.value as string]
    const step = getStepBySlug(stepper, stateNode.config.meta.stepSlug)
    const stepType = resolveStepType(step)

    if (stepType === STEP_TYPES.ANSWER) break

    const options = getStepOptions(step, activeLocale, optionsFromNamespace)
    let selectedOption = options.find((o) => o.value === answer)

    if (stepType === STEP_TYPES.INFORMATION) {
      selectedOption = {
        label: activeLocale === 'is' ? 'Halda áfram' : 'Continue',
        transition: 'continue',
        value: 'continue',
      }
    }

    if (!selectedOption) break

    initialState = stepperMachine.transition(
      initialState,
      selectedOption?.transition,
    )

    const stepQuestion = getStepQuestion(step)
    if (stepQuestion && stepType !== STEP_TYPES.INFORMATION) {
      questionsAndAnswers.push({
        question: stepQuestion,
        answer: selectedOption.label,
        slug: selectedOption.value,
        links: selectedOption.linksToDisplayInHistory ?? [],
      })
    }
  }

  return { initialState, questionsAndAnswers }
}

const StepperWrapper = (
  StepperComponent: React.ComponentType<React.PropsWithChildren<StepperProps>>,
) => {
  const Component = (props: StepperProps) => {
    const configErrors = validateStepperConfig(props.stepper)
    const steps =
      props.stepper?.steps
        ?.map((s) => s.slug)
        ?.map((s) => getStepBySlug(props.stepper, s)) ?? []

    const stepConfigErrors = steps.map((step) => ({
      step,
      errors: validateStepConfig(step),
    }))

    if (
      configErrors.size > 0 ||
      stepConfigErrors.some(({ errors }) => errors.size > 0)
    ) {
      return STEPPER_HELPER_ENABLED
        ? renderStepperAndStepConfigErrors(
            props.stepper,
            configErrors,
            stepConfigErrors, // TODO: Argument of type '{ step: Step | undefined; errors: Set<string>; }[]' is not assignable to parameter of type '{ step: Step; errors: Set<string>; }[]': Stefna
          )
        : null
    }

    return <StepperComponent {...props} />
  }

  return Component
}

const Stepper = ({
  stepper,
  optionsFromNamespace,
  namespace,
  scrollUpWhenNextStepAppears = true,
  showWebReader = false,
  webReaderClassName = 'rs_read',
}: StepperProps) => {
  const router = useRouter()
  const i18n = useI18n()
  const activeLocale = i18n?.activeLocale ?? 'is'

  const n = useNamespace(namespace)

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_, setCounter] = useState(0)

  const stepperMachine = useMemo(() => getStepperMachine(stepper), [stepper])

  const { initialState, questionsAndAnswers } = useMemo(() => {
    return getInitialStateAndAnswersByQueryParams(
      stepper,
      stepperMachine,
      router.query,
      activeLocale,
      optionsFromNamespace,
    )
  }, [
    activeLocale,
    router.query,
    stepper,
    stepperMachine,
    optionsFromNamespace,
  ])

  const [currentState, setCurrentState] = useState(initialState)

  useEffect(() => {
    setCurrentState(initialState)
  }, [initialState])

  // Since this gets it's value from useMemo then it can be undefined on the first pass, so be vary of that
  const { currentStep, currentStepType } = useMemo(
    () => getCurrentStepAndStepType(stepper, currentState),
    [stepper, currentState],
  )

  const [showStepperConfigHelper, setShowStepperConfigHelper] = useState(false)

  useEffect(() => {
    const hasSeenHelperBefore = JSON.parse(
      localStorage.getItem(STEPPER_HELPER_ENABLED_KEY) ?? 'false',
    )
    setShowStepperConfigHelper(STEPPER_HELPER_ENABLED && hasSeenHelperBefore)
  }, [])

  const isOnFirstStep = stepperMachine.initialState.value === currentState.value
  const [selectedOption, setSelectedOption] = useState<StepOption | null>(null)
  const stepOptions = useMemo(
    () => getStepOptions(currentStep, activeLocale, optionsFromNamespace),
    [activeLocale, currentStep, optionsFromNamespace],
  )

  const [
    hasClickedContinueWithoutSelecting,
    setHasClickedContinueWithoutSelecting,
  ] = useState<boolean>(false)

  const [transitionErrorMessage, setTransitionErrorMessage] = useState('')

  useEffect(() => {
    setSelectedOption(null)
  }, [router.asPath])

  useEffect(() => {
    let previousAnswerIsValid = false
    const { previousAnswer } = router.query

    // Select the option that was previously selected if we want to change an answer
    if (previousAnswer && selectedOption === null) {
      const option = stepOptions.find((o) => o.value === previousAnswer) ?? null
      setSelectedOption(option)
      previousAnswerIsValid = option !== null
    }

    // Select the first item by default if we have a dropdown
    if (
      currentStepType === STEP_TYPES.QUESTION_DROPDOWN &&
      selectedOption === null &&
      stepOptions.length > 0 &&
      !previousAnswerIsValid
    ) {
      setSelectedOption(stepOptions[0])
    }
  }, [
    router.query,
    currentStepType,
    selectedOption,
    stepOptions,
    router.asPath,
  ])

  const renderQuestionsAndAnswers = (
    questionsAndAnswers: QuestionAndAnswer[],
    urlWithoutQueryParams: string,
  ) => {
    const accumulatedAnswers: string[] = []

    return questionsAndAnswers.map(({ question, answer, slug, links }, i) => {
      const previouslyAccumulatedAnswers = [...accumulatedAnswers]
      accumulatedAnswers.push(slug)
      const query = {
        ...router.query,
        answers: `${previouslyAccumulatedAnswers.join(ANSWER_DELIMITER)}`,
        previousAnswer: slug,
      }
      return (
        <Box
          key={i}
          paddingBottom={2}
          marginTop={2}
          marginBottom={2}
          className={styles.answerRowContainer}
        >
          <Box marginRight={2}>
            <Text variant="h4" color="purple600">
              {question}
            </Text>
          </Box>

          <Stack space={1}>
            <Box
              display="flex"
              justifyContent="spaceBetween"
              alignItems="flexStart"
              rowGap={2}
              columnGap={2}
            >
              <Box>
                <Text color="purple600">{answer}</Text>
              </Box>
              <Box textAlign="right">
                <Link
                  shallow={true}
                  href={{
                    pathname: urlWithoutQueryParams,
                    query: query,
                  }}
                >
                  <Button
                    variant="text"
                    icon="pencil"
                    size="small"
                    nowrap={true}
                  >
                    {n('changeSelection', 'Breyta')}
                  </Button>
                </Link>
              </Box>
            </Box>
            {links && links.length > 0 && (
              <Stack space={2}>
                {links
                  .filter((link) => Boolean(link.href) && Boolean(link.label))
                  .map((link, index) => (
                    <LinkV2
                      key={index}
                      newTab={true}
                      color="blue400"
                      underline="normal"
                      underlineVisibility="always"
                      href={link.href as string}
                    >
                      {link.label}
                    </LinkV2>
                  ))}
              </Stack>
            )}
          </Stack>
        </Box>
      )
    })
  }

  const ContinueButton = () => (
    <Box marginTop={3}>
      <Button
        onClick={() => {
          if (
            selectedOption === null &&
            currentStepType !== STEP_TYPES.INFORMATION
          ) {
            setHasClickedContinueWithoutSelecting(true)
            return
          }
          setHasClickedContinueWithoutSelecting(false)

          setCurrentState((prevState) => {
            const newState = stepperMachine.transition(
              currentState,
              selectedOption?.transition ?? 'continue',
            )

            const transitionWorked = newState.value !== prevState.value
            const onTheInitialStep =
              prevState.value === stepperMachine.initialState.value

            const pathnameWithoutQueryParams = router.asPath.split('?')[0]
            const previousAnswers =
              router.query?.answers &&
              typeof router.query?.answers === 'string' &&
              !onTheInitialStep
                ? router.query.answers.concat(ANSWER_DELIMITER)
                : ''

            router
              .push({
                pathname: pathnameWithoutQueryParams,
                query: {
                  ...router.query,
                  answers: `${previousAnswers}${
                    selectedOption?.value ?? 'continue'
                  }`,
                },
              })
              .then(() => {
                if (scrollUpWhenNextStepAppears) window.scrollTo(0, 0)
              })

            if (!transitionWorked) {
              setTransitionErrorMessage(
                n(
                  'couldNotLoadNextStep',
                  'Því miður gekk ekki að hlaða niður næsta skrefi',
                ),
              )
            } else {
              setTransitionErrorMessage('')
            }

            return newState
          })
        }}
        size="small"
      >
        {n('continue', 'Áfram')}
      </Button>
    </Box>
  )

  const QuestionTitle = ({
    containerClassName,
  }: {
    containerClassName: string
  }) => (
    <Box
      className={containerClassName}
      marginBottom={3}
      marginTop={1}
      onClick={(ev) => {
        // If the user clicks four times in a row on the question title, we enable the helper if we're not in production
        if (ev.detail === 4) {
          localStorage.setItem(STEPPER_HELPER_ENABLED_KEY, JSON.stringify(true))
          setShowStepperConfigHelper(STEPPER_HELPER_ENABLED)

          // Force a re-render so that the StepperHelper gets rendered
          setCounter((c) => c + 1)
        }
      }}
    >
      {webRichText((currentStep?.subtitle ?? []) as SliceType[])}
    </Box>
  )

  const renderCurrentStepOptions = () => {
    if (currentStepType === STEP_TYPES.QUESTION_RADIO)
      return stepOptions.map((option, i) => {
        const key = `step-option-${i}`
        return (
          <Box key={key} marginBottom={3}>
            <RadioButton
              name={key}
              hasError={
                hasClickedContinueWithoutSelecting && selectedOption === null
              }
              label={option.label}
              checked={option.value === selectedOption?.value}
              onChange={() => setSelectedOption(option)}
            />
          </Box>
        )
      })

    if (currentStepType === STEP_TYPES.QUESTION_DROPDOWN)
      return (
        <GridContainer>
          <GridRow>
            <GridColumn span={['12/12', '12/12', '10/12', '8/12']}>
              <Select
                size="sm"
                name="step-option-select"
                noOptionsMessage={n('noOptions', 'Enginn valmöguleiki')}
                value={selectedOption}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore make web strict
                onChange={(option) => {
                  setSelectedOption(option as StepOption)
                }}
                options={stepOptions}
              />
            </GridColumn>
          </GridRow>
        </GridContainer>
      )
  }

  return (
    <Box className={styles.container}>
      {!(
        currentStepType === STEP_TYPES.ANSWER ||
        currentStepType === STEP_TYPES.INFORMATION
      ) && <QuestionTitle containerClassName={webReaderClassName} />}
      {showWebReader && (
        <Webreader readId={undefined} readClass={webReaderClassName} />
      )}
      {(currentStepType === STEP_TYPES.ANSWER ||
        currentStepType === STEP_TYPES.INFORMATION) && (
        <QuestionTitle containerClassName={webReaderClassName} />
      )}
      {renderCurrentStepOptions()}
      {transitionErrorMessage && (
        <Text marginBottom={2} marginTop={2} color="red400">
          {transitionErrorMessage}
        </Text>
      )}
      {(stepOptions?.length > 0 ||
        currentStepType === STEP_TYPES.INFORMATION) && <ContinueButton />}

      {!isOnFirstStep && (
        <Box
          marginTop={10}
          background="purple100"
          borderRadius="large"
          padding="containerGutter"
        >
          <Box display="flex" alignItems="center" justifyContent="spaceBetween">
            <Text variant="h3" marginBottom={3} color="purple600">
              {n('yourAnswers', 'Svörin þín')}
            </Text>
            <Box marginBottom={3} textAlign="right">
              <Link
                shallow={true}
                href={`${router.asPath.split('?')[0]}?stepper=true`}
              >
                <Button variant="text" icon="reload" size="small" nowrap={true}>
                  {n('startAgain', 'Byrja aftur')}
                </Button>
              </Link>
            </Box>
          </Box>
          {renderQuestionsAndAnswers(
            questionsAndAnswers,
            router.asPath.split('?')[0],
          )}
        </Box>
      )}

      {showStepperConfigHelper && (
        <StepperHelper
          stepper={stepper}
          currentState={currentState}
          currentStep={currentStep}
          stepperMachine={stepperMachine}
          optionsFromNamespace={optionsFromNamespace}
        />
      )}
    </Box>
  )
}

export default StepperWrapper(Stepper)
