/* eslint-disable prefer-destructuring */

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
