import lineart from '../images/lineart.png';
import base from '../images/base.png';
import eyes from '../images/eyes.png';
import mackerel from '../images/mackerel.png';
import classic from '../images/classic.png';
import spotted from '../images/spotted.png';
import ticked from '../images/ticked.png';
import rosette from '../images/rosette.png';
import marble from '../images/marble.png';
import smoke from '../images/smoke.png';
import shaded from '../images/shaded.png';
import tipped from '../images/tipped.png';
import tortie from '../images/tortie.png';
import point from '../images/point.png';
import whiteLow from '../images/white-low.png';
import whiteMedium from '../images/white-medium.png';
import whiteHigh from '../images/white-high.png';
import {loadImage} from '../utils/utils';
import BufferCanvas from './BufferCanvas';
import * as colors from './catColors';

class CatCanvas {
    constructor(canvas, onLoad) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.onLoad = onLoad;
        this.width = canvas.width;
        this.height = canvas.height;
        this.buffer = new BufferCanvas(canvas.width, canvas.height);
        this.loaded = false;

        this.loadImages();
    }

    loadImages() {
        const imageSrcs = [
            base,
            lineart,
            eyes,
            mackerel,
            classic,
            spotted,
            ticked,
            rosette,
            marble,
            smoke,
            shaded,
            tipped,
            tortie,
            point,
            whiteLow,
            whiteMedium,
            whiteHigh
        ];

        // TODO handle loading errors
        Promise.all(imageSrcs.map(imgSrc => loadImage(imgSrc))).then(images => {
            // TODO find a shorter and less repetetive add images to the object
            this.images = {
                base: images[0],
                lineart: images[1],
                eyes: images[2],
                mackerel: images[3],
                classic: images[4],
                spotted: images[5],
                ticked: images[6],
                rosette: images[7],
                marble: images[8],
                smoke: images[9],
                shaded: images[10],
                tipped: images[11],
                tortie: images[12],
                point: images[13],
                whiteLow: images[14],
                whiteMedium: images[15],
                whiteHigh: images[16]
            };

            this.loaded = true;
            this.onLoad();
        });
    }

    drawCat(cat) {
        this.context.clearRect(0, 0, this.width, this.height);
        if(this.loaded) {
            const layers = this.getLayerList(cat);

            for(const layer of layers) {
                if(layer.shouldRender) {
                    // if the color and/or mask aren't defined on the layer, the function should behave the same as if they were not passed at all
                    this.buffer.drawImage(layer.image, layer.color, layer.mask);
                    this.context.drawImage(this.buffer.canvas, 0, 0);
                }
            }
        }
    }

    getLayerList(cat) {
        // TODO anyway to make this a bit shorter?

        if(cat.fullWhite) {
            return [
                { // base
                    shouldRender: true,
                    image: this.images.base,
                    color: '#fff'
                },
                { // eyes
                    shouldRender: true,
                    image: this.images.eyes
                    // color: '#fff',
                },
                { // lineart
                    shouldRender: true,
                    image: this.images.lineart
                }
            ];
        }
        const point = cat.point !== 'standard';

        // TODO branch based on point and maybe tortie to reduce the number of layers
        return [
            { // base
                shouldRender: true,
                image: this.images.base,
                color: cat.baseColor === 'red' ? colors.getRedGroundColor(cat, point) : colors.getBlackGroundColor(cat, point)
            },
            { // smoke
                shouldRender: !cat.tabby && cat.silver && (cat.baseColor !== 'red'),
                image: this.images.smoke,
                color: colors.getBlackTopColor(cat, point)
            },
            { // tabby stripes
                shouldRender: cat.tabby || cat.baseColor === 'red',
                image: this.images[cat.pattern],
                color: cat.baseColor === 'red' ? colors.getRedTopColor(cat, point) : colors.getBlackTopColor(cat, point)
            },
            { // tortie patches
                shouldRender: cat.tortie && (cat.baseColor !== 'red'),
                image: this.images.tortie,
                color: colors.getRedGroundColor(cat, point)
            },
            { // tortie stripes
                shouldRender: cat.tortie && (cat.baseColor !== 'red'),
                image: this.images[cat.pattern],
                color: colors.getRedTopColor(cat, point),
                mask: this.images.tortie
            },
            { // point base
                shouldRender: point,
                image: this.images.point,
                color: cat.baseColor === 'red' ? colors.getRedGroundColor(cat) : colors.getBlackGroundColor(cat)
            },
            { // point smoke
                shouldRender: point && !cat.tabby && cat.silver && (cat.baseColor !== 'red'),
                image: this.images.smoke,
                color: colors.getBlackTopColor(cat),
                mask: this.images.point
            },
            { // point tabby stripes
                shouldRender: point && cat.tabby || cat.baseColor === 'red',
                image: this.images[cat.pattern],
                color: cat.baseColor === 'red' ? colors.getRedTopColor(cat) : colors.getBlackTopColor(cat),
                mask: this.images.point
            },
            { // point tortie patches
                shouldRender: point && cat.tortie && (cat.baseColor !== 'red'),
                image: this.images.tortie,
                color: colors.getRedGroundColor(cat),
                mask: this.images.point
            },
            { // point tortie stripes
                shouldRender: point && cat.tortie && (cat.baseColor !== 'red'),
                image: this.images[cat.pattern],
                color: colors.getRedTopColor(cat),
                mask: [this.images.tortie, this.images.point]
            },
            { // white patches
                shouldRender: cat.whiteSpread > 0,
                image:
                    cat.whiteSpread >= 12 ?
                        this.images.whiteHigh : (
                            cat.whiteSpread >= 8 ?
                                this.images.whiteMedium :
                                this.images.whiteLow
                        ),
                color: '#fff'
            },
            { // eyes
                shouldRender: true,
                image: this.images.eyes
                // TODO add dynamic eye color
            },
            { // lineart
                shouldRender: true,
                image: this.images.lineart
            }
        ];
    }
};

export default CatCanvas;