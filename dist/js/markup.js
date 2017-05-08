(function () {
  window["Reuters"] = window["Reuters"] || {};
  window["Reuters"]["Graphics"] = window["Reuters"]["Graphics"] || {};
  window["Reuters"]["Graphics"]["markup"] = window["Reuters"]["Graphics"]["markup"] || {};
  window["Reuters"]["Graphics"]["markup"]["Template"] = window["Reuters"]["Graphics"]["markup"]["Template"] || {};

  window["Reuters"]["Graphics"]["markup"]["Template"]["MarkupTooltip"] = function (t) {
    var __t,
        __p = '',
        __j = Array.prototype.join;
    function print() {
      __p += __j.call(arguments, '');
    }
    __p += '<p class="tooltip-text">' + ((__t = t.comment) == null ? '' : __t) + '</p>\n';
    if (t.data.byline) {
      ;
      __p += '\n	<p class="graphic-source mt-1">' + ((__t = t.data.byline) == null ? '' : __t) + '\n		';
      if (t.data.title) {
        ;
        __p += '\n			- ' + ((__t = t.data.title) == null ? '' : __t) + '\n		';
      };
      __p += '		\n	</p>\n\n';
    };
    __p += '\n';
    if (t.data.link) {
      ;
      __p += ' \n	<p class="link mt-1">CLICK FOR RELATED STORY</p>\n\n';
    };
    __p += '		\n';
    return __p;
  };
})();
(function () {
  window["Reuters"] = window["Reuters"] || {};
  window["Reuters"]["Graphics"] = window["Reuters"]["Graphics"] || {};
  window["Reuters"]["Graphics"]["markup"] = window["Reuters"]["Graphics"]["markup"] || {};
  window["Reuters"]["Graphics"]["markup"]["Template"] = window["Reuters"]["Graphics"]["markup"]["Template"] || {};

  window["Reuters"]["Graphics"]["markup"]["Template"]["markup"] = function (t) {
    var __t,
        __p = '';
    __p += '\n<p class="markup" id="markup' + ((__t = t.index) == null ? '' : __t) + '">' + ((__t = t.data.text) == null ? '' : __t) + '</p>\n\n ';
    return __p;
  };
})();
(function () {
  window["Reuters"] = window["Reuters"] || {};
  window["Reuters"]["Graphics"] = window["Reuters"]["Graphics"] || {};
  window["Reuters"]["Graphics"]["markup"] = window["Reuters"]["Graphics"]["markup"] || {};
  window["Reuters"]["Graphics"]["markup"]["Template"] = window["Reuters"]["Graphics"]["markup"]["Template"] || {};

  window["Reuters"]["Graphics"]["markup"]["Template"]["markupLayout"] = function (t) {
    var __t,
        __p = '';
    __p += '<div class="container">\n    <div class="row justify-content-center">\n        <div class="col-8">\n            <h1 class="graphic-title">' + ((__t = 'The title for a graphic') == null ? '' : __t) + '</h1>\n            <p class="graphic-subhead">' + ((__t = 'The subhead for the graphic The subhead for the graphic The subhead for the graphic The subhead for the graphic The subhead for the graphic The subhead for the graphic') == null ? '' : __t) + ' </p>\n\n			<img class="img-fluid" src="images/pic.png">\n			<small class="text-muted d-block">This is the cpation for the photo, who is this guy, what is he trying to tell you?  why are his hands so big? M Weberman/REUTERS</small>			\n        </div>\n    </div>\n	\n    <div class="row justify-content-center">\n        <div class="col-sm-8">\n			<hr class="mt-1">    \n			<div class="text-label mb-2 mt-1">President Trumps speech to some people</div>\n            <div id="reutersGraphic-chart1" class="reuters-chart"></div>\n        </div>\n\n\n    </div>\n        \n    <div class="row justify-content-center">            \n        <div class="col-8 mt-1">\n            <p class="graphic-source">' + ((__t = 'Sources: XXXXX YYYYY') == null ? '' : __t) + '<br />' + ((__t = 'By First Name Last Name | REUTERS GRAPHICS') == null ? '' : __t) + '</p>\n        </div>\n    </div>\n</div>\n';
    return __p;
  };
})();
Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
//the view that constructs a linechart
Reuters.Graphics.MarkUp = Backbone.View.extend({
	margin: { top: 40, right: 20, bottom: 30, left: 40 },
	dateFormat: d3.time.format("%b %Y"),
	tipTemplate: Reuters.Graphics.markup.Template.MarkupTooltip,
	template: Reuters.Graphics.markup.Template.markup,
	initialize: function initialize(opts) {
		var self = this;
		this.options = opts;

		_.each(opts, function (item, key) {
			self[key] = item;
		});

		if (this.dataURL.indexOf("csv") == -1 && !_.isObject(this.dataURL)) {
			d3.json(self.dataURL, function (data) {
				self.parseData(data);
			});
		}
		if (this.dataURL.indexOf("csv") > -1) {
			d3.csv(self.dataURL, function (data) {
				self.parseData(data);
			});
		}
		if (_.isObject(this.dataURL)) {
			setTimeout(function () {
				self.parseData(self.dataURL);
			}, 100);
		}
	},
	parseData: function parseData(data) {
		var self = this;
		self.data = data;

		self.render();
	},

	render: function render() {
		var self = this;
		self.trigger("baseRender:start");
		$('html').addClass("markup-holder");

		self.data.forEach(function (d, index) {
			self.$el.append(self.template({ data: d, index: index }));
			if (d.comment) {
				var splitComment = d.comment.split("<br>");
				self.$("#markup" + index).find(".highlight").each(function (i) {
					d3.select(this).attr("title", self.tipTemplate({ comment: splitComment[i], data: d })).on("click", function (item) {
						if (d.link) {
							window.open(d.link);
						}
					});
				});
			}
		});
		self.$(".highlight").tooltip({ html: true, placement: "bottom" });

		/*
  		$(window).on("resize", _.debounce(function(event) {
  			var width =  self.$el.width() - self.margin.left - self.margin.right;
  			if (width == self.width){ 
  				return
  			}else{
  				self.width = width
  			}
  			self.update();
  		},100));
  */

		self.trigger("baseRender:end");
		//end of chart render			
		return this;
	},

	update: function update() {
		var self = this;
	}
});
//# sourceMappingURL=markup.js.map
