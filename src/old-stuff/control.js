import React from 'react'

class Accordion extends React.Component {
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
        allChanges =
          typeof changes === 'function' ? changes(actualState) : changes
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
    return this.props.children({
      openIndexes,
      handleItemClick: this.handleItemClick,
    })
  }
}

class SimpleAccordion extends React.Component {
  static defaultProps = {
    preventClose: false,
    single: false,
  }
  state = {openIndexes: [0]}
  handleStateChange = changes => {
    const {preventClose, single} = this.props
    this.setState(state => {
      if (
        preventClose &&
        changes.type === 'closing' &&
        state.openIndexes.length < 2
      ) {
        return null
      } else if (single && changes.type === 'opening') {
        return {openIndexes: changes.openIndexes.slice(-1)}
      }
      return {openIndexes: changes.openIndexes}
    })
  }
  render() {
    const {items, ...props} = this.props
    const {openIndexes} = this.state
    return (
      <Accordion
        {...props}
        openIndexes={openIndexes}
        onStateChange={this.handleStateChange}
      >
        {({openIndexes, handleItemClick}) =>
          items.map((item, index) => (
            <div key={item.title}>
              <button onClick={() => handleItemClick(index)}>
                {item.title}
              </button>
              {openIndexes.includes(index) ? item.contents : null}
            </div>
          ))
        }
      </Accordion>
    )
  }
}

export {Accordion, SimpleAccordion}
