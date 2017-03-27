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

import React from 'react'

// Component commons
import FontIcon from 'kodokojo-ui-commons/src/scripts/components/fontIcon/FontIcon.component'

// Component
import organisationTheme from './organisation.scss'

const OrganisationAddButton = ({
  label,
  onToggleForm,
  title
}) => (
  <div
    className={ organisationTheme['organisation-button'] }
    onClick={ onToggleForm }
    title={ title }
  >
    <FontIcon
      className={ organisationTheme['organisation-icon'] }
      value="add_circle_outline"
    />
    { label }
  </div>
)

OrganisationAddButton.propTypes = {
  label: React.PropTypes.string,
  onToggleForm: React.PropTypes.func,
  title: React.PropTypes.string,
}

export default OrganisationAddButton
