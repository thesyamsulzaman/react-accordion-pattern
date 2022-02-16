import React from 'react'
import posed, {PoseGroup} from 'react-pose'
import {css as emoCSS} from 'emotion'
import styled from 'react-emotion'

const css = (...args) => ({className: emoCSS(...args)})

class Accordion extends React.Component {
  static defaultProps = {
    stateReducer: (state, changes) => changes,
    onStateChange: () => {},
  }
  state = {openIndexes: [0]}
  getState(state = this.state) {
    return {
      openIndexes:
        this.props.openIndexes === undefined
          ? state.openIndexes
          : this.props.openIndexes,
    }
  }
  internalSetState(changes, callback = () => {}) {
    let allChanges
    this.setState(
      state => {
        const actualState = this.getState(state)
        const changesObject =
          typeof changes === 'function' ? changes(actualState) : changes
        allChanges = this.props.stateReducer(actualState, changesObject)
        return allChanges
      },
      () => {
        this.props.onStateChange(allChanges)
        callback()
      },
    )
  }
  handleItemClick = index => {
    this.internalSetState(state => {
      const closing = state.openIndexes.includes(index)
      return {
        type: closing ? 'closing' : 'opening',
        openIndexes: closing
          ? state.openIndexes.filter(i => i !== index)
          : [...state.openIndexes, index],
      }
    })
  }
  render() {
    const {openIndexes} = this.getState()
    const {children, ...props} = this.props
    return children({
      openIndexes,
      handleItemClick: this.handleItemClick,
    })
  }
}

const accordionItems = [
  {
    title: '🐴',
    contents: (
      <div>
        Horses can sleep both lying down and standing up. Domestic horses have a
        lifespan of around 25 years. A 19th century horse named 'Old Billy' is
        said to have lived 62 years.
      </div>
    ),
  },
  {
    title: '🦏',
    contents: (
      <div>
        Rhino skin maybe thick but it can be quite sensitive to sunburns and
        insect bites which is why they like wallow so much – when the mud dries
        it acts as protection from the sunburns and insects.
      </div>
    ),
  },
  {
    title: '🦄',
    contents: (
      <div>
        If you’re looking to hunt a unicorn, but don’t know where to begin, try
        Lake Superior State University in Sault Ste. Marie, Michigan. Since
        1971, the university has issued permits to unicorn questers.
      </div>
    ),
  },
]

const BelowItem = posed.div({
  open: {opacity: 1, top: 0},
  closed: {opacity: 0, top: 30},
})

const AboveItem = posed.div({
  open: {opacity: 1, bottom: 0},
  closed: {opacity: 0, bottom: 30},
})

function preventClose(state, changes) {
  if (changes.type === 'closing' && state.openIndexes.length < 2) {
    return null
  }
}

function single(state, changes) {
  if (changes.type === 'opening') {
    return {openIndexes: changes.openIndexes.slice(-1)}
  }
}

function combineReducers(...reducers) {
  return (state, changes) => {
    for (let reducer of reducers) {
      const result = reducer(state, changes)
      if (result !== undefined) {
        return result
      }
    }
    return changes
  }
}

const AccordionButton = styled('button')(
  {
    cursor: 'pointer',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    border: 'none',
    ':focus': {
      outline: 'none',
      backgroundColor: '#c9c9c9',
    },
  },
  ({isOpen}) =>
    isOpen
      ? {
          backgroundColor: '#d9d9d9',
        }
      : null,
)

function renderTabs({position, openIndexes, handleItemClick}) {
  const tabTitles = (
    <div {...css({display: 'flex'})}>
      {accordionItems.map((item, index) => (
        <AccordionButton
          isOpen={openIndexes.includes(index)}
          onClick={() => handleItemClick(index)}
        >
          {item.title}
        </AccordionButton>
      ))}
    </div>
  )
  const tabContents = (
    <div
      {...css({
        position: 'relative',
        minHeight: 120,
      })}
    >
      {accordionItems.map(
        (item, index) =>
          position === 'above' ? (
            <AboveItem
              key={index}
              pose={openIndexes.includes(index) ? 'open' : 'closed'}
              {...css({position: 'absolute', overflowY: 'hidden'})}
            >
              {accordionItems[index].contents}
            </AboveItem>
          ) : (
            <BelowItem
              key={index}
              pose={openIndexes.includes(index) ? 'open' : 'closed'}
              {...css({position: 'absolute', overflowY: 'hidden'})}
            >
              {accordionItems[index].contents}
            </BelowItem>
          ),
      )}
    </div>
  )
  return (
    <div>
      {position === 'above' ? tabContents : null}
      {tabTitles}
      {position === 'below' ? tabContents : null}
    </div>
  )
}

function Tabs({title, position = 'below'}) {
  return (
    <div>
      <strong>{title}</strong>
      <br />
      <Accordion stateReducer={combineReducers(preventClose, single)}>
        {accordionState => renderTabs({position, ...accordionState})}
      </Accordion>
    </div>
  )
}

const AnimatedAccordionItem = posed.div({
  open: {maxHeight: 130},
  closed: {maxHeight: 0},
})

function AccordionItem({item, onClick, isOpen, position}) {
  const horizontal = position === 'left' || position === 'right'
  const handPosition = {
    true: {
      left: '👈',
      right: '👉',
      above: '👆',
      below: '👇',
    },
    false: {
      left: '👉',
      right: '👈',
      above: '👉',
      below: '👉',
    },
  }
  const contents = (
    <AnimatedAccordionItem
      {...css({overflowY: 'hidden', textAlign: 'justify'})}
      pose={isOpen ? 'open' : 'closed'}
    >
      {item.contents}
    </AnimatedAccordionItem>
  )
  const hand = <span>{handPosition[isOpen][position]}</span>
  const button = (
    <AccordionButton
      {...css({textAlign: 'left', minWidth: horizontal ? null : 80})}
      isOpen={isOpen}
      onClick={onClick}
    >
      {position === 'right' ? null : hand} {item.title}{' '}
      {position === 'right' ? hand : null}
    </AccordionButton>
  )
  const rootCss = {
    display: 'grid',
    gridTemplate: 'auto auto',
    gridGap: 4,
    gridAutoFlow: horizontal ? 'column' : 'row',
  }
  return (
    <div {...css(rootCss)}>
      {position === 'above' || position === 'left' ? contents : null}
      {button}
      {position === 'below' || position === 'right' ? contents : null}
    </div>
  )
}

function AccordionExample({title, position = 'below', ...props}) {
  return (
    <div>
      <strong>{title}</strong>
      <br />
      <Accordion {...props}>
        {({openIndexes, handleItemClick}) => (
          <div>
            {accordionItems.map((item, index) => (
              <AccordionItem
                item={item}
                isOpen={openIndexes.includes(index)}
                position={position}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </div>
        )}
      </Accordion>
    </div>
  )
}

function Usage() {
  return (
    <div
      {...css({
        display: 'grid',
        gridAutoFlow: 'row',
        gridGap: 350,
        width: 500,
        padding: 20,
        fontSize: 24,
      })}
    >
      <AccordionExample title="Default" />
      <AccordionExample title="Above" position="above" />
      <AccordionExample title="Left" position="left" />
      <AccordionExample title="Right" position="right" />
      <AccordionExample title="Single" stateReducer={combineReducers(single)} />
      <AccordionExample
        title="Prevent Close"
        stateReducer={combineReducers(preventClose)}
      />
      <AccordionExample
        title="Single Prevent Close"
        stateReducer={combineReducers(preventClose, single)}
      />
      <Tabs title="Tabs Above" position="below" />
      <Tabs title="Tabs Below" position="above" />
    </div>
  )
}

export {Accordion, Usage}
