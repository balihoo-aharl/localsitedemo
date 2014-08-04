'use strict';
var BlhSalesDemo = function(links) {

    var self = this; // For Closure

    for (var link in links) { // Create the menu links
        $('.header .nav').append('<li><a href="' + links[link].selector + '" class="demo-link ' + links[link].selector + '-link">' + links[link].text + '</a></li>');
    }
    $('.demo-link').on('click', function(e) {
        e.preventDefault();
        self.highlightDemo(e, links, self);
    });

};

BlhSalesDemo.prototype.highlightDemo = function(e, links, self) {
    $('.demo-link').unbind('click').on('click', function(e) {
        e.preventDefault();
        return false;
    }); // Disable click on the menu
    var target = e.target.attributes.href.value; // the Target element
    // Get positioning of the content box
    var offsetAndWidth = $('#page').contents().find('.' + target).offset();
    var contentHeight = $('#page').contents().find('.' + target).height();
    var contentWidth = $('#page').contents().find('.' + target).width();
    // Add styles for our content box to be used later
    var contentStyles = '<style scoped>\n.highlight-text {\nposition: absolute;\nwidth: 600px;\nheight: 400px;\nvisibility: visible;\nbackground: orange;\nbox-sizing: border-box;\npadding: 30px;\ndisplay: none;\n}</style>';

    self.animateDemo(self, target, offsetAndWidth);

    // Adjust the position of the content div relative to the target
    if ( links[target].position === 'top' ) {
        offsetAndWidth.top = offsetAndWidth.top - 450;
        offsetAndWidth.width = contentWidth;
    } else if ( links[target].position === 'bottom' ) {
        offsetAndWidth.top = offsetAndWidth.top + 250;
        offsetAndWidth.width = contentWidth;
    } else if ( links[target].position === 'left' ) {
        offsetAndWidth.left = offsetAndWidth.left - 600;
        offsetAndWidth.height = contentHeight;
    } else if ( links[target].position === 'right' ) {
        offsetAndWidth.left = offsetAndWidth.left + 300;
        offsetAndWidth.height = contentHeight;
    }

    self.addContent(links, target, contentStyles, offsetAndWidth);
};

BlhSalesDemo.prototype.animateDemo = function(self, target, offsetAndWidth) {
    // Animate hiding the iframe content
    $('#page').contents().find('body').animate({
        opacity: 0 // Animate opacity first to avoid wierd flash of content
    }, 500 ).css('visibility', 'hidden').animate({
        opacity: 1
    }, 500, function() { // Animate showing the target element
        $('#page').contents().find('.' + target).animate({
            opacity: 0 // Set opacity 0 so that we can animate it in later
        }, 0 ).css('visibility', 'visible').animate({
            opacity: 1 // Animate element visibility
        }, 500, function() { // Add a reset button to the document
            $('#page').contents().find('html,body').animate({
                scrollTop: $('#page').contents().find('.' + target).offset().top - 20
            }, 800);
            $('body').append('<div class="btn-group reset-highlight"><button class="btn btn-default">Reset</button></div>');
            $('.reset-highlight .btn').on('click', function() {
                self.resetHighlight();
            });
        });
    });
};

BlhSalesDemo.prototype.addContent = function(links, target, contentStyles, offsetAndWidth) {
    // Create the content box
    $('#page').contents().find('body').append('<div class="highlight-text">' + links[target].content + contentStyles + '</div>');
    setTimeout(function() {
        $('#page').contents().find('.highlight-text').css(offsetAndWidth).fadeIn(500);
    }, 1500);
};

BlhSalesDemo.prototype.resetHighlight = function() {
    $('.reset-highlight').remove();
    $('#page').animate({
        opacity: 0
    }, 0).attr('src', $('#page').attr('src')).animate({
        opacity: 1
    }, 500 );
};

$(function () {

    var demoLinks = { // Should rework this to read a config.json file
        cta : {
            text : 'Call to Action',
            selector : 'cta',
            position : 'left',
            content : '<p>Some Content</p>'
        },
        nap : {
            text : 'Contact Info',
            selector : 'nap',
            position : 'right',
            content : '<p>Some Content</p>'
        },
        hero : {
            text : 'Hero Image',
            selector : 'hero',
            position : 'bottom',
            content : '<p>Some Content</p>'
        },
        headerHeadline : {
            text : 'Header Headline',
            selector : 'headerHeadline',
            position : 'bottom',
            content : '<h1>Sweet!</h1>'
        }
    };

    var demo = new BlhSalesDemo(demoLinks);

});
