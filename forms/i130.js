registerForm((function(){
const OPT={
 sex:[['M',L('Male','Masculino')],['F',L('Female','Femenino')]],
 unit:[['',L('None','Ninguno')],['apt',L('Apt.','Apto.')],['ste',L('Ste.','Ste.')],['flr',L('Flr.','Piso')]],
 ethnicity:[['H',L('Hispanic or Latino','Hispano o latino')],['N',L('Not Hispanic or Latino','No hispano ni latino')]],
 race:[['I',L('American Indian or Alaska Native','Indígena americano o nativo de Alaska')],['A',L('Asian','Asiático')],['B',L('Black or African American','Negro o afroamericano')],['P',L('Native Hawaiian or Other Pacific Islander','Nativo de Hawái u otro isleño del Pacífico')],['W',L('White','Blanco')]],
 eye:[['BLK',L('Black','Negros')],['BLU',L('Blue','Azules')],['BRO',L('Brown','Marrones')],['GRY',L('Gray','Grises')],['GRN',L('Green','Verdes')],['HAZ',L('Hazel','Avellana')],['MAR',L('Maroon','Granate')],['PNK',L('Pink','Rosados')],['XXX',L('Unknown/other','Desconocido/otro')]],
 hair:[['BAL',L('Bald (no hair)','Calvo (sin cabello)')],['BLK',L('Black','Negro')],['BLN',L('Blond','Rubio')],['BRO',L('Brown','Castaño')],['GRY',L('Gray','Canoso')],['RED',L('Red','Pelirrojo')],['SDY',L('Sandy','Arena')],['WHI',L('White','Blanco')],['XXX',L('Unknown/other','Desconocido/otro')]],
 feet:['2','3','4','5','6','7','8'].map(v=>[v,{en:v,es:v}]),
 inches:['0','1','2','3','4','5','6','7','8','9','10','11'].map(v=>[v,{en:v,es:v}]),
 g28:[['y',L('Form G-28 is attached','Se adjunta el Formulario G-28')]],
 cat:[['sp',L('Spouse','Cónyuge')],['pa',L('Parent','Padre/madre')],['sb',L('Brother/Sister','Hermano(a)')],['ch',L('Child','Hijo(a)')]],
 childRel:[['W',L('Child born to parents who were married to each other at the time of birth','Hijo(a) nacido(a) de padres casados entre sí al momento del nacimiento')],['S',L('Stepchild/Stepparent','Hijastro(a)/Padrastro/madrastra')],['O',L('Child born to parents who were not married to each other at the time of birth','Hijo(a) nacido(a) de padres no casados entre sí al momento del nacimiento')],['A',L('Child was adopted (not an Orphan or Hague Convention adoptee)','Hijo(a) adoptado(a) (no huérfano ni adoptado bajo la Convención de La Haya)')]],
 marital:[['S',L('Single, never married','Soltero(a), nunca casado(a)')],['M',L('Married','Casado(a)')],['D',L('Divorced','Divorciado(a)')],['W',L('Widowed','Viudo(a)')],['E',L('Separated','Separado(a)')],['A',L('Annulled','Anulado')]],
 petStatus:[['C',L('U.S. citizen','Ciudadano(a) de EE. UU.')],['L',L('Lawful permanent resident','Residente permanente legal')]],
 citHow:[['B',L('Birth in the United States','Nacimiento en Estados Unidos')],['N',L('Naturalization','Naturalización')],['P',L('Parents','Padres')]],
 prior:[['Y',L('Yes','Sí')],['N',L('No','No')],['U',L('Unknown (neither you nor the beneficiary know)','Desconocido (ni usted ni el beneficiario lo saben)')]],
 filing:[['adj',L('Beneficiary is in the U.S. and will apply for adjustment of status at a USCIS office','El beneficiario está en EE. UU. y solicitará ajuste de estatus en una oficina de USCIS')],['cons',L('Beneficiary will apply for an immigrant visa abroad at a U.S. Embassy/Consulate','El beneficiario solicitará una visa de inmigrante en el extranjero en una Embajada/Consulado de EE. UU.')]],
 proc:[['R',L('Removal','Remoción')],['E',L('Exclusion/Deportation','Exclusión/Deportación')],['S',L('Rescission','Rescisión')],['J',L('Other judicial proceedings','Otros procedimientos judiciales')]],
 readMode:[['A',L('I can read and understand English and read every question myself','Puedo leer y entender inglés y leí cada pregunta yo mismo(a)')],['B',L('An interpreter read every question to me in a language I am fluent in','Un intérprete me leyó cada pregunta en un idioma en que soy fluido(a)')]],
 prType:[['A',L('I am not an attorney or accredited representative','No soy abogado ni representante acreditado')],['B',L('I am an attorney or accredited representative','Soy abogado o representante acreditado')]],
 ext:[['X',L('Representation extends beyond preparation of this petition','La representación se extiende más allá de la preparación de esta petición')],['N',L('Representation does not extend beyond preparation','La representación no se extiende más allá de la preparación')]],
 prepOn:[['y',L('A preparer prepared this petition at my request (Part 8)','Un preparador preparó esta petición a mi solicitud (Parte 8)')]]
};
const YN=(y,n)=>({yes:y,no:n});
const X=(k,en,es,t,o)=>f(k,'text',L(en,es),Object.assign({t},o));
const D=(k,en,es,t,o)=>f(k,'date',L(en,es),Object.assign({t},o));
const Y=(k,en,es,y,o)=>f(k,'yesno',L(en,es),Object.assign({y},o));
const S=(k,en,es,opts,c,o)=>f(k,'select',L(en,es),Object.assign({opts,c},o));
const ST=(d)=>f('state','text',L('State (2 letters, U.S. only)','Estado (2 letras, solo EE. UU.)'),{d,up:1});
const NM=(p,ids,no,o)=>[X(p+'Family','Family name (last)','Apellido',ids[0],Object.assign({no},o)),X(p+'Given','Given name (first)','Nombre',ids[1],Object.assign({no},o)),X(p+'Middle','Middle name','Segundo nombre',ids[2],{no})];
const ADDR=(m)=>[].concat(
 m.care?[X('careOf','In care of name (if any)','A/C de (si aplica)',m.care)]:[],
 [X('street','Street number and name','Número y nombre de la calle',m.street,{req:m.req})],
 m.unit?[S('unitType','Unit type','Tipo de unidad','unit',{apt:m.unit[0],ste:m.unit[1],flr:m.unit[2]}),X('unitNum','Unit number','Número de unidad',m.num)]:[],
 [X('city','City or town','Ciudad o pueblo',m.city,{req:m.req})],
 m.state?[ST(m.state)]:[],
 m.zip?[X('zip','ZIP code','Código ZIP',m.zip,{dg:1})]:[],
 m.prov?[X('province','Province (outside U.S.)','Provincia (fuera de EE. UU.)',m.prov)]:[],
 m.postal?[X('postal','Postal code (outside U.S.)','Código postal (fuera de EE. UU.)',m.postal)]:[],
 m.country?[X('country','Country','País',m.country,{req:m.req&&m.reqC})]:[],
 m.from?[D('from','From','Desde',m.from)]:[],
 m.to?[X('to','To (mm/dd/yyyy or PRESENT)','Hasta (mm/dd/aaaa o PRESENT)',m.to)]:[]
);
const U=(b,i=[0,1,2])=>[`${b}[${i[0]}]`,`${b}[${i[1]}]`,`${b}[${i[2]}]`];
const AD=(g,l,no,m,o)=>f(g,'group',L(l[0],l[1]),Object.assign({no,sub:ADDR(m)},o));
const dig=v=>String(v).replace(/\D/g,'');
const isPet=a=>true;
const notSingle=a=>!!a.pMarital&&a.pMarital!=='S';
const bNotSingle=a=>!!a.bMarital&&a.bMarital!=='S';
const isChP=a=>a.rel==='ch'||a.rel==='pa';
const cn=(en,es)=>L(en,es);

const PARTS=[
 {id:1,t:L('Relationship (you are the petitioner)','Relación (usted es el peticionario)'),fields:[
  S('rel','I am filing this petition for my','Presento esta petición para mi','cat',{sp:'Pt1Line1_Spouse[0]',pa:'Pt1Line1_Parent[0]',sb:'Pt1Line1_Siblings[0]',ch:'Pt1Line1_Child[0]'},{no:'1',req:1}),
  S('childRel','Describe the child/parent relationship','Describa la relación hijo(a)/padre','childRel',{W:'Pt1Line2_InWedlock[0]',S:'Pt1Line2_Stepchild[0]',O:'Pt1Line2_OutOfWedlock[0]',A:'Pt1Line2_AdoptedChild[0]'},{no:'2',show:isChP,req:1}),
  Y('sibAdopt','Are you related to the beneficiary (brother/sister) by adoption?','¿Está relacionado(a) con el beneficiario (hermano/a) por adopción?',YN('Pt1Line3_Yes[0]','Pt1Line3_No[0]'),{no:'3',show:a=>a.rel==='sb'}),
  Y('adoptLpr','Did you gain lawful permanent resident status or citizenship through adoption?','¿Obtuvo la residencia permanente legal o la ciudadanía por adopción?',YN('Pt1Line4_Yes[0]','Pt1Line4_No[0]'),{no:'4',req:1})]},

 {id:2,t:L('About you (the petitioner)','Sobre usted (el peticionario)'),fields:[].concat(
  [X('pA','A-Number (if any)','Número A (si tiene)',null,{no:'1',dg:1,tf:v=>[['Pt2Line1_AlienNumber[0]',dig(v)]]}),
   X('pUscis','USCIS online account number (if any)','Número de cuenta en línea de USCIS (si tiene)','Pt2Line2_USCISOnlineActNumber[0]',{no:'2'}),
   X('pSsn','U.S. Social Security Number (if any)','Número de Seguro Social de EE. UU. (si tiene)','Pt2Line11_SSN[0]',{no:'3',dg:1})],
  NM('p',['Pt2Line4a_FamilyName[0]','Pt2Line4b_GivenName[0]','Pt2Line4c_MiddleName[0]'],'4',{req:1}).map((x,i)=>Object.assign(x,{k:['pFamily','pGiven','pMiddle'][i],req:i<2?1:0})),
  [f('pOther','list',L('Other names used (maiden name, aliases, nicknames; more than 1 go to Part 9)','Otros nombres usados (apellido de soltera, alias, apodos; más de 1 van a la Parte 9)'),{no:'5',cap:1,part:2,page:2,item:[
    X('family','Family name','Apellido','Pt2Line5a_FamilyName[0]'),X('given','Given name','Nombre','Pt2Line5b_GivenName[0]'),X('middle','Middle name','Segundo nombre','Pt2Line5c_MiddleName[0]')]}),
   X('pBirthCity','City/town/village of birth','Ciudad/pueblo/aldea de nacimiento','Pt2Line6_CityTownOfBirth[0]',{no:'6',req:1}),
   X('pBirthCountry','Country of birth','País de nacimiento','Pt2Line7_CountryofBirth[0]',{no:'7',req:1}),
   D('pDob','Date of birth','Fecha de nacimiento','Pt2Line8_DateofBirth[0]',{no:'8',req:1}),
   S('pSex','Sex','Sexo','sex',{M:'Pt2Line9_Male[0]',F:'Pt2Line9_Female[0]'},{no:'9',req:1}),
   AD('pMail',['Mailing address','Dirección postal'],'10',{care:'Pt2Line10_InCareofName[0]',street:'Pt2Line10_StreetNumberName[0]',req:1,unit:U('Pt2Line10_Unit'),num:'Pt2Line10_AptSteFlrNumber[0]',city:'Pt2Line10_CityOrTown[0]',state:'Pt2Line10_State[0]',zip:'Pt2Line10_ZipCode[0]',prov:'Pt2Line10_Province[0]',postal:'Pt2Line10_PostalCode[0]',country:'Pt2Line10_Country[0]'}),
   Y('pMailSame','Is your current mailing address the same as your physical address?','¿Su dirección postal actual es la misma que su dirección física?',YN('Pt2Line11_Yes[0]','Pt2Line11_No[0]'),{no:'11',req:1}),
   AD('pPhys1',['Physical address 1 (last 5 years, current first; if different from mailing)','Dirección física 1 (últimos 5 años, la actual primero; si es distinta de la postal)'],'12-13',{street:'Pt2Line12_StreetNumberName[0]',unit:U('Pt2Line12_Unit'),num:'Pt2Line12_AptSteFlrNumber[0]',city:'Pt2Line12_CityOrTown[0]',state:'Pt2Line12_State[0]',zip:'Pt2Line12_ZipCode[0]',prov:'Pt2Line12_Province[0]',postal:'Pt2Line12_PostalCode[0]',country:'Pt2Line12_Country[0]',from:'Pt2Line13a_DateFrom[0]',to:'Pt2Line13b_DateTo[0]'}),
   AD('pPhys2',['Physical address 2','Dirección física 2'],'14-15',{street:'Pt2Line14_StreetNumberName[0]',unit:U('Pt2Line14_Unit'),num:'Pt2Line14_AptSteFlrNumber[0]',city:'Pt2Line14_CityOrTown[0]',state:'Pt2Line14_State[0]',zip:'Pt2Line14_ZipCode[0]',prov:'Pt2Line14_Province[0]',postal:'Pt2Line14_PostalCode[0]',country:'Pt2Line14_Country[0]',from:'Pt2Line15a_DateFrom[0]',to:'Pt2Line15b_DateTo[0]'}),
   f('pMoreAddr','textarea',L('Other physical addresses in the last 5 years (goes to Part 9)','Otras direcciones físicas en los últimos 5 años (va a la Parte 9)'),{no:'14',p14:{part:2,item:'14',page:2}}),
   X('pTimes','How many times have you been married?','¿Cuántas veces ha estado casado(a)?','Pt2Line16_NumberofMarriages[0]',{no:'16',dg:1}),
   S('pMarital','Current marital status','Estado civil actual','marital',{S:'Pt2Line17_Single[0]',M:'Pt2Line17_Married[0]',D:'Pt2Line17_Divorced[0]',W:'Pt2Line17_Widowed[0]',E:'Pt2Line17_Separated[0]',A:'Pt2Line17_Annulled[0]'},{no:'17',req:1}),
   D('pMarDate','Date of current marriage','Fecha del matrimonio actual','Pt2Line18_DateOfMarriage[0]',{no:'18',show:a=>a.pMarital==='M'}),
   X('pMarCity','Place of current marriage: city or town','Lugar del matrimonio actual: ciudad o pueblo','Pt2Line19a_CityTown[0]',{no:'19',show:a=>a.pMarital==='M'}),
   f('pMarState','text',L('Place of current marriage: state (2 letters)','Lugar del matrimonio actual: estado (2 letras)'),{no:'19',show:a=>a.pMarital==='M',d:'Pt2Line19b_State[0]',up:1}),
   X('pMarProv','Place of current marriage: province','Lugar del matrimonio actual: provincia','Pt2Line19c_Province[0]',{no:'19',show:a=>a.pMarital==='M'}),
   X('pMarCountry','Place of current marriage: country','Lugar del matrimonio actual: país','Pt2Line19d_Country[0]',{no:'19',show:a=>a.pMarital==='M'}),
   f('pSpouses','list',L('Your spouses: current spouse first, then prior spouses (more than 2 go to Part 9)','Sus cónyuges: el actual primero, luego los anteriores (más de 2 van a la Parte 9)'),{no:'20-23',show:notSingle,cap:2,part:2,page:3,item:[
    X('family','Family name','Apellido',['PtLine20a_FamilyName[0]','Pt2Line22a_FamilyName[0]']),
    X('given','Given name','Nombre',['Pt2Line20b_GivenName[0]','Pt2Line22b_GivenName[0]']),
    X('middle','Middle name','Segundo nombre',['Pt2Line20c_MiddleName[0]','Pt2Line22c_MiddleName[0]']),
    D('ended','Date marriage ended (leave blank if current)','Fecha en que terminó el matrimonio (en blanco si es el actual)',['Pt2Line21_DateMarriageEnded[0]','Pt2Line23_DateMarriageEnded[0]'])]})],
  NM('par1',['Pt2Line24_FamilyName[0]','Pt2Line24_GivenName[0]','Pt2Line24_MiddleName[0]'],'24').map(x=>Object.assign(x,{l:L('Parent 1: '+x.l.en.toLowerCase(),'Padre/madre 1: '+x.l.es.toLowerCase())})),
  [D('par1Dob','Parent 1: date of birth','Padre/madre 1: fecha de nacimiento','Pt2Line25_DateofBirth[0]',{no:'25'}),
   S('par1Sex','Parent 1: sex','Padre/madre 1: sexo','sex',{M:'Pt2Line26_Male[0]',F:'Pt2Line26_Female[0]'},{no:'26'}),
   X('par1Birth','Parent 1: country of birth','Padre/madre 1: país de nacimiento','Pt2Line27_CountryofBirth[0]',{no:'27'}),
   X('par1City','Parent 1: city/town/village of residence','Padre/madre 1: ciudad/pueblo de residencia','Pt2Line28_CityTownOrVillageOfResidence[0]',{no:'28'}),
   X('par1Country','Parent 1: country of residence','Padre/madre 1: país de residencia','Pt2Line29_CountryOfResidence[0]',{no:'29'})],
  NM('par2',['Pt2Line30a_FamilyName[0]','Pt2Line30b_GivenName[0]','Pt2Line30c_MiddleName[0]'],'30').map(x=>Object.assign(x,{l:L('Parent 2: '+x.l.en.toLowerCase(),'Padre/madre 2: '+x.l.es.toLowerCase())})),
  [D('par2Dob','Parent 2: date of birth','Padre/madre 2: fecha de nacimiento','Pt2Line31_DateofBirth[0]',{no:'31'}),
   S('par2Sex','Parent 2: sex','Padre/madre 2: sexo','sex',{M:'Pt2Line32_Male[0]',F:'Pt2Line32_Female[0]'},{no:'32'}),
   X('par2Birth','Parent 2: country of birth','Padre/madre 2: país de nacimiento','Pt2Line33_CountryofBirth[0]',{no:'33'}),
   X('par2City','Parent 2: city/town/village of residence','Padre/madre 2: ciudad/pueblo de residencia','Pt2Line34_CityTownOrVillageOfResidence[0]',{no:'34'}),
   X('par2Country','Parent 2: country of residence','Padre/madre 2: país de residencia','Pt2Line35_CountryOfResidence[0]',{no:'35'}),
   S('pStatus','I am a','Soy','petStatus',{C:'Pt2Line36_USCitizen[0]',L:'Pt2Line36_LPR[0]'},{no:'36',req:1}),
   S('pCitHow','My citizenship was acquired through','Mi ciudadanía fue adquirida por','citHow',{B:'Pt2Line23a_checkbox[0]',N:'Pt2Line23b_checkbox[0]',P:'Pt2Line23c_checkbox[0]'},{no:'37',show:a=>a.pStatus==='C',req:1}),
   Y('pCert','Have you obtained a Certificate of Naturalization or a Certificate of Citizenship?','¿Ha obtenido un Certificado de Naturalización o de Ciudadanía?',YN('Pt2Line36_Yes[0]','Pt2Line36_No[0]'),{no:'38',show:a=>a.pStatus==='C'}),
   X('pCertNo','Certificate number','Número del certificado','Pt2Line37a_CertificateNumber[0]',{no:'39',show:a=>a.pStatus==='C'&&a.pCert==='yes'}),
   X('pCertPlace','Place of issuance','Lugar de emisión','Pt2Line37b_PlaceOfIssuance[0]',{no:'39',show:a=>a.pStatus==='C'&&a.pCert==='yes'}),
   D('pCertDate','Date of issuance','Fecha de emisión','Pt2Line37c_DateOfIssuance[0]',{no:'39',show:a=>a.pStatus==='C'&&a.pCert==='yes'}),
   f('pClass','text',L('Class of admission (code, e.g. IR1, F11, B2)','Clase de admisión (código, p. ej. IR1, F11, B2)'),{no:'40',show:a=>a.pStatus==='L',t:'Pt2Line40a_ClassOfAdmission[0]',up:1,req:1}),
   D('pAdmDate','Date of admission','Fecha de admisión','Pt2Line40b_DateOfAdmission[0]',{no:'40',show:a=>a.pStatus==='L',req:1}),
   X('pAdmCity','Place of admission: city or town','Lugar de admisión: ciudad o pueblo','Pt2Line40d_CityOrTown[0]',{no:'40',show:a=>a.pStatus==='L'}),
   f('pAdmState','text',L('Place of admission: state (2 letters)','Lugar de admisión: estado (2 letras)'),{no:'40',show:a=>a.pStatus==='L',d:'Pt2Line40e_State[0]',up:1}),
   Y('pLprMar','Did you gain permanent resident status through marriage to a U.S. citizen or permanent resident?','¿Obtuvo la residencia permanente por matrimonio con un ciudadano o residente permanente de EE. UU.?',YN('Pt2Line41_Yes[0]','Pt2Line41_No[0]'),{no:'41',show:a=>a.pStatus==='L'}),
   X('pEmp1','Employer 1: name (type "Unemployed" if not working)','Empleador 1: nombre (escriba "Unemployed" si no trabaja)','Pt2Line40_EmployerOrCompName[0]',{no:'42',req:1}),
   AD('pEmp1Addr',['Employer 1: address','Empleador 1: dirección'],'43',{street:'Pt2Line41_StreetNumberName[0]',unit:U('Pt2Line41_Unit'),num:'Pt2Line41_AptSteFlrNumber[0]',city:'Pt2Line41_CityOrTown[0]',state:'Pt2Line41_State[0]',zip:'Pt2Line41_ZipCode[0]',prov:'Pt2Line41_Province[0]',postal:'Pt2Line41_PostalCode[0]',country:'Pt2Line41_Country[0]'}),
   X('pEmp1Occ','Employer 1: your occupation','Empleador 1: su ocupación','Pt2Line42_Occupation[0]',{no:'44'}),
   D('pEmp1From','Employer 1: date from','Empleador 1: fecha desde','Pt2Line43a_DateFrom[0]',{no:'45'}),
   X('pEmp1To','Employer 1: date to (mm/dd/yyyy or PRESENT)','Empleador 1: fecha hasta (mm/dd/aaaa o PRESENT)','Pt2Line43b_DateTo[0]',{no:'45'}),
   X('pEmp2','Employer 2: name','Empleador 2: nombre','Pt2Line44_EmployerOrOrgName[0]',{no:'46'}),
   AD('pEmp2Addr',['Employer 2: address','Empleador 2: dirección'],'47',{street:'Pt2Line45_StreetNumberName[0]',unit:U('Pt2Line45_Unit'),num:'Pt2Line45_AptSteFlrNumber[0]',city:'Pt2Line45_CityOrTown[0]',state:'Pt2Line45_State[0]',zip:'Pt2Line45_ZipCode[0]',prov:'Pt2Line45_Province[0]',postal:'Pt2Line45_PostalCode[0]',country:'Pt2Line45_Country[0]'}),
   X('pEmp2Occ','Employer 2: your occupation','Empleador 2: su ocupación','Pt2Line46_Occupation[0]',{no:'48'}),
   D('pEmp2From','Employer 2: date from','Empleador 2: fecha desde','Pt2Line47a_DateFrom[0]',{no:'49'}),
   X('pEmp2To','Employer 2: date to (mm/dd/yyyy or PRESENT)','Empleador 2: fecha hasta (mm/dd/aaaa o PRESENT)','Pt2Line47b_DateTo[0]',{no:'49'}),
   f('pMoreEmp','textarea',L('Other employers in the last 5 years (goes to Part 9)','Otros empleadores en los últimos 5 años (va a la Parte 9)'),{no:'46',p14:{part:2,item:'46',page:4}})])},

 {id:3,t:L('Your biographic information','Su información biográfica'),fields:[
  S('ethnicity','Ethnicity','Origen étnico','ethnicity',{H:'Pt3Line1_Ethnicity[1]',N:'Pt3Line1_Ethnicity[0]'},{no:'1',req:1}),
  f('race','multi',L('Race (select all that apply)','Raza (seleccione todas las que apliquen)'),{no:'2',opts:'race',req:1,c:{W:'Pt3Line2_Race_White[0]',A:'Pt3Line2_Race_Asian[0]',B:'Pt3Line2_Race_Black[0]',I:'Pt3Line2_Race_AmericanIndianAlaskaNative[0]',P:'Pt3Line2_Race_NativeHawaiianOtherPacificIslander[0]'}}),
  f('heightFt','select',L('Height (feet)','Estatura (pies)'),{no:'3',opts:'feet',req:1,d:'Pt3Line3_HeightFeet[0]'}),
  f('heightIn','select',L('Height (inches)','Estatura (pulgadas)'),{no:'3',opts:'inches',req:1,d:'Pt3Line3_HeightInches[0]'}),
  f('weight','number',L('Weight (pounds)','Peso (libras)'),{no:'4',req:1,tf:(v)=>{const s=String(Math.max(0,Math.min(999,Math.round(+v)))).padStart(3,' ');return [['Pt3Line4_Pound1[0]',s[0]],['Pt3Line4_Pound2[0]',s[1]],['Pt3Line4_Pound3[0]',s[2]]].filter(x=>x[1].trim())}}),
  S('eye','Eye color','Color de ojos','eye',{BLK:'Pt3Line5_EyeColor[7]',BLU:'Pt3Line5_EyeColor[0]',BRO:'Pt3Line5_EyeColor[1]',GRY:'Pt3Line5_EyeColor[6]',GRN:'Pt3Line5_EyeColor[5]',HAZ:'Pt3Line5_EyeColor[2]',MAR:'Pt3Line5_EyeColor[4]',PNK:'Pt3Line5_EyeColor[3]',XXX:'Pt3Line5_EyeColor[8]'},{no:'5',req:1}),
  S('hair','Hair color','Color de cabello','hair',{BAL:'Pt3Line6_HairColor[0]',BLK:'Pt3Line6_HairColor[1]',BLN:'Pt3Line6_HairColor[2]',BRO:'Pt3Line6_HairColor[3]',GRY:'Pt3Line6_HairColor[4]',RED:'Pt3Line6_HairColor[5]',SDY:'Pt3Line6_HairColor[6]',WHI:'Pt3Line6_HairColor[7]',XXX:'Pt3Line6_HairColor[8]'},{no:'6',req:1})]},

 {id:4,t:L('About the beneficiary (your relative)','Sobre el beneficiario (su familiar)'),fields:[].concat(
  [X('bA','A-Number (if any)','Número A (si tiene)',null,{no:'1',dg:1,tf:v=>[['Pt4Line1_AlienNumber[0]',dig(v)]]}),
   X('bUscis','USCIS online account number (if any)','Número de cuenta en línea de USCIS (si tiene)','Pt4Line2_USCISOnlineActNumber[0]',{no:'2'}),
   X('bSsn','U.S. Social Security Number (if any)','Número de Seguro Social de EE. UU. (si tiene)','Pt4Line3_SSN[0]',{no:'3',dg:1})],
  NM('b',['Pt4Line4a_FamilyName[0]','Pt4Line4b_GivenName[0]','Pt4Line4c_MiddleName[0]'],'4').map((x,i)=>Object.assign(x,{k:['bFamily','bGiven','bMiddle'][i],req:i<2?1:0})),
  [f('bOther','list',L('Other names used (maiden name, aliases, nicknames; more than 1 go to Part 9)','Otros nombres usados (apellido de soltero(a), alias, apodos; más de 1 van a la Parte 9)'),{no:'5',cap:1,part:4,page:5,item:[
    X('family','Family name','Apellido','P4Line5a_FamilyName[0]'),X('given','Given name','Nombre','Pt4Line5b_GivenName[0]'),X('middle','Middle name','Segundo nombre','Pt4Line5c_MiddleName[0]')]}),
   X('bBirthCity','City/town/village of birth','Ciudad/pueblo/aldea de nacimiento','Pt4Line7_CityTownOfBirth[0]',{no:'6',req:1}),
   X('bBirthCountry','Country of birth','País de nacimiento','Pt4Line8_CountryOfBirth[0]',{no:'7',req:1}),
   D('bDob','Date of birth','Fecha de nacimiento','Pt4Line9_DateOfBirth[0]',{no:'8',req:1}),
   S('bSex','Sex','Sexo','sex',{M:'Pt4Line9_Male[0]',F:'Pt4Line9_Female[0]'},{no:'9',req:1}),
   S('bPrior','Has anyone else ever filed a petition for the beneficiary?','¿Alguien más ha presentado alguna vez una petición para el beneficiario?','prior',{Y:'Pt4Line10_Yes[0]',N:'Pt4Line10_No[0]',U:'Pt4Line10_Unknown[0]'},{no:'10',req:1}),
   AD('bPhys',['Beneficiary physical address (leave street blank if none)','Dirección física del beneficiario (deje la calle en blanco si no tiene)'],'11',{street:'Pt4Line11_StreetNumberName[0]',unit:U('Pt4Line11_Unit'),num:'Pt4Line11_AptSteFlrNumber[0]',city:'Pt4Line11_CityOrTown[0]',state:'Pt4Line11_State[0]',zip:'Pt4Line11_ZipCode[0]',prov:'Pt4Line11_Province[0]',postal:'Pt4Line11_PostalCode[0]',country:'Pt4Line11_Country[0]'}),
   AD('bUsAddr',['U.S. address where the beneficiary intends to live (type SAME in street if it is the same as above)','Dirección en EE. UU. donde el beneficiario piensa vivir (escriba SAME en la calle si es la misma)'],'12',{street:'Pt4Line12a_StreetNumberName[0]',unit:U('Pt4Line12b_Unit'),num:'Pt4Line12b_AptSteFlrNumber[0]',city:'Pt4Line12c_CityOrTown[0]',state:'Pt4Line12d_State[0]',zip:'Pt4Line12e_ZipCode[0]'}),
   AD('bForAddr',['Beneficiary address outside the U.S. (type SAME in street if it is the same as Item 11)','Dirección del beneficiario fuera de EE. UU. (escriba SAME en la calle si es la misma del Ítem 11)'],'13',{street:'Pt4Line13_StreetNumberName[0]',unit:U('Pt4Line13_Unit'),num:'Pt4Line13_AptSteFlrNumber[0]',city:'Pt4Line13_CityOrTown[0]',prov:'Pt4Line13_Province[0]',postal:'Pt4Line13_PostalCode[0]',country:'Pt4Line13_Country[0]'}),
   X('bPhone','Daytime telephone number (if any)','Teléfono de día (si tiene)','Pt4Line14_DaytimePhoneNumber[0]',{no:'14',dg:1}),
   X('bMobile','Mobile telephone number (if any)','Teléfono móvil (si tiene)','Pt4Line15_MobilePhoneNumber[0]',{no:'15',dg:1}),
   X('bEmail','Email address (if any)','Correo electrónico (si tiene)','Pt4Line16_EmailAddress[0]',{no:'16'}),
   X('bTimes','How many times has the beneficiary been married?','¿Cuántas veces ha estado casado(a) el beneficiario?','Pt4Line17_NumberofMarriages[0]',{no:'17',dg:1}),
   S('bMarital','Beneficiary current marital status','Estado civil actual del beneficiario','marital',{S:'Pt4Line18_MaritalStatus[3]',M:'Pt4Line18_MaritalStatus[4]',D:'Pt4Line18_MaritalStatus[5]',W:'Pt4Line18_MaritalStatus[0]',E:'Pt4Line18_MaritalStatus[2]',A:'Pt4Line18_MaritalStatus[1]'},{no:'18',req:1}),
   D('bMarDate','Date of current marriage','Fecha del matrimonio actual','Pt4Line19_DateOfMarriage[0]',{no:'19',show:a=>a.bMarital==='M'}),
   X('bMarCity','Place of current marriage: city or town','Lugar del matrimonio actual: ciudad o pueblo','Pt4Line20a_CityTown[0]',{no:'20',show:a=>a.bMarital==='M'}),
   f('bMarState','text',L('Place of current marriage: state (2 letters)','Lugar del matrimonio actual: estado (2 letras)'),{no:'20',show:a=>a.bMarital==='M',d:'Pt4Line20b_State[0]',up:1}),
   X('bMarProv','Place of current marriage: province','Lugar del matrimonio actual: provincia','Pt4Line20c_Province[0]',{no:'20',show:a=>a.bMarital==='M'}),
   X('bMarCountry','Place of current marriage: country','Lugar del matrimonio actual: país','Pt4Line20d_Country[0]',{no:'20',show:a=>a.bMarital==='M'}),
   f('bSpouses','list',L('Beneficiary spouses: current spouse first, then prior spouses (more than 2 go to Part 9)','Cónyuges del beneficiario: el actual primero, luego los anteriores (más de 2 van a la Parte 9)'),{no:'21-24',show:bNotSingle,cap:2,part:4,page:6,item:[
    X('family','Family name','Apellido',['Pt4Line16a_FamilyName[0]','Pt4Line18a_FamilyName[0]']),
    X('given','Given name','Nombre',['Pt4Line16b_GivenName[0]','Pt4Line18b_GivenName[0]']),
    X('middle','Middle name','Segundo nombre',['Pt4Line16c_MiddleName[0]','Pt4Line18c_MiddleName[0]']),
    D('ended','Date marriage ended (leave blank if current)','Fecha en que terminó el matrimonio (en blanco si es el actual)',['Pt4Line17_DateMarriageEnded[0]','Pt4Line17_DateMarriageEnded[1]'])]}),
   f('bRelatives','list',L('Beneficiary spouse and children (more than 5 go to Part 9)','Cónyuge e hijos del beneficiario (más de 5 van a la Parte 9)'),{no:'25-44',cap:5,part:4,page:6,item:[
    X('family','Family name','Apellido',['Pt4Line30a_FamilyName[0]','Pt4Line34a_FamilyName[0]','Pt4Line38a_FamilyName[0]','Pt4Line42a_FamilyName[0]','Pt4Line46a_FamilyName[0]']),
    X('given','Given name','Nombre',['Pt4Line30b_GivenName[0]','Pt4Line34b_GivenName[0]','Pt4Line38b_GivenName[0]','Pt4Line42b_GivenName[0]','Pt4Line46b_GivenName[0]']),
    X('middle','Middle name','Segundo nombre',['Pt4Line30c_MiddleName[0]','Pt4Line34c_MiddleName[0]','Pt4Line38c_MiddleName[0]','Pt4Line42c_MiddleName[0]','Pt4Line46c_MiddleName[0]']),
    X('rel','Relationship to beneficiary','Relación con el beneficiario',['Pt4Line31_Relationship[0]','Pt4Line35_Relationship[0]','Pt4Line39_Relationship[0]','Pt4Line43_Relationship[0]','Pt4Line47_Relationship[0]']),
    D('dob','Date of birth','Fecha de nacimiento',['Pt4Line32_DateOfBirth[0]','Pt4Line36_DateOfBirth[0]','Pt4Line40_DateOfBirth[0]','Pt4Line44_DateOfBirth[0]','Pt4Line48_DateOfBirth[0]']),
    X('country','Country of birth','País de nacimiento',['Pt4Line49_CountryOfBirth[0]','Pt4Line37_CountryOfBirth[0]','Pt4Line41_CountryOfBirth[0]','Pt4Line45_CountryOfBirth[0]','Pt4Line49_CountryOfBirth[1]'])]}),
   Y('bEver','Was the beneficiary EVER in the United States?','¿Estuvo el beneficiario ALGUNA VEZ en Estados Unidos?',YN('Pt4Line20_Yes[0]','Pt4Line20_No[0]'),{no:'45',req:1}),
   f('bClass','text',L('Arrived as (class of admission code, e.g. B2, F1)','Llegó como (código de clase de admisión, p. ej. B2, F1)'),{no:'46.a',show:a=>a.bEver==='yes',d:'Pt4Line21a_ClassOfAdmission[0]',fuzzy:1,up:1}),
   X('bI94','Form I-94 Arrival-Departure Record number','Número del registro de llegada-salida I-94','Pt4Line21b_ArrivalDeparture[0]',{no:'46.b',show:a=>a.bEver==='yes'}),
   D('bArr','Date of arrival','Fecha de llegada','Pt4Line21c_DateOfArrival[0]',{no:'46.c',show:a=>a.bEver==='yes'}),
   X('bExp','Date authorized stay expired or will expire (mm/dd/yyyy or D/S)','Fecha en que venció o vencerá la estadía autorizada (mm/dd/aaaa o D/S)','Pt4Line21d_DateExpired[0]',{no:'46.d',show:a=>a.bEver==='yes'}),
   X('bPass','Passport number','Número de pasaporte','Pt4Line22_PassportNumber[0]',{no:'47'}),
   X('bTravel','Travel document number','Número de documento de viaje','Pt4Line23_TravelDocNumber[0]',{no:'48'}),
   X('bPassCountry','Country of issuance for passport or travel document','País de emisión del pasaporte o documento de viaje','Pt4Line24_CountryOfIssuance[0]',{no:'49'}),
   D('bPassExp','Expiration date for passport or travel document','Fecha de vencimiento del pasaporte o documento de viaje','Pt4Line25_ExpDate[0]',{no:'50'}),
   X('bEmp','Current employer (type "Unemployed" if not working)','Empleador actual (escriba "Unemployed" si no trabaja)','Pt4Line26_NameOfCompany[0]',{no:'51.a'}),
   AD('bEmpAddr',['Current employer address','Dirección del empleador actual'],'51',{street:'Pt4Line26_StreetNumberName[0]',unit:U('Pt4Line26_Unit'),num:'Pt4Line26_AptSteFlrNumber[0]',city:'Pt4Line26_CityOrTown[0]',state:'Pt4Line26_State[0]',zip:'Pt4Line26_ZipCode[0]',prov:'Pt4Line26_Province[0]',postal:'Pt4Line26_PostalCode[0]',country:'Pt4Line26_Country[0]'}),
   D('bEmpDate','Date employment began','Fecha en que comenzó el empleo','Pt4Line27_DateEmploymentBegan[0]',{no:'52'}),
   Y('bProc','Was the beneficiary EVER in immigration proceedings?','¿Estuvo el beneficiario ALGUNA VEZ en procedimientos de inmigración?',YN('Pt4Line28_Yes[0]','Pt4Line28_No[0]'),{no:'53',req:1}),
   f('bProcType','multi',L('Type of proceedings','Tipo de procedimiento'),{no:'54',show:a=>a.bProc==='yes',opts:'proc',c:{R:'Pt4Line54_Removal[0]',E:'Pt4Line54_Exclusion[0]',S:'Pt4Line54_Rescission[0]',J:'Pt4Line54_JudicialProceedings[0]'}}),
   X('bProcCity','Proceedings location: city or town','Lugar del procedimiento: ciudad o pueblo','Pt4Line55a_CityOrTown[0]',{no:'55',show:a=>a.bProc==='yes'}),
   f('bProcState','text',L('Proceedings location: state (2 letters)','Lugar del procedimiento: estado (2 letras)'),{no:'55',show:a=>a.bProc==='yes',d:'Pt4Line55b_State[0]',up:1}),
   D('bProcDate','Proceedings date','Fecha del procedimiento','Pt4Line56_Date[0]',{no:'56',show:a=>a.bProc==='yes'})],
  NM('bn',['Pt4Line55a_FamilyName[0]','Pt4Line55b_GivenName[0]','Pt4Line55c_MiddleName[0]'],'57').map(x=>Object.assign(x,{l:L('Name in native alphabet (if not Roman letters): '+x.l.en.toLowerCase(),'Nombre en su alfabeto nativo (si no es romano): '+x.l.es.toLowerCase())})),
  [AD('bNatAddr',['Foreign address in native alphabet (if not Roman letters)','Dirección extranjera en alfabeto nativo (si no es romano)'],'58',{street:'Pt4Line56_StreetNumberName[0]',unit:U('Pt4Line56_Unit'),num:'Pt4Line56_AptSteFlrNumber[0]',city:'Pt4Line56_CityOrTown[0]',prov:'Pt4Line56_Province[0]',postal:'Pt4Line56_PostalCode[0]',country:'Pt4Line56_Country[0]'}),
   AD('bLived',['If filing for your spouse: last address where you lived together (type "Never lived together" in street if so)','Si es para su cónyuge: última dirección donde vivieron juntos (escriba "Never lived together" en la calle si nunca vivieron juntos)'],'59',{street:'Pt4Line57_StreetNumberName[0]',unit:U('Pt4Line57_Unit'),num:'Pt4Line57_AptSteFlrNumber[0]',city:'Pt4Line57_CityOrTown[0]',state:'Pt4Line57_State[0]',zip:'Pt4Line57_ZipCode[0]',prov:'Pt4Line57_Province[0]',postal:'Pt4Line57_PostalCode[0]',country:'Pt4Line57_Country[0]',from:'Pt4Line58a_DateFrom[0]',to:'Pt4Line58b_DateTo[0]'},{show:a=>a.rel==='sp'}),
   S('filing','Where will the beneficiary apply for the green card?','¿Dónde solicitará el beneficiario la tarjeta verde?','filing',{adj:null,cons:null},{no:'61-62'}),
   X('adjCity','USCIS office: city or town','Oficina de USCIS: ciudad o pueblo','Pt4Line60a_CityOrTown[0]',{no:'61.a',show:a=>a.filing==='adj'}),
   f('adjState','text',L('USCIS office: state (2 letters)','Oficina de USCIS: estado (2 letras)'),{no:'61.b',show:a=>a.filing==='adj',d:'Pt4Line60b_State[0]',up:1}),
   X('conCity','U.S. Embassy/Consulate: city or town','Embajada/Consulado de EE. UU.: ciudad o pueblo','Pt4Line61a_CityOrTown[0]',{no:'62.a',show:a=>a.filing==='cons'}),
   X('conProv','U.S. Embassy/Consulate: province','Embajada/Consulado de EE. UU.: provincia','Pt4Line61b_Province[0]',{no:'62.b',show:a=>a.filing==='cons'}),
   X('conCountry','U.S. Embassy/Consulate: country','Embajada/Consulado de EE. UU.: país','Pt4Line61c_Country[0]',{no:'62.c',show:a=>a.filing==='cons'})])},

 {id:5,t:L('Other information','Otra información'),fields:[
  Y('prevPet','Have you EVER previously filed a petition for this beneficiary or any other alien?','¿Ha presentado ALGUNA VEZ una petición para este beneficiario u otro extranjero?',YN('Part4Line1_Yes[0]','Part4Line1_No[0]'),{no:'1',req:1}),
  X('prevFamily','Previous petition: family name of the person','Petición anterior: apellido de la persona','Pt5Line2a_FamilyName[0]',{no:'2',show:a=>a.prevPet==='yes'}),
  X('prevGiven','Previous petition: given name','Petición anterior: nombre','Pt5Line2b_GivenName[0]',{no:'2',show:a=>a.prevPet==='yes'}),
  X('prevMiddle','Previous petition: middle name','Petición anterior: segundo nombre','Pt5Line2c_MiddleName[0]',{no:'2',show:a=>a.prevPet==='yes'}),
  X('prevCity','Previous petition: city or town of filing','Petición anterior: ciudad de presentación','Pt5Line3a_CityOrTown[0]',{no:'3',show:a=>a.prevPet==='yes'}),
  f('prevState','text',L('Previous petition: state of filing (2 letters)','Petición anterior: estado de presentación (2 letras)'),{no:'3',show:a=>a.prevPet==='yes',d:'Pt5Line3b_State[0]',up:1}),
  D('prevDate','Previous petition: date filed','Petición anterior: fecha de presentación','Pt5Line4_DateFiled[0]',{no:'4',show:a=>a.prevPet==='yes'}),
  X('prevResult','Previous petition: result (approved, denied, withdrawn)','Petición anterior: resultado (aprobada, denegada, retirada)','Pt5Line5_Result[0]',{no:'5',show:a=>a.prevPet==='yes'}),
  f('others','list',L('Separate petitions you are also submitting for other relatives (more than 2 go to Part 9)','Peticiones separadas que también presenta para otros familiares (más de 2 van a la Parte 9)'),{no:'6-9',cap:2,part:5,page:8,item:[
   X('family','Family name','Apellido',['Pt4Line6a_FamilyName[0]','Pt4Line8a_FamilyName[0]']),
   X('given','Given name','Nombre',['Pt4Line6b_GivenName[0]','Pt4Line8b_GivenName[0]']),
   X('middle','Middle name','Segundo nombre',['Pt4Line6c_MiddleName[0]','Pt4Line8c_MiddleName[0]']),
   X('rel','Relationship to you','Relación con usted',['Pt4Line7_Relationship[0]','Pt4Line9_Relationship[0]'])]})]},

 {id:6,t:L('Your statement, contact and interpreter','Su declaración, contacto e intérprete'),fields:[
  S('readMode','Petitioner statement','Declaración del peticionario','readMode',{A:'Pt6Line1Checkbox[0]',B:'Pt6Line1Checkbox[1]'},{no:'1',req:1}),
  X('readLang','Language in which you are fluent','Idioma en que usted es fluido(a)',null,{no:'1.b',show:a=>a.readMode==='B',tf:v=>[['Pt6Line1b_Language[0]',v],['Pt7_NameofLanguage[0]',v]]}),
  f('prepOn','multi',L('Preparer','Preparador'),{no:'2',opts:'prepOn',c:{y:'Pt6Line2_Checkbox[0]'}}),
  X('pPhone','Your daytime telephone number','Su teléfono de día','Pt6Line3_DaytimePhoneNumber[0]',{no:'3',dg:1,req:1}),
  X('pMobile','Your mobile telephone number (if any)','Su teléfono móvil (si tiene)','Pt6Line4_MobileNumber[0]',{no:'4',dg:1}),
  X('pEmail','Your email address (if any)','Su correo electrónico (si tiene)','Pt6Line5_Email[0]',{no:'5'}),
  X('inFamily','Interpreter family name','Apellido del intérprete','Pt7Line1a_InterpreterFamilyName[0]',{show:a=>a.readMode==='B'}),
  X('inGiven','Interpreter given name','Nombre del intérprete','Pt7Line1b_InterpreterGivenName[0]',{show:a=>a.readMode==='B'}),
  X('inOrg','Interpreter business or organization','Negocio u organización del intérprete','Pt7Line2_InterpreterBusinessorOrg[0]',{show:a=>a.readMode==='B'}),
  AD('inAddr',['Interpreter mailing address','Dirección postal del intérprete'],'',{street:'Pt7Line3_StreetNumberName[0]',unit:U('Pt7Line3_Unit'),num:'Pt7Line3_AptSteFlrNumber[0]',city:'Pt7Line3_CityOrTown[0]',state:'Pt7Line3_State[0]',zip:'Pt7Line3_ZipCode[0]',prov:'Pt7Line3_Province[0]',postal:'Pt7Line3_PostalCode[0]',country:'Pt7Line3_Country[0]'},{show:a=>a.readMode==='B'}),
  X('inPhone','Interpreter daytime telephone','Teléfono de día del intérprete','Pt7Line4_InterpreterDaytimeTelephone[0]',{show:a=>a.readMode==='B',dg:1}),
  X('inMobile','Interpreter mobile telephone','Teléfono móvil del intérprete','Pt4Line53_DaytimePhoneNumber[0]',{show:a=>a.readMode==='B',dg:1}),
  X('inEmail','Interpreter email','Correo del intérprete','Pt7Line5_Email[0]',{show:a=>a.readMode==='B'})]},

 {id:8,t:L('Preparer and attorney (if any)','Preparador y abogado (si hay)'),fields:[
  X('prFamily','Preparer family name','Apellido del preparador','Pt8Line1a_PreparerFamilyName[0]',{show:a=>(a.prepOn||[]).includes('y')}),
  X('prGiven','Preparer given name','Nombre del preparador','Pt8Line1b_PreparerGivenName[0]',{show:a=>(a.prepOn||[]).includes('y')}),
  X('prOrg','Preparer business or organization','Negocio u organización del preparador','Pt8Line2_BusinessName[0]',{show:a=>(a.prepOn||[]).includes('y')}),
  AD('prAddr',['Preparer mailing address','Dirección postal del preparador'],'',{street:'Pt8Line3_StreetNumberName[0]',unit:U('Pt8Line3_Unit'),num:'Pt8Line3_AptSteFlrNumber[0]',city:'Pt8Line3_CityOrTown[0]',state:'Pt8Line3_State[0]',zip:'Pt8Line3_ZipCode[0]',prov:'Pt8Line3_Province[0]',postal:'Pt8Line3_PostalCode[0]',country:'Pt8Line3_Country[0]'},{show:a=>(a.prepOn||[]).includes('y')}),
  X('prPhone','Preparer daytime telephone','Teléfono de día del preparador','Pt8Line4_DaytimePhoneNumber[0]',{show:a=>(a.prepOn||[]).includes('y'),dg:1}),
  X('prMobile','Preparer mobile telephone','Teléfono móvil del preparador','Pt8Line5_PreparerFaxNumber[0]',{show:a=>(a.prepOn||[]).includes('y'),dg:1}),
  X('prEmail','Preparer email','Correo del preparador','Pt8Line6_Email[0]',{show:a=>(a.prepOn||[]).includes('y')}),
  S('prType','Preparer statement','Declaración del preparador','prType',{A:'Pt8Line7_Checkbox[0]',B:'Pt8Line7_Checkbox[1]'},{no:'7',show:a=>(a.prepOn||[]).includes('y')}),
  S('prExt','Extent of representation','Alcance de la representación','ext',{X:'Pt8Line7b_Checkbox[0]',N:'Pt8Line7b_Checkbox[1]'},{no:'7.b',show:a=>(a.prepOn||[]).includes('y')&&a.prType==='B'}),
  f('g28','multi',L('Attorney or accredited representative (top of page 1)','Abogado o representante acreditado (parte superior de la página 1)'),{opts:'g28',c:{y:'CheckBox1[0]'}}),
  X('volag','Volag number (if any)','Número Volag (si tiene)','VolagNumber[0]'),
  X('barNo','Attorney State Bar number (if applicable)','Número de la barra estatal del abogado (si aplica)','AttorneyStateBarNumber[0]'),
  X('attyAcct','Attorney/representative USCIS online account number (if any)','Número de cuenta en línea de USCIS del abogado/representante (si tiene)','USCISOnlineAcctNumber[0]')]},

 {id:9,t:L('Additional information','Información adicional'),fields:[
  f('additionalInfo','textarea',L('Anything else for Part 9 (extra rows from your answers are added automatically)','Algo más para la Parte 9 (las filas adicionales de sus respuestas se agregan automáticamente)'),{p14:{part:9,item:'',page:12}})]}
];

const p14={
 name:[['Pt2Line4a_FamilyName[1]','pFamily'],['Pt2Line4b_GivenName[1]','pGiven'],['Pt2Line4c_MiddleName[1]','pMiddle'],['Pt2Line1_AlienNumber[1]','pA']],
 blocks:[3,4,5,6].map(i=>[`Pt9Line${i}a_PageNumber[0]`,`Pt9Line${i}b_PartNumber[0]`,`Pt9Line${i}c_ItemNumber[0]`,`Pt9Line${i}d_AdditionalInfo[0]`])
};
return {id:'i130',name:'I-130 Petition for Alien Relative',short:'I-130',edition:'04/01/24',expires:'02/28/2027',pdf:'i130-04-01-24.pdf',OPT,PARTS,RISK:[],RISK_INDEX:{},p14,ui:{
 disclaimer:L('This tool helps organize information for Form I-130 (edition 04/01/24). It is not legal advice and does not replace an attorney or accredited representative. Verify every answer against the official USCIS form and instructions before filing. USCIS investigates claimed relationships; falsifying a relationship or a marriage is a federal crime.','Esta herramienta ayuda a organizar información para el Formulario I-130 (edición 04/01/24). No es asesoría legal y no reemplaza a un abogado o representante acreditado. Verifique cada respuesta con el formulario e instrucciones oficiales de USCIS antes de presentar. USCIS investiga las relaciones declaradas; falsificar una relación o un matrimonio es un delito federal.'),
 pdfNote:L('Fills the official fillable I-130, edition 04/01/24 (expires 02/28/2027). Check uscis.gov/i-130 to confirm this is still the current edition. Signatures and dates are left blank for you to sign by hand.','Llena el I-130 oficial, edición 04/01/24 (vence 02/28/2027). Verifique en uscis.gov/i-130 que siga siendo la edición vigente. Las firmas y fechas quedan en blanco para firmarlas a mano.'),
 p14sheet:L('Part 9 continuation sheet','Hoja de continuación de la Parte 9'),
 p14note:L('Print this sheet, add the petitioner name and A-Number at the top, sign and date it, and attach it to the form.','Imprima esta hoja, agregue el nombre y el Número A del peticionario arriba, fírmela y féchela, y adjúntela al formulario.'),
 cap:L('rows fit on the form; extra rows go to Part 9','filas caben en el formulario; las demás van a la Parte 9'),
 pdfMiss:L('values could not be placed (see Part 9 sheet)','valores no se pudieron colocar (vea la hoja de la Parte 9)')
}};
})());
