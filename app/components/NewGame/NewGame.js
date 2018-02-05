import React from 'react'
import PropTypes from 'prop-types'
import { inputSection } from './styles.css'
import { contentContainer } from '../sharedStyles.css'

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  updateFunc: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  children: PropTypes.object,
  index: PropTypes.number,
  validation: PropTypes.string,
  validator: PropTypes.object
}

function InputField (props) {
  return (
    <div className={`col-${props.size}`}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text">{props.label}</label>
        </div>
        <input
          onChange={(e) => props.updateFunc(e.target.value, props.index)}
          value={props.value}
          type='text'
          className="form-control"
        />
        {props.children}
      </div>
      {props.validator && props.validator.message(props.label, props.value, props.validation, 'text-danger')}
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  updateFunc: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  optionValues: PropTypes.object.isRequired,
  validation: PropTypes.string,
  validator: PropTypes.object
}

function SelectField (props) {
  return (
    <div className={`col-${props.size}`}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text">{props.label}</label>
        </div>
        <select
          onChange={(e) => props.updateFunc(JSON.parse(e.target.value))}
          className="custom-select"
          id="bggSelect">
          {props.optionValues.map((val) => {
            return (
              <option
                value={JSON.stringify(val.toJS())}
                key={val.get('id')}
              >{val.get('name')}</option>
            )
          })}
        </select>
      </div>
      {props.validator && props.validator.message(props.label, props.value, props.validation, 'text-danger')}
    </div>
  )
}

NewGame.propTypes = {
  sessionTitle: PropTypes.string.isRequired,
  gameSearchText: PropTypes.string.isRequired,
  selectedGame: PropTypes.string.isRequired,
  updateSessionTitle: PropTypes.func.isRequired,
  updateGameSearchText: PropTypes.func.isRequired,
  updateIsWin: PropTypes.func.isRequired,
  queryAndHandleGameSearch: PropTypes.func.isRequired,
  updateSelectedGame: PropTypes.func.isRequired,
  queriedGames: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  addNewPlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  isWin: PropTypes.bool.isRequired,
  postAndHandleNewGame: PropTypes.func.isRequired,
  comments: PropTypes.string.isRequired,
  updateComments: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleGameSearch: PropTypes.func.isRequired,
  validator: PropTypes.object.isRequired
}

export default function NewGame (props) {
  return (
    <form className={`col-12 col-lg-10 ${contentContainer}`} onSubmit={props.handleSubmit}>
      <div className="row">
        <div className={`col-9 mt-2 ${inputSection}`}>
          <h4 className="col-12 text-center">Game Info</h4>
          <InputField
            label="Session Title"
            updateFunc={props.updateSessionTitle}
            value={props.sessionTitle}
            size="12"
            validator={props.validator}
            validation="required"
          />
          <InputField
            label="Search for a game"
            updateFunc={props.updateGameSearchText}
            value={props.gameSearchText}
            size="12">
            <div className="input-group-append">
              <button type="button" className="input-group-text btn btn-primary" onClick={props.handleGameSearch}>Search</button>
            </div>
          </InputField>
          <SelectField
            label="Select from results"
            updateFunc={props.updateSelectedGame}
            value={props.selectedGame}
            size="12"
            optionValues={props.queriedGames}
            validator={props.validator}
            validation="required"
          />
          <div className="col-12">
            <input type="checkbox" value={props.isWin} onChange={(e) => props.updateIsWin(!props.isWin)}/>
            <label className="pl-2">
              Game Won
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className={`col-6 mt-2 ${inputSection}`}>
          <div className="row">
            <h4 className="col-12 text-center">Player Info</h4>
          </div>
          <div className="row">
            <div className="col-3">
              <div className="pl-3">
                <button type="button" className="input-group-text btn btn-primary" onClick={props.addNewPlayer}>Add players</button>
                <span className="text-danger">{props.validator.message(
                  'players',
                  props.players.size,
                  'gt:0',
                  false,
                  {default: 'At least one player is required'})}</span>
              </div>
            </div>
            <div className="col-9">
              {props.players.map((player, index) => {
                return (
                  <div key={index}>
                    <InputField
                      label={`Player ${(index + 1)}`}
                      updateFunc={props.updatePlayer}
                      value={player}
                      size="12"
                      index={index}
                      validator={props.validator}
                      validation="required">
                      <div className="input-group-append">
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => props.removePlayer(index)}
                          onKeyDown={(e) => {}}>
                          X
                        </button>
                      </div>
                    </InputField>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className={`form-group col-12 pb-2 mt-2 ${inputSection}`}>
            <h4 className="text-center">Comments</h4>
            <textarea
              className="form-control"
              rows="5"
              value={props.comments}
              onChange={(e) => props.updateComments(e.target.value)}></textarea>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}
