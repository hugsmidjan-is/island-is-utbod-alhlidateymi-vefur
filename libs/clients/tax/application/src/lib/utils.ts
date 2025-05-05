import {
  AdvertTemplateDetailsSlugEnum,
  GetAdvertTemplateResponseTypeEnum,
} from '../../gen/fetch'
import { TemplateType } from './taxApplicationClient.types'

const templateMap: Record<
  AdvertTemplateDetailsSlugEnum | GetAdvertTemplateResponseTypeEnum,
  TemplateType
> = {
  auglysing: 'skattaskyrsla',
  gjaldskra: 'skattaskyrsla',
  reglugerd: 'skattaskyrsla',
}

export const mapTemplateEnumToLiteral = (
  type: AdvertTemplateDetailsSlugEnum | GetAdvertTemplateResponseTypeEnum,
): TemplateType => {
  return templateMap[type]
}
