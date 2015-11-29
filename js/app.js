(function() {
    var svg = d3.select('body')
        .insert('div', ':first-child')
        // .append('div')
        .attr('id', 'svg-container')
        .append('svg')
        .attr({
            id: 'svg-background',
            width: '100%',
            height: '100%',
        });


    /**
     * TODO
     *
     * Triggers sometimes becasue the mouse hover doesnt automatically
     * trigger a mouse close when it goes away. This could go to hover or another
     * state on another element. So remove all those listeners or auto check
     * at the end of the move or hover
     */

    /**
     * TODO
     *
     * some hidden math patterns appear if you click a 'random' button.
     *
     *
     */


    var random = parseInt(Math.random() * 100);
    var remainder = parseInt(random % 2)

    var selected_shape = new Shape(svg);

    // if(remainder === 0){
    //     selected_shape = new Circle(svg);
    // } else {
    //     selected_shape = new Rectangle(svg);
    // }


    selected_shape = new Square(svg);


    svg
        .on('mousedown', function() {
            selected_shape.adjustSize(true);
        })
        .on('mousemove', function() {
            selected_shape.adjust(d3.mouse(this));
        })
        .on('mouseup', function() {
            selected_shape.finalize(d3.mouse(this));
        })
        // .on('mouseleave', function(){
        //     _circle.finalize(d3.mouse(this));
        // })


    /**
     * create container for buttons
     */

    var buttons_container = svg
        .append('rect')
        .attr({
            id: 'buttons-container',
            x: '70%',
            width: '300',
            height: 100,
            y:'1%'
        })

    var categories = d3.selectAll('.about-section-container')
        .on('click', function(){
            var self = this;

            d3.selectAll('.about-section-container').forEach(function(d, i) {

                try {
                    var removed = d3.selectAll(d)
                        .classed('clicked', false);
                } catch (e) {
                    console.log('Outer e', e)
                }
            })

            d3.select(self)
                .classed('clicked', true);



            // console.log('here', _this)
        });


})()
