(function (window) {
    'use strict';

    var document = window.document,
        ring = document.getElementsByTagName('path')[0],
        range = document.getElementsByTagName('input')[0],
        text = document.getElementsByTagName('text')[0],
        Math = window.Math,
        toRadians = Math.PI / 180,
        r = 100;

    function draw() {
        // Update the wheel giving to it a value in degrees,
        // getted from the percentage of the input value
        // a.k.a. (value * 360) / 100
        var degrees = range.value * 3.5999,
            // Convert the degrees value to radians
            rad = degrees * toRadians,
            // Determine X and cut to 2 decimals
            x = (Math.sin(rad) * r).toFixed(2),
            // Determine Y and cut to 2 decimals
            y = -(Math.cos(rad) * r).toFixed(2),
            // The another half ring. Same as (deg > 180) ? 1 : 0
            lenghty = window.Number(degrees > 180),
            // Moveto + Arcto
            descriptions = ['M', 0, 0, 'v', -r, 'A', r, r, 1, lenghty, 1, x, y, 'z'];
        // Apply changes to the path
        ring.setAttribute('d', descriptions.join(' '));
        // Update the numeric display
        text.textContent = range.value;
    }

    // Translate the center axis to a half of total size
    ring.setAttribute('transform', 'translate(' + r + ', ' + r + ')');
    // Bind the change event to the input
    range.addEventListener('change', draw);
    // Force to init the first time
    draw();

}(this));