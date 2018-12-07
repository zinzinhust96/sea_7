/* eslint-disable prefer-destructuring */

export const renderDash = (count) => {
  let dash = ''
  for (let i = 0; i < count; i += 1) {
    dash = dash.concat('_')
  }
  return dash
};
