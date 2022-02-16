import React from 'react'
import {Accordion as BaseAccordion} from '../accordion'

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
  static defaultProps = {component: 'div'}
  static Title = AccordionItemTitle
  static Contents = AccordionItemContents
  render() {
    const {
      children,
      onTitleClick,
      isOpen,
      component: RootComp,
      ...props
    } = this.props
    return (
      <RootComp {...props}>
        {React.Children.map(children, child => {
          if (!child) {
            return child
          } else if (child.type === AccordionItem.Title) {
            return React.cloneElement(child, {
              onClick: onTitleClick,
            })
          } else if (child.type === AccordionItem.Contents) {
            return isOpen ? child : null
          } else {
            throw new Error(
              'Attempted to render non-compound component in an AccordionItem',
            )
          }
        })}
      </RootComp>
    )
  }
}

function Accordion({children, ...props}) {
  return (
    <BaseAccordion {...props}>
      {({openIndexes, handleItemClick}) =>
        React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            onTitleClick: () => handleItemClick(index),
            isOpen: openIndexes.includes(index),
          }),
        )
      }
    </BaseAccordion>
  )
}
Accordion.Item = AccordionItem

export {Accordion}
