class BufferCanvas {
    constructor(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.width = width;
        this.height = height;
    }

    drawImage(img, fill, mask) {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.globalCompositeOperation = 'source-over';
        if(fill) {
            this.context.fillStyle = fill;
            this.context.fillRect(0, 0, this.width, this.height);
            this.context.globalCompositeOperation = 'destination-in';
        }

        this.context.drawImage(img, 0, 0, this.width, this.width * (img.height / img.width));

        if(mask) {
            mask = Array.isArray(mask) ? mask : [mask];
            this.context.globalCompositeOperation = 'destination-in';
            mask.forEach(maskImg => {
                this.context.drawImage(maskImg, 0, 0, this.width, this.width * (maskImg.height / maskImg.width));
            });
        }
    }
}

export default BufferCanvas;