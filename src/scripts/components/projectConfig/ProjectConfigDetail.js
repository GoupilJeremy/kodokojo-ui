import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { combineValidators } from 'revalidate'
import { intlShape, injectIntl } from 'react-intl'

// UI
import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

import './projectConfigDetail.less'
import { fontSizeMedium } from '../../../styles/commons'
import { emailValidator } from '../../services/validatorService'
import { returnErrorKey } from '../../services/errorService'
import { addUserToProjectConfig } from './projectConfigActions'
import User from '../user/User'

// validate function
const validate = combineValidators({
  email: emailValidator('email')
})

// ProjectConfigDetail component
export class ProjectConfigDetail extends Component {

  static propTypes = {
    addUserToProjectConfig: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    projectConfig: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
  }

  handleSubmit = () => {
    const { fields: { email }, projectConfig, addUserToProjectConfig } = this.props

    const nextEmail = email.value
    const error = validate({ email: nextEmail })
    if (error.email) {
      return Promise.reject({ email: error.email })
    } else {
      if (nextEmail && nextEmail.trim()) {
        return addUserToProjectConfig(projectConfig.id, nextEmail.trim()
        ).then(() => {
          email.value = ''
          return Promise.resolve()
        }
        ).catch(error => {
          return Promise.reject({ email: returnErrorKey('user', 'create-account', error.message) })
        })
      }
    }
  }

  render() {
    const { fields: { email }, projectConfig, users, handleSubmit, submitting } = this.props
    const { formatMessage }  = this.props.intl
    const owner = projectConfig.owner && projectConfig.owner.userName ? projectConfig.owner.userName : ''

    return (
      <Card>
        <CardHeader
          // avatar="http://lorempixel.com/100/100/abstract/"
          subtitle={ formatMessage({ id: 'project-config-owner-label' }) + `: ${owner}` }
          title={ projectConfig.name }
          titleStyle={ fontSizeMedium }
        />
        <CardText>
          <Table
            fixedHeader
            height="210px"
            selectable={ false }
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn tooltip="User name">Module</TableHeaderColumn>
                <TableHeaderColumn tooltip="Role">Brick</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              showRowHover
            >
              { projectConfig.stacks && projectConfig.stacks[0] && projectConfig.stacks[0].brickConfigs &&
              projectConfig.stacks[0].brickConfigs.map((brick, index) => (
                <TableRow key={ index } selected={ brick.selected }>
                  <TableRowColumn>{ brick.type }</TableRowColumn>
                  <TableRowColumn>{ brick.name }</TableRowColumn>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
          <form id="addUserForm"
                name="addUserForm"
                noValidate
                onSubmit={ handleSubmit(this.handleSubmit) }
          >
            <TextField
              { ...email }
              errorText={ email.touched && email.error ? formatMessage({ id: email.error }, {fieldName: formatMessage({ id:'email-input-label' })}) : '' }
              floatingLabelText={ formatMessage({id: 'signin-email-label'}) }
              hintText={ formatMessage({id: 'signin-email-hint-label'}) }
              name="email"
              type="email"
            />
            <FlatButton
              className="form-submit"
              disabled={ submitting }
              label={ '+ Add a user' }
              primary
              type="submit"
            />
          </form>
          <Table
            fixedHeader
            height="200px"
            selectable={ false }
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn tooltip="User name">User name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Role">Role</TableHeaderColumn>
                <TableHeaderColumn tooltip="Email address">Email address</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              showRowHover
            >
              { projectConfig.users &&
                projectConfig.users.map( (user, index) => (
                  <User
                    key={ index }
                    userId={ user.id }
                  />
                ))
              }
              { !projectConfig.users &&
                <TableRow>
                  <TableRowColumn>no user...</TableRowColumn>
                  <TableRowColumn />
                  <TableRowColumn />
                </TableRow>
              }
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <FlatButton
            className="form-submit"
            label={ 'Create project' }
            primary
            type="button"
          />
        </CardActions>
      </Card>
    )
  }

}

// ProjectConfigDetail container
const mapStateProps = (state) => {
  return {
    projectConfig: state.projectConfig,
    users: state.users
  }
}

const ProjectConfigDetailContainer = compose(
  reduxForm(
    {
      form: 'addUserForm',
      fields: ['email'],
      touchOnChange: true,
      validate
    },
    mapStateProps,
    {
      addUserToProjectConfig
    }
  ),
  injectIntl
)(ProjectConfigDetail)

export default ProjectConfigDetailContainer