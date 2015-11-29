'use strict';


var randomColor = (function() {
    var golden_ratio_conjugate = 0.618033988749895;
    var h = Math.random();

    var hslToRgb = function(h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return '#' + Math.round(r * 255).toString(16) + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16);
    };

    return function() {
        h += golden_ratio_conjugate;
        h %= 1;
        return hslToRgb(h, 0.5, 0.60);
    };
})();


class Shape {
    constructor(container) {
        this.created = false;
        this.container = container;
        this.adjust_size = false;
        this.min_size = 10;


        this.shape = {};
    }

    adjustSize(truth) {
        this.adjust_size = truth;
    }

    create() {
        this.created = true;

        this.shape = {};
    }

    add(pointer) {
        this.created = true;
        this.adjust_size = true;
        // this.shape = {};
    }

    remove(pointer) {
        if (this.created === false) {
            this.create();
        }

        this.shape
            .remove()
    }

    finalize(pointer) {
        if (this.created === false) {
            this.create();
        }


        this.shape
            .classed('selection', false)
            .classed('drawn', true)

        this.created = false;
        this.adjust_size = false;
    }

    adjust(pointer) {
        if (this.created === false) {
            this.create();
        }
    }
}

class Circle extends Shape {
    constructor(svg) {
        var container = svg
            .append('g')
            .attr({
                id: 'circle-container'
            })

        super(container);
    }

    create() {
        super.create()

        this.shape = this.container
            .append('circle')
            .classed('selection', true)
            .attr({
                cx: 0,
                cy: 0,
                r: this.min_size,
            })
    }

    add(pointer) {
        super.add(pointer);

        this.shape = this.container
            .append('circle')
            .classed('selection', true)
            .attr({
                cx: pointer[0],
                cy: pointer[1],
                r: this.min_size,
            })
    }

    adjust(pointer) {
        super.adjust(pointer);


        if (this.adjust_size === true) {

            /**
             * Hack, technically we should compute where the arc touches
             * the pointer. Instead just draw like max box
             */

            this.shape.attr({
                r: Math.max(
                    pointer[0] - parseInt(this.shape.attr('cx')),
                    pointer[1] - parseInt(this.shape.attr('cy')),
                    parseInt(this.shape.attr('cx')) - pointer[0],
                    parseInt(this.shape.attr('cy')) - pointer[1],
                    this.min_size
                )
            });
        } else {
            this.shape.attr({
                cx: pointer[0],
                cy: pointer[1],
            });

            // console.log(this.adjust_size);

        }
    }
}

class Rectangle extends Shape {
    constructor(svg) {
        var container = svg
            .append('g')
            .attr({
                id: 'rectangle-container'
            })

        super(container);

        this.min_size = {
            width: 40,
            height: 80
        }
    }


    create() {
        super.create()

        this.shape = this.container.append('rect')
            .attr({
                class: 'selection',
                x: 0,
                y: 0,
                width: this.min_size.width,
                height: this.min_size.height,
            })
    }

    add(pointer) {
        super.add(pointer);

        this.shape = this.container
            .append('circle')
            .classed('selection', true)
            .attr({
                x: pointer[0],
                y: pointer[1],
            })
    }

    adjust(pointer) {
        super.adjust(pointer);


        if (this.adjust_size === true) {

            var distance_attr = {
                x: parseInt(this.shape.attr("x"), 10),
                y: parseInt(this.shape.attr("y"), 10),
                width: parseInt(this.shape.attr("width"), 10),
                height: parseInt(this.shape.attr("height"), 10)
            };
            var move = {
                x: pointer[0] - distance_attr.x,
                y: pointer[1] - distance_attr.y
            };

            if (move.x < 1 || (move.x * 2 < distance_attr.width)) {
                distance_attr.x = pointer[0];
                distance_attr.width -= move.x;
            } else {
                distance_attr.width = move.x;
            }

            if (move.y < 1 || (move.y * 2 < distance_attr.height)) {
                distance_attr.y = pointer[1];
                distance_attr.height -= move.y;
            } else {
                distance_attr.height = move.y;
            }

            this.shape.attr(distance_attr);
        } else {
            this.shape.attr({
                x: pointer[0],
                y: pointer[1],
            });
        }
    }
}
/**
 * TODO auto make rectange a square when shift key selected
 */

class Square extends Rectangle {
    constructor(svg) {
        var container = svg
            .append('g')
            .attr({
                id: 'square-container'
            })

        super(container);

        this.min_size = {
            width: 40,
            height: 40
        }
    }

    adjust(pointer) {
        super.adjust(pointer);


        if (this.adjust_size === true) {

            var distance_attr = {
                x: parseInt(this.shape.attr("x"), 10),
                y: parseInt(this.shape.attr("y"), 10),
                width: parseInt(this.shape.attr("width"), 10),
                height: parseInt(this.shape.attr("height"), 10)
            };
            var move = {
                x: pointer[0] - distance_attr.x,
                y: pointer[1] - distance_attr.y
            };

            if (move.x < 1 || (move.x * 2 < distance_attr.width)) {
                distance_attr.x = pointer[0];
                distance_attr.width -= move.x;
            } else {
                distance_attr.width = move.x;
            }

            if (move.y < 1 || (move.y * 2 < distance_attr.height)) {
                distance_attr.y = pointer[1];
                distance_attr.height -= move.y;
            } else {
                distance_attr.height = move.y;
            }

            /**
             * TODO auto adjust x and y
             */

            distance_attr.width = Math.max(
                distance_attr.width,
                distance_attr.height
            )

            distance_attr.height = Math.max(
                distance_attr.width,
                distance_attr.height
            )

            this.shape.attr(distance_attr);
        } else {
            this.shape.attr({
                x: pointer[0],
                y: pointer[1],
            });
        }
    }
}
