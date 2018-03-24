//画布大小
var width = 400;
var height = 400;

//在 body里添加一个SVG画布
var svg = d3.select('body')
			.append('svg')
			.attr('width',width)
			.attr('height',height);
			
var padding ={left:30,right:30,top:20,bottom:20};


//定义一个数组
var dataset = [10, 20, 30, 40, 33, 24, 12, 5];

//x轴的比例尺
var xScale = d3.scale.ordinal()
	.domain(d3.range(dataset.length))
	.rangeRoundBands([0, width - padding.left - padding.right]);

//y轴的比例尺
var yScale = d3.scale.linear()
	.domain([0,d3.max(dataset)])
	.range([height - padding.top - padding.bottom,0]);

//定义x轴
var xAxis = d3.svg.axis()
	.scale(xScale)   //指定xScale比例尺
	.orient("bottom")  //指定刻度方向
	.ticks(7);  //指定刻度数量

//定义y轴
var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left");

//矩形之间的空白
var rectPadding = 4;

//添加矩形元素
var rects = svg.selectAll(".MyRect")
	.data(dataset)  //使用data绑定数据
	.enter()	//指定选择集的enter部分
	.append("rect")  //添加足够多的矩形
	.attr("class","MyRect")  

/////////////////////////////////////////////////////////
	.attr("transform","translate(" +padding.left 
		+ "," + padding.top +")")
	//设定坐标轴的位置？？？？
	.attr("x" , function(d,i){
		return xScale(i) + rectPadding/2;
	}) //定义每个矩形在x轴的位置
	.attr("y",function(d){
		return yScale(d);
	})
	.attr("width", xScale.rangeBand() - rectPadding )
	.attr("height",function(d){
		return height - padding.top - padding.bottom - yScale(d);
	});

////////////////////////////////////////////////////////

//添加文字元素
var texts = svg.selectAll(".MyText")
	.data(dataset)
	.enter()
	.append("text")
	.attr("class","MyText")
	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return xScale(i) + rectPadding/2;
		} )
		.attr("y",function(d){
			return yScale(d);
		})
		.attr("dx",function(){
			return (xScale.rangeBand() - rectPadding)/2;
		})
		.attr("dy",function(d){
			return 20;
		})
		.text(function(d){
			return d;
		});
//添加x轴
svg.append("g")
	.attr("class","axis")
	.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
	.call(xAxis); 
		
	//添加y轴
svg.append("g")
	.attr("class","axis")
	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
	.call(yAxis);














