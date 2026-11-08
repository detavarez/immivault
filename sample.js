/* ImmiVault test-data generator. Fictional sample data for testing only. */
(function(){
const PEOPLE={
 A:{first:'Carlos',middle:'Andres',last:'Rivera',sex:'M',dob:'1984-03-12',anum:'',ssn:'900123456',uscis:'',birthCity:'Philadelphia',country:'United States'},
 SPOUSE:{first:'Maria',middle:'Elena',last:'Santos',sex:'F',dob:'1990-07-21',anum:'201234567',ssn:'900234567',uscis:'123456789012',birthCity:'Santo Domingo',country:'Dominican Republic'},
 MOTHER:{first:'Rosa',middle:'Maria',last:'Martinez',sex:'F',dob:'1959-11-02',anum:'207654321',ssn:'900345678',uscis:'210987654321',birthCity:'Santiago',country:'Dominican Republic'},
 SIB:{first:'Luis',middle:'Fernando',last:'Ortiz',sex:'M',dob:'1988-05-30',anum:'',ssn:'900456789',uscis:'',birthCity:'Bogota',country:'Colombia'},
 KID1:{first:'Daniel',middle:'Jose',last:'Rivera',sex:'M',dob:'2012-02-14',anum:'',ssn:'900567890',uscis:'',birthCity:'York',country:'United States'},
 KID2:{first:'Sofia',middle:'Isabel',last:'Rivera',sex:'F',dob:'2015-09-03',anum:'',ssn:'900678901',uscis:'',birthCity:'York',country:'United States'},
 FATHER:{first:'Jose',middle:'Luis',last:'Martinez',sex:'M',dob:'1957-04-18',anum:'',ssn:'900789012',uscis:'',birthCity:'Santiago',country:'Dominican Republic'},
 FIANCEE:{first:'Valentina',middle:'Sofia',last:'Herrera',sex:'F',dob:'1992-01-25',anum:'',ssn:'',uscis:'',birthCity:'Medellin',country:'Colombia'},
 LPR:{first:'Miguel',middle:'Angel',last:'Delgado',sex:'M',dob:'1979-08-09',anum:'209876543',ssn:'900890123',uscis:'112233445566',birthCity:'Santo Domingo',country:'Dominican Republic'},
 LPRW:{first:'Carmen',middle:'Luz',last:'Delgado',sex:'F',dob:'1983-12-01',anum:'',ssn:'900901234',uscis:'',birthCity:'Philadelphia',country:'United States'},
 ATT:{first:'Laura',middle:'Beth',last:'Gomez',sex:'F',dob:'1975-06-06',anum:'',ssn:'',uscis:'',birthCity:'York',country:'United States'}
};
const mk=(o,tag)=>Object.assign({},o,{email:(o.first+'.'+o.last+'@example.com').toLowerCase(),phone:'717555'+String(100+(tag||0)).padStart(4,'0')});
const hash=s=>{let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h};
const ADV=/ever|arrest|cite|convict|crime|criminal|offense|fraud|misrepresent|deport|remov|exclu|terror|weapon|persecut|genocid|tortur|drug|smuggl|prostitut|polygam|habitual|traffick|immunity|overstay|unlawful|violat|fail(ed)? to|owe|default|jail|prison|sanction|denied|refused|revoked|unpaid|lied|false|claim(ed)? to be|vote|communis|totalitarian|military|police|insan|disease|mental|deserted|evad|desert|bribe|benefit|public charge|welfare|subsid|withh|abandon/i;
const CHILD=/child|son\b|daughter|kid/i,PARENT=/mother|father|parent/i;

const SCEN={
 fam_spouse:{n:'Family · U.S. citizen petitions spouse (I-130 + I-485 + I-864 + I-765 + I-131)',pkg:'family',quiz:{rel:'spouse',loc:'us',wk:'yes',tv:'yes',atty:'yes',enot:'yes',pay:'card'},A:'A',B:'SPOUSE',kids:['KID1','KID2'],bias:'yes',selfB:true,sel:{marital:'M'},rel:'Spouse'},
 fam_parent:{n:'Family · U.S. citizen petitions mother (I-130 + I-485 + I-864)',pkg:'family',quiz:{rel:'parent',loc:'us',wk:'no',tv:'no',atty:'no',enot:'yes',pay:'ach'},A:'A',B:'MOTHER',kids:['KID1','KID2'],bias:'mix',selfB:true,sel:{marital:'W'},rel:'Mother'},
 fam_sib:{n:'Family · U.S. citizen petitions sibling abroad (I-130 + I-864)',pkg:'family',quiz:{rel:'sibling',loc:'abroad',atty:'yes',enot:'no',pay:'card'},A:'A',B:'SIB',kids:['KID1'],bias:'mix',selfB:true,sel:{marital:'S'},rel:'Brother'},
 nat_5:{n:'Naturalization · 5-year permanent resident (N-400 + G-28 + G-1145 + G-1450)',pkg:'citizen',quiz:{atty:'yes',enot:'yes',pay:'card'},A:'LPR',B:'LPRW',kids:['KID1','KID2'],bias:'yes',sel:{reason:'A',marital:'M'},rel:'Spouse'},
 nat_sp:{n:'Naturalization · 3-year, married to U.S. citizen (N-400 + G-1145 + G-1650)',pkg:'citizen',quiz:{atty:'no',enot:'yes',pay:'ach'},A:'SPOUSE',B:'A',kids:['KID1'],bias:'mix',sel:{reason:'B',marital:'M'},rel:'Spouse'},
 k1:{n:'Fiancé(e) K-1 · U.S. citizen petitions fiancée (I-129F + G-28 + G-1145)',pkg:'fiance',quiz:{atty:'yes',enot:'yes',pay:'none'},A:'A',B:'FIANCEE',kids:['KID1'],bias:'mix',rel:'Fiancée'},
 renew:{n:'Green card renewal (I-90 + G-1145 + G-1450)',pkg:'renew',quiz:{atty:'no',enot:'yes',pay:'card'},A:'LPR',B:'LPRW',kids:['KID1'],bias:'yes',rel:'Spouse'},
 cond:{n:'Remove conditions on marriage green card (I-751 + G-28 + G-1145 + G-1650)',pkg:'conditions',quiz:{atty:'yes',enot:'yes',pay:'ach'},A:'SPOUSE',B:'A',kids:['KID1'],bias:'yes',rel:'Spouse'},
 s_i765:{n:'Single · Work permit (I-765)',form:'i765',A:'SPOUSE',B:'A',kids:['KID1'],bias:'mix',rel:'Spouse'},
 s_n565:{n:'Single · Replace citizenship certificate (N-565)',form:'n565',A:'A',B:'SPOUSE',kids:['KID1','KID2'],bias:'mix',rel:'Spouse'},
 s_n600:{n:'Single · Certificate of citizenship for a child (N-600)',form:'n600',A:'KID1',B:'A',kids:['KID2'],bias:'yes',rel:'Parent'},
 s_i130:{n:'Single · Petition for alien relative (I-130)',form:'i130',A:'A',B:'SPOUSE',kids:['KID1','KID2'],bias:'yes',sel:{marital:'M'},rel:'Spouse'},
 s_i485:{n:'Single · Adjustment of status (I-485)',form:'i485',A:'SPOUSE',B:'A',kids:['KID1'],bias:'mix',sel:{marital:'M'},rel:'Spouse'}
};
const FAM_SELF={i130:'A',i864:'A',g28:'A',g1145:'A',g1450:'A',g1650:'A'};

function ctxFor(scn,fid){
 const A=mk(PEOPLE[scn.A],1),B=mk(PEOPLE[scn.B],2);
 const self=(scn.selfB&&!FAM_SELF[fid])?B:A,other=self===A?B:A;
 return {fid,scn,self,other,A,B,kids:(scn.kids||['KID1']).map((k,i)=>mk(PEOPLE[k],10+i)),att:mk(PEOPLE.ATT,50),mother:mk(PEOPLE.MOTHER,60),father:mk(PEOPLE.FATHER,61),selfIsA:self===A};
}
const OTHER_A=/beneficiar|relative|fianc|spouse|husband|wife|sibling|brother|sister/i;
const OTHER_B=/petitioner|sponsor|spouse|husband|wife|u\.s\. citizen/i;
function who(x,s,cx,idx){
 if(/attorney|representative|preparer|interpreter|accredited/.test(s))return cx.att;
 if(cx.fid==='i130'&&/^[pb][A-Z]/.test(x.k||''))return x.k[0]==='b'?cx.B:cx.A;
 if(CHILD.test(s)&&!/step|childhood/.test(s)&&!/petition(ing)? for/.test(s))return cx.kids[(idx||0)%cx.kids.length];
 if(PARENT.test(s)&&!(cx.fid==='i130'))return /mother/.test(s)?cx.mother:/father/.test(s)?cx.father:((idx||0)%2?cx.mother:cx.father);
 if((cx.selfIsA?OTHER_A:OTHER_B).test(s))return cx.other;
 return cx.self;
}
const dig=v=>String(v).replace(/\D/g,'')||'1';
function textVal(x,cx,idx,sub){
 const en=(x.l&&x.l.en)||'';const s=(en+' '+(x.k||'')).toLowerCase();const i=idx||0;
 const p=who(x,s,cx,idx);let v;
 if(/dateto|date to|\bto \(?(mm|present)|or present|\(present\)/i.test(s)||/(^|_)to$|dateto/i.test(x.k||''))v='Present';
 else if(/family name|last name|surname/.test(s))v=p.last;
 else if(/given name|first name/.test(s))v=p.first;
 else if(/middle/.test(s))v=p.middle;
 else if(/online account|uscis account|elis/.test(s))v=p.uscis||'123456789012';
 else if(/a-number|alien (registration )?number|\ba number|anumber|alien number/.test(s))v=p.anum||'201234567';
 else if(/social security|ssn/.test(s))v=p.ssn||'900123456';
 else if(/e-?mail/.test(s))v=p.email;
 else if(/phone|telephone|mobile|fax/.test(s))v=p.phone;
 else if(/zip/.test(s))v='1740'+(1+i);
 else if(/province|postal/.test(s))return null;
 else if(/city (or town )?of birth|town of birth|birth ?city|place of birth/.test(s))v=p.birthCity;
 else if(/\bcity\b|town/.test(s))v=i%2?'Harrisburg':'York';
 else if(/\bstate\b/.test(s))v='PA';
 else if(/street/.test(s))v=(120+i*41)+' Maple Street';
 else if(/\bapt\b|suite|floor|unit|ste\b/.test(s))v=(2+i)+'B';
 else if(/in care of|care of/.test(s))return null;
 else if(/country (of )?(birth|citizenship|nationality)|nationality|citizen of|birth country|country of cit/.test(s))v=p.country;
 else if(/country/.test(s))v='United States';
 else if(/passport|travel document number/.test(s))v='P'+(1234567+i);
 else if(/i-94|arrival.?departure/.test(s))v='12345678901';
 else if(/receipt/.test(s))v='EAC2090123456';
 else if(/bar number/.test(s))v='1234567';
 else if(/licensing|state of (admission|bar)|jurisdiction/.test(s))v='Pennsylvania';
 else if(/organization|employer|business|company|firm|agency|school|institution/.test(s))v=['Keystone Logistics LLC','York Community Bakery','Penn State Health'][i%3];
 else if(/occupation|job title|position|title/.test(s))v=['Warehouse supervisor','Baker','Medical assistant'][i%3];
 else if(/relationship/.test(s))v=cx.scn.rel||'Spouse';
 else if(/language/.test(s))v='Spanish';
 else if(/income|amount|fee|salary|wage|dollars|\$|value|assets/.test(s))v='45000';
 else if(/height|inches/.test(s))v='8';
 else if(/name/.test(s))v='Sample Name';
 else if(/number|no\./.test(s))v='1234567';
 else v='Sample entry';
 if(x.dg)v=dig(v);
 if(x.d&&x.up&&!x.fuzzy)v='PA';
 if(x.fuzzy)v='Philadelphia';
 return v;
}
function dateVal(x,cx,idx){
 const en=(x.l&&x.l.en)||'';const s=(en+' '+(x.k||'')).toLowerCase();const i=idx||0;const p=who(x,s,cx,idx);
 if(/birth/.test(s))return p.dob;
 if(/marri|wedding/.test(s))return '2015-06-20';
 if(/expir|valid until|expiration/.test(s))return '2028-12-31';
 if(/issue/.test(s))return '2019-01-15';
 if(/permanent resident|resident since|admission|adjust|entry|arriv|entered|admitted/.test(s))return '2012-09-10';
 if(/sign|today|request/.test(s))return '2026-11-05';
 if(/\bto\b|end|until|left|through/.test(s))return (2020+i)+'-12-31';
 if(/from|start|began|since/.test(s))return (2016+i)+'-01-01';
 return '2019-06-15';
}
const first=(arr)=>arr.find(o=>o[0]!=='')||arr[0];
function selVal(x,cx,idx){
 const opts=OPT[x.opts]||[];if(!opts.length)return '';
 const sel=cx.scn.sel||{};
 for(const k of Object.keys(sel)){if(new RegExp(k,'i').test(x.k||'')&&opts.some(o=>o[0]===sel[k]))return sel[k]}
 const s=((x.l&&x.l.en)||'')+' '+(x.k||'');
 if(/sex|gender/i.test(s)){const p=who(x,s.toLowerCase(),cx,idx);if(opts.some(o=>o[0]===p.sex))return p.sex}
 if(/\bstate\b/i.test(s)&&opts.some(o=>o[0]==='PA'))return 'PA';
 if(/marital/i.test(s)&&opts.some(o=>o[0]==='M'))return 'M';
 return first(opts)[0];
}
function yn(x,cx){
 const R=(FD.RISK||[]).find(r=>'q_'+r.id===x.k);if(R)return R.adv==='yes'?'no':'yes';
 const s=((x.l&&x.l.en)||'')+' '+(x.k||'');
 if(/mailing.*same|same.*mailing|same as/i.test(s))return 'yes';
 if(ADV.test(s))return 'no';
 if(cx.scn.bias==='yes')return 'yes';
 return hash(cx.fid+x.k)%2?'yes':'no';
}
function fillOne(c,x,path,cx,idx){
 const a=AN(c);const cur=getVal(a,path);
 if(!isEmpty(cur))return;
 let v;
 switch(x.type){
  case 'yesno':v=yn(x,cx);break;
  case 'select':v=selVal(x,cx,idx);break;
  case 'multi':{const o=OPT[x.opts]||[];if(!o.length)return;const w=o.find(q=>q[0]==='W');v=[(w||first(o))[0]];break}
  case 'date':v=dateVal(x,cx,idx);break;
  case 'number':v=/weight/i.test(x.k+(x.l&&x.l.en))?'165':/times|how many|number of/i.test(x.l&&x.l.en)?'1':'2';break;
  case 'textarea':v='Sample explanation written for testing only. This text is fictional and does not describe a real person or case.';break;
  case 'text':v=textVal(x,cx,idx);if(v===null)return;break;
  default:return;
 }
 setPath(c,path,v);
}
function fillField(c,x,cx){
 const a=AN(c);
 if(x.type==='group'){x.sub.forEach(s=>{if(!s.show||s.show(AN(c)))fillOne(c,s,`${x.k}.${s.k}`,cx,0)});return}
 if(x.type==='list'){
  const n=Math.max(x.min||1,Math.min(x.max||99,x.cap||2,/child|son|daughter/i.test((x.l&&x.l.en)||'')?(cx.kids.length):2));
  for(let i=0;i<n;i++)x.item.forEach(s=>{if(!s.show||s.show(AN(c)))fillOne(c,s,`${x.k}.${i}.${s.k}`,cx,i)});
  return;
 }
 fillOne(c,x,x.k,cx,0);
}
function fillForm(c,fid,scn){
 const cx=ctxFor(scn,fid);
 for(let pass=0;pass<4;pass++){
  PARTS.forEach(p=>{visible(p.fields,AN(c)).forEach(x=>fillField(c,x,cx))});
 }
}
function fillCase(c,scn){
 for(let round=0;round<2;round++){
  forEachForm(c,fid=>fillForm(c,fid,scn));
  if(c.sets)syncFill(c);
 }
}
function build(id){
 const scn=SCEN[id];
 const nc={id:uid(),name:'TEST · '+scn.n.split(' (')[0],updated:new Date().toISOString(),disc:true,visited:{},test:true,scen:id};
 if(scn.pkg){
  const pk=PKG[scn.pkg];const forms=pk.build(scn.quiz).filter(f=>FORMS[f]);
  nc.pkg=scn.pkg;nc.forms=forms;nc.form=forms[0];nc.active=forms[0];nc.quiz=Object.assign({},scn.quiz);nc.sets={};forms.forEach(f=>{nc.sets[f]={}});
  if(nc.sets.g28){nc.sets.g28.agency='U';nc.sets.g28.matter=forms.filter(f=>f!=='g28'&&meta(f).cat==='primary').map(f=>FORMS[f].short).join(', ')}
  syncFill(nc);
 }else{nc.form=scn.form;nc.answers={}}
 return {nc,scn};
}
async function makeTest(id){
 const {nc,scn}=build(id);
 fillCase(nc,scn);
 nc.updated=new Date().toISOString();
 S.db.cases.unshift(nc);await persist();return nc;
}
async function makeAllTests(){
 const made=[];
 for(const id of Object.keys(SCEN))made.push(await makeTest(id));
 return made;
}
async function makeEveryForm(){
 const ids=Object.keys(FORMS);let n=0;
 for(const fid of ids){
  const scn=Object.assign({},SCEN.s_i130,{form:fid,n:'Single · '+FORMS[fid].short,A:'A',B:'SPOUSE',bias:n%2?'mix':'yes',rel:'Spouse',sel:{marital:'M'}});
  const nc={id:uid(),name:'TEST · '+FORMS[fid].short+' sample',updated:new Date().toISOString(),disc:true,visited:{},test:true,scen:'form:'+fid,form:fid,answers:{}};
  const prev=FD&&FD.id;setForm(fid);
  try{fillCase(nc,scn)}finally{if(prev)setForm(prev)}
  S.db.cases.unshift(nc);n++;
 }
 await persist();return n;
}
async function delTests(){S.db.cases=S.db.cases.filter(c=>!c.test);await persist()}
window.TEST={SCEN,makeTest,makeAllTests,makeEveryForm,delTests,fillCase};
})();
