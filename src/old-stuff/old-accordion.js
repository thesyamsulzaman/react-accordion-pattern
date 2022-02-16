import React from 'react'

class InitialAccordion extends React.Component {
  state = {openIndex: null}
  handleItemClick(index) {
    this.setState(({openIndex}) => ({
      openIndex: openIndex === index ? null : index,
    }))
  }
  render() {
    const {openIndex} = this.state
    const {items} = this.props
    return (
      <div>
        {items.map((item, index) => (
          <div key={item.title}>
            <button onClick={() => this.handleItemClick(index)}>
              {item.title}
            </button>
            {openIndex === index ? item.contents : null}
          </div>
        ))}
      </div>
    )
  }
}

class MultipleAccordion extends React.Component {
  static defaultProps = {
    multiple: false,
  }
  state = {openIndexes: []}
  handleItemClick(index) {
    this.setState(({openIndexes}) => {
      if (this.props.multiple) {
        return {
          openIndexes: openIndexes.includes(index)
            ? openIndexes.filter(i => i !== index)
            : [...openIndexes, index],
        }
      } else {
        return {
          openIndexes: openIndexes.includes(index) ? [] : [index],
        }
      }
    })
  }
  render() {
    const {openIndexes} = this.state
    const {items} = this.props
    return (
      <div>
        {items.map((item, index) => (
          <div key={item.title}>
            <button onClick={() => this.handleItemClick(index)}>
              {item.title}
            </button>
            {openIndexes.includes(index) ? item.contents : null}
          </div>
        ))}
      </div>
    )
  }
}

class NoCloseAccordion extends React.Component {
  static defaultProps = {
    preventClose: true,
    multiple: false,
  }
  state = {openIndexes: []}
  handleItemClick(index) {
    this.setState(({openIndexes}) => {
      if (
        this.props.preventClose &&
        openIndexes.includes(index) &&
        openIndexes.length === 1
      ) {
        return null
      }
      if (this.props.multiple) {
        return {
          openIndexes: openIndexes.includes(index)
            ? openIndexes.filter(i => i !== index)
            : [...openIndexes, index],
        }
      } else {
        return {
          openIndexes: openIndexes.includes(index) ? [] : [index],
        }
      }
    })
  }
  render() {
    const {openIndexes} = this.state
    const {items} = this.props
    return (
      <div>
        {items.map((item, index) => (
          <div key={item.title}>
            <button onClick={() => this.handleItemClick(index)}>
              {item.title}
            </button>
            {openIndexes.includes(index) ? item.contents : null}
          </div>
        ))}
      </div>
    )
  }
}

class FullAccordion extends React.Component {
  static defaultProps = {
    contentsPosition: 'below',
    preventClose: false,
    multiple: false,
  }
  state = {openIndexes: []}
  handleItemClick(index) {
    this.setState(({openIndexes}) => {
      if (
        this.props.preventClose &&
        openIndexes.includes(index) &&
        openIndexes.length === 1
      ) {
        return null
      }
      if (this.props.multiple) {
        return {
          openIndexes: openIndexes.includes(index)
            ? openIndexes.filter(i => i !== index)
            : [...openIndexes, index],
        }
      } else {
        return {
          openIndexes: openIndexes.includes(index) ? [] : [index],
        }
      }
    })
  }
  render() {
    const {openIndexes} = this.state
    const {contentsPosition, items} = this.props
    return (
      <div>
        {items.map((item, index) => (
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
            <button onClick={() => this.handleItemClick(index)}>
              {item.title}
            </button>
            {(contentsPosition === 'below' || contentsPosition === 'right') &&
            openIndexes.includes(index)
              ? item.contents
              : null}
          </div>
        ))}
      </div>
    )
  }
}

class Accordion extends React.Component {
  static defaultProps = {
    contentsPosition: 'below',
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
    const {contentsPosition, items} = this.props
    return (
      <div>
        {items.map((item, index) => (
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
            <button onClick={() => this.handleItemClick(index)}>
              {item.title}
            </button>
            {(contentsPosition === 'below' || contentsPosition === 'right') &&
            openIndexes.includes(index)
              ? item.contents
              : null}
          </div>
        ))}
      </div>
    )
  }
}

const accordionItems = [
  {title: 'Item 1', contents: <div>Contents of Item 1</div>},
  {title: 'Item 2', contents: <div>Contents of Item 2</div>},
  {title: 'Item 3', contents: <div>Contents of Item 3</div>},
]

const Usage = () => (
  <React.Fragment>
    <Accordion items={accordionItems} />
    <hr />
    <Accordion
      items={accordionItems}
      contentsPosition="above"
      preventClose={true}
      single={true}
    />
    <hr />
    <Accordion
      items={accordionItems}
      contentsPosition="above"
      multiple={true}
    />
    <hr />
    <Accordion
      items={accordionItems}
      contentsPosition="left"
      multiple={true}
      preventClose={true}
    />
  </React.Fragment>
)

export {Accordion, Usage, InitialAccordion}
