YUI.add("gallery-xarno-calendar-controls",function(c){var a=c.Lang,b="boundingBox";c.namespace("Plugin.Xarno").CalendarControls=c.Base.create("controls",c.Plugin.Base,[],{initializer:function(){this._host=this.get("host");this.afterHostEvent("render",c.bind(this._render,this));},destructor:function(){if(this._delegate){this._delegate.destroy();}if(this._controls){this._controls.remove(true);}this._delegate=null;this._controls=null;},syncUI:function(){this._syncUI();},_render:function(){this._renderUI();this._bindUI();this._syncUI();},_renderUI:function(){var d=c.WidgetStdMod.HEADER;this._buildControls();if(this.get("position")==="footer"){d=c.WidgetStdMod.FOOTER;}this.get("host").setStdModContent(d,this._controls,c.WidgetStdMod.AFTER);},_bindUI:function(){this._host.after("dateChange",c.bind(this._syncUI,this));},_syncUI:function(i){var j=(i)?i.newVal:this._host.get("date"),h=this.get("months")[j.getMonth()],f=j.getDate(),g=j.getFullYear();this._display.setContent(a.sub(this.get("display"),{month:h,day:f,year:g}));},_controls:null,_display:null,_delegate:null,_buildControls:function(){var h,e,f,g,d;h=new c.Node.create('<div class="'+this._host.getClassName("controls")+'" />');this._display=new c.Node.create('<span class="display" />');h.append(this._display);if(this.get("yearButtons")){e=new c.Button(this.get("prevYearConfig"));e.get(b).addClass("prev-year");e.on("press",c.bind(this._prevYear,this));e.render(h);g=new c.Button(this.get("nextYearConfig"));g.get(b).addClass("next-year");g.on("press",c.bind(this._nextYear,this));g.render(h);}if(this.get("yearButtons")){f=new c.Button(this.get("prevMonthConfig"));f.get(b).addClass("prev-month");f.on("press",c.bind(this._prevMonth,this));f.render(h);d=new c.Button(this.get("nextMonthConfig"));d.get(b).addClass("next-month");d.on("press",c.bind(this._nextMonth,this));d.render(h);}this._controls=h;},_controlClick:function(d){},_prevYear:function(){this._host.prevYear();},_prevMonth:function(){this._host.prevMonth();},_updateMonthYear:function(){},_nextMonth:function(){this._host.nextMonth();},_nextYear:function(){this._host.nextYear();},_setPosition:function(d){if(d==="header"||d==="footer"){return d;}return null;}},{NS:"controls",ATTRS:{position:{value:"header",validator:"_setPosition"},yearButtons:{value:true,validator:a.isBoolean},monthButtons:{value:true,validator:a.isBoolean},months:{value:["January","February","March","April","May","June","July","August","September","October","November","December"]},display:{value:"{month} {year}"},prevYearConfig:{value:{icon:"control-dbl-w"}},prevMonthConfig:{value:{icon:"control-w"}},nextMonthConfig:{value:{icon:"control-e"}},nextYearConfig:{value:{icon:"control-dbl-e"}}}});},"gallery-2011.02.02-21-07",{requires:["plugin","base-build","gallery-button"]});