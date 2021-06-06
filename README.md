Adds highlighting to parts of text that match your search string or array of string.

Usage:
`<div [innerHTML]="description | highlight:searchText"></div>`
searchText can be a string or an array of string

Example:
` {{ 'my text to highlight' | highlight:'text' }}`
formats to: `my <mark>text</mark> to highlight`

` {{ 'my text to highlight':[ 'igh', 'text'] }}`
formats to: `my <mark>text</mark> to h<mark>igh</mark>l<mark>igh</mark>t`