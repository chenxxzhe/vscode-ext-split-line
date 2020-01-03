# split-line README

split one line into multiple lines by custom separator (default: ',')

**warning:** 

this extension will append `'\n'` to separator in the outermost layer,
for example: `[1,], [2,], [3,]` will split into `[1,],\n [2,],\n [3,]`,
but `[[1,], [2,], [3,]]` won't split. 
so don't select the outermost brackets

## Features

![Screenshot](images/split-line-intro.gif "split line")

## How to use

1. open command pallette, input `split line`
2. hot key: `ctrl + cmd + s` in mac or `ctrl + alt + s` in win, (use default separator, ',')
3. hot key: `ctrl + cmd + x` in mac or `ctrl + alt + x` in win, (use default separator, ',' , break line in start and end of selected string (`breakStartEnd: true`))
4. you could configure keybindings `"extension.splitLine"` to change default separator in `args`
5. args has follow options: `separator: string`, `breakStartEnd: boolean`, `breakBeforeSeparator: boolean` 

## Known Issues


## TODO

- [x] format after split
- [ ] test coverage
