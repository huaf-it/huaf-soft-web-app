import { CoreMenu } from '@core/types'
import { Role } from 'app/auth/models'
export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    role: [Role.Admin],
    url: 'home'
  },
  {
    id: 'sample',
    title: 'Sample',
    translate: 'MENU.SAMPLE',
    type: 'item',
    role: [Role.Admin],
    icon: 'file',
    url: 'sample'
  },
  {
    id: 'users',
    title: 'Users',
    translate: 'MENU.USERS',
    type: 'item',
    role: [Role.Admin],
    icon: 'users',
    url: 'users'
  }
]
