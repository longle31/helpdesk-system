(this.webpackJsonptechnician=this.webpackJsonptechnician||[]).push([[0],{26:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},48:function(e,t,a){"use strict";a.r(t);var n,r=a(0),s=a(1),c=a.n(s),i=a(19),o=a.n(i),u=(a(35),a(36),a(7)),l=(a(37),a(16)),d=document.location.host,p=function(){var e=Object(s.useState)(0),t=Object(u.a)(e,2),a=t[0],n=t[1];return Object(r.jsx)("div",{className:"wrapper",children:Object(r.jsx)("nav",{id:"sidebar",children:Object(r.jsxs)("ul",{className:"list-unstyled components",children:[Object(r.jsx)("li",{className:0===a?"active":"",children:Object(r.jsx)(l.b,{to:"/solving/home",onClick:function(){return n(0)},children:Object(r.jsx)("i",{className:"fa fa-home reg-icon","aria-hidden":"true"})})}),Object(r.jsx)("li",{className:1===a?"active":"",children:Object(r.jsx)(l.b,{to:"/solving/user",onClick:function(){return n(1)},children:Object(r.jsx)("i",{className:"fa fa-address-card-o reg-icon","aria-hidden":"true"})})}),Object(r.jsx)("li",{className:2===a?"active":"",children:Object(r.jsx)(l.b,{to:"/solving/tasks",onClick:function(){return n(2)},children:Object(r.jsx)("i",{className:"fa fa-tasks reg-icon","aria-hidden":"true"})})}),Object(r.jsx)("li",{children:Object(r.jsx)(l.b,{to:"",onClick:function(){fetch("http://".concat(d,"/logout"),{method:"GET"}),document.location.replace("http://".concat(d,"/logout"))},children:Object(r.jsx)("i",{className:"fa fa-sign-out reg-icon"})})})]})})})},j=a(10),b=a(4),O=a(2),m=a(8),f=a(3),h=a.n(f),x=a(9),v=a(6),g=a(29),N=document.location.host;function y(e){return k.apply(this,arguments)}function k(){return(k=Object(x.a)(h.a.mark((function e(t){var a,n,r,s,c,i,o,u=arguments;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=u.length>1&&void 0!==u[1]?u[1]:{},n=a.body,r=Object(g.a)(a,["body"]),s={"Content-Type":"application/json"},c=Object(O.a)(Object(O.a)({method:n?"POST":"GET"},r),{},{headers:Object(O.a)(Object(O.a)({},s),r.headers)}),n&&(c.body=JSON.stringify(n)),e.prev=4,e.next=7,window.fetch("http://".concat(N,"/").concat(t),c);case 7:if(401!==(o=e.sent).status){e.next=12;break}return window.location.assign(window.location),e.abrupt("return");case 12:return e.next=14,o.json();case 14:if(i=e.sent,!o.ok){e.next=17;break}return e.abrupt("return",i);case 17:throw new Error(o.statusText);case 20:return e.prev=20,e.t0=e.catch(4),e.abrupt("return",Promise.reject(e.t0.message?e.t0.message:i));case 23:case"end":return e.stop()}}),e,null,[[4,20]])})))).apply(this,arguments)}y.get=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return y(e,Object(O.a)(Object(O.a)({},t),{},{method:"GET"}))},y.post=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return y(e,Object(O.a)(Object(O.a)({},a),{},{body:t,method:"POST"}))},y.delete=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return y(e,Object(O.a)(Object(O.a)({},t),{},{method:"DELETE"}))},y.put=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return y(e,Object(O.a)(Object(O.a)({},a),{},{body:t,method:"PUT"}))};var S,T,w,I,C=Object(v.createEntityAdapter)({selectId:function(e){return e._id}}),D=Object(v.createAsyncThunk)("tasks/fetchTasksByTechnician",function(){var e=Object(x.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.get("api/tasks/technician/".concat(t));case 2:return a=e.sent,e.abrupt("return",a.tasks);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),M=Object(v.createAsyncThunk)("tasks/addNewTask",function(){var e=Object(x.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.post("api/tasks",{task:t});case 2:return a=e.sent,e.abrupt("return",a.task);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),E=Object(v.createAsyncThunk)("tasks/updateTask",function(){var e=Object(x.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.put("api/tasks/".concat(t._id),{task:t});case 2:return a=e.sent,e.abrupt("return",a.task);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),F=C.getInitialState({status:"idle",error:null}),A=Object(v.createSlice)({name:"reports",initialState:F,reducers:{},extraReducers:(n={},Object(b.a)(n,D.pending,(function(e,t){e.status="loading"})),Object(b.a)(n,D.fulfilled,(function(e,t){e.status="succeeded",C.upsertMany(e,t.payload)})),Object(b.a)(n,D.rejected,(function(e,t){e.status="failed"})),Object(b.a)(n,M.fulfilled,(function(e,t){return C.addOne(e,t.payload)})),Object(b.a)(n,E.fulfilled,(function(e,t){return C.updateOne(e,{id:t.payload._id,changes:t.payload})})),n)}),_=C.getSelectors((function(e){return e.tasks})),P=_.selectAll,R=(_.selectIds,_.selectById),B=A.reducer,L=Object(v.createEntityAdapter)({selectId:function(e){return e._id}}),U=Object(v.createAsyncThunk)("employees/fetchEmployees",Object(x.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.get("api/employees");case 2:return t=e.sent,e.abrupt("return",t.employees);case 4:case"end":return e.stop()}}),e)})))),q=Object(v.createAsyncThunk)("employees/addNewEmployee",function(){var e=Object(x.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.post("api/employees",{employee:t});case 2:return a=e.sent,e.abrupt("return",a.employee);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),G=Object(v.createAsyncThunk)("employees/updateEmployee",function(){var e=Object(x.a)(h.a.mark((function e(t,a){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.put("api/employees/".concat(a),{employee:t});case 2:return n=e.sent,e.abrupt("return",n.emloyee);case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),J=(Object(v.createAsyncThunk)("employees/updateEmployee",function(){var e=Object(x.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.get("api/employees/".concat(t));case 2:return a=e.sent,e.abrupt("return",a.emloyee);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),function(){var e=Object(x.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.get("api/employees/email/check?email=".concat(t));case 2:return a=e.sent,e.abrupt("return",a.error);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Y=L.getInitialState({status:"idle",error:null}),W=Object(v.createSlice)({name:"employees",initialState:Y,reducers:{},extraReducers:(S={},Object(b.a)(S,U.pending,(function(e,t){e.status="loading"})),Object(b.a)(S,U.fulfilled,(function(e,t){e.status="succeeded",L.upsertMany(e,t.payload)})),Object(b.a)(S,U.rejected,(function(e,t){e.status="failed",e.error=t.error.message})),Object(b.a)(S,q.fulfilled,L.addOne),Object(b.a)(S,G.fulfilled,L.updateOne),S)}),X=L.getSelectors((function(e){return e.employees})),$=(X.selectAll,X.selectById,X.selectEntities,W.actions.addNewEmp,W.reducer,Object(v.createEntityAdapter)({selectId:function(e){return e._id}})),z=Object(v.createAsyncThunk)("reports/fetchReports",Object(x.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.get("api/reports");case 2:return t=e.sent,e.abrupt("return",t.reports);case 4:case"end":return e.stop()}}),e)})))),H=Object(v.createAsyncThunk)("reports/deleteReport",function(){var e=Object(x.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.delete("api/reports/".concat(t));case 2:return a=e.sent,e.abrupt("return",a.report);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),K=Object(v.createAsyncThunk)("reports/addNewReport",function(){var e=Object(x.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.post("api/reports",{report:t});case 2:return a=e.sent,e.abrupt("return",a.report);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Q=$.getInitialState({status:"idle",error:null,filters:{}}),V=Object(v.createSlice)({name:"reports",initialState:Q,reducers:{},extraReducers:(T={},Object(b.a)(T,z.pending,(function(e,t){e.status="loading"})),Object(b.a)(T,z.fulfilled,(function(e,t){e.status="succeeded",$.upsertMany(e,t.payload)})),Object(b.a)(T,z.rejected,(function(e,t){e.status="failed"})),Object(b.a)(T,K.fulfilled,(function(e,t){return $.addOne(e,t.payload)})),Object(b.a)(T,H.fulfilled,(function(e,t){return $.removeOne(e,t.payload._id)})),T)}),Z=$.getSelectors((function(e){return e.reports})),ee=Z.selectAll,te=(Z.selectIds,Z.selectById,Z.selectEntities,V.reducer),ae=function(e){var t=e.task,a=e.setCurrentTaskId;return Object(r.jsxs)("tr",{onContextMenu:function(e){a(t._id)},"data-toggle":"modal","data-target":"#exampleModal",className:-1===t.status?"bg-warning":"",children:[Object(r.jsx)("td",{children:t.reportTitle}),Object(r.jsx)("td",{children:t.deviceName}),Object(r.jsx)("td",{children:t.taskName}),Object(r.jsx)("td",{children:-1===t.status?Object(r.jsx)("span",{className:"badge badge-fill badge-danger",children:"Denied"}):0===t.status?Object(r.jsx)("span",{className:"badge badge-fill badge-primary",children:"Solving"}):1===t.status?Object(r.jsx)("span",{className:"badge badge-fill badge-success",children:"Finish"}):""}),Object(r.jsx)("td",{children:Object(r.jsx)("span",{className:"progress",children:Object(r.jsx)("span",{className:"progress-bar progress-bar-striped bg-danger",role:"progressbar",style:{width:"".concat(t.progress,"%")},"aria-valuenow":t.progress,"aria-valuemin":"0","aria-valuemax":"100",children:t.progress})})})]},t._id)},ne=function(e){var t=e.currentTaskId,a=e.taskModal,n=e.setTaskModal,c=Object(m.c)((function(e){return R(e,t)})),i=Object(m.c)((function(e){return e.user.user})),o=Object(m.b)(),l=Object(s.useState)(c.progress),d=Object(u.a)(l,2),p=d[0],j=d[1],b=Object(s.useState)(!1),f=Object(u.a)(b,2),h=f[0],x=f[1],v=Object(s.useState)(c.solution?c.solution:{solutionName:"",detail:""}),g=Object(u.a)(v,2),N=g[0],y=g[1],k=Object(s.useState)(!1),S=Object(u.a)(k,2),T=S[0],w=S[1],I=Object(s.useState)(!1),C=Object(u.a)(I,2),D=C[0],M=C[1],F=Object(r.jsxs)("div",{children:[Object(r.jsxs)("div",{className:"input-group mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepand",children:Object(r.jsx)("span",{className:"input-group-text",children:"Solution Name"})}),Object(r.jsx)("input",{type:"text",className:"form-control",name:"technicianName",id:"technicianName","aria-describedby":"helpId",placeholder:"",value:N.solutionName,onChange:function(e){return y(Object(O.a)(Object(O.a)({},N),{},{solutionName:e.target.value}))}}),Object(r.jsx)("div",{className:"input-group-append"})]}),Object(r.jsxs)("div",{className:"form-group mb-2",children:[Object(r.jsx)("span",{children:"Solution Detail"}),Object(r.jsx)("textarea",{type:"text",className:"form-control",name:"technicianName",id:"technicianName","aria-describedby":"helpId",placeholder:"",value:N.detail,onChange:function(e){return y(Object(O.a)(Object(O.a)({},N),{},{detail:e.target.value}))}}),Object(r.jsx)("div",{className:"input-group-append"})]})]});Object(s.useEffect)((function(){j(c.progress)}),[c]);var A=function(){if(!c.taskName)return!1;if(!c.technician)return!1;if(p>99){if(!N.solutionName)return!1;if(!N.detail)return!1}return!0};Object(s.useEffect)((function(){x(A)}),[A]);var _=Object(r.jsxs)("button",{type:"button",className:"btn btn-danger",onClick:function(){M(!0),o(E(Object(O.a)(Object(O.a)({},c),{},{progress:p,status:-1}))).then((function(){M(!1)})).catch((function(e){M(!1),alert(e)}))},children:[D?Object(r.jsx)("i",{className:"fa fa-circle-o-notch fa-spin"}):"","\xa0Deny"]});return Object(r.jsxs)("div",{children:[Object(r.jsxs)("div",{className:"modal-body",children:[Object(r.jsxs)("div",{className:"input-group mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepand",children:Object(r.jsx)("span",{className:"input-group-text",children:"Technician Name"})}),Object(r.jsx)("input",{type:"text",className:"form-control",name:"technicianName",id:"technicianName","aria-describedby":"helpId",placeholder:"",readOnly:"readOnly",value:i.name})]}),Object(r.jsxs)("div",{className:"input-group mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepand",children:Object(r.jsx)("span",{className:"input-group-text",children:"Task Name"})}),Object(r.jsx)("input",{type:"text",className:"form-control",name:"taskName",id:"taskName","aria-describedby":"helpId",placeholder:"",readOnly:"readOnly",value:c.taskName})]}),Object(r.jsxs)("div",{className:"form-group mb-2",children:[Object(r.jsx)("span",{children:"Detail"}),Object(r.jsx)("textarea",{type:"text",className:"form-control",name:"technicianName",id:"detail","aria-describedby":"helpId",placeholder:"",readOnly:"readOnly",value:c.detail}),Object(r.jsx)("div",{className:"input-group-append"})]}),Object(r.jsxs)("div",{className:"input-group mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepand",children:Object(r.jsx)("span",{className:"input-group-text",children:"Task Status"})}),Object(r.jsx)("span",{className:"input-group-text",children:-1===c.status?Object(r.jsx)("span",{className:"badge badge-fill badge-danger",children:"Denied"}):0===c.status?Object(r.jsx)("span",{className:"badge badge-fill badge-primary",children:"Solving"}):1===c.status?Object(r.jsx)("span",{className:"badge badge-fill badge-success",children:"Finish"}):""})]}),Object(r.jsxs)("div",{className:"input-group mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepend",children:Object(r.jsx)("span",{className:"input-group-text",children:"Progress"})}),Object(r.jsx)("input",{type:"number",name:"",id:"input",style:{width:"50px"},value:p,min:0,max:100,step:1,required:"required",title:"",onChange:function(e){e.target.value<=100&&-1!==c.status&&j(e.target.value)}})]}),Object(r.jsx)("div",{className:"progress mb-2",children:Object(r.jsxs)("div",{className:"progress-bar",role:"progressbar","aria-valuenow":p,style:{width:"".concat(p,"%")},"aria-valuemin":"0","aria-valuemax":"100",children:[p,"%"]})}),p>99?F:""]}),Object(r.jsxs)("div",{className:"modal-footer",children:[Object(r.jsx)("button",{type:"button",className:"btn btn-secondary","data-dismiss":"modal",onClick:function(){n(Object(O.a)(Object(O.a)({},a),{},{isDisplay:!1}))},children:"Close"}),0===c.status&&p<100?_:"","\xa0",Object(r.jsxs)("button",{type:"button",className:"btn btn-primary",onClick:function(){w(!0),o(E(Object(O.a)(Object(O.a)({},c),{},{progress:p,solution:N,status:p>99?1:0}))).then((function(){w(!1)})).catch((function(e){w(!1),alert(e)}))},disabled:!h||-1===c.status,children:[T?Object(r.jsx)("i",{className:"fa fa-circle-o-notch fa-spin"}):"","\xa0Save"]})]})]})},re=function(e){var t=e.taskModal,a=e.setTaskModal,n=e.currentTaskId;return Object(r.jsx)("div",{className:"modal fade show",style:{display:"block"},id:"taskModal",tabIndex:"-1",role:"dialog","aria-labelledby":"taskModalTitle","aria-hidden":"true",onClick:function(e){!function(e){var n=e.clientX,r=e.clientY,s=document.getElementById("taskModalContent").getBoundingClientRect();(n<s.left||n>s.right||r<s.top||r>s.bottom)&&a(Object(O.a)(Object(O.a)({},t),{},{isDisplay:!1}))}(e)},children:Object(r.jsx)("div",{className:"modal-dialog",role:"document",children:Object(r.jsxs)("div",{className:"modal-content",id:"taskModalContent",children:[Object(r.jsxs)("div",{className:"modal-header",children:[Object(r.jsx)("h5",{className:"modal-title",id:"taskModalTitle",children:"Modal title"}),Object(r.jsx)("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close",onClick:function(){a(Object(O.a)(Object(O.a)({},t),{},{isDisplay:!1}))},children:Object(r.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]}),Object(r.jsx)(ne,{taskModal:t,setTaskModal:a,currentTaskId:n})]})})})},se=function(e){var t=e.taskToolkit,a=e.setTaskToolkit,n=e.setTaskModal,s=e.taskModal;return Object(r.jsxs)("span",{className:"menu-toolbar",style:{top:t.top,left:t.left,display:t.isDisplay?"block":"none"},children:[Object(r.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(){a(Object(O.a)(Object(O.a)({},t),{},{isDisplay:!1})),n(Object(O.a)(Object(O.a)({},s),{},{isDisplay:!0,taskModalOption:1}))},children:Object(r.jsx)("i",{className:"fa fa-pencil-square-o reg-icon","aria-hidden":"true"})}),"\xa0",Object(r.jsx)("button",{type:"button",className:"btn btn-danger",onClick:function(){a(Object(O.a)(Object(O.a)({},t),{},{isDisplay:!1})),n(Object(O.a)(Object(O.a)({},s),{},{isDisplay:!0,taskModalOption:-1}))},children:Object(r.jsx)("i",{className:"fa fa-trash reg-icon","aria-hidden":"true"})})]})},ce=Object(v.createAsyncThunk)("user/fetchUser",function(){var e=Object(x.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.get("api/employees/".concat(t));case 2:return a=e.sent,e.abrupt("return",a.employee);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ie=Object(v.createAsyncThunk)("user/updateUser",function(){var e=Object(x.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.put("api/employees/".concat(t._id),{employee:t});case 2:return a=e.sent,e.abrupt("return",a.employee);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),oe=Object(v.createSlice)({name:"user",initialState:{user:{},status:"idle",error:null},reducers:{userUpdated:function(e,t){return t.payload}},extraReducers:(w={},Object(b.a)(w,ce.fulfilled,(function(e,t){e.user=t.payload,e.status="succeeded"})),Object(b.a)(w,ce.pending,(function(e,t){e.status="loading"})),Object(b.a)(w,ce.rejected,(function(e,t){e.status="failed"})),Object(b.a)(w,ie.fulfilled,(function(e,t){e.user=t.payload})),w)}),ue=(oe.actions.userUpdated,function(e){return e.user.user}),le=oe.reducer,de=a(6),pe=de.createSlice,je=de.createEntityAdapter,be=de.createAsyncThunk,Oe=je({selectId:function(e){return e._id}}),me=(be("devices/fetchDevicesByEmployeesId",function(){var e=Object(x.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=y.get("api/employees/".concat(t,"/devices")),e.abrupt("return",a.devices);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),be("devices/fetchDevices",Object(x.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.get("api/devices");case 2:return t=e.sent,e.abrupt("return",t.devices);case 4:case"end":return e.stop()}}),e)}))))),fe=pe({name:"devices",initialState:Oe.getInitialState({status:"idle",error:null}),reducers:{},extraReducers:(I={},Object(b.a)(I,me.pending,(function(e,t){e.status="loading"})),Object(b.a)(I,me.rejected,(function(e,t){e.status="failed"})),Object(b.a)(I,me.fulfilled,(function(e,t){e.status="succeeded",Oe.upsertMany(e,t.payload)})),I)}),he=Oe.getSelectors((function(e){return e.devices})),xe=he.selectAll,ve=(he.selectById,fe.reducer),ge=function(e){var t=e.filters,a=e.updateFilters,n=function(e){var t=e.target.name,n=e.target.value;a(t,n)};return Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:Object(r.jsx)("input",{type:"text",className:"form-control",name:"reportTitleFilter",id:"reportTitleFilter","aria-describedby":"helpId",placeholder:"searching id",value:t.reportTitleFilter,onChange:function(e){return n(e)}})}),Object(r.jsx)("td",{children:Object(r.jsx)("input",{type:"text",className:"form-control",name:"deviceNameFilter",id:"deviceNameFilter","aria-describedby":"helpId",placeholder:"searching name",value:t.deviceNameFilter,onChange:function(e){return n(e)}})}),Object(r.jsx)("td",{children:Object(r.jsx)("input",{type:"text",className:"form-control",name:"taskNameFilter",id:"taskNameFilter","aria-describedby":"helpId",placeholder:"searching phone",value:t.taskNameFilter,onChange:function(e){return n(e)}})}),Object(r.jsx)("td",{children:Object(r.jsxs)("select",{className:"form-control",name:"tasksStatusFilter",id:"tasksStatusFilter",value:t.tasksStatusFilter,onChange:function(e){return n(e)},children:[Object(r.jsx)("option",{value:-2,children:"all"}),Object(r.jsx)("option",{value:-1,children:"denied"}),Object(r.jsx)("option",{value:0,children:"solving"}),Object(r.jsx)("option",{value:1,children:"finish"})]})}),Object(r.jsx)("td",{})]})},Ne=function(e){var t=e.title,a=e.sortName,n=e.setSortOrder,c=e.sortOrder,i=Object(s.useState)(!1),o=Object(u.a)(i,2),l=o[0],d=o[1];return Object(r.jsxs)("th",{onMouseOver:function(e){return d(!0)},onMouseOut:function(e){return d(!1)},onClick:function(){n(a,c<1?c+1:-1)},children:[Object(r.jsx)("span",{style:{float:"left"},children:t}),l?Object(r.jsx)("span",{className:"sorter",style:{float:"right",color:"darksalmon"},children:-1===c?Object(r.jsx)("i",{className:"fa fa-sort-desc"}):1===c?Object(r.jsx)("i",{className:"fa fa-sort-asc"}):Object(r.jsx)("i",{class:"fa fa-random","aria-hidden":"true"})}):""]})},ye=document.cookie.split(";").map((function(e){return e.split("=")})).reduce((function(e,t){var a=Object(u.a)(t,2),n=a[0],r=a[1];return Object(O.a)(Object(O.a)({},e),{},Object(b.a)({},n.trim(),decodeURIComponent(r)))}),{}),ke=function(){var e,t=Object(m.b)(),a=Object(m.c)(P),n=Object(m.c)(xe),c=Object(m.c)(ee),i=Object(m.c)((function(e){return e.user.status})),o=Object(m.c)((function(e){return e.tasks.status})),l=Object(m.c)((function(e){return e.reports.status})),d=Object(m.c)((function(e){return e.devices.status})),p=Object(m.c)((function(e){return e.tasks.error})),j=Object(s.useState)(""),f=Object(u.a)(j,2),h=f[0],x=f[1],v=Object(s.useState)({reportTitleFilter:"",deviceNameFilter:"",taskNameFilter:"",tasksStatusFilter:-2}),g=Object(u.a)(v,2),N=g[0],y=g[1],k=Object(s.useState)({reportTitleSorter:0,deviceNameSorter:0,taskNameSorter:0,taskStatusSorter:0,taskProgressSorter:0}),S=Object(u.a)(k,2),T=S[0],w=S[1],I=function(e,t){w(Object(b.a)({reportTitleSorter:0,deviceNameSorter:0,taskNameSorter:0,taskStatusSorter:0,taskProgressSorter:0},e,t))};Object(s.useEffect)((function(){"idle"===i&&t(ce(ye.loadingToken))}),[i]),Object(s.useEffect)((function(){"idle"===d&&t(me())}),[d]),Object(s.useEffect)((function(){"idle"===l&&t(z())}),[l]),Object(s.useEffect)((function(){"idle"===o&&t(D(ye.loadingToken))}),[o]);var C=Object(s.useState)(!1),M=Object(u.a)(C,2),E=M[0],F=M[1],A=Object(s.useState)(),_=Object(u.a)(A,2),R=_[0],B=_[1];Object(s.useEffect)((function(){F(!0)}),[a]),"loading"===o||"loading"===l||"loading"===i?e=Object(r.jsx)("tr",{className:"spinner-border text-primary",style:{width:100,height:100}}):"failed"===o||"failed"===l||"failed"===i?e=Object(r.jsx)("tr",{children:p}):"succeeded"===o&&"succeeded"===l&&"succeeded"===i&&E&&(B(a.map((function(e){return Object(O.a)(Object(O.a)({},e),{},{reportTitle:c.find((function(t){return t._id===e.report})).title,deviceName:n.find((function(t){return t._id===c.find((function(t){return t._id===e.report})).device})).deviceName})}))),F(!1));var L=Object.assign([],R);N.reportTitleFilter&&(L=L.filter((function(e){return-1!==e.reportTitle.toLowerCase().indexOf(N.reportTitleFilter.toLowerCase())}))),N.deviceNameFilter&&(L=L.filter((function(e){return-1!==e.deviceName.toLowerCase().indexOf(N.deviceNameFilter.toLowerCase())}))),N.taskTitleFilter&&(L=L.filter((function(e){return-1!==e.taskName.toLowerCase().indexOf(N.taskTitleFilter.toLowerCase())}))),-2!==parseInt(N.tasksStatusFilter)&&(L=L.filter((function(e){return e.status===parseInt(N.tasksStatusFilter)}))),0!==T.deviceNameSorter&&(L=L.sort((function(e,t){return e.deviceName===t.deviceName?0:e.deviceName>t.deviceName?T.deviceNameSorter:-T.deviceNameSorter}))),0!==T.reportTitleSorter&&(L=L.sort((function(e,t){return e.reportTitle===t.reportTitle?0:e.reportTitle>t.reportTitle?T.reportTitleSorter:-T.reportTitleSorter}))),0!==T.taskNameSorter&&(L=L.sort((function(e,t){return e.taskName===t.taskName?0:e.taskName>t.taskName?T.taskNameSorter:-T.taskNameSorter}))),0!==T.taskStatusSorter&&(L=L.sort((function(e,t){return e.status===t.status?0:e.status>t.status?T.taskStatusSorter:-T.taskStatusSorter}))),0!==T.taskProgressSorter&&(L=L.sort((function(e,t){return e.progress===t.progress?0:e.progress>t.progress?T.taskProgressSorter:-T.taskProgressSorter}))),R&&(e=L.map((function(e){return Object(r.jsx)(ae,{setCurrentTaskId:x,task:e},e._id)})));var U=Object(s.useState)({isDisplay:!1,currentTaskId:"",taskModalOption:1}),q=Object(u.a)(U,2),G=q[0],J=q[1],Y=Object(s.useState)({top:0,left:0,isDisplay:!1}),W=Object(u.a)(Y,2),X=W[0],$=W[1];return Object(r.jsxs)("div",{className:G.isDisplay?"modal-open container-fluid":"container-fluid",children:[G.isDisplay?Object(r.jsx)(re,{setTaskModal:J,taskModal:G,currentTaskId:h}):"",X.isDisplay?Object(r.jsx)(se,{taskToolkit:X,setTaskToolkit:$,setTaskModal:J}):"",Object(r.jsx)("h3",{className:"text-center",children:"Tasks Management"}),Object(r.jsx)("div",{className:"row justify-content-center",children:Object(r.jsx)("div",{className:"col-xs-12 col-sm-12 col-md-12 col-lg-11",children:Object(r.jsxs)("table",{className:"table table-bordered table-hover",children:[Object(r.jsxs)("thead",{className:"thead-dark",children:[Object(r.jsxs)("tr",{children:[Object(r.jsx)(Ne,{title:"Report",sortName:"reportTitleSorter",sortOrder:T.reportTitleSorter,setSortOrder:I}),Object(r.jsx)(Ne,{title:"Device",sortName:"deviceNameSorter",sortOrder:T.deviceNameSorter,setSortOrder:I}),Object(r.jsx)(Ne,{title:"Task",sortName:"taskNameSorter",sortOrder:T.taskNameSorter,setSortOrder:I}),Object(r.jsx)(Ne,{title:"Task Status",sortName:"taskStatusSorter",sortOrder:T.taskStatusSorter,setSortOrder:I}),Object(r.jsx)(Ne,{title:"Task Progress",sortName:"taskProgressSorter",sortOrder:T.taskProgressSorter,setSortOrder:I})]}),Object(r.jsx)(ge,{filters:N,updateFilters:function(e,t){y(Object(O.a)(Object(O.a)({},N),{},Object(b.a)({},e,t)))}})]}),Object(r.jsx)("tbody",{onMouseMove:function(e){X.isDisplay&&$(Object(O.a)(Object(O.a)({},X),{},{isDisplay:!1}))},onContextMenu:function(e){return function(e){e.preventDefault(),$({left:e.clientX,top:e.clientY-35,isDisplay:!0})}(e)},children:e||""})]})})})]})},Se=(a(26),document.cookie.split(";").map((function(e){return e.split("=")})).reduce((function(e,t){var a=Object(u.a)(t,2),n=a[0],r=a[1];return Object(O.a)(Object(O.a)({},e),{},Object(b.a)({},n.trim(),decodeURIComponent(r)))}),{})),Te=function(e){var t=Object(m.c)(ue),a=Object(m.c)((function(e){return e.user.status})),n=Object(s.useState)(-1),c=Object(u.a)(n,2),i=c[0],o=c[1],l=Object(s.useState)({_id:"",name:"",address:"",email:"",phoneNumber:"",birthDate:"",position:""}),d=Object(u.a)(l,2),p=d[0],j=d[1],f=Object(s.useState)(!1),h=Object(u.a)(f,2),x=h[0],v=h[1],g=Object(s.useState)({nameInputStatus:!0,addressInputStatus:!0,phoneNumberInputStatus:!0,emailInputStatus:!0,birthDateInputState:!0}),N=Object(u.a)(g,2),y=N[0],k=N[1],S=Object(s.useState)(!0),T=Object(u.a)(S,2),w=T[0],I=T[1],C=Object(m.b)();Object(s.useEffect)((function(){"idle"===a&&C(ce(Se.loadingToken)),"succeeded"===a&&(j(t),o(0))}),[C,t,a]),Object(s.useEffect)((function(){0!==p.email.localeCompare(t.email)&&0===i&&o(1)}),[p.email]);var D=function(){k({nameInputStatus:!0,addressInputStatus:!0,phoneNumberInputStatus:!0,emailInputStatus:!0,birthDateInputState:!0})},M=function(e){var t=e.target.name,a=e.target.value;"birthDate"===t&&j(Object(O.a)(Object(O.a)({},p),{},{birthDate:a.toLocaleString()})),j(Object(O.a)(Object(O.a)({},p),{},Object(b.a)({},t,a)))};return Object(r.jsxs)("div",{className:"card",children:[Object(r.jsx)("div",{className:"card-header",children:"Your usermation"}),Object(r.jsxs)("div",{className:"card-body",children:[Object(r.jsxs)("div",{className:"input-group flex-nowrap mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepend",children:Object(r.jsx)("span",{className:"input-group-text",id:"addon-wrapping",children:"ID"})}),Object(r.jsx)("input",{type:"text",className:"form-control",id:"_id",name:"_id",readOnly:!0,value:p._id,"aria-label":"ID"})]}),Object(r.jsxs)("div",{className:"input-group flex-nowrap mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepend",children:Object(r.jsx)("span",{className:"input-group-text",children:"Name"})}),Object(r.jsx)("input",{type:"text",className:"form-control","aria-label":"Name",id:"name",name:"name",readOnly:y.nameInputStatus,onDoubleClick:function(){k(Object(O.a)(Object(O.a)({},y),{},{nameInputStatus:!y.nameInputStatus}))},value:p.name,onChange:function(e){return M(e)}}),Object(r.jsx)("div",{className:"input-group-appennd",children:Object(r.jsx)("i",{className:"fa fa-pencil  input-group-text reg-icon","aria-hidden":"true",onClick:function(){k(Object(O.a)(Object(O.a)({},y),{},{nameInputStatus:!y.nameInputStatus}))}})})]}),Object(r.jsxs)("div",{className:"input-group flex-nowrap mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepend",children:Object(r.jsx)("label",{className:"input-group-text",children:"Adress"})}),Object(r.jsx)("input",{type:"text",className:"form-control ",id:"address",name:"address",readOnly:y.addressInputStatus,onDoubleClick:function(){return k(Object(O.a)(Object(O.a)({},y),{},{addressInputStatus:!y.addressInputStatus}))},value:p.address,onChange:function(e){return M(e)}}),Object(r.jsx)("div",{className:"input-group-appennd",children:Object(r.jsx)("i",{className:"fa fa-pencil input-group-text reg-icon","aria-hidden":"true",onClick:function(){k(Object(O.a)(Object(O.a)({},y),{},{addressInputStatus:!y.addressInputStatus}))}})})]}),Object(r.jsxs)("div",{className:"input-group mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepend",children:Object(r.jsx)("label",{className:"input-group-text",children:"Phone"})}),Object(r.jsx)("input",{type:"text",className:"form-control ",id:"phoneNumber",name:"phoneNumber",readOnly:y.phoneNumberInputStatus,onDoubleClick:function(){return k(Object(O.a)(Object(O.a)({},y),{},{phoneNumberInputStatus:!y.phoneNumberInputStatus}))},value:p.phoneNumber,onChange:function(e){return M(e)}}),Object(r.jsx)("div",{className:"input-group-append",children:Object(r.jsx)("i",{className:"fa fa-pencil input-group-text reg-icon","aria-hidden":"true",onClick:function(){k(Object(O.a)(Object(O.a)({},y),{},{phoneNumberInputStatus:!y.phoneNumberInputStatus}))}})})]}),Object(r.jsxs)("div",{className:"input-group mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepend",children:Object(r.jsx)("label",{className:"input-group-text",children:"Email"})}),Object(r.jsx)("input",{type:"text",className:"form-control ",id:"email",name:"email",readOnly:y.emailInputStatus,onDoubleClick:function(){return k(Object(O.a)(Object(O.a)({},y),{},{emailInputStatus:!y.emailInputStatus}))},value:p.email,onChange:function(e){return M(e)}}),Object(r.jsx)("div",{className:"input-group-append",children:Object(r.jsx)("i",{className:"fa fa-pencil input-group-text reg-icon","aria-hidden":"true",onClick:function(){return k(Object(O.a)(Object(O.a)({},y),{},{emailInputStatus:!y.emailInputStatus}))}})})]}),Object(r.jsxs)("div",{className:"input-group mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepend",children:Object(r.jsx)("label",{className:"input-group-text",children:"BirthDate:"})}),Object(r.jsx)("input",{type:"date",className:"form-control ",id:"birthDate",name:"birthDate",readOnly:"readOnly",onDoubleClick:function(){k(Object(O.a)(Object(O.a)({},y),{},{birthDateInputState:!y.birthDateInputState}))},value:void 0!==p.birthDate?p.birthDate.substring(0,p.birthDate.indexOf("T")):"",onChange:function(e){return M(e)}})]}),Object(r.jsxs)("div",{className:"input-group mb-2",children:[Object(r.jsx)("div",{className:"input-group-prepend",children:Object(r.jsx)("label",{className:"input-group-text",children:"Position"})}),Object(r.jsx)("input",{type:"text",className:"form-control ",id:"position",name:"position",readOnly:!0,value:p.position})]})]}),Object(r.jsxs)("div",{className:"card-footer text-muted",children:[Object(r.jsxs)("button",{type:"button",className:"btn btn-primary",onClick:function(){v(!0),i?J(p.email).then((function(e){"invalid_email"===e?(v(!1),I(!1),o(0),j(Object(O.a)(Object(O.a)({},p),{},{email:t.email}))):"valid_email"===e&&C(ie(p)).then((function(){v(!1),I(!0),o(0)}))})).catch((function(e){alert(e),I(!1),o(0),j(Object(O.a)(Object(O.a)({},p),{},{email:t.email}))})):C(ie(p)).then((function(){v(!1)})).catch((function(e){return alert(e)})),D()},children:[x?Object(r.jsx)("i",{className:"fa fa-circle-o-notch fa-spin"}):"","\xa0Save"]}),"\xa0",Object(r.jsx)("button",{type:"button",className:"btn btn-warning",onClick:function(){j(t),D(),I(!0)},children:"Cancel"}),"\xa0",w?"":Object(r.jsx)("i",{className:"fa fa-exclamation-triangle",style:{color:"red"},children:" Invalid Email"})]})]})},we=function(){return Object(r.jsxs)("div",{className:"container-fluid",children:[Object(r.jsx)("h3",{className:"text-center",children:"Private Information"}),Object(r.jsx)("div",{className:"row   justify-content-center mt-50",children:Object(r.jsx)("div",{className:"col-xs-12 col-sm-10 col-md-8 col-lg-6",children:Object(r.jsx)(Te,{})})})]})};var Ie=function(){return Object(r.jsxs)(l.a,{children:[Object(r.jsx)(p,{}),Object(r.jsx)("div",{className:"App ",children:Object(r.jsxs)(j.d,{children:[Object(r.jsx)(j.b,{exact:!0,path:"/solving"}),Object(r.jsx)(j.b,{exact:!0,path:"/solving/user",component:we}),Object(r.jsx)(j.b,{exact:!0,path:"/solving/tasks",component:ke}),Object(r.jsx)(j.a,{to:"/solving"})]})})]})},Ce=Object(v.configureStore)({reducer:{user:le,tasks:B,devices:ve,reports:te}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(m.a,{store:Ce,children:Object(r.jsx)(Ie,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[48,1,2]]]);
//# sourceMappingURL=main.9d5ed920.chunk.js.map