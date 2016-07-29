const r = 100;
const toRadians = (Math.PI / 180);

export default class CircleProgressBar {
    constructor(config) {
        this.el = config.el;
        this.shadow = this.createShadow();
        this.render();
    }

    template() {
        const tpl = document.createElement('template');
        tpl.innerHTML = `
            <style>
                .circle-progress-bar {
                    width: 200px;
                    height: 200px;
                    position: absolute;
                    left: 50%;
                    margin-left: -100px;
                    top: 50%;
                    margin-top: -100px;
                }
            </style>
            <svg class="circle-progress-bar">
                <path id="ring" fill="#00c790"></path>
                <circle cx="100" cy="100" r="82" fill="#0e2a36"></circle>
                <circle cx="100" cy="100" r="73" fill="none" stroke="#00c790" stroke-width="7" opacity=".5"></circle>
                <text x="100" y="100" text-anchor="middle" dominant-baseline="central" fill="#00c790" font-size="60" font-weight="bold">64</text>
            </svg>
        `;
        return tpl;
    }

    createShadow() {
        const shadow = document.createElement('_').createShadowRoot();
        const clone = document.importNode(this.template().content, true);
        shadow.appendChild(clone);
        return shadow;
    }

    _switchElements() {
        this.el.parentNode.appendChild(this.createRoot());
        this.el.style.display = 'none';
    }

    set value(n) {
        this.el.value = n;
        this.render();
    }

    get value() {
        return this.el.value;
    }

    calcDescription() {
        // (value * 360) / 100
        const deg = (this.el.value * 3.5999);
        // Convert the deg value to radians
        const rad = (deg * toRadians);
        // Determine X and cut to 2 decimals
        const x = (Math.sin(rad) * r).toFixed(2);
        // Determine Y and cut to 2 decimals
        const y = -(Math.cos(rad) * r).toFixed(2);
        // The another half ring. Same as (deg > 180) ? 1 : 0
        const lenghty = Number(deg > 180);
        // Moveto + Arcto description
        return ['M', 0, 0, 'v', -r, 'A', r, r, 1, lenghty, 1, x, y, 'z'].join(' ');
    }

    render() {
        // Apply changes to the path
        this.shadow.querySelector('path').setAttribute('d', this.calcDescription());
        // Translate the center axis to a half of total size
        this.shadow.querySelector('path').setAttribute('transform', 'translate(' + r + ', ' + r + ')');
        // // Update the numeric display
        // this.ui.text.textContent = range.value;
    }
}
