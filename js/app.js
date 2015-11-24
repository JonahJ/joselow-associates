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

(function() {
    var svg = d3.select('body')
        // .insert('div', ':first-child')
        // .append('div')
        .attr('id', 'svg-container')
        .append('svg')
        .attr({
            id: 'svg-background',
            width: '100%',
            height: '100%',
        });

    var selected_rectangle = null;
    var selected_circle = null;


    // svg
    //     .on('mousedown', function() {
    //         var pointer = d3.mouse(this);

    //         selected_rectangle = svg.append('rect')
    //             .attr({
    //                 // rx: 6,
    //                 // ry: 6,
    //                 class: 'selection',
    //                 x: pointer[0],
    //                 y: pointer[1],
    //                 width: 0,
    //                 height: 0,
    //             })
    //             .style({
    //                 stroke: '#000000',
    //                 fill: '#D3D3D3',
    //                 // fill: randomColor,
    //                 opacity: 0.5,
    //             })
    //     })
    //     .on('mousemove', function() {


    //         var selected_rectangle = svg.select("rect.selection");

    //         if (selected_rectangle.empty() === true) {
    //             return;
    //         }

    //         var pointer = d3.mouse(this);

    //         var distance_attr = {
    //             x: parseInt(selected_rectangle.attr("x"), 10),
    //             y: parseInt(selected_rectangle.attr("y"), 10),
    //             width: parseInt(selected_rectangle.attr("width"), 10),
    //             height: parseInt(selected_rectangle.attr("height"), 10)
    //         };
    //         var move = {
    //             x: pointer[0] - distance_attr.x,
    //             y: pointer[1] - distance_attr.y
    //         };

    //         if (move.x < 1 || (move.x * 2 < distance_attr.width)) {
    //             distance_attr.x = pointer[0];
    //             distance_attr.width -= move.x;
    //         } else {
    //             distance_attr.width = move.x;
    //         }

    //         if (move.y < 1 || (move.y * 2 < distance_attr.height)) {
    //             distance_attr.y = pointer[1];
    //             distance_attr.height -= move.y;
    //         } else {
    //             distance_attr.height = move.y;
    //         }

    //         selected_rectangle.attr(distance_attr);
    //     })
    //     .on('mouseup', function() {
    //         // var selected_rectangle = svg.select('rect.selection');

    //         selected_rectangle
    //             .classed('selection', false)
    //             .classed('drawn', true)
    //             .style({
    //                 stroke: '#000000',
    //                 fill: null,
    //             })

    //     })


    svg
        .on('mousedown', function() {
            var pointer = d3.mouse(this);

            selected_circle = svg.append('circle')
                .classed('selection', true)
                .attr({
                    cx: pointer[0],
                    cy: pointer[1],
                    r: 0,
                })
                .style({
                    stroke: '#000000',
                    fill: '#D3D3D3',
                    // fill: randomColor,
                    opacity: 0.5,
                });
        })
        .on('mousemove', function() {
            var selected_circle = svg.select('circle.selection');

            if (selected_circle.empty() === true) {
                return;
            }

            var pointer = d3.mouse(this);

            var distance_attr = {
                cx: parseInt(selected_circle.attr("cx"), 10),
                cy: parseInt(selected_circle.attr("cy"), 10),
                r: 0,
            }

            distance_attr.r = Math.max(
                pointer[0] - distance_attr.cx,
                pointer[1] - distance_attr.cy,
                distance_attr.cx - pointer[0],
                distance_attr.cy - pointer[1]
            );

            selected_circle.attr(distance_attr)
        })
        .on('mouseup', function() {
            var selected_circle = svg.select('circle.selection');

            selected_circle
                .classed('selection', false)
                .classed('drawn', true)
                .style({
                    stroke: '#000000',
                    fill: null,
                })

        })


})()
