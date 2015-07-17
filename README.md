# image-tiler
node module for tiling a large image into smaller tiles. It optionally generates overlapping tiles. Also can export a metadata JSON file in a format that other projects can use. It accepts [glob patterns](https://github.com/isaacs/node-glob) for the set of files that can be passed in.
## Setup

```bash
npm install
```

## Example Usage
Take the `crystal_Zone3_Midground.png` file and create tiles at the default size, overlapping columns by 1 px (default) and rows by 0 px, and generate JSON.

```bash
./index.js --in ~/Sites/Project/assets/zone/crystal_Zone3_Midground.png --out ~/Sites/Project/deploy/assets/images/zones/ --overlapRow 0 --exportJSON --jsonSrcPrefix assets/images/zones/
```

Take all PNG files in the `zone` folder and make 256x256px tiles with no overlap. Note the quotes - we are using a glob.
```bash
./index.js --in "~/Sites/Project/zone/*.png" --out ~/Sites/Project/deploy/assets/images/zones/ --width 256 --height 256 --overlap 0
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

