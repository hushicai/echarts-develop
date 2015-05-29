define("echarts/chart/chord",["require","./base","zrender/shape/Text","zrender/shape/Line","zrender/shape/Sector","../util/shape/Ribbon","../util/shape/Icon","zrender/shape/BezierCurve","../config","../util/ecData","zrender/tool/util","zrender/tool/vector","../data/Graph","../layout/Chord","../chart"],function(e){"use strict";function t(e,t,n,a,o){i.call(this,e,t,n,a,o),this.scaleLineLength=4,this.scaleUnitAngle=4,this.refresh(a)}var i=e("./base"),n=e("zrender/shape/Text"),a=e("zrender/shape/Line"),o=e("zrender/shape/Sector"),r=e("../util/shape/Ribbon"),s=e("../util/shape/Icon"),l=e("zrender/shape/BezierCurve"),h=e("../config");h.chord={zlevel:0,z:2,clickable:!0,radius:["65%","75%"],center:["50%","50%"],padding:2,sort:"none",sortSub:"none",startAngle:90,clockWise:!0,ribbonType:!0,minRadius:10,maxRadius:20,symbol:"circle",showScale:!1,showScaleText:!1,itemStyle:{normal:{borderWidth:0,borderColor:"#000",label:{show:!0,rotate:!1,distance:5},chordStyle:{width:1,color:"black",borderWidth:1,borderColor:"#999",opacity:.5}},emphasis:{borderWidth:0,borderColor:"#000",chordStyle:{width:1,color:"black",borderWidth:1,borderColor:"#999"}}}};var d=e("../util/ecData"),c=e("zrender/tool/util"),p=e("zrender/tool/vector"),m=e("../data/Graph"),u=e("../layout/Chord");return t.prototype={type:h.CHART_TYPE_CHORD,_init:function(){var e=this.series;this.selectedMap={};for(var t={},i={},n=0,a=e.length;a>n;n++)if(e[n].type===this.type){var o=this.isSelected(e[n].name);this.selectedMap[e[n].name]=o,o&&this.buildMark(n),this.reformOption(e[n]),t[e[n].name]=e[n]}for(var n=0,a=e.length;a>n;n++)if(e[n].type===this.type)if(e[n].insertToSerie){var r=t[e[n].insertToSerie];e[n]._referenceSerie=r}else i[e[n].name]=[e[n]];for(var n=0,a=e.length;a>n;n++)if(e[n].type===this.type&&e[n].insertToSerie){for(var s=e[n]._referenceSerie;s&&s._referenceSerie;)s=s._referenceSerie;i[s.name]&&this.selectedMap[e[n].name]&&i[s.name].push(e[n])}for(var l in i)this._buildChords(i[l]);this.addShapeList()},_getNodeCategory:function(e,t){return e.categories&&e.categories[t.category||0]},_getNodeQueryTarget:function(e,t){var i=this._getNodeCategory(e,t);return[t,i,e]},_getEdgeQueryTarget:function(e,t,i){return i=i||"normal",[t.itemStyle&&t.itemStyle[i],e.itemStyle[i].chordStyle]},_buildChords:function(e){for(var t=[],i=e[0],n=function(e){return e.layout.size>0},a=function(e){return function(t){return e.getEdge(t.node2,t.node1)}},o=0;o<e.length;o++){var r=e[o];if(this.selectedMap[r.name]){var s;r.data&&r.matrix?s=this._getSerieGraphFromDataMatrix(r,i):r.nodes&&r.links&&(s=this._getSerieGraphFromNodeLinks(r,i)),s.filterNode(n,this),r.ribbonType&&s.filterEdge(a(s)),t.push(s),s.__serie=r}}if(t.length){var l=t[0];if(!i.ribbonType){var h=i.minRadius,d=i.maxRadius,c=1/0,p=-(1/0);l.eachNode(function(e){p=Math.max(e.layout.size,p),c=Math.min(e.layout.size,c)});var m=(d-h)/(p-c);l.eachNode(function(e){var t=this._getNodeQueryTarget(i,e),n=this.query(t,"symbolSize");p===c?e.layout.size=n||c:e.layout.size=n||(e.layout.size-c)*m+h},this)}var g=new u;g.clockWise=i.clockWise,g.startAngle=i.startAngle*Math.PI/180,g.clockWise||(g.startAngle=-g.startAngle),g.padding=i.padding*Math.PI/180,g.sort=i.sort,g.sortSub=i.sortSub,g.directed=i.ribbonType,g.run(t);var V=this.query(i,"itemStyle.normal.label.show");if(i.ribbonType){this._buildSectors(i,0,l,i,t),V&&this._buildLabels(i,0,l,i,t);for(var o=0,y=0;o<e.length;o++)this.selectedMap[e[o].name]&&this._buildRibbons(e,o,t[y++],i);i.showScale&&this._buildScales(i,0,l)}else{this._buildNodeIcons(i,0,l,i,t),V&&this._buildLabels(i,0,l,i,t);for(var o=0,y=0;o<e.length;o++)this.selectedMap[e[o].name]&&this._buildEdgeCurves(e,o,t[y++],i,l)}this._initHoverHandler(e,t)}},_getSerieGraphFromDataMatrix:function(e,t){for(var i=[],n=0,a=[],o=0;o<e.matrix.length;o++)a[o]=e.matrix[o].slice();for(var r=e.data||e.nodes,o=0;o<r.length;o++){var s={},l=r[o];l.rawIndex=o;for(var h in l)"name"===h?s.id=l.name:s[h]=l[h];var d=this._getNodeCategory(t,l),c=d?d.name:l.name;if(this.selectedMap[c]=this.isSelected(c),this.selectedMap[c])i.push(s),n++;else{a.splice(n,1);for(var p=0;p<a.length;p++)a[p].splice(n,1)}}var u=m.fromMatrix(i,a,!0);return u.eachNode(function(e,t){e.layout={size:e.data.outValue},e.rawIndex=e.data.rawIndex}),u.eachEdge(function(e){e.layout={weight:e.data.weight}}),u},_getSerieGraphFromNodeLinks:function(e,t){for(var i=new m(!0),n=e.data||e.nodes,a=0,o=n.length;o>a;a++){var r=n[a];if(r&&!r.ignore){var s=this._getNodeCategory(t,r),l=s?s.name:r.name;if(this.selectedMap[l]=this.isSelected(l),this.selectedMap[l]){var h=i.addNode(r.name,r);h.rawIndex=a}}}for(var a=0,o=e.links.length;o>a;a++){var d=e.links[a],c=d.source,p=d.target;"number"==typeof c&&(c=n[c],c&&(c=c.name)),"number"==typeof p&&(p=n[p],p&&(p=p.name));var u=i.addEdge(c,p,d);u&&(u.rawIndex=a)}return i.eachNode(function(e){var i=e.data.value;if(null==i)if(i=0,t.ribbonType)for(var n=0;n<e.outEdges.length;n++)i+=e.outEdges[n].data.weight||0;else for(var n=0;n<e.edges.length;n++)i+=e.edges[n].data.weight||0;e.layout={size:i}}),i.eachEdge(function(e){e.layout={weight:null==e.data.weight?1:e.data.weight}}),i},_initHoverHandler:function(e,t){var i=e[0],n=t[0],a=this;n.eachNode(function(e){e.shape.onmouseover=function(){n.eachNode(function(e){e.shape.style.opacity=.1,e.labelShape&&(e.labelShape.style.opacity=.1,e.labelShape.modSelf()),e.shape.modSelf()});for(var i=0;i<t.length;i++)for(var o=0;o<t[i].edges.length;o++){var r=t[i].edges[o],s=a._getEdgeQueryTarget(t[i].__serie,r.data);r.shape.style.opacity=.1*a.deepQuery(s,"opacity"),r.shape.modSelf()}e.shape.style.opacity=1,e.labelShape&&(e.labelShape.style.opacity=1);for(var i=0;i<t.length;i++){var l=t[i].getNodeById(e.id);if(l)for(var o=0;o<l.outEdges.length;o++){var r=l.outEdges[o],s=a._getEdgeQueryTarget(t[i].__serie,r.data);r.shape.style.opacity=a.deepQuery(s,"opacity");var h=t[0].getNodeById(r.node2.id);h&&(h.shape&&(h.shape.style.opacity=1),h.labelShape&&(h.labelShape.style.opacity=1))}}a.zr.refreshNextFrame()},e.shape.onmouseout=function(){n.eachNode(function(e){e.shape.style.opacity=1,e.labelShape&&(e.labelShape.style.opacity=1,e.labelShape.modSelf()),e.shape.modSelf()});for(var e=0;e<t.length;e++)for(var o=0;o<t[e].edges.length;o++){var r=t[e].edges[o],s=[r.data,i];r.shape.style.opacity=a.deepQuery(s,"itemStyle.normal.chordStyle.opacity"),r.shape.modSelf()}a.zr.refreshNextFrame()}})},_buildSectors:function(e,t,i,n){var a=this.parseCenter(this.zr,n.center),r=this.parseRadius(this.zr,n.radius),s=n.clockWise,l=s?1:-1;i.eachNode(function(i){var h=this._getNodeCategory(n,i.data),c=h?this.getColor(h.name):this.getColor(i.id),p=i.layout.startAngle/Math.PI*180*l,m=i.layout.endAngle/Math.PI*180*l,u=new o({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:a[0],y:a[1],r0:r[0],r:r[1],startAngle:p,endAngle:m,brushType:"fill",opacity:1,color:c,clockWise:s},clickable:n.clickable,highlightStyle:{brushType:"fill"}});u.style.lineWidth=this.deepQuery([i.data,n],"itemStyle.normal.borderWidth"),u.highlightStyle.lineWidth=this.deepQuery([i.data,n],"itemStyle.emphasis.borderWidth"),u.style.strokeColor=this.deepQuery([i.data,n],"itemStyle.normal.borderColor"),u.highlightStyle.strokeColor=this.deepQuery([i.data,n],"itemStyle.emphasis.borderColor"),u.style.lineWidth>0&&(u.style.brushType="both"),u.highlightStyle.lineWidth>0&&(u.highlightStyle.brushType="both"),d.pack(u,e,t,i.data,i.rawIndex,i.id,i.category),this.shapeList.push(u),i.shape=u},this)},_buildNodeIcons:function(e,t,i,n){var a=this.parseCenter(this.zr,n.center),o=this.parseRadius(this.zr,n.radius),r=o[1];i.eachNode(function(i){var o=i.layout.startAngle,l=i.layout.endAngle,h=(o+l)/2,c=r*Math.cos(h),p=r*Math.sin(h),m=this._getNodeQueryTarget(n,i.data),u=this._getNodeCategory(n,i.data),g=this.deepQuery(m,"itemStyle.normal.color");g||(g=u?this.getColor(u.name):this.getColor(i.id));var V=new s({zlevel:this.getZlevelBase(),z:this.getZBase()+1,style:{x:-i.layout.size,y:-i.layout.size,width:2*i.layout.size,height:2*i.layout.size,iconType:this.deepQuery(m,"symbol"),color:g,brushType:"both",lineWidth:this.deepQuery(m,"itemStyle.normal.borderWidth"),strokeColor:this.deepQuery(m,"itemStyle.normal.borderColor")},highlightStyle:{color:this.deepQuery(m,"itemStyle.emphasis.color"),lineWidth:this.deepQuery(m,"itemStyle.emphasis.borderWidth"),strokeColor:this.deepQuery(m,"itemStyle.emphasis.borderColor")},clickable:n.clickable,position:[c+a[0],p+a[1]]});d.pack(V,e,t,i.data,i.rawIndex,i.id,i.category),this.shapeList.push(V),i.shape=V},this)},_buildLabels:function(e,t,i,a){var o=this.query(a,"itemStyle.normal.label.color"),r=this.query(a,"itemStyle.normal.label.rotate"),s=this.query(a,"itemStyle.normal.label.distance"),l=this.parseCenter(this.zr,a.center),h=this.parseRadius(this.zr,a.radius),d=a.clockWise,c=d?1:-1;i.eachNode(function(e){var t=e.layout.startAngle/Math.PI*180*c,i=e.layout.endAngle/Math.PI*180*c,d=(t*-c+i*-c)/2;d%=360,0>d&&(d+=360);var m=90>=d||d>=270;d=d*Math.PI/180;var u=[Math.cos(d),-Math.sin(d)],g=0;g=a.ribbonType?a.showScaleText?35+s:s:s+e.layout.size;var V=p.scale([],u,h[1]+g);p.add(V,V,l);var y={zlevel:this.getZlevelBase(),z:this.getZBase()+1,hoverable:!1,style:{text:null==e.data.label?e.id:e.data.label,textAlign:m?"left":"right",color:o||"#000000"}};r?(y.rotation=m?d:Math.PI+d,m?y.style.x=h[1]+g:y.style.x=-h[1]-g,y.style.y=0,y.position=l.slice()):(y.style.x=V[0],y.style.y=V[1]),y.style.textColor=this.deepQuery([e.data,a],"itemStyle.normal.label.textStyle.color")||"#fff",y.style.textFont=this.getFont(this.deepQuery([e.data,a],"itemStyle.normal.label.textStyle")),y=new n(y),this.shapeList.push(y),e.labelShape=y},this)},_buildRibbons:function(e,t,i,n){var a=e[t],o=this.parseCenter(this.zr,n.center),s=this.parseRadius(this.zr,n.radius);i.eachEdge(function(l,h){var c,p=i.getEdge(l.node2,l.node1);if(p&&!l.shape){if(p.shape)return void(l.shape=p.shape);var m=l.layout.startAngle/Math.PI*180,u=l.layout.endAngle/Math.PI*180,g=p.layout.startAngle/Math.PI*180,V=p.layout.endAngle/Math.PI*180;c=1===e.length?l.layout.weight<=p.layout.weight?this.getColor(l.node1.id):this.getColor(l.node2.id):this.getColor(a.name);var y,U,f=this._getEdgeQueryTarget(a,l.data),_=this._getEdgeQueryTarget(a,l.data,"emphasis"),b=new r({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:o[0],y:o[1],r:s[0],source0:m,source1:u,target0:g,target1:V,brushType:"both",opacity:this.deepQuery(f,"opacity"),color:c,lineWidth:this.deepQuery(f,"borderWidth"),strokeColor:this.deepQuery(f,"borderColor"),clockWise:n.clockWise},clickable:n.clickable,highlightStyle:{brushType:"both",opacity:this.deepQuery(_,"opacity"),lineWidth:this.deepQuery(_,"borderWidth"),strokeColor:this.deepQuery(_,"borderColor")}});l.layout.weight<=p.layout.weight?(y=p.node1,U=p.node2):(y=l.node1,U=l.node2),d.pack(b,a,t,l.data,null==l.rawIndex?h:l.rawIndex,l.data.name||y.id+"-"+U.id,y.id,U.id),this.shapeList.push(b),l.shape=b}},this)},_buildEdgeCurves:function(e,t,i,n,a){var o=e[t],r=this.parseCenter(this.zr,n.center);i.eachEdge(function(e,i){var n=a.getNodeById(e.node1.id),s=a.getNodeById(e.node2.id),h=n.shape,c=s.shape,p=this._getEdgeQueryTarget(o,e.data),m=this._getEdgeQueryTarget(o,e.data,"emphasis"),u=new l({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{xStart:h.position[0],yStart:h.position[1],xEnd:c.position[0],yEnd:c.position[1],cpX1:r[0],cpY1:r[1],lineWidth:this.deepQuery(p,"width"),strokeColor:this.deepQuery(p,"color"),opacity:this.deepQuery(p,"opacity")},highlightStyle:{lineWidth:this.deepQuery(m,"width"),strokeColor:this.deepQuery(m,"color"),opacity:this.deepQuery(m,"opacity")}});d.pack(u,o,t,e.data,null==e.rawIndex?i:e.rawIndex,e.data.name||e.node1.id+"-"+e.node2.id,e.node1.id,e.node2.id),this.shapeList.push(u),e.shape=u},this)},_buildScales:function(e,t,i){var o,r,s=e.clockWise,l=this.parseCenter(this.zr,e.center),h=this.parseRadius(this.zr,e.radius),d=s?1:-1,c=0,m=-(1/0);e.showScaleText&&(i.eachNode(function(e){var t=e.data.value;t>m&&(m=t),c+=t}),m>1e10?(o="b",r=1e-9):m>1e7?(o="m",r=1e-6):m>1e4?(o="k",r=.001):(o="",r=1));var u=c/(360-e.padding);i.eachNode(function(t){for(var i=t.layout.startAngle/Math.PI*180,c=t.layout.endAngle/Math.PI*180,m=i;;){if(s&&m>c||!s&&c>m)break;var g=m/180*Math.PI,V=[Math.cos(g),Math.sin(g)],y=p.scale([],V,h[1]+1);p.add(y,y,l);var U=p.scale([],V,h[1]+this.scaleLineLength);p.add(U,U,l);var f=new a({zlevel:this.getZlevelBase(),z:this.getZBase()-1,hoverable:!1,style:{xStart:y[0],yStart:y[1],xEnd:U[0],yEnd:U[1],lineCap:"round",brushType:"stroke",strokeColor:"#666",lineWidth:1}});this.shapeList.push(f),m+=d*this.scaleUnitAngle}if(e.showScaleText)for(var _=i,b=5*u*this.scaleUnitAngle,x=0;;){if(s&&_>c||!s&&c>_)break;var g=_;g%=360,0>g&&(g+=360);var k=90>=g||g>=270,v=new n({zlevel:this.getZlevelBase(),z:this.getZBase()-1,hoverable:!1,style:{x:k?h[1]+this.scaleLineLength+4:-h[1]-this.scaleLineLength-4,y:0,text:Math.round(10*x)/10+o,textAlign:k?"left":"right"},position:l.slice(),rotation:k?[-g/180*Math.PI,0,0]:[-(g+180)/180*Math.PI,0,0]});this.shapeList.push(v),x+=b*r,_+=d*this.scaleUnitAngle*5}},this)},refresh:function(e){if(e&&(this.option=e,this.series=e.series),this.legend=this.component.legend,this.legend)this.getColor=function(e){return this.legend.getColor(e)},this.isSelected=function(e){return this.legend.isSelected(e)};else{var t={},i=0;this.getColor=function(e){return t[e]?t[e]:(t[e]||(t[e]=this.zr.getColor(i++)),t[e])},this.isSelected=function(){return!0}}this.backupShapeList(),this._init()},reformOption:function(e){var t=c.merge;e=t(t(e||{},this.ecTheme.chord),h.chord),e.itemStyle.normal.label.textStyle=this.getTextStyle(e.itemStyle.normal.label.textStyle),this.z=e.z,this.zlevel=e.zlevel}},c.inherits(t,i),e("../chart").define("chord",t),t}),define("echarts/util/shape/Ribbon",["require","zrender/shape/Base","zrender/shape/util/PathProxy","zrender/tool/util","zrender/tool/area"],function(e){function t(e){i.call(this,e),this._pathProxy=new n}var i=e("zrender/shape/Base"),n=e("zrender/shape/util/PathProxy"),a=e("zrender/tool/util"),o=e("zrender/tool/area");return t.prototype={type:"ribbon",buildPath:function(e,t){var i=t.clockWise||!1,n=this._pathProxy;n.begin(e);var a=t.x,o=t.y,r=t.r,s=t.source0/180*Math.PI,l=t.source1/180*Math.PI,h=t.target0/180*Math.PI,d=t.target1/180*Math.PI,c=a+Math.cos(s)*r,p=o+Math.sin(s)*r,m=a+Math.cos(l)*r,u=o+Math.sin(l)*r,g=a+Math.cos(h)*r,V=o+Math.sin(h)*r,y=a+Math.cos(d)*r,U=o+Math.sin(d)*r;n.moveTo(c,p),n.arc(a,o,t.r,s,l,!i),n.bezierCurveTo(.7*(a-m)+m,.7*(o-u)+u,.7*(a-g)+g,.7*(o-V)+V,g,V),(t.source0!==t.target0||t.source1!==t.target1)&&(n.arc(a,o,t.r,h,d,!i),n.bezierCurveTo(.7*(a-y)+y,.7*(o-U)+U,.7*(a-c)+c,.7*(o-p)+p,c,p))},getRect:function(e){return e.__rect?e.__rect:(this._pathProxy.isEmpty()||this.buildPath(null,e),this._pathProxy.fastBoundingRect())},isCover:function(e,t){var i=this.getRect(this.style);return e>=i.x&&e<=i.x+i.width&&t>=i.y&&t<=i.y+i.height?o.isInsidePath(this._pathProxy.pathCommands,0,"fill",e,t):void 0}},a.inherits(t,i),t}),define("echarts/data/Graph",["require","zrender/tool/util"],function(e){var t=e("zrender/tool/util"),i=function(e){this._directed=e||!1,this.nodes=[],this.edges=[],this._nodesMap={},this._edgesMap={}};i.prototype.isDirected=function(){return this._directed},i.prototype.addNode=function(e,t){if(this._nodesMap[e])return this._nodesMap[e];var n=new i.Node(e,t);return this.nodes.push(n),this._nodesMap[e]=n,n},i.prototype.getNodeById=function(e){return this._nodesMap[e]},i.prototype.addEdge=function(e,t,n){if("string"==typeof e&&(e=this._nodesMap[e]),"string"==typeof t&&(t=this._nodesMap[t]),e&&t){var a=e.id+"-"+t.id;if(this._edgesMap[a])return this._edgesMap[a];var o=new i.Edge(e,t,n);return this._directed&&(e.outEdges.push(o),t.inEdges.push(o)),e.edges.push(o),e!==t&&t.edges.push(o),this.edges.push(o),this._edgesMap[a]=o,o}},i.prototype.removeEdge=function(e){var i=e.node1,n=e.node2,a=i.id+"-"+n.id;this._directed&&(i.outEdges.splice(t.indexOf(i.outEdges,e),1),n.inEdges.splice(t.indexOf(n.inEdges,e),1)),i.edges.splice(t.indexOf(i.edges,e),1),i!==n&&n.edges.splice(t.indexOf(n.edges,e),1),delete this._edgesMap[a],this.edges.splice(t.indexOf(this.edges,e),1)},i.prototype.getEdge=function(e,t){return"string"!=typeof e&&(e=e.id),"string"!=typeof t&&(t=t.id),this._directed?this._edgesMap[e+"-"+t]:this._edgesMap[e+"-"+t]||this._edgesMap[t+"-"+e]},i.prototype.removeNode=function(e){if("string"!=typeof e||(e=this._nodesMap[e])){delete this._nodesMap[e.id],this.nodes.splice(t.indexOf(this.nodes,e),1);for(var i=0;i<this.edges.length;){var n=this.edges[i];n.node1===e||n.node2===e?this.removeEdge(n):i++}}},i.prototype.filterNode=function(e,t){for(var i=this.nodes.length,n=0;i>n;)e.call(t,this.nodes[n],n)?n++:(this.removeNode(this.nodes[n]),i--)},i.prototype.filterEdge=function(e,t){for(var i=this.edges.length,n=0;i>n;)e.call(t,this.edges[n],n)?n++:(this.removeEdge(this.edges[n]),i--)},i.prototype.eachNode=function(e,t){for(var i=this.nodes.length,n=0;i>n;n++)this.nodes[n]&&e.call(t,this.nodes[n],n)},i.prototype.eachEdge=function(e,t){for(var i=this.edges.length,n=0;i>n;n++)this.edges[n]&&e.call(t,this.edges[n],n)},i.prototype.clear=function(){this.nodes.length=0,this.edges.length=0,this._nodesMap={},this._edgesMap={}},i.prototype.breadthFirstTraverse=function(e,t,i,n){if("string"==typeof t&&(t=this._nodesMap[t]),t){var a="edges";"out"===i?a="outEdges":"in"===i&&(a="inEdges");for(var o=0;o<this.nodes.length;o++)this.nodes[o].__visited=!1;if(!e.call(n,t,null))for(var r=[t];r.length;)for(var s=r.shift(),l=s[a],o=0;o<l.length;o++){var h=l[o],d=h.node1===s?h.node2:h.node1;if(!d.__visited){if(e.call(d,d,s))return;r.push(d),d.__visited=!0}}}},i.prototype.clone=function(){for(var e=new i(this._directed),t=0;t<this.nodes.length;t++)e.addNode(this.nodes[t].id,this.nodes[t].data);for(var t=0;t<this.edges.length;t++){var n=this.edges[t];e.addEdge(n.node1.id,n.node2.id,n.data)}return e};var n=function(e,t){this.id=e,this.data=t||null,this.inEdges=[],this.outEdges=[],this.edges=[]};n.prototype.degree=function(){return this.edges.length},n.prototype.inDegree=function(){return this.inEdges.length},n.prototype.outDegree=function(){return this.outEdges.length};var a=function(e,t,i){this.node1=e,this.node2=t,this.data=i||null};return i.Node=n,i.Edge=a,i.fromMatrix=function(e,t,n){if(t&&t.length&&t[0].length===t.length&&e.length===t.length){for(var a=t.length,o=new i(n),r=0;a>r;r++){var s=o.addNode(e[r].id,e[r]);s.data.value=0,n&&(s.data.outValue=s.data.inValue=0)}for(var r=0;a>r;r++)for(var l=0;a>l;l++){var h=t[r][l];n&&(o.nodes[r].data.outValue+=h,o.nodes[l].data.inValue+=h),o.nodes[r].data.value+=h,o.nodes[l].data.value+=h}for(var r=0;a>r;r++)for(var l=r;a>l;l++){var h=t[r][l];if(0!==h){var d=o.nodes[r],c=o.nodes[l],p=o.addEdge(d,c,{});if(p.data.weight=h,r!==l&&n&&t[l][r]){var m=o.addEdge(c,d,{});m.data.weight=t[l][r]}}}return o}},i}),define("echarts/layout/Chord",["require"],function(e){var t=function(e){e=e||{},this.sort=e.sort||null,this.sortSub=e.sortSub||null,this.padding=.05,this.startAngle=e.startAngle||0,this.clockWise=null==e.clockWise?!1:e.clockWise,this.center=e.center||[0,0],this.directed=!0};t.prototype.run=function(e){e instanceof Array||(e=[e]);var t=e.length;if(t){for(var a=e[0],o=a.nodes.length,r=[],s=0,l=0;o>l;l++){var h=a.nodes[l],d={size:0,subGroups:[],node:h};r.push(d);for(var c=0,p=0;p<e.length;p++){var m=e[p],u=m.getNodeById(h.id);if(u){d.size+=u.layout.size;for(var g=this.directed?u.outEdges:u.edges,V=0;V<g.length;V++){var y=g[V],U=y.layout.weight;d.subGroups.push({weight:U,edge:y,graph:m}),c+=U}}}s+=d.size;for(var f=d.size/c,V=0;V<d.subGroups.length;V++)d.subGroups[V].weight*=f;"ascending"===this.sortSub?d.subGroups.sort(i):"descending"===this.sort&&(d.subGroups.sort(i),d.subGroups.reverse())}"ascending"===this.sort?r.sort(n):"descending"===this.sort&&(r.sort(n),r.reverse());for(var f=(2*Math.PI-this.padding*o)/s,_=this.startAngle,b=this.clockWise?1:-1,l=0;o>l;l++){var d=r[l];d.node.layout.startAngle=_,d.node.layout.endAngle=_+b*d.size*f,d.node.layout.subGroups=[];for(var V=0;V<d.subGroups.length;V++){var x=d.subGroups[V];x.edge.layout.startAngle=_,_+=b*x.weight*f,x.edge.layout.endAngle=_}_=d.node.layout.endAngle+b*this.padding}}};var i=function(e,t){return e.weight-t.weight},n=function(e,t){return e.size-t.size};return t});