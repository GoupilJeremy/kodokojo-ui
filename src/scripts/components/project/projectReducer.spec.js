import { expect } from 'chai'

import projectReducer from './projectReducer'
import * as ActionsTypes from '../../commons/constants'

describe('project reducer', () => {

  it('should return initialState', () => {
    // Given
    const state = undefined
    const action = {}

    // When
    const nextState = projectReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      projectConfig: {},
      isFetching: false
    })
  })

  it('should handle PROJECT_CONFIG_REQUEST', () => {
    // Given
    const state = undefined
    const action = {
      type: ActionsTypes.PROJECT_CONFIG_REQUEST
    }

    // When
    const nextState = projectReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      projectConfig: {},
      isFetching: true
    })
  })  

  it('should handle PROJECT_CONFIG_SUCCESS', () => {
    // Given
    const state = undefined
    const action = {
      type: ActionsTypes.PROJECT_CONFIG_SUCCESS,
      payload: {
        projectConfig: {
          id: 'projectId'
        }
      }
    }

    // When
    const nextState = projectReducer(state, action)

    // Then
    expect(nextState).to.deep.equal({
      projectConfig: {
        id: 'projectId'
      },
      isFetching: false
    })
  })
})
