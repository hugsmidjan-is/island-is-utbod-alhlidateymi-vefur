import { pruneAfterDays } from '@island.is/application/core'

import {
  Application,
  ApplicationConfigurations,
  ApplicationContext,
  ApplicationStateSchema,
  ApplicationTemplate,
  ApplicationTypes,
  DefaultEvents,
  InstitutionNationalIds,
  defineTemplateApi,
} from '@island.is/application/types'

import { TaxReturnApi, TaxNationalRegistryApi } from '../dataProviders'
import { applicationSchema } from './dataSchema'
import { tax } from './messages'
import { TemplateApiActions } from './types'
import { assign } from 'xstate'
import set from 'lodash/set'
import { CodeOwners } from '@island.is/shared/constants'

export enum ApplicationStates {
  REQUIREMENTS = 'requirements',
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
}

enum Roles {
  APPLICANT = 'applicant',
  ASSIGNEE = 'assignee',
}

export type OJOIEvents =
  | { type: DefaultEvents.APPROVE }
  | { type: DefaultEvents.REJECT }
  | { type: DefaultEvents.SUBMIT }
  | { type: DefaultEvents.EDIT }

const OJOITemplate: ApplicationTemplate<
  ApplicationContext,
  ApplicationStateSchema<OJOIEvents>,
  OJOIEvents
> = {
  type: ApplicationTypes.TAX_RETURN,
  name: tax.applicationName,
  codeOwner: CodeOwners.Hugsmidjan,
  institution: tax.applicationOwner,
  // featureFlag: Features.officialJournalOfIceland,
  translationNamespaces: [
    ApplicationConfigurations.OfficialJournalOfIceland.translation,
  ],
  dataSchema: applicationSchema,
  // allowMultipleApplicationsInDraft: false,
  allowMultipleApplicationsInDraft: true,
  stateMachineOptions: {
    actions: {
      assignToInstitution: assign((context) => {
        const { application } = context

        set(application, 'assignees', [
          InstitutionNationalIds.DOMSMALA_RADUNEYTID,
        ])

        return context
      }),
    },
  },
  stateMachineConfig: {
    initial: ApplicationStates.REQUIREMENTS,
    states: {
      [ApplicationStates.REQUIREMENTS]: {
        meta: {
          name: 'Gagnaöflun',
          status: 'draft',
          lifecycle: pruneAfterDays(90),
          progress: 0.33,
          roles: [
            {
              id: Roles.APPLICANT,
              read: 'all',
              write: 'all',
              delete: true,
              formLoader: () =>
                import('../forms/Requirements').then((val) =>
                  Promise.resolve(val.Requirements),
                ),
              api: [TaxReturnApi, TaxNationalRegistryApi],
            },
          ],
        },
        on: {
          [DefaultEvents.SUBMIT]: [
            {
              target: ApplicationStates.DRAFT,
            },
          ],
        },
      },
      [ApplicationStates.DRAFT]: {
        entry: 'assignToInstitution',
        meta: {
          name: tax.applicationName.defaultMessage,
          status: 'inprogress',
          progress: 0.66,
          actionCard: {
            tag: {
              label: tax.draftStatusLabel,
              variant: 'blue',
            },
          },
          lifecycle: pruneAfterDays(90),
          roles: [
            {
              id: Roles.APPLICANT,
              read: 'all',
              write: 'all',
              delete: true,
              formLoader: () =>
                import('../forms/Draft').then((val) =>
                  Promise.resolve(val.Draft),
                ),
              actions: [
                {
                  event: DefaultEvents.SUBMIT,
                  name: tax.sendApplication,
                  type: 'primary',
                },
              ],
            },
            {
              id: Roles.ASSIGNEE,
              read: 'all',
              write: 'all',
            },
          ],
        },
        on: {
          [DefaultEvents.SUBMIT]: [
            {
              target: ApplicationStates.SUBMITTED,
            },
          ],
        },
      },
      [ApplicationStates.SUBMITTED]: {
        meta: {
          name: tax.applicationName.defaultMessage,
          status: 'completed',
          progress: 1,
          lifecycle: pruneAfterDays(90),
          onEntry: defineTemplateApi({
            action: TemplateApiActions.postApplication,
            shouldPersistToExternalData: true,
            externalDataId: 'successfullyPosted',
            throwOnError: false,
          }),
          actionCard: {
            tag: {
              label: tax.submittedStatusLabel,
              variant: 'purple',
            },
          },
          roles: [
            {
              id: Roles.APPLICANT,
              read: 'all',
              write: 'all',
              delete: false,
              formLoader: () =>
                import('../forms/Submitted').then((val) =>
                  Promise.resolve(val.Submitted),
                ),
            },
            {
              id: Roles.ASSIGNEE,
              read: 'all',
              write: 'all',
            },
          ],
        },
        on: {
          [DefaultEvents.EDIT]: {
            target: ApplicationStates.SUBMITTED,
          },
        },
      },
    },
  },
  mapUserToRole(id: string, application: Application) {
    if (id === application.applicant) {
      return Roles.APPLICANT
    }
    if (application.assignees.includes(id)) {
      return Roles.ASSIGNEE
    }
    return undefined
  },
}

export default OJOITemplate
