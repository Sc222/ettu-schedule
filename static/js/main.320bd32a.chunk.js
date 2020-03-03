(this["webpackJsonpettu-schedule"]=this["webpackJsonpettu-schedule"]||[]).push([[0],{44:function(e,t,n){},62:function(e,t,n){e.exports=n(73)},67:function(e,t,n){},73:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),l=n.n(o),i=(n(67),n(18)),c=n(13),s=n(25),u=n(26),m=n(28),h=n(44),p=n.n(h),d=n(134),g=n(135),f=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={ref:n.props.ref,getStops:n.props.getStops,error:!1,setSchedule:n.props.setSchedule},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(g.a,{id:"search",loading:0===this.state.getStops().length,loadingText:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...",options:this.state.getStops(),onChange:function(t,n){return e.getStopSchedule(n)},getOptionLabel:function(e){return e.nameWithDirection},getOptionDisabled:function(e){return-1===e.id},style:{width:"100%"},renderInput:function(t){return r.a.createElement(d.a,Object.assign({},t,{error:e.state.error,label:"\u041e\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0430",variant:"outlined"}))}})}},{key:"getStopSchedule",value:function(e){var t=this;console.log(e),null!=e&&fetch("https://ettu-schedule.herokuapp.com/transport-near-stops/"+e.id).then((function(e){return e.json()})).then((function(e){console.log(e),t.state.setSchedule(e)}))}}]),t}(r.a.Component),E=n(121),S=n(125),y=n(52),b=n.n(y),v=n(53),j=n.n(v),O=n(127),T=n(126),k=n(74),C=n(124),w=n(129),D=n(131),x=n(130),R=n(132),W=n(133),B=n(128),I=n(51),z=n.n(I),J=n(122),G=n(123),L=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(J.a,{position:"static"},r.a.createElement(G.a,{variant:"dense"},r.a.createElement(z.a,{edge:"start",style:{marginRight:16}}),r.a.createElement(C.a,{variant:"h6",style:{flexGrow:1}},"Ettu Schedule")))}}]),t}(r.a.Component);function M(e){e.sort((function(e,t){return e.nameWithDirection.localeCompare(t.nameWithDirection)}));for(var t=0;t<e.length;t++)console.log(e[t].id+": "+e[t].nameWithDirection);return e}function N(e){for(var t,n=[],a=0;a<e.length;a++)t=e[a],n.push(t);return n}var q=[],A=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).setSchedule=function(e){e.sort((function(e,t){return e.distanceRemaining.localeCompare(t.distanceRemaining)})),console.log(e),n.setState({schedule:e})},n.getStops=function(){return n.state.isTrams?null==n.state.tramStops?q:n.state.tramStops:null==n.state.trolleyStops?q:n.state.trolleyStops},n.getTrolleyColor=function(){return n.state.isTrams?"default":"primary"},n.getTramColor=function(){return n.state.isTrams?"primary":"default"},n.state={tramStops:null,trolleyStops:null,isTrams:!0,schedule:[]},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://ettu-schedule.herokuapp.com/tram-stops").then((function(e){return e.json()})).then((function(e){return N(e)})).then((function(e){return M(e)})).then((function(t){return e.setState({tramStops:t})})),fetch("https://ettu-schedule.herokuapp.com/trolley-stops").then((function(e){return e.json()})).then((function(e){return N(e)})).then((function(e){return M(e)})).then((function(t){return e.setState({trolleyStops:t})}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:p.a.root},r.a.createElement(L,null),r.a.createElement(S.a,{maxWidth:"sm",style:{marginTop:16,marginBottom:16}},r.a.createElement(k.a,{elevation:2,style:{padding:16}},r.a.createElement(T.a,{container:!0,direction:"column",justify:"center"},r.a.createElement(C.a,{variant:"h4",style:{paddingBottom:8}},"\u0413\u0434\u0435 ",this.state.isTrams?"\u0442\u0440\u0430\u043c\u0432\u0430\u0439":"\u0442\u0440\u043e\u043b\u043b\u0435\u0439\u0431\u0443\u0441","?"),r.a.createElement(C.a,{color:"textSecondary",variant:"body1",style:{paddingBottom:16}},"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u0443\u044e\u0449\u0438\u0439 \u0432\u0430\u0441 \u0442\u0438\u043f \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442\u0430, \u0430 \u0437\u0430\u0442\u0435\u043c \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043e\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0443."),r.a.createElement(O.a,{variant:"middle"}),r.a.createElement(T.a,{container:!0,direction:"row",justify:"center",alignItems:"center"},r.a.createElement(E.a,{style:{margin:8},onClick:function(){e.setState({isTrams:!0})},color:this.getTramColor(),"aria-label":"\u0422\u0440\u0430\u043c\u0432\u0430\u0439"},r.a.createElement(b.a,{fontSize:"large"})),r.a.createElement(E.a,{style:{margin:8},onClick:function(){e.setState({isTrams:!1})},color:this.getTrolleyColor(),"aria-label":"\u0422\u0440\u043e\u043b\u043b\u0435\u0439\u0431\u0443\u0441"},r.a.createElement(j.a,{fontSize:"large"}))),r.a.createElement(O.a,{variant:"middle"}),r.a.createElement(T.a,{style:{marginTop:16},container:!0,direction:"row",justify:"center",alignItems:"stretch"},r.a.createElement(f,{setSchedule:this.setSchedule,getStops:this.getStops})))),0===this.state.schedule.length?"":r.a.createElement(B.a,{component:k.a,elevation:2,style:{marginTop:16}},r.a.createElement(w.a,{"aria-label":"schedule table",size:"small"},r.a.createElement(x.a,null,r.a.createElement(D.a,null,r.a.createElement(R.a,null,"\u2116"),r.a.createElement(R.a,{align:"right"},"\u0412\u0440\u0435\u043c\u044f \u043e\u0436\u0438\u0434\u0430\u043d\u0438\u044f (\u043c\u0438\u043d)"),r.a.createElement(R.a,{align:"right"},"\u0420\u0430\u0441\u0441\u0442\u043e\u044f\u043d\u0438\u0435 \u0434\u043e \u043e\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0438 (\u043c)"))),r.a.createElement(W.a,null,this.state.schedule.map((function(e){return r.a.createElement(D.a,{key:e.name},r.a.createElement(R.a,{component:"th",scope:"row"},e.name),r.a.createElement(R.a,{align:"right"},e.timeRemaining),r.a.createElement(R.a,{align:"right"},e.distanceRemaining))})))))))}}]),t}(r.a.Component);l.a.render(r.a.createElement(A,null),document.getElementById("root"))}},[[62,1,2]]]);
//# sourceMappingURL=main.320bd32a.chunk.js.map