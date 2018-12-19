/* eslint-disable prefer-destructuring */
import React from 'react'

export const renderDash = (count) => {
  let dash = ''
  for (let i = 0; i < count; i += 1) {
    dash = dash.concat('_')
  }
  return dash
};

export const renderSpace = (count) => {
  let dash = ''
  for (let i = 0; i < count; i += 1) {
    dash = dash.concat('\u00A0')
  }
  return dash
};

export const RenderMultilevelSelect = ({ list, index }) => list.map((item) => {
  if (item.subcategories.length === 0) {
    return (
      <option key={item.id} value={item.id} className={index === 0 ? 'option-group' : 'option-child'}>
        {renderSpace(index * 3)}
        {item.name}
      </option>
    )
  }
  return (<React.Fragment key={item.id}>
    <option value={item.id} className="option-group">
      {renderSpace(index * 3)}
      {item.name}
    </option>
    <RenderMultilevelSelect list={item.subcategories} index={index + 1} />
  </React.Fragment>)
})
