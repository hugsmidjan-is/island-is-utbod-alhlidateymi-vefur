import { createParamDecorator } from '@nestjs/common'

import type { User } from '@island.is/judicial-system/types'

export const CurrentGraphQlUser = createParamDecorator(
  (data, { args: [_1, _2, { req }] }): User => req.user?.currentUser,
)
