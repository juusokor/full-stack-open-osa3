(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(43)},41:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(10),u=n.n(l),i=n(15),o=n(11),s=n(12),m=n(14),c=n(13),d=n(16),h=function(e){var t=e.person,n=e.handleRemoveClick;return r.a.createElement("tr",{key:t.id},r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.number),r.a.createElement("td",null,r.a.createElement("button",{type:"submit","data-id":t.id,onClick:n},"poista")))},f=function(e){var t=e.persons,n=e.filter,a=e.handleRemoveClick,l=t.filter(function(e){return e.name.toLowerCase().includes(n)}).map(function(e){return r.a.createElement(h,{key:e.id,person:e,handleRemoveClick:a})});return r.a.createElement("div",null,r.a.createElement("h2",null,"Numerot"),r.a.createElement("table",null,r.a.createElement("tbody",null,l)))},v=function(e){var t=e.handleSubmit,n=e.newNameState,a=e.newNumberState,l=e.handleNameChange,u=e.handleNumberChange;return r.a.createElement("div",null,r.a.createElement("h2",null,"Lis\xe4\xe4 uusi / muuta olemassaolevaa numeroa"),r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"nimi:",r.a.createElement("input",{value:n,onChange:l})),r.a.createElement("div",null,"numero:",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))))},p=function(e){var t=e.filter,n=e.handleFilterChange;return r.a.createElement("div",null,r.a.createElement("form",null,r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4:"," ",r.a.createElement("input",{value:t,onChange:n}))))},g=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"message"},t)},b=n(2),E=n.n(b),N="/api/persons",w={getAll:function(){return E.a.get(N).then(function(e){return e.data})},create:function(e){return E.a.post(N,e).then(function(e){return e.data})},update:function(e,t){return E.a.put("".concat(N,"/").concat(e),t).then(function(e){return e.data})},remove:function(e){return E.a.delete("".concat(N,"/").concat(e)).then(function(e){return e.data})}},C=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(m.a)(this,Object(c.a)(t).call(this,e))).addName=function(e){e.preventDefault();var t=n.state.persons.find(function(e){return e.name===n.state.newName});if("undefined"===typeof t){var a={name:n.state.newName,number:n.state.newNumber,id:n.state.persons.length+1},r=n.state.persons.concat(a);w.create(a).then(function(){n.setState({persons:r,newName:"",newNumber:"",message:"Lis\xe4tty nimi ".concat(a.name," numerolla ").concat(a.number)}),setTimeout(function(){n.setState({message:null})},5e3)})}else{var l=Object(i.a)({},t,{number:n.state.newNumber});window.confirm("".concat(l.name," on jo luetteleossa. Korvataanko vanha numero uudella?"))&&w.update(l.id,l).then(function(e){var t=n.state.persons.filter(function(t){return t.id!==e.id});n.setState({persons:t.concat(e),newName:"",newNumber:"",message:"P\xe4ivitetty nimi ".concat(e.name," numerolla ").concat(e.number)}),setTimeout(function(){n.setState({message:null})},5e3)}).catch(function(){alert("Varoitus! P\xe4ivitys ep\xe4onnistui koska muutoksen kohteena olleen henkil\xf6n tiedot on jo poistettu."),w.getAll().then(function(e){n.setState({persons:e})})})}},n.removeName=function(e){e.preventDefault();var t=parseInt(e.target.dataset.id),a=n.state.persons.find(function(e){return e.id===t});window.confirm("Poistetaanko id ".concat(a.name,"?"))&&w.remove(t).then(function(){n.setState({persons:n.state.persons.filter(function(e){return e.id!==t}),message:"Poistettu henkil\xf6 ".concat(a.name)}),setTimeout(function(){n.setState({message:null})},5e3)})},n.handleNameChange=function(e){n.setState({newName:e.target.value})},n.handleNumberChange=function(e){n.setState({newNumber:e.target.value})},n.handleFilterChange=function(e){n.setState({filter:e.target.value})},n.state={persons:[],newName:"",newNumber:"",filter:"",message:null},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;w.getAll().then(function(t){e.setState({persons:t})})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(g,{message:this.state.message}),r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement(p,{filter:this.state.filter,handleFilterChange:this.handleFilterChange}),r.a.createElement(v,{handleSubmit:this.addName,newNameState:this.state.newName,newNumberState:this.state.newNumber,handleNameChange:this.handleNameChange,handleNumberChange:this.handleNumberChange}),r.a.createElement(f,{persons:this.state.persons,filter:this.state.filter,handleRemoveClick:this.removeName}))}}]),t}(r.a.Component);n(41);u.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[17,2,1]]]);
//# sourceMappingURL=main.ca86904c.chunk.js.map