(this["webpackJsonpsnoeien-darts"]=this["webpackJsonpsnoeien-darts"]||[]).push([[0],{102:function(e,a){},125:function(e,a,t){},128:function(e,a,t){},129:function(e,a,t){},130:function(e,a,t){},131:function(e,a,t){},132:function(e,a,t){},133:function(e,a,t){},134:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(20),o=t.n(c),l=t(22),i=t.n(l),s=t(23),m=t(24),u=t(29),E=t(26),d=t(14),p=t(11),g=t(10),f=t(7),v=t(65),y=t(28),b=t(2),h=t(30),_=t.n(h),O=function(e){return function(a){a({type:"FETCH_GAME",payload:e}),_.a.get("/api/game/".concat(e)).then((function(e){a({type:"FETCH_GAME_SUCCESS",payload:e})}),(function(e){return a({type:"FETCH_GAME_FAILURE",payload:e})}))}},S={games:void 0,game:void 0,err:void 0,loading:{game:!1},error:{game:!1,games:!1}},C=Object(f.c)({game:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"FETCH_GAME":return Object(b.a)({},e,{loading:Object(b.a)({},e.loading,{game:!0})});case"FETCH_GAME_SUCCESS":return Object(b.a)({},e,{game:a.payload.data,error:void 0,loading:Object(b.a)({},e.loading,{game:!1})});case"FETCH_GAME_FAILURE":return Object(b.a)({},e,{game:void 0,error:a.payload,loading:Object(b.a)({},e.loading,{game:!1})});case"FETCH_GAMES":return Object(b.a)({},e,{loading:Object(b.a)({},e.loading,{games:!0})});case"FETCH_GAMES_SUCCESS":return Object(b.a)({},e,{games:a.payload.data,error:void 0,loading:Object(b.a)({},e.loading,{games:!1})});case"FETCH_GAMES_FAILURE":return Object(b.a)({},e,{games:void 0,error:a.payload,loading:Object(b.a)({},e.loading,{games:!1})});case"CREATE_GAME":return Object(b.a)({},e,{game:void 0,error:void 0});case"CREATE_GAME_SUCCESS":return Object(b.a)({},e,{game:a.payload.data.game,error:void 0});case"CREATE_GAME_FAILURE":return Object(b.a)({},e,{game:void 0,error:a.payload});case"DELETE_GAME":var t=e.games.filter((function(e){return e.name!==a.payload.id}));return Object(b.a)({},e,{games:t});case"RESET_GAME":return Object(b.a)({},e);case"UPDATE_GAME":var n=a.payload,r=n.player,c=n.index,o=e.game.currentPlayer,l=Object(y.a)(e.game.players);return l[c]=r,o=1===o?0:1,Object(b.a)({},e,{game:a.payload});default:return e}}}),j=Object(f.a)(v.a),A=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||f.d,G=Object(f.e)(C,A(j)),N=t(27);t(125);var w=Object(g.b)((function(e){return{games:e.game.games}}),{createGame:function(e,a){return function(t){t({type:"CREATE_GAME",payload:e}),_.a.post("/api/game",{name:e}).then((function(e){t({type:"CREATE_GAME_SUCCESS",payload:e}),a&&a(e)}),(function(e){return t({type:"CREATE_GAME_FAILURE",payload:e})}))}},fetchGames:function(e){return function(a){a({type:"FETCH_GAMES",payload:e}),_.a.get("/api/games").then((function(e){a({type:"FETCH_GAMES_SUCCESS",payload:e})}),(function(e){return a({type:"FETCH_GAMES_FAILURE",payload:e})}))}}})((function(e){var a=e.games,t=e.createGame,c=e.fetchGames,o=Object(p.f)(),l=Object(n.useState)(""),i=Object(N.a)(l,2),s=i[0],m=i[1];Object(n.useEffect)((function(){c()}),[c]);return r.a.createElement("div",{className:"container padded text-center"},r.a.createElement("div",{className:"col-xs-1 col-md-4"}),r.a.createElement("div",{className:"col-xs-12 col-md-4 new-game padded-v--lg"},r.a.createElement("div",null,"Maak een nieuwe game",r.a.createElement("input",{type:"text",value:s,onChange:function(e){return m(e.target.value)}}),r.a.createElement("div",{className:"button margin-top block",onClick:function(){t(s,(function(){return o.push("/game/".concat(s))}))}},"Start")),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{className:"existing-game"},"Join een bestaande game",r.a.createElement("hr",{style:{color:"white",width:"calc(100% - 6px)"}}),r.a.createElement("div",null,a&&a.length>0&&Array.isArray(a)?a.map((function(e,a){return r.a.createElement(d.b,{key:a,className:"block",to:"/game/".concat(e.name)},e.name)})):"Er zijn nog geen bestaande games"))))})),M=t(67),T=t.n(M);t(128);var k,F=Object(g.b)((function(e){return{game:e.game.game}}),{fetchGame:O})((function(e){var a=e.isCurrentPlayer,t=e.name,n=e.score;return r.a.createElement("div",{className:"player"},r.a.createElement("div",null,t,r.a.createElement("span",{className:"player__current ".concat(a?"player__current--active":"")})),r.a.createElement("div",{className:"larger bold"},n))})),U=(t(129),function(e){var a=e.setScore,t=Object(n.useState)(0),c=Object(N.a)(t,2),o=c[0],l=c[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"number-container"},o,r.a.createElement("span",{className:"number-container__close",onClick:function(){var e=o.toString().slice(0,-1),a=parseInt(e,10);l(a&&a>=0?a:0)}},"\xd7")),r.a.createElement("div",{className:"calculator"},Object(y.a)(new Array(10)).map((function(e,a){return r.a.createElement("div",{key:"button-".concat(a),className:"calculator__key",onClick:function(){return function(e){var a="".concat(o).concat(e),t=parseInt(a,10);t>180||l(t)}(9-a)}},9-a)}))),r.a.createElement("div",{className:"button block",onClick:function(){a(o),l(0)}},o>0?"Set score":"No score"))}),R=t(68),x=t.n(R),H=(t(130),function(e){Object(u.a)(t,e);var a=Object(E.a)(t);function t(e){var n;return Object(s.a)(this,t),(n=a.call(this,e)).handleScoreUpdate=function(e){var a=n.props.game,t=a.currentPlayer,r=a.players[t];if(r){var c=r.score-e;if(!(c<0)){if(0===c)return n.finishGame();a.players[t].score=c,t=1===t?0:1,a.currentPlayer=t,n.props.updateGameSocket(k,a)}}},n.finishGame=function(){n.setState({showConfetti:!0},(function(){return setTimeout((function(){return n.setState({showConfetti:!0})}),100)})),n.resetGame()},n.resetGame=function(){var e=n.props.game;e.players.forEach((function(a,t){var n=Object(b.a)({},a);n.score=501,e.players[t]=n})),e.currentPlayer=0,n.props.updateGameSocket(k,e)},n.state={showConfetti:!1},(k=i.a.connect("localhost"===window.location.hostname?"http://localhost:8080":window.location.hostname,{secure:!0})).on("gameUpdated",(function(e){n.props.updateGame(e)})),n}return Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.match.params.name;e&&this.props.fetchGame(e)}},{key:"componentWillUnmount",value:function(){k.disconnect(),alert("Disconnecting Socket as component will unmount")}},{key:"render",value:function(){var e=this,a=this.state.showConfetti,t=this.props.game;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"col-4 col-xs-1 col-sm-2 col-lg-3"}),r.a.createElement("div",{className:"col-4 col-xs-12 col-sm-8 col-lg-6  new-game padded-v--lg"},t?r.a.createElement("div",null,t.name,r.a.createElement("span",{onClick:function(){return e.resetGame()}},r.a.createElement("img",{className:"reset-icon",src:x.a,alt:"reset game icon"}))):"No game found",r.a.createElement("div",{className:"game-container container"},t?t.players.map((function(e,n){return r.a.createElement("div",{key:n,className:"col-".concat(12/t.players.length)},r.a.createElement(T.a,{active:t.currentPlayer===n&&a}),r.a.createElement(F,{name:e.name,isCurrentPlayer:t.currentPlayer===n,score:e.score}))})):null,r.a.createElement("hr",{className:"col-12",style:{color:"white",width:"calc(100% - 6px)"}}),r.a.createElement("div",{className:"col-12"},r.a.createElement(U,{setScore:function(a){return e.handleScoreUpdate(a)}})))))}}]),t}(r.a.Component));var I=Object(f.d)(p.g,Object(g.b)((function(e){return{game:e.game.game}}),{fetchGame:O,updateGameSocket:function(e,a){return function(t){e.emit("updateGame",a)}},resetGame:function(e){return{type:"RESET_GAME",payload:e}},updateGame:function(e){return{type:"UPDATE_GAME",payload:e}}}))(H),P=(t(131),function(){return r.a.createElement("div",{className:"title"},"SNOEIEN DARTS")}),D=(t(132),t(133),function(e){Object(u.a)(t,e);var a=Object(E.a)(t);function t(){return Object(s.a)(this,t),a.apply(this,arguments)}return Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",null,r.a.createElement(P,null)),r.a.createElement(g.a,{store:G},r.a.createElement(d.a,null,r.a.createElement(p.c,null,r.a.createElement(p.a,{exact:!0,path:"/"},r.a.createElement(w,null)),r.a.createElement(p.a,{exact:!0,path:"/game/:name"},r.a.createElement(I,null))))))}}]),t}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i()().on("hello",(function(e){var a=e.message;return alert(a)})),o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},68:function(e,a,t){e.exports=t.p+"static/media/reset.00b1ad9e.svg"},69:function(e,a,t){e.exports=t(134)}},[[69,1,2]]]);
//# sourceMappingURL=main.be0f7035.chunk.js.map