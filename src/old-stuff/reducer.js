import React from 'react'

class Accordion extends React.Component {
  state = {openIndexes: [0]}
  internalSetState(changes, callback) {
    this.setState(state => {
      const changesObj = changes(state)
      return this.props.stateReducer(state, changesObj)
    }, callback)
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
    const {openIndexes} = this.state
    return this.props.children({
      openIndexes,
      handleItemClick: this.handleItemClick,
    })
  }
}

function SimpleAccordion({
  items,
  preventClose = false,
  single = false,
  ...props
}) {
  return (
    <Accordion
      {...props}
      stateReducer={(state, changes) => {
        if (
          preventClose &&
          changes.type === 'closing' &&
          state.openIndexes.length < 2
        ) {
          return null
        } else if (single && changes.type === 'opening') {
          return {openIndexes: changes.openIndexes.slice(-1)}
        }
        return changes
      }}
    >
      {({openIndexes, handleItemClick}) =>
        items.map((item, index) => (
          <div key={item.title}>
            <button onClick={() => handleItemClick(index)}>{item.title}</button>
            {openIndexes.includes(index) ? item.contents : null}
          </div>
        ))
      }
    </Accordion>
  )
}

export {Accordion, SimpleAccordion}
