/* eslint-disable func-style */
import { ApplicationWithAttachments } from '@island.is/application/types'
import {
  SubmitTaxReturnByNationalIdAndYearRequest,
  TaxReturnDebtLine,
  TaxReturnIncomeLine,
  TaxReturnPropertyLine,
} from '@island.is/clients/tax/application'

type GroupedItem<T> = {
  type: string
  items: T[]
}

export type IncomeTypeCategory =
  | 'compensation'
  | 'salary'
  | 'benefits'
  | 'unknown'

const incomeTypeMap: Record<string, IncomeTypeCategory> = {
  'c32f9c31-6536-426d-80a1-b9ea326f9209': 'compensation',
  'c32f9c31-6536-426d-80a1-b9ea326f9207': 'salary',
  'c32f9c31-6536-426d-80a1-b9ea326f9208': 'benefits',
}

function groupByKey<T extends { [key: string]: any }>(
  data: Record<string, any>,
  sectionKey: string,
  groupKey?: string,
): GroupedItem<T>[] {
  const section = data[sectionKey]
  const linesKey = `${sectionKey}Lines`
  const typeKey = `${sectionKey}Type`

  if (!section || !Array.isArray(section[linesKey])) {
    return []
  }

  const lines: T[] = section[linesKey]

  const grouped: Record<string, GroupedItem<T>> = {}

  for (const item of lines) {
    const key = item[typeKey]?.id ?? 'unknown'
    const name = item[typeKey]?.name ?? 'Unknown'

    if (!grouped[key]) {
      grouped[key] = {
        type: name,
        items: [],
      }
    }

    grouped[key].items.push(item)
  }

  return Object.values(grouped)
}

function groupIncomeLines(data: any) {
  const incomeLines = data?.income?.incomeLines ?? []

  const grouped: Record<string, any> = {}

  for (const line of incomeLines) {
    const incomeType = line.incomeType
    const id = incomeType?.id ?? 'unknown'
    const name = incomeType?.name ?? 'Unknown'

    const category: IncomeTypeCategory = incomeTypeMap[id] ?? 'unknown'

    if (!grouped[id]) {
      grouped[id] = {
        name,
        type: category,
        items: [],
      }
    }

    grouped[id].items.push(line)
  }

  return Object.values(grouped)
}

function groupPropertyLines(data: any) {
  const propertyLines = data?.property?.propertyLines ?? []

  const grouped: Record<string, any> = {}

  for (const line of propertyLines) {
    const propertyType = line.propertyType
    const name = propertyType?.name ?? 'Unknown'

    if (!grouped[name]) {
      grouped[name] = {
        name,
        type: name,
        items: [],
      }
    }

    grouped[name].items.push(line)
  }

  return Object.values(grouped)
}

function groupHomeDebt(data: any) {
  const debtLines = data?.property?.debtLines ?? []

  const grouped: Record<string, any> = {}

  for (const line of debtLines) {
    const debtType = line.debtType
    const name = debtType?.name

    if (grouped[name] === 'property') {
      grouped[name] = {
        id: debtType?.id,
        type: name,
        items: [],
      }
    }

    grouped[name].items.push(line)
  }

  return Object.values(grouped)
}

export { groupByKey, groupIncomeLines, groupPropertyLines, groupHomeDebt }

export function createTaxReturn(
  app: ApplicationWithAttachments,
): SubmitTaxReturnByNationalIdAndYearRequest {
  const taxReturnData = app.externalData.getTaxReturnData.data as {
    prefill?: {
      debt?: { debtLines: TaxReturnDebtLine[] }
      income?: { incomeLines: TaxReturnIncomeLine[] }
      property?: { propertyLines: TaxReturnPropertyLine[] }
    }
  }

  console.log('createTaxReturn', app.externalData.getTaxReturnData.data)

  return {
    nationalId: '1203894569',
    year: '2025',
    submitTaxReturnBody: {
      debtLines: taxReturnData.prefill?.debt?.debtLines as TaxReturnDebtLine[],
      incomeLines: taxReturnData.prefill?.income
        ?.incomeLines as TaxReturnIncomeLine[],
      email: (app.answers.generalInfo as { contact: { email: string } }).contact
        .email,
      phonenumber: (app.answers.generalInfo as { contact: { phone: string } })
        .contact.phone,
      propertyLines: taxReturnData.prefill?.property
        ?.propertyLines as TaxReturnPropertyLine[],
    },
  }
}

/*
{
  "id": "0042fbf6-2acd-451c-bf58-30089de1619a",
  "applicant": "**REMOVE_PII: 0101302399**",
  "assignees": [
    "5804170510"
  ],
  "applicantActors": [],
  "state": "submitted",
  "attachments": {},
  "typeId": "TaxReturn",
  "answers": {
    "generalInfo": {
      "contact": {
        "email": "jokull.thordarson@email.is",
        "phone": "+354772839123"
      }
    },
    "incomeLastYear": {
      "salary": [
        {
          "title": "Norðurljós Software ehf",
          "value": "9360000",
          "details": ""
        },
        {
          "title": "Mús & Merki ehf.",
          "value": "960000",
          "details": ""
        }
      ],
      "benefits": [
        {
          "title": "Dagpeningar",
          "value": "120000",
          "details": ""
        }
      ],
      "compensation": [
        {
          "title": "Íþróttastyrkur",
          "value": "75000",
          "details": "Norðurljós Software ehf"
        },
        {
          "title": "Starfsmenntastyrkur",
          "value": "130000",
          "details": "VR"
        }
      ]
    },
    "approveExternalData": true
  },
  "externalData": {
    "getTaxReturnData": {
      "data": {
        "prefill": {
          "debt": {
            "id": "89a1e794-f7bf-4ef9-a03a-200000000000",
            "type": "prefill",
            "debtLines": [
              {
                "id": "89a1e794-f7bf-4ef9-a03a-000000000111",
                "term": 360,
                "label": "Bláfjallagata 12",
                "currency": "ISK",
                "debtType": {
                  "id": "89a1e794-f7bf-4ef9-a03a-000000000000",
                  "name": "property"
                },
                "creditorId": "4910080160",
                "identifier": "56783900123",
                "interestAmount": 920000,
                "originationDate": "2021-06-15T00:00:00.000Z",
                "annualTotalPayment": 2280000,
                "outstandingPrincipal": 28540000,
                "annualTotalPrincipalPayment": 1360000
              },
              {
                "id": "89a1e794-f7bf-4ef9-a03a-000000000222",
                "term": null,
                "label": "Eftirstöðvar á korti númer: 4469 88XX XXXX 4567",
                "currency": "ISK",
                "debtType": {
                  "id": "89a1e794-f7bf-4ef9-a03a-100000000000",
                  "name": "general"
                },
                "creditorId": null,
                "identifier": null,
                "interestAmount": 39200,
                "originationDate": "1970-01-01T00:00:00.000Z",
                "annualTotalPayment": null,
                "outstandingPrincipal": 217000,
                "annualTotalPrincipalPayment": null
              },
              {
                "id": "89a1e794-f7bf-4ef9-a03a-000000000333",
                "term": null,
                "label": "Aukalán",
                "currency": "ISK",
                "debtType": {
                  "id": "89a1e794-f7bf-4ef9-a03a-100000000000",
                  "name": "general"
                },
                "creditorId": null,
                "identifier": null,
                "interestAmount": 86000,
                "originationDate": "1970-01-01T00:00:00.000Z",
                "annualTotalPayment": null,
                "outstandingPrincipal": 980000,
                "annualTotalPrincipalPayment": null
              },
              {
                "id": "89a1e794-f7bf-4ef9-a03a-000000000444",
                "term": null,
                "label": "0142-26-732645 Varðan",
                "currency": "ISK",
                "debtType": {
                  "id": "89a1e794-f7bf-4ef9-a03a-100000000000",
                  "name": "general"
                },
                "creditorId": null,
                "identifier": null,
                "interestAmount": 14500,
                "originationDate": "1970-01-01T00:00:00.000Z",
                "annualTotalPayment": null,
                "outstandingPrincipal": 62000,
                "annualTotalPrincipalPayment": null
              },
              {
                "id": "89a1e794-f7bf-4ef9-a03a-000000000555",
                "term": null,
                "label": "Kílómetragjald, Skatturinn",
                "currency": "ISK",
                "debtType": {
                  "id": "89a1e794-f7bf-4ef9-a03a-100000000000",
                  "name": "general"
                },
                "creditorId": null,
                "identifier": null,
                "interestAmount": 0,
                "originationDate": "1970-01-01T00:00:00.000Z",
                "annualTotalPayment": null,
                "outstandingPrincipal": 2370,
                "annualTotalPrincipalPayment": null
              },
              {
                "id": "89a1e794-f7bf-4ef9-a03a-000000000666",
                "term": null,
                "label": "Þing- og sveitarsjóðsgjöld, Skatturinn",
                "currency": "ISK",
                "debtType": {
                  "id": "89a1e794-f7bf-4ef9-a03a-100000000000",
                  "name": "general"
                },
                "creditorId": null,
                "identifier": null,
                "interestAmount": 224,
                "originationDate": "1970-01-01T00:00:00.000Z",
                "annualTotalPayment": null,
                "outstandingPrincipal": 0,
                "annualTotalPrincipalPayment": null
              }
            ]
          },
          "year": 2025,
          "income": {
            "id": "b144dc92-216c-4f3c-a2c1-31742109ba3c",
            "type": "prefill",
            "incomeLines": [
              {
                "id": "2ae34c93-a332-4df6-badb-5363465ff450",
                "label": "Norðurljós Software ehf",
                "value": 9360000,
                "incomeType": {
                  "id": "c32f9c31-6536-426d-80a1-b9ea326f9207",
                  "code": "2.1",
                  "name": "Launatekjur og starfstengdar greiðslur"
                }
              },
              {
                "id": "2ae34c93-a332-4df6-badb-5363465ff451",
                "label": "Mús & Merki ehf.",
                "value": 960000,
                "incomeType": {
                  "id": "c32f9c31-6536-426d-80a1-b9ea326f9207",
                  "code": "2.1",
                  "name": "Launatekjur og starfstengdar greiðslur"
                }
              },
              {
                "id": "2ae34c93-a332-4df6-badb-5363465ff452",
                "label": "Dagpeningar",
                "value": 120000,
                "incomeType": {
                  "id": "c32f9c31-6536-426d-80a1-b9ea326f9208",
                  "code": "2.2",
                  "name": "Ökutækjastyrkur. Dagpeningar. Hlunnindi."
                }
              },
              {
                "id": "2ae34c93-a332-4df6-badb-5363465ff453",
                "label": "Íþróttastyrkur",
                "payer": "Norðurljós Software ehf",
                "value": 75000,
                "incomeType": {
                  "id": "c32f9c31-6536-426d-80a1-b9ea326f9209",
                  "code": "2.3",
                  "name": "Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl."
                }
              },
              {
                "id": "2ae34c93-a332-4df6-badb-5363465ff454",
                "label": "Starfsmenntastyrkur",
                "payer": "VR",
                "value": 130000,
                "incomeType": {
                  "id": "c32f9c31-6536-426d-80a1-b9ea326f9209",
                  "code": "2.3",
                  "name": "Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl."
                }
              }
            ]
          },
          "property": {
            "id": "89a1e794-f7bf-4ef9-cccc-000000000000",
            "type": "prefill",
            "propertyLines": [
              {
                "id": "89a1e794-f7bf-4ef9-bbbb-000000000111",
                "label": "Bláfjallagata 12",
                "value": 52000000,
                "currency": "ISK",
                "identifier": "210-9876",
                "propertyType": {
                  "id": "89a1e794-f7bf-4ef9-aaaa-000000000000",
                  "name": "property"
                }
              },
              {
                "id": "89a1e794-f7bf-4ef9-bbbb-000000000222",
                "label": "2021",
                "value": 3100000,
                "currency": "ISK",
                "identifier": "KB-521",
                "propertyType": {
                  "id": "89a1e794-f7bf-4ef9-bbbb-000000000000",
                  "name": "vehicle"
                }
              },
              {
                "id": "89a1e794-f7bf-4ef9-bbbb-000000000333",
                "label": "2012",
                "value": 430000,
                "currency": "ISK",
                "identifier": "JU-329",
                "propertyType": {
                  "id": "89a1e794-f7bf-4ef9-bbbb-000000000000",
                  "name": "vehicle"
                }
              }
            ]
          },
          "nationalId": "**REMOVE_PII: **REMOVE_PII: 1203894569****"
        },
        "groupedIncome": [
          {
            "name": "Launatekjur og starfstengdar greiðslur",
            "type": "salary",
            "items": [
              {
                "id": "2ae34c93-a332-4df6-badb-5363465ff450",
                "label": "Norðurljós Software ehf",
                "value": 9360000,
                "incomeType": {
                  "id": "c32f9c31-6536-426d-80a1-b9ea326f9207",
                  "code": "2.1",
                  "name": "Launatekjur og starfstengdar greiðslur"
                }
              },
              {
                "id": "2ae34c93-a332-4df6-badb-5363465ff451",
                "label": "Mús & Merki ehf.",
                "value": 960000,
                "incomeType": {
                  "id": "c32f9c31-6536-426d-80a1-b9ea326f9207",
                  "code": "2.1",
                  "name": "Launatekjur og starfstengdar greiðslur"
                }
              }
            ]
          },
          {
            "name": "Ökutækjastyrkur. Dagpeningar. Hlunnindi.",
            "type": "benefits",
            "items": [
              {
                "id": "2ae34c93-a332-4df6-badb-5363465ff452",
                "label": "Dagpeningar",
                "value": 120000,
                "incomeType": {
                  "id": "c32f9c31-6536-426d-80a1-b9ea326f9208",
                  "code": "2.2",
                  "name": "Ökutækjastyrkur. Dagpeningar. Hlunnindi."
                }
              }
            ]
          },
          {
            "name": "Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl.",
            "type": "compensation",
            "items": [
              {
                "id": "2ae34c93-a332-4df6-badb-5363465ff453",
                "label": "Íþróttastyrkur",
                "payer": "Norðurljós Software ehf",
                "value": 75000,
                "incomeType": {
                  "id": "c32f9c31-6536-426d-80a1-b9ea326f9209",
                  "code": "2.3",
                  "name": "Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl."
                }
              },
              {
                "id": "2ae34c93-a332-4df6-badb-5363465ff454",
                "label": "Starfsmenntastyrkur",
                "payer": "VR",
                "value": 130000,
                "incomeType": {
                  "id": "c32f9c31-6536-426d-80a1-b9ea326f9209",
                  "code": "2.3",
                  "name": "Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl."
                }
              }
            ]
          }
        ],
        "groupedProperty": [
          {
            "name": "property",
            "type": "property",
            "items": [
              {
                "id": "89a1e794-f7bf-4ef9-bbbb-000000000111",
                "label": "Bláfjallagata 12",
                "value": 52000000,
                "currency": "ISK",
                "identifier": "210-9876",
                "propertyType": {
                  "id": "89a1e794-f7bf-4ef9-aaaa-000000000000",
                  "name": "property"
                }
              }
            ]
          },
          {
            "name": "vehicle",
            "type": "vehicle",
            "items": [
              {
                "id": "89a1e794-f7bf-4ef9-bbbb-000000000222",
                "label": "2021",
                "value": 3100000,
                "currency": "ISK",
                "identifier": "KB-521",
                "propertyType": {
                  "id": "89a1e794-f7bf-4ef9-bbbb-000000000000",
                  "name": "vehicle"
                }
              },
              {
                "id": "89a1e794-f7bf-4ef9-bbbb-000000000333",
                "label": "2012",
                "value": 430000,
                "currency": "ISK",
                "identifier": "JU-329",
                "propertyType": {
                  "id": "89a1e794-f7bf-4ef9-bbbb-000000000000",
                  "name": "vehicle"
                }
              }
            ]
          }
        ]
      },
      "date": "2025-05-07T16:54:32.490Z",
      "status": "success"
    },
    "getTaxNationalRegistryData": {
      "data": {
        "person": {
          "name": "Jökull Þórðarson",
          "email": "jokull.thordarson@email.is",
          "address": {
            "city": "Reykjavík",
            "address": "Bláfjallagata 12",
            "postalCode": "105"
          },
          "nationalId": 1203894569,
          "phoneNumber": "772839123"
        }
      },
      "date": "2025-05-07T16:54:32.367Z",
      "status": "success"
    },
    "postApplication": {
      "status": "success",
      "date": "2025-05-07T17:11:45.300Z"
    }
  },
  "status": "inprogress",
  "isListed": true,
  "pruneAt": "2025-08-05T16:54:32.560Z",
  "pruned": false,
  "assignNonces": [],
  "draftFinishedSteps": 4,
  "draftTotalSteps": 5,
  "created": "2025-05-07T15:31:44.550Z",
  "modified": "2025-05-07T17:10:00.354Z"
}
