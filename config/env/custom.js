/**
 * Kodo Kojo - Software factory done right
 * Copyright © 2016 Kodo Kojo (infos@kodokojo.io)
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

import merge from 'lodash/merge'

/**
 * Set api host and protocl from env if provided
 */
let api = {}
let localApiProtocol
let localApiHost

if (process.env.API_PROTOCOL_ENV && process.env.API_HOST_ENV) {
  localApiProtocol = process.env.API_PROTOCOL_ENV
  localApiHost = process.env.API_HOST_ENV
  api = {
    protocol: localApiProtocol || 'http://',
    host: localApiHost || '192.168.99.100'
  }
}

const local = merge(
  api,
  {
    server: {
      port: 3000
    }
  }
)

export default local
