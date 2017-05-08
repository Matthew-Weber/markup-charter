Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
//the view that constructs a linechart
Reuters.Graphics.MarkUp = Backbone.View.extend({
	margin: {top: 40, right: 20, bottom: 30, left: 40},
	dateFormat: d3.time.format("%b %Y"),
	tipTemplate:Reuters.Graphics.markup.Template.MarkupTooltip,
	template:Reuters.Graphics.markup.Template.markup,
	initialize: function(opts){
		var self = this;
		this.options = opts; 		
		
		_.each(opts, function(item, key){
			self[key] = item;
		});	

		if (this.dataURL.indexOf("csv") == -1 && !_.isObject(this.dataURL)){
			d3.json(self.dataURL, function(data){
				self.parseData (data);
			});
		} 
		if (this.dataURL.indexOf("csv") > -1){
			d3.csv(self.dataURL, function(data){
				self.parseData (data);
			});
		}
		if (_.isObject(this.dataURL)){
			setTimeout(function(){
				self.parseData (self.dataURL);											
			}, 100);
		}				


	},
	parseData: function (data){			
		var self = this;
		self.data = data;

		self.render(); 																 				
								
	},

	render: function() {
		var self = this;
		self.trigger("baseRender:start");
		$('html').addClass("markup-holder");
		
		self.data.forEach(function(d,index){
			self.$el.append(self.template({data:d,index:index}))
			if (d.comment){
				var splitComment = d.comment.split("<br>")
				self.$("#markup"+index).find(".highlight").each(function(i){
					d3.select(this)
						.attr("title",self.tipTemplate({comment:splitComment[i],data:d}))
						.on("click", function(item){
							if (d.link){
								window.open(d.link)
							}
						})
				})
			}
		})
		self.$(".highlight").tooltip({html:true,placement:"bottom"})
		
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
	
	update: function(){
		var self = this;
	}
	})