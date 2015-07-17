# image-tiler
npm module for tiling a large image into smaller tiles. It optionally generates overlapping tiles. Also can export a metadata JSON file in a format that other projects can use.
## Setup
This depends on [ImageMagick](http://www.imagemagick.org/script/index.php) being properly installed.
```bash
$ brew install imagemagick
```

## Example Usage
Take the `crystal_Zone3_Midground.png` file and create tiles at the default size, overlapping columns by 1 px (default) and rows by 0 px, and generate JSON.
```bash
~/Sites/Porting/measurement-skillpack-frontend/assets/zone/crystal_Zone3_Midground.png --out ~/Sites/Porting/measurement-skillpack-frontend/deploy/assets/images/zones/ --overlapRow 0 --exportJSON --jsonSrcPrefix assets/images/zones/
```
## Options
| option     | format                                       | example                                | Default if omitted        |
|:-----------|:---------------------------------------------|:---------------------------------------|:--------------------------|
| in         | path to image to be cropped                  | ~/Desktop/crystal_Zone1_Background.png |                           |
| out        | path to output folder                        | ~/Desktop/                             |                           |
| outBase    | common name to prepend before tile number    | bg1                                    | base name of in file name |
| width      | number (in pixels)                           |                                        | 1024                      |
| height     | number (in pixels)                           |                                        | 1024                      |
| overlap    | number of pixels to overlap rows and columns |                                        | 1                         |
| overlapCol | number of pixels to overlap columns only     |                                        | falls back to `overlap`   |
| overlapRow | number of pixels to overlap rows only        |                                        | falls back to `overlap`   |
| exportJSON | (existence)                                  |                                        | false                     |

## TODO
* remove dependency on ImageMagick (investigate [png-crop](https://www.npmjs.com/package/png-crop))
* take a glob as a command-line option

