/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2017 Kodo Kojo (infos@kodokojo.io)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import {
  AUTH_RESET,
  MENU_INIT,
  MENU_UPDATE
} from '../../commons/constants'
import { updateMenu } from '../../services/stateUpdater.service'

const stateDefault = {}

// TODO UT
export default function menu(state = stateDefault, action) {
  if (action.type === MENU_INIT || action.type === MENU_UPDATE) {
    return action.menu
  }

  if (action.type === AUTH_RESET) {
    return {}
  }

  return state
}
