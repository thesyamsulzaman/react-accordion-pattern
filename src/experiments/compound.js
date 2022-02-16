import React from 'react'
import {Accordion} from './compound-accordion'
import {css, AccordionButton, AccordionItem, AccordionContents} from '../shared'

function CompoundAccordion({items, ...props}) {
  return (
    <Accordion {...props}>
      <div>
        {items.map((item, index) => (
          <Accordion.Item key={item.title}>
            <Accordion.Item.Title
              component={AccordionButton}
              {...css({textAlign: 'left', minWidth: 80})}
            >
              {item.title}
            </Accordion.Item.Title>
            <Accordion.Item.Contents>
              <AccordionContents
                {...css({overflowY: 'hidden', textAlign: 'justify'})}
              >
                {item.contents}
              </AccordionContents>
            </Accordion.Item.Contents>
          </Accordion.Item>
        ))}
      </div>
    </Accordion>
  )
}

export {CompoundAccordion}
