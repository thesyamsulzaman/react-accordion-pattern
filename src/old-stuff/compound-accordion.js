import React from 'react'

class AccordionItemTitle extends React.Component {
  render() {
    return <button {...this.props} />
  }
}

class AccordionItemContents extends React.Component {
  render() {
    return this.props.children
  }
}

class AccordionItem extends React.Component {
  static Title = AccordionItemTitle
  static Contents = AccordionItemContents
  render() {
    const {children, onClick, isOpen, ...props} = this.props
    return (
      <div {...props}>
        {React.Children.map(children, child => {
          if (!child) {
            return child
          } else if (child.type === AccordionItem.Title) {
            return React.cloneElement(child, {
              onClick,
            })
          } else if (child.type === AccordionItem.Contents) {
            return isOpen ? child : null
          } else {
            throw new Error(
              'Attempted to render non-compound component in an AccordionItem',
            )
          }
        })}
      </div>
    )
  }
}

class Accordion extends React.Component {
  static defaultProps = {
    preventClose: false,
    single: false,
  }
  static Item = AccordionItem
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
    const {preventClose, children, ...props} = this.props
    return (
      <div {...props}>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            onClick: () => this.handleItemClick(index),
            isOpen: openIndexes.includes(index),
          }),
        )}
      </div>
    )
  }
}

function SimpleAccordion({items, contentsPosition, ...props}) {
  return (
    <Accordion {...props}>
      {items.map(item => (
        <Accordion.Item
          key={item.title}
          style={{
            display: 'flex',
            flexDirection:
              contentsPosition === 'below' || contentsPosition === 'above'
                ? 'column'
                : 'row',
          }}
        >
          {contentsPosition === 'above' || contentsPosition === 'left' ? (
            <Accordion.Item.Contents>{item.contents}</Accordion.Item.Contents>
          ) : null}
          <Accordion.Item.Title>{item.title}</Accordion.Item.Title>
          {contentsPosition === 'below' || contentsPosition === 'right' ? (
            <Accordion.Item.Contents>{item.contents}</Accordion.Item.Contents>
          ) : null}
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
SimpleAccordion.defaultProps = {contentsPosition: 'below'}

export {Accordion, SimpleAccordion}
