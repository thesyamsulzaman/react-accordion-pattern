import React from 'react'
import {render} from 'react-dom'
import {StandardAccordion} from './accordion/standard'
import {AboveAccordion} from './accordion/above'
import {LeftAccordion} from './accordion/left'
import {RightAccordion} from './accordion/right'
import {SingleAccordion} from './accordion/single'
import {PreventCloseAccordion} from './accordion/prevent-close'
import {SinglePreventCloseAccordion} from './accordion/single-prevent-close'
import {StandardTabs} from './tabs/standard'
import {AboveTabs} from './tabs/above'

const items = [
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

function App() {
  return (
    <div
      style={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridGap: 350,
        width: 500,
        padding: 20,
        fontSize: 24,
      }}
    >
      <div>
        <strong>Standard</strong>
        <StandardAccordion items={items} />
      </div>
      <div>
        <strong>Above</strong>
        <AboveAccordion items={items} />
      </div>
      <div>
        <strong>Left</strong>
        <LeftAccordion items={items} />
      </div>
      <div>
        <strong>Right</strong>
        <RightAccordion items={items} />
      </div>
      <div>
        <strong>Single</strong>
        <SingleAccordion items={items} />
      </div>
      <div>
        <strong>Prevent Close</strong>
        <PreventCloseAccordion items={items} />
      </div>
      <div>
        <strong>Single Prevent Close</strong>
        <SinglePreventCloseAccordion items={items} />
      </div>
      <div>
        <strong>Standard Tabs</strong>
        <StandardTabs items={items} />
      </div>
      <div>
        <strong>Above Tabs</strong>
        <AboveTabs items={items} />
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
