import React from 'react'

class Accordion extends React.Component {
  static defaultProps = {
    preventClose: false,
    single: false,
  }
  state = {openIndexes: [0]}
  handleItemClick(index) {
    this.setState(state => {
      const closing = state.openIndexes.includes(index)
      if (this.props.preventClose && closing && state.openIndexes.length < 2) {
        return null
      } else if (this.props.single && !closing) {
        return {openIndexes: [index]}
      } else {
        return {
          openIndexes: closing
            ? state.openIndexes.filter(i => i !== index)
            : [...state.openIndexes, index],
        }
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

function SimpleAccordion({items, contentsPosition, ...props}) {
  return (
    <Accordion {...props}>
      {({openIndexes, handleItemClick}) =>
        items.map((item, index) => (
          <div
            key={item.title}
            style={{
              display: 'flex',
              flexDirection:
                contentsPosition === 'below' || contentsPosition === 'above'
                  ? 'column'
                  : 'row',
            }}
          >
            {(contentsPosition === 'above' || contentsPosition === 'left') &&
            openIndexes.includes(index)
              ? item.contents
              : null}
            <button onClick={() => handleItemClick(index)}>{item.title}</button>
            {(contentsPosition === 'below' || contentsPosition === 'right') &&
            openIndexes.includes(index)
              ? item.contents
              : null}
          </div>
        ))
      }
    </Accordion>
  )
}
SimpleAccordion.defaultProps = {contentsPosition: 'below'}

export {Accordion, SimpleAccordion}
