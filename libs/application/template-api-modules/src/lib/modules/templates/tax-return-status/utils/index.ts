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

export { groupByKey, groupIncomeLines, groupPropertyLines }
