registerForm((function(){
const OPT={
 reason:[['A',L('A. General provision (5 years as a permanent resident)','A. Disposición general (5 años como residente permanente)')],['B',L('B. Spouse of a U.S. citizen (3 years)','B. Cónyuge de ciudadano(a) de EE. UU. (3 años)')],['C',L('C. VAWA (spouse, former spouse or child of a U.S. citizen)','C. VAWA (cónyuge, excónyuge o hijo(a) de ciudadano(a))')],['D',L('D. Spouse of a U.S. citizen working abroad for a qualified employer','D. Cónyuge de ciudadano(a) que trabaja en el exterior para un empleador calificado')],['E',L('E. Military service during a period of hostilities','E. Servicio militar durante un período de hostilidades')],['F',L('F. At least one year of honorable military service','F. Al menos un año de servicio militar honorable')],['G',L('G. Other reason not listed','G. Otra razón no listada')]],
 sex:[['M',L('Male','Masculino')],['F',L('Female','Femenino')]],
 ethnicity:[['Y',L('Hispanic or Latino','Hispano o latino')],['N',L('Not Hispanic or Latino','No hispano ni latino')]],
 race:[['I',L('American Indian or Alaska Native','Indígena americano o nativo de Alaska')],['A',L('Asian','Asiático')],['B',L('Black or African American','Negro o afroamericano')],['P',L('Native Hawaiian or Other Pacific Islander','Nativo de Hawái u otro isleño del Pacífico')],['W',L('White','Blanco')]],
 eye:[['BLK',L('Black','Negros')],['BLU',L('Blue','Azules')],['BRO',L('Brown','Marrones')],['GRY',L('Gray','Grises')],['GRN',L('Green','Verdes')],['HAZ',L('Hazel','Avellana')],['MAR',L('Maroon','Granate')],['PNK',L('Pink','Rosados')],['XXX',L('Unknown/other','Desconocido/otro')]],
 hair:[['BAL',L('Bald (no hair)','Calvo (sin cabello)')],['BLK',L('Black','Negro')],['BLN',L('Blond','Rubio')],['BRO',L('Brown','Castaño')],['GRY',L('Gray','Canoso')],['RED',L('Red','Pelirrojo')],['SDY',L('Sandy','Arena')],['WHI',L('White','Blanco')],['XXX',L('Unknown/other','Desconocido/otro')]],
 unit:[['',L('None','Ninguno')],['apt',L('Apt.','Apto.')],['ste',L('Ste.','Ste.')],['flr',L('Flr.','Piso')]],
 marital:[['S',L('Single, never married','Soltero(a), nunca casado(a)')],['M',L('Married','Casado(a)')],['D',L('Divorced','Divorciado(a)')],['W',L('Widowed','Viudo(a)')],['E',L('Separated','Separado(a)')],['A',L('Marriage annulled','Matrimonio anulado')]],
 spouseCit:[['B',L('By birth in the United States','Por nacimiento en Estados Unidos')],['O',L('Other (give the date)','Otro (indique la fecha)')]],
 resides:[['resides with me',L('Resides with me','Vive conmigo')],['does not reside with me',L('Does not reside with me','No vive conmigo')],['unknown',L('Unknown','Desconocido')],['missing',L('Missing','Desaparecido')]],
 relation:[['biological son or daughter',L('Biological son or daughter','Hijo(a) biológico(a)')],['stepchild',L('Stepchild','Hijastro(a)')],['legally adopted son or daughter',L('Legally adopted son or daughter','Hijo(a) adoptado(a) legalmente')]],
 feet:['2','3','4','5','6','7','8'].map(v=>[v,{en:v,es:v}]),
 inches:['0','1','2','3','4','5','6','7','8','9','10','11'].map(v=>[v,{en:v,es:v}])
};

const isB=a=>a.reason==='B'||a.reason==='D';
const married=a=>a.marital==='M'||a.marital==='E';
const notSingle=a=>a.marital&&a.marital!=='S';
const fam=(k,en,es,o)=>f(k,'text',L(en,es),o);
const ADDR_CUR=(pfx,state,from,mailing)=>[
 f('careOf','text',L('In care of name (if any)','A/C de (si aplica)'),{t:pfx+'InCareOfName[0]'}),
 f('street','text',L('Street number and name','Número y nombre de la calle'),{req:!mailing,t:pfx+'StreetName[0]'}),
 f('unitType','select',L('Unit type','Tipo de unidad'),{opts:'unit',c:{apt:pfx+'Unit[2]',ste:pfx+'Unit[1]',flr:pfx+'Unit[0]'}}),
 f('unitNum','text',L('Unit number','Número de unidad'),{t:pfx+'Number[0]'}),
 f('city','text',L('City or town','Ciudad o pueblo'),{req:!mailing,t:pfx+'City[0]'}),
 f('state','text',L('State (2 letters, U.S. only)','Estado (2 letras, solo EE. UU.)'),{d:state,up:1}),
 f('zip','text',L('ZIP code','Código ZIP'),{t:pfx+'ZipCode[0]',dg:1}),
 f('province','text',L('Province (outside U.S.)','Provincia (fuera de EE. UU.)'),{t:pfx+'Province[0]'}),
 f('postal','text',L('Postal code (outside U.S.)','Código postal (fuera de EE. UU.)'),{t:pfx+'PostalCode[0]'}),
 f('country','text',L('Country','País'),{req:!mailing,t:pfx+'Country[0]'})
].concat(from?[f('from','date',L('Lived here from','Vive aquí desde'),{req:1,t:from})]:[]);

const PARTS=[
 {id:1,t:L('Information about your eligibility','Información sobre su elegibilidad'),fields:[
  f('reason','select',L('Reason for filing','Motivo de la solicitud'),{no:'1',opts:'reason',req:1,c:{A:'Part1_Eligibility[2]',B:'Part1_Eligibility[1]',C:'Part1_Eligibility[0]',D:'Part1_Eligibility[6]',E:'Part1_Eligibility[3]',F:'Part1_Eligibility[4]',G:'Part1_Eligibility[5]'}}),
  f('reasonD','text',L('USCIS field office for the interview (only if your residence is outside the U.S.)','Oficina de USCIS para la entrevista (solo si reside fuera de EE. UU.)'),{show:a=>a.reason==='D',d:'DropDownList1[0]',fuzzy:1}),
  f('reasonG','text',L('Explain the other reason','Explique la otra razón'),{show:a=>a.reason==='G',t:'Part1Line5_OtherExplain[0]'}),
  f('aNumber','text',L('A-Number (9 digits)','Número A (9 dígitos)'),{req:1,dg:1,help:L('Shown at the top of every page of the form.','Aparece arriba en cada página del formulario.'),tf:(v)=>Array.from({length:14},(_,i)=>[`Line1_AlienNumber[${i}]`,v])})]},
 {id:2,t:L('Information about you','Información sobre usted'),fields:[
  fam('familyName','Family name (last)','Apellido',{no:'1',req:1,t:'P2_Line1_FamilyName[0]',tf2:['P2_Line1_FamilyName[1]']}),
  fam('givenName','Given name (first)','Nombre',{no:'1',req:1,t:'P2_Line1_GivenName[0]',tf2:['P2_Line1_GivenName[1]']}),
  fam('middleName','Middle name','Segundo nombre',{no:'1',t:'P2_Line1_MiddleName[0]',tf2:['P2_Line1_MiddleName[1]']}),
  f('otherNamesUsed','yesno',L('Have you used other names since birth (include maiden names, aliases)?','¿Ha usado otros nombres desde su nacimiento (incluya apellido de soltera, alias)?'),{no:'2'}),
  f('otherNames','list',L('Other names used','Otros nombres usados'),{no:'2',show:a=>a.otherNamesUsed==='yes',min:1,cap:2,part:2,page:1,item:[
    f('family','text',L('Family name','Apellido'),{t:['Line2_FamilyName1[0]','Line2_FamilyName2[0]']}),
    f('given','text',L('Given name','Nombre'),{t:['Line3_GivenName1[0]','Line3_GivenName2[0]']}),
    f('middle','text',L('Middle name','Segundo nombre'),{t:['Line3_MiddleName1[0]','Line3_MiddleName2[0]']})]}),
  f('nameChange','yesno',L('Would you like to legally change your name?','¿Desea cambiar legalmente su nombre?'),{no:'3',y:'P2_Line34_NameChange'}),
  fam('newFamily','New family name','Nuevo apellido',{no:'3',show:a=>a.nameChange==='yes',t:'Part2Line3_FamilyName[0]'}),
  fam('newGiven','New given name','Nuevo nombre',{no:'3',show:a=>a.nameChange==='yes',t:'Part2Line4a_GivenName[0]'}),
  fam('newMiddle','New middle name','Nuevo segundo nombre',{no:'3',show:a=>a.nameChange==='yes',t:'Part2Line4a_MiddleName[0]'}),
  fam('uscisAccount','USCIS online account number (if any)','Número de cuenta en línea de USCIS (si tiene)',{no:'4',t:'P2_Line6_USCISELISAcctNumber[0]',dg:1}),
  f('sex','select',L('Sex','Sexo'),{no:'5',opts:'sex',req:1,c:{M:'P2_Line7_Gender[0]',F:'P2_Line7_Gender[1]'}}),
  f('dob','date',L('Date of birth','Fecha de nacimiento'),{no:'6',req:1,t:'P2_Line8_DateOfBirth[0]'}),
  f('otherDobs','text',L('Other dates of birth you have ever used (if any)','Otras fechas de nacimiento que haya usado (si hay)'),{no:'6',p14:{part:2,item:'6',page:2}}),
  f('lprDate','date',L('Date you became a lawful permanent resident','Fecha en que se hizo residente permanente legal'),{no:'7',req:1,t:'P2_Line9_DateBecamePermanentResident[0]'}),
  fam('countryBirth','Country of birth','País de nacimiento',{no:'8',req:1,t:'P2_Line10_CountryOfBirth[0]'}),
  fam('countryNat','Country of citizenship or nationality','País de ciudadanía o nacionalidad',{no:'9',req:1,t:'P2_Line11_CountryOfNationality[0]'}),
  fam('moreNat','Other countries of nationality (if any)','Otros países de nacionalidad (si hay)',{no:'9',p14:{part:2,item:'9',page:2}}),
  f('parentUSC','yesno',L('Was your mother or father (including adoptive) a U.S. citizen before your 18th birthday? If Yes, you may already be a citizen; talk to an attorney before filing.','¿Su madre o padre (incluso adoptivo) era ciudadano(a) de EE. UU. antes de sus 18 años? Si es Sí, quizá ya sea ciudadano(a); consulte a un abogado antes de presentar.'),{no:'10',req:1,y:'P2_Line10_claimdisability'}),
  f('disability','yesno',L('Do you have a physical, developmental or mental impairment that prevents you from showing English or civics knowledge? (If Yes, Form N-648 is needed.)','¿Tiene un impedimento físico, del desarrollo o mental que le impide demostrar conocimiento de inglés o educación cívica? (Si es Sí, se necesita el Formulario N-648.)'),{no:'11',req:1,y:'P2_Line11_claimdisability'}),
  f('ssaUpdate','yesno',L('Do you want SSA to issue or replace your Social Security card and update your status when you are naturalized?','¿Desea que SSA emita o reemplace su tarjeta de Seguro Social y actualice su estatus cuando se naturalice?'),{no:'12.a',req:1,y:'Line12a_Checkbox'}),
  fam('ssn','Social Security number','Número de Seguro Social',{no:'12.b',show:a=>a.ssaUpdate==='yes',t:'Line12b_SSN[0]',dg:1}),
  f('ssaConsent','yesno',L('Consent to disclose information to SSA (must be Yes if you answered Yes to 12.a)','Consentimiento para divulgar información a SSA (debe ser Sí si respondió Sí en 12.a)'),{no:'12.c',show:a=>a.ssaUpdate==='yes',y:'Line12.c_Checkbox'})]},
 {id:3,t:L('Biographic information','Información biográfica'),fields:[
  f('ethnicity','select',L('Ethnicity','Origen étnico'),{no:'1',opts:'ethnicity',req:1,c:{Y:'P7_Line1_Ethnicity[1]',N:'P7_Line1_Ethnicity[0]'}}),
  f('race','multi',L('Race (select all that apply)','Raza (seleccione todas las que apliquen)'),{no:'2',opts:'race',req:1,c:{I:'P7_Line2_Race[0]',A:'P7_Line2_Race[1]',B:'P7_Line2_Race[2]',P:'P7_Line2_Race[3]',W:'P7_Line2_Race[4]'}}),
  f('heightFt','select',L('Height (feet)','Estatura (pies)'),{no:'3',opts:'feet',req:1,d:'P7_Line3_HeightFeet[0]'}),
  f('heightIn','select',L('Height (inches)','Estatura (pulgadas)'),{no:'3',opts:'inches',req:1,d:'P7_Line3_HeightInches[0]'}),
  f('weight','number',L('Weight (pounds)','Peso (libras)'),{no:'4',req:1,tf:(v)=>{const s=String(Math.max(0,Math.min(999,Math.round(+v)))).padStart(3,' ');return [['P7_Line4_Pounds1[0]',s[0]],['P7_Line4_Pounds2[0]',s[1]],['P7_Line4_Pounds3[0]',s[2]]].filter(x=>x[1].trim())}}),
  f('eye','select',L('Eye color','Color de ojos'),{no:'5',opts:'eye',req:1,c:{BLK:'P7_Line5_Eye[5]',BLU:'P7_Line5_Eye[1]',BRO:'P7_Line5_Eye[0]',GRY:'P7_Line5_Eye[4]',GRN:'P7_Line5_Eye[2]',HAZ:'P7_Line5_Eye[3]',MAR:'P7_Line5_Eye[7]',PNK:'P7_Line5_Eye[6]',XXX:'P7_Line5_Eye[8]'}}),
  f('hair','select',L('Hair color','Color de cabello'),{no:'6',opts:'hair',req:1,c:{BAL:'P7_Line6_Hair[0]',BLK:'P7_Line6_Hair[7]',BLN:'P7_Line6_Hair[5]',BRO:'P7_Line6_Hair[6]',GRY:'P7_Line6_Hair[4]',RED:'P7_Line6_Hair[2]',SDY:'P7_Line6_Hair[1]',WHI:'P7_Line6_Hair[3]',XXX:'P7_Line6_Hair[8]'}})]},
 {id:4,t:L('Information about your residence','Información sobre su residencia'),fields:[
  f('curAddr','group',L('Current physical address (Item 1)','Dirección física actual (Ítem 1)'),{no:'1',sub:ADDR_CUR('P4_Line1_','P4_Line1_State[0]','P4_Line1_DatesofResidence[1]',false)}),
  f('prevAddr','list',L('Previous addresses for the required period (most recent first)','Direcciones anteriores del período requerido (la más reciente primero)'),{no:'1',cap:3,part:4,page:3,help:L('Last 5 years (3 if filing as spouse of a U.S. citizen). Go back to the date you became a permanent resident if that is more recent.','Últimos 5 años (3 si solicita como cónyuge de ciudadano). Retroceda hasta la fecha de residencia permanente si es más reciente.'),item:[
    f('street','text',L('Street address','Dirección'),{t:rows('P4_Line3_PhysicalAddress',3)}),
    f('city','text',L('City or town','Ciudad o pueblo'),{t:rows('P4_Line3_CityTown',3)}),
    f('state','text',L('State / province','Estado / provincia'),{t:rows('P4_Line3_State',3)}),
    f('zip','text',L('ZIP / postal code','Código ZIP / postal'),{t:rows('P4_Line3_ZipCode',3)}),
    f('country','text',L('Country','País'),{t:rows('P4_Line3_Country',3)}),
    f('from','date',L('From','Desde'),{t:rows('P4_Line3_From',3)}),
    f('to','date',L('To','Hasta'),{t:['P4_Line3_From1[1]','P4_Line3_To2[0]','P4_Line3_To3[0]']})]}),
  f('mailingSame','yesno',L('Is your current physical address also your mailing address?','¿Su dirección física actual es también su dirección postal?'),{no:'2',req:1,y:'Pt3_Line2a_Checkbox'}),
  f('mailAddr','group',L('Current mailing address (Item 3)','Dirección postal actual (Ítem 3)'),{no:'3',show:a=>a.mailingSame==='no',sub:ADDR_CUR('P5_Line1b_','P4_Line1_State[1]',null,true)})]},
 {id:5,t:L('Marital history','Historial matrimonial'),fields:[
  f('marital','select',L('Current marital status','Estado civil actual'),{no:'1',opts:'marital',req:1,c:{S:'P10_Line1_MaritalStatus[1]',M:'P10_Line1_MaritalStatus[3]',D:'P10_Line1_MaritalStatus[0]',W:'P10_Line1_MaritalStatus[2]',E:'P10_Line1_MaritalStatus[5]',A:'P10_Line1_MaritalStatus[4]'}}),
  f('spouseForces','yesno',L('If married, is your spouse a current member of the U.S. armed forces?','Si está casado(a), ¿su cónyuge es miembro actual de las fuerzas armadas de EE. UU.?'),{no:'2',show:married,y:'P7_Line2_Forces'}),
  f('timesMarried','number',L('How many times have you been married?','¿Cuántas veces se ha casado?'),{no:'3',show:notSingle,t:'Part9Line3_TimesMarried[0]',dg:1}),
  fam('spFamily','Spouse family name','Apellido del cónyuge',{no:'4.a',show:a=>isB(a)&&married(a),req:1,t:'P10_Line4a_FamilyName[0]'}),
  fam('spGiven','Spouse given name','Nombre del cónyuge',{no:'4.a',show:a=>isB(a)&&married(a),req:1,t:'P10_Line4a_GivenName[0]'}),
  fam('spMiddle','Spouse middle name','Segundo nombre del cónyuge',{no:'4.a',show:a=>isB(a)&&married(a),t:'P10_Line4a_MiddleName[0]'}),
  f('spDob','date',L('Spouse date of birth','Fecha de nacimiento del cónyuge'),{no:'4.b',show:a=>isB(a)&&married(a),t:'P10_Line4d_DateofBirth[0]'}),
  f('spMarriage','date',L('Date you entered into marriage with your current spouse','Fecha en que se casó con su cónyuge actual'),{no:'4.c',show:a=>isB(a)&&married(a),t:'P10_Line4e_DateEnterMarriage[0]'}),
  f('spAddrSame','yesno',L('Is your spouse\'s physical address the same as yours? (If No, the address goes in Part 14.)','¿La dirección física de su cónyuge es la misma que la suya? (Si es No, la dirección va en la Parte 14.)'),{no:'4.d',show:a=>isB(a)&&married(a),y:'P10_Line5_Citizen'}),
  f('spAddr','text',L('Spouse\'s address (goes to Part 14)','Dirección del cónyuge (va a la Parte 14)'),{no:'4.d',show:a=>isB(a)&&married(a)&&a.spAddrSame==='no',p14:{part:5,item:'4.d',page:4}}),
  f('spCitHow','select',L('When did your spouse become a U.S. citizen?','¿Cuándo se hizo ciudadano(a) su cónyuge?'),{no:'5.a',show:a=>isB(a)&&married(a),opts:'spouseCit',c:{B:'P10_Line5a_When[0]',O:'P10_Line5a_When[1]'}}),
  f('spCitDate','date',L('Date your spouse became a U.S. citizen','Fecha en que su cónyuge se hizo ciudadano(a)'),{no:'5.b',show:a=>isB(a)&&married(a)&&a.spCitHow==='O',t:'P10_Line5b_DateBecame[0]'}),
  fam('spA','Spouse A-Number (if any)','Número A del cónyuge (si tiene)',{no:'6',show:a=>isB(a)&&married(a),t:'P7_Line6_ANumber[0]',dg:1}),
  f('spTimes','number',L('How many times has your spouse been married?','¿Cuántas veces se ha casado su cónyuge?'),{no:'7',show:a=>isB(a)&&married(a),t:'P10_Line4g_Employer[0]',dg:1}),
  fam('spEmployer','Spouse\'s current employer (only if filing under D)','Empleador actual del cónyuge (solo si solicita bajo D)',{no:'8',show:a=>a.reason==='D'&&married(a),t:'TextField1[0]'})]},
 {id:6,t:L('Children','Hijos'),fields:[
  f('childCount','number',L('Total number of children under 18','Número total de hijos menores de 18 años'),{no:'1',req:1,t:'P11_Line1_TotalChildren[0]',dg:1}),
  f('children','list',L('Your children (any age, name and details)','Sus hijos (cualquier edad, nombre y detalles)'),{no:'2',cap:3,part:6,page:5,show:a=>+a.childCount>0,item:[
    f('name','text',L('First and family name','Nombre y apellido'),{t:rows('P7_EmployerName',3)}),
    f('dob','date',L('Date of birth','Fecha de nacimiento'),{t:rows('P7_From',3)}),
    f('resides','select',L('Residence','Residencia'),{opts:'resides',t:['P7_OccupationFieldStudy1[0]','P7_OccupationFieldStudy2[0]','P7_OccupationFieldStudy3[0]']}),
    f('relation','select',L('Relationship','Relación'),{opts:'relation',t:['P7_OccupationFieldStudy1[1]','P7_OccupationFieldStudy2[1]','P7_OccupationFieldStudy3[1]']}),
    f('support','yesno',L('Are you providing support?','¿Le da manutención?'),{y:['P9_Line5a','P6_ChildTwo','P6_ChildThree']})]})]},
 {id:7,t:L('Employment and schools','Empleo y escuelas'),fields:[
  f('employment','list',L('Employment and schools for the required period (row 1 = current or most recent)','Empleo y escuelas del período requerido (fila 1 = actual o más reciente)'),{no:'1',min:1,cap:3,part:7,page:5,help:L('Include unemployment ("unemployed"), self-employment ("self-employed"), retirement ("retired"). Row 1 prints "PRESENT" as the end date.','Incluya desempleo ("unemployed"), trabajo por cuenta propia ("self-employed"), jubilación ("retired"). La fila 1 imprime "PRESENT" como fecha final.'),item:[
    f('name','text',L('Employer or school name','Nombre del empleador o escuela'),{req:1,t:rows('P5_EmployerName',3)}),
    f('city','text',L('City or town','Ciudad o pueblo'),{t:rows('P7_City',3)}),
    f('state','text',L('State / province','Estado / provincia'),{t:rows('P7_State',3)}),
    f('zip','text',L('ZIP / postal code','Código ZIP / postal'),{t:rows('P7_ZipCode',3)}),
    f('country','text',L('Country','País'),{t:rows('P7_Country',3)}),
    f('from','date',L('From','Desde'),{t:['P7_From1[1]','P7_From2[1]','P7_From3[1]']}),
    f('to','date',L('To (blank for row 1)','Hasta (vacío en la fila 1)'),{t:[null,'P7_To2[0]','P7_To3[0]']}),
    f('occ','text',L('Occupation / field of study','Ocupación / campo de estudio'),{t:['P7_OccupationFieldStudy1[2]','P7_OccupationFieldStudy2[2]','P7_OccupationFieldStudy3[2]']})]})]},
 {id:8,t:L('Time outside the United States','Tiempo fuera de EE. UU.'),fields:[
  f('anyTrips','yesno',L('Have you taken trips outside the U.S. of 24 hours or more during the required period?','¿Ha hecho viajes fuera de EE. UU. de 24 horas o más durante el período requerido?'),{no:'1',req:1}),
  f('trips','list',L('Trips (most recent first)','Viajes (el más reciente primero)'),{no:'1',show:a=>a.anyTrips==='yes',min:1,cap:6,part:8,page:6,item:[
    f('out','date',L('Date you left','Fecha de salida'),{req:1,t:rows('P8_Line1_DateLeft',6)}),
    f('back','date',L('Date you returned','Fecha de regreso'),{req:1,t:rows('P8_Line1_DateReturn',6)}),
    f('countries','text',L('Countries traveled to','Países visitados'),{t:['P9_Line1_Countries1[0]'].concat(rows('P8_Line1_Countries',6).slice(1))})]})]},
 {id:9,t:L('Additional information about you','Información adicional sobre usted'),risk:1,fields:[]},
 {id:10,t:L('Fee reduction','Reducción de tarifa'),fields:[
  f('feeReduce','yesno',L('Is your household income 400% of the Federal Poverty Guidelines or less?','¿Su ingreso familiar es igual o menor al 400% de las Guías Federales de Pobreza?'),{no:'1',y:'P10_Line1_Citizen'}),
  f('feeIncome','text',L('Total household income','Ingreso total del hogar'),{no:'2',show:a=>a.feeReduce==='yes',t:'P10_Line2_TotalHouseholdIn[0]',dg:1}),
  f('feeSize','number',L('Household size','Tamaño del hogar'),{no:'3',show:a=>a.feeReduce==='yes',t:'P10_Line3_HouseHoldSize[0]',dg:1}),
  f('feeEarners','number',L('Household members earning income (including you)','Miembros del hogar con ingresos (incluyéndolo)'),{no:'4',show:a=>a.feeReduce==='yes',t:'P11_Line1_TotalChildren[1]',dg:1}),
  f('feeHead','yesno',L('Are you the head of household?','¿Es usted el jefe(a) del hogar?'),{no:'5.a',show:a=>a.feeReduce==='yes',y:'P10_Line5a'}),
  fam('feeHeadName','Name of head of household','Nombre del jefe(a) del hogar',{no:'5.b',show:a=>a.feeReduce==='yes'&&a.feeHead==='no',t:'P10_Line5b_NameOfHousehold[0]'})]},
 {id:11,t:L('Your contact information','Su información de contacto'),fields:[
  fam('phone','Daytime telephone','Teléfono de día',{no:'1',req:1,t:'P12_Line3_Telephone[0]',dg:1}),
  fam('mobile','Mobile telephone (if any)','Teléfono móvil (si tiene)',{no:'2',t:'P12_Line3_Mobile[0]',dg:1}),
  fam('email','Email (if any)','Correo electrónico (si tiene)',{no:'3',t:'P12_Line5_Email[0]'})]},
 {id:12,t:L('Interpreter','Intérprete'),fields:[
  f('needsInterpreter','yesno',L('Did an interpreter help you read the form in a language you are fluent in?','¿Un intérprete le ayudó a leer el formulario en un idioma en que usted es fluido(a)?'),{}),
  fam('inFamily','Interpreter family name','Apellido del intérprete',{show:a=>a.needsInterpreter==='yes',t:'P14_Line1_nterpreterFamilyName[0]'}),
  fam('inGiven','Interpreter given name','Nombre del intérprete',{show:a=>a.needsInterpreter==='yes',t:'P14_Line1_nterpreterGivenName[0]'}),
  fam('inOrg','Interpreter business or organization','Negocio u organización del intérprete',{show:a=>a.needsInterpreter==='yes',t:'P14_Line2_NameofBusinessorOrgName[0]'}),
  fam('inPhone','Interpreter daytime telephone','Teléfono de día del intérprete',{show:a=>a.needsInterpreter==='yes',t:'P14_Line4_Telephone[0]',dg:1}),
  fam('inMobile','Interpreter mobile telephone','Teléfono móvil del intérprete',{show:a=>a.needsInterpreter==='yes',t:'P14_Line5_Mobile[0]',dg:1}),
  fam('inEmail','Interpreter email','Correo del intérprete',{show:a=>a.needsInterpreter==='yes',t:'P14_Line5_EmailAddress[0]'}),
  fam('inLang','Language the interpreter used','Idioma que usó el intérprete',{show:a=>a.needsInterpreter==='yes',t:'P14_NameOfLanguage[0]'})]},
 {id:13,t:L('Preparer (if not the applicant)','Preparador (si no es el solicitante)'),fields:[
  f('preparedBy','yesno',L('Was this application prepared by someone other than the applicant?','¿Esta solicitud fue preparada por alguien que no es el solicitante?'),{}),
  fam('prFamily','Preparer family name','Apellido del preparador',{show:a=>a.preparedBy==='yes',t:'P15_Line1_PreparerFamilyName[0]'}),
  fam('prGiven','Preparer given name','Nombre del preparador',{show:a=>a.preparedBy==='yes',t:'P15_Line1_PreparerGivenName[0]'}),
  fam('prOrg','Preparer business or organization','Negocio u organización del preparador',{show:a=>a.preparedBy==='yes',t:'P15_Line2_NameofBusinessorOrgName[0]'}),
  fam('prPhone','Preparer daytime telephone','Teléfono de día del preparador',{show:a=>a.preparedBy==='yes',t:'P15_Line4_Telephone[0]',dg:1}),
  fam('prMobile','Preparer mobile telephone','Teléfono móvil del preparador',{show:a=>a.preparedBy==='yes',t:'P15_Line5_Mobile[0]',dg:1}),
  fam('prEmail','Preparer email','Correo del preparador',{show:a=>a.preparedBy==='yes',t:'P15_Line6_Email[0]'})]},
 {id:14,t:L('Additional information','Información adicional'),fields:[
  f('additionalInfo','textarea',L('Anything else for Part 14 (explanations from your answers are added automatically)','Algo más para la Parte 14 (las explicaciones de sus respuestas se agregan automáticamente)'),{p14:{part:14,item:'',page:13}})]}
];

const R=(id,base,adv,w,en,es,o={})=>({id,base,adv,w,en,es,page:o.page,show:o.show,expl:o.expl!==false});
const P=(a,k)=>a['q_'+k];
const RISK=[
 R('1','P9_Line1','yes',35,'Have you EVER claimed to be a U.S. citizen (in writing or any other way)?','¿Alguna vez ha afirmado ser ciudadano(a) de EE. UU. (por escrito o de otra forma)?',{page:6}),
 R('2','P9_Line2','yes',30,'Have you EVER registered to vote or voted in any federal, state or local election in the U.S.? (If you voted only in a local election where noncitizens may lawfully vote, you may answer No.)','¿Alguna vez se registró para votar o votó en alguna elección federal, estatal o local en EE. UU.? (Si votó solo en una elección local donde los no ciudadanos pueden votar legalmente, puede responder No.)',{page:6}),
 R('3','P9_Line3','yes',15,'Do you currently owe any overdue federal, state or local taxes in the U.S.?','¿Actualmente debe impuestos federales, estatales o locales vencidos en EE. UU.?',{page:6}),
 R('4','P9_Line4','yes',20,'Since becoming a permanent resident, have you called yourself a "nonresident alien" on a tax return, or decided not to file because you considered yourself a nonresident?','Desde que es residente permanente, ¿se ha declarado "extranjero no residente" en una declaración de impuestos o decidió no presentarla por considerarse no residente?',{page:6}),
 R('5a','P9_5a','yes',30,'EVER a member of, involved in, or in any way associated with any Communist or totalitarian party anywhere in the world?','¿Alguna vez fue miembro, participó o estuvo asociado de cualquier forma con algún partido comunista o totalitario en cualquier parte del mundo?',{page:6}),
 R('5b','P9_5b','yes',30,'EVER advocated, or been a member of / involved with / associated with a group anywhere that advocated: opposition to all organized government; world communism; a totalitarian dictatorship in the U.S.; overthrow of the U.S. government by force or unconstitutional means; unlawful assault or killing of government officers; unlawful damage or destruction of property; or sabotage?','¿Alguna vez promovió, o fue miembro / participó / estuvo asociado con un grupo en cualquier lugar que promoviera: oposición a todo gobierno organizado; comunismo mundial; una dictadura totalitaria en EE. UU.; derrocar al gobierno de EE. UU. por la fuerza o medios inconstitucionales; agresión o asesinato ilegal de funcionarios; daño o destrucción ilegal de propiedad; o sabotaje?',{page:6}),
 R('6a','P12_6a','yes',80,'EVER a member of, involved with, or associated with — or given money, things of value, services, labor or other help to — a group that used a weapon or explosive to harm a person or damage property?','¿Alguna vez fue miembro, participó o estuvo asociado — o dio dinero, cosas de valor, servicios, trabajo u otra ayuda — a un grupo que usó un arma o explosivo para dañar a una persona o propiedad?',{page:7}),
 R('6b','P12_6b','yes',80,'…a group that took part in kidnapping, assassination, hijacking or sabotage of an airplane, ship, vehicle or other transport?','…un grupo que participó en secuestro, asesinato, desvío o sabotaje de un avión, barco, vehículo u otro transporte?',{page:7}),
 R('6c','P12_6c','yes',80,'…a group that threatened, attempted, conspired, prepared, planned, advocated or incited others to commit the acts in 6.a or 6.b?','…un grupo que amenazó, intentó, conspiró, preparó, planificó, promovió o incitó a otros a cometer los actos de 6.a o 6.b?',{page:7}),
 R('7a','P9_Line7a','yes',90,'EVER ordered, incited, called for, committed, assisted or participated in: torture?','¿Alguna vez ordenó, incitó, pidió, cometió, ayudó o participó en: tortura?',{page:7}),
 R('7b','P9_Line7.b.','yes',90,'…genocide?','…genocidio?',{page:7}),
 R('7c','P9_Line7.c','yes',90,'…killing or trying to kill any person?','…matar o intentar matar a alguna persona?',{page:7}),
 R('7d','P11_7d','yes',60,'…intentionally and severely injuring or trying to injure any person?','…lesionar intencional y gravemente o intentar lesionar a alguna persona?',{page:7}),
 R('7e','P9_Line7.e','yes',70,'…any sexual contact or activity with a person who did not consent or could not consent, or was forced or threatened by you or someone else?','…cualquier contacto o actividad sexual con una persona que no consintió o no podía consentir, o fue forzada o amenazada por usted o por otra persona?',{page:7}),
 R('7f','P9_Line7.f','yes',60,'…not letting someone practice his or her religion?','…no permitir que alguien practique su religión?',{page:7}),
 R('7g','P9_Line7.g','yes',60,'…causing harm or suffering to any person because of race, religion, national origin, membership in a social group or political opinion?','…causar daño o sufrimiento a una persona por su raza, religión, origen nacional, pertenencia a un grupo social u opinión política?',{page:7}),
 R('8a','P9_Line8a','yes',35,'EVER served in, been a member of, assisted or participated in any military or police unit?','¿Alguna vez sirvió, fue miembro, ayudó o participó en alguna unidad militar o policial?',{page:7}),
 R('8b','P9_Line8b','yes',40,'EVER served in, been a member of, assisted or participated in any armed group (paramilitary, self-defense, vigilante, rebel, guerrilla)?','¿Alguna vez sirvió, fue miembro, ayudó o participó en algún grupo armado (paramilitar, de autodefensa, vigilante, rebelde, guerrillero)?',{page:7}),
 R('9','P9_Line9','yes',40,'EVER worked, volunteered or served where people were detained (prison, jail, prison camp, detention facility, labor camp), or directed or took part in detaining people?','¿Alguna vez trabajó, fue voluntario(a) o sirvió donde se detenía a personas (prisión, cárcel, campo de prisioneros, centro de detención, campo de trabajo), o dirigió o participó en detener personas?',{page:7}),
 R('10a','P9_Line10a','yes',40,'EVER part of, or helped, any group, unit or organization that used a weapon against any person or threatened to do so?','¿Alguna vez fue parte de, o ayudó a, algún grupo, unidad u organización que usó un arma contra alguna persona o amenazó con hacerlo?',{page:7}),
 R('10b','P9_Line10b','yes',60,'If 10.a is Yes: did you ever use a weapon against another person?','Si 10.a es Sí: ¿alguna vez usó un arma contra otra persona?',{page:7,show:a=>P(a,'10a')==='yes'}),
 R('10c','P9_Line10c','yes',50,'If 10.a is Yes: did you ever threaten another person that you would use a weapon against them?','Si 10.a es Sí: ¿alguna vez amenazó a otra persona con usar un arma contra ella?',{page:7,show:a=>P(a,'10a')==='yes'}),
 R('11','P9_Line11','yes',60,'EVER sold, provided or transported weapons, or helped anyone do so, knowing or believing they would be used against another person?','¿Alguna vez vendió, proporcionó o transportó armas, o ayudó a alguien a hacerlo, sabiendo o creyendo que se usarían contra otra persona?',{page:7}),
 R('12','P9_Line12','yes',25,'EVER received weapons training, paramilitary training or other military-type training?','¿Alguna vez recibió entrenamiento con armas, paramilitar u otro tipo de entrenamiento militar?',{page:7}),
 R('13','P9_Line13','yes',80,'EVER recruited, enlisted, conscripted or used any person under 15 to serve in or help an armed group, or tried to or worked with others to do so?','¿Alguna vez reclutó, alistó, reclutó a la fuerza o usó a una persona menor de 15 años para servir o ayudar a un grupo armado, o intentó o trabajó con otros para hacerlo?',{page:7}),
 R('14','P9_Line14','yes',80,'EVER used any person under 15 to take part in hostilities (including combat support such as messenger or transporting supplies), or tried to or worked with others to do so?','¿Alguna vez usó a una persona menor de 15 años para participar en hostilidades (incluso apoyo al combate como mensajero o transporte de suministros), o intentó o trabajó con otros para hacerlo?',{page:7}),
 R('15a','P9_Line15a','yes',30,'EVER committed, agreed to commit, asked someone else to commit, helped commit, or tried to commit a crime or offense for which you were NOT arrested?','¿Alguna vez cometió, acordó cometer, pidió a otro cometer, ayudó a cometer o intentó cometer un delito o infracción por el cual NO fue arrestado(a)?',{page:8,expl:false}),
 R('15b','P9_Line15b','yes',35,'EVER arrested, cited, detained or confined by any law enforcement, military or immigration official for any reason, or charged with a crime or offense? (Include sealed, expunged or cleared records, offenses under 18, DUI and domestic violence.)','¿Alguna vez fue arrestado(a), citado(a), detenido(a) o confinado(a) por cualquier autoridad policial, militar o de inmigración por cualquier motivo, o acusado(a) de un delito o infracción? (Incluya registros sellados, borrados o aclarados, ofensas antes de los 18 años, DUI y violencia doméstica.)',{page:8,expl:false}),
 R('16','P12_Line16','no',30,'If you received a suspended sentence, probation or parole: have you completed it?','Si recibió una sentencia suspendida, libertad condicional o libertad bajo palabra: ¿la ha cumplido?',{page:8,show:a=>P(a,'15a')==='yes'||P(a,'15b')==='yes'}),
 R('17a','P11_Line17A','yes',25,'EVER engaged in prostitution, tried to procure prostitutes, or received money from prostitution?','¿Alguna vez se dedicó a la prostitución, intentó conseguir prostitutas o recibió dinero de la prostitución?',{page:9}),
 R('17b','P11_Line17B','yes',35,'EVER manufactured, produced, distributed, sold or smuggled controlled substances, illegal drugs, narcotics or drug paraphernalia in violation of any law?','¿Alguna vez fabricó, produjo, distribuyó, vendió o contrabandeó sustancias controladas, drogas ilegales, narcóticos o parafernalia de drogas violando alguna ley?',{page:9}),
 R('17c','P11_Line17C','yes',25,'EVER been married to more than one person at the same time?','¿Alguna vez estuvo casado(a) con más de una persona al mismo tiempo?',{page:9}),
 R('17d','P12_Line17d','yes',45,'EVER married someone to obtain an immigration benefit?','¿Alguna vez se casó con alguien para obtener un beneficio migratorio?',{page:9}),
 R('17e','P12_Line17e','yes',45,'EVER helped anyone enter, or try to enter, the U.S. illegally?','¿Alguna vez ayudó a alguien a entrar, o intentar entrar, ilegalmente a EE. UU.?',{page:9}),
 R('17f','P12_Line17f','yes',20,'EVER gambled illegally or received income from illegal gambling?','¿Alguna vez apostó ilegalmente o recibió ingresos de apuestas ilegales?',{page:9}),
 R('17g','P12_Line17g','yes',20,'EVER failed to support your dependents (child support) or to pay court-ordered alimony?','¿Alguna vez dejó de mantener a sus dependientes (manutención de hijos) o de pagar la pensión alimenticia ordenada por un tribunal?',{page:9}),
 R('17h','P12_Line17h','yes',30,'EVER made any misrepresentation to obtain any public benefit in the U.S.?','¿Alguna vez hizo alguna tergiversación para obtener un beneficio público en EE. UU.?',{page:9}),
 R('18','P12_Line18','yes',40,'EVER given any U.S. government official any information or documentation that was false, fraudulent or misleading?','¿Alguna vez dio a algún funcionario del gobierno de EE. UU. información o documentación falsa, fraudulenta o engañosa?',{page:9}),
 R('19','P12_Line19','yes',40,'EVER lied to any U.S. government official to gain entry or admission into the U.S. or to gain immigration benefits while in the U.S.?','¿Alguna vez mintió a algún funcionario del gobierno de EE. UU. para obtener entrada o admisión a EE. UU. o beneficios migratorios mientras estaba en EE. UU.?',{page:9}),
 R('20','P12_Line20','yes',55,'EVER been placed in removal, rescission or deportation proceedings?','¿Alguna vez estuvo en procedimientos de remoción, rescisión o deportación?',{page:9}),
 R('21','P12_Line21','yes',60,'EVER been removed or deported from the U.S.?','¿Alguna vez fue removido(a) o deportado(a) de EE. UU.?',{page:9}),
 R('22a','P9_Line22a','yes',0,'Are you a male who lived in the U.S. at any time between your 18th and 26th birthdays? (Do not select Yes if you were a lawful nonimmigrant that whole time.)','¿Es usted hombre y vivió en EE. UU. en algún momento entre sus 18 y 26 años? (No marque Sí si fue no inmigrante legal todo ese tiempo.)',{page:9,expl:false}),
 R('22b','Pt9_Line22b','no',30,'If 22.a is Yes: did you register for the Selective Service?','Si 22.a es Sí: ¿se registró en el Servicio Selectivo?',{page:9,show:a=>P(a,'22a')==='yes'}),
 R('23','P12_Line23','yes',25,'EVER left the U.S. to avoid being drafted into the U.S. armed forces?','¿Alguna vez salió de EE. UU. para evitar ser reclutado(a) en las fuerzas armadas de EE. UU.?',{page:9}),
 R('24','P12_Line24','yes',30,'EVER applied for any kind of exemption from military service in the U.S. armed forces?','¿Alguna vez solicitó algún tipo de exención del servicio militar en las fuerzas armadas de EE. UU.?',{page:9}),
 R('25','P12_Line25','yes',0,'EVER served in the U.S. armed forces?','¿Alguna vez sirvió en las fuerzas armadas de EE. UU.?',{page:9,expl:false}),
 R('26a','P12_Line26a','yes',0,'Are you currently a member of the U.S. armed forces?','¿Es actualmente miembro de las fuerzas armadas de EE. UU.?',{page:10,expl:false,show:a=>P(a,'25')==='yes'}),
 R('26b','P12_Line26b','yes',0,'If 26.a is Yes: are you scheduled to deploy outside the U.S. within the next 3 months?','Si 26.a es Sí: ¿está programado(a) para desplegarse fuera de EE. UU. en los próximos 3 meses?',{page:10,expl:false,show:a=>P(a,'26a')==='yes'}),
 R('26c','P12_Line26c','yes',0,'If 26.a is Yes: are you currently stationed outside the U.S.?','Si 26.a es Sí: ¿está actualmente destacado(a) fuera de EE. UU.?',{page:10,expl:false,show:a=>P(a,'26a')==='yes'}),
 R('26d','P11_Line26d','yes',0,'If 26.a is No: are you a former U.S. service member currently residing outside the U.S.?','Si 26.a es No: ¿es un ex miembro del servicio militar de EE. UU. que reside actualmente fuera de EE. UU.?',{page:10,expl:false,show:a=>P(a,'25')==='yes'&&P(a,'26a')==='no'}),
 R('27','P12_Line27','yes',30,'EVER court-martialed, or received a discharge other than honorable (bad conduct or dishonorable) in the U.S. armed forces?','¿Alguna vez fue sometido(a) a consejo de guerra, o recibió una baja que no fue honorable (mala conducta o deshonrosa) en las fuerzas armadas de EE. UU.?',{page:10,show:a=>P(a,'25')==='yes'}),
 R('28','P12_Line28','yes',10,'EVER discharged from training or service in the U.S. armed forces because you were an alien?','¿Alguna vez fue dado(a) de baja del entrenamiento o servicio en las fuerzas armadas de EE. UU. por ser extranjero(a)?',{page:10,show:a=>P(a,'25')==='yes'}),
 R('29','P9_Line29','yes',40,'EVER deserted from the U.S. armed forces?','¿Alguna vez desertó de las fuerzas armadas de EE. UU.?',{page:10,show:a=>P(a,'25')==='yes'}),
 R('30a','P12_Line30a','yes',0,'Do you now have, or did you EVER have, a hereditary title or an order of nobility in any foreign country?','¿Tiene ahora, o tuvo ALGUNA VEZ, un título hereditario o una orden de nobleza en algún país extranjero?',{page:10,expl:false}),
 R('30b','P12_Line30b','no',30,'If 30.a is Yes: are you willing to give up these titles at your naturalization ceremony?','Si 30.a es Sí: ¿está dispuesto(a) a renunciar a estos títulos en su ceremonia de naturalización?',{page:10,expl:false,show:a=>P(a,'30a')==='yes'}),
 R('31','P12_Line31','no',40,'Do you support the Constitution and form of government of the United States?','¿Apoya la Constitución y la forma de gobierno de Estados Unidos?',{page:10}),
 R('32','P12_Line32','no',25,'Do you understand the full Oath of Allegiance to the United States (Part 16)?','¿Entiende el Juramento de Lealtad completo a Estados Unidos (Parte 16)?',{page:10}),
 R('33','P12_Line33','yes',0,'Are you unable to take the Oath of Allegiance because of a physical or developmental disability or mental impairment? (If Yes, skip 34–37 and see the instructions on legal guardians or designated representatives.)','¿No puede prestar el Juramento de Lealtad por una discapacidad física o del desarrollo o impedimento mental? (Si es Sí, omita 34–37 y vea las instrucciones sobre tutores legales o representantes designados.)',{page:10,expl:false}),
 R('34','P12_Line34','no',40,'Are you willing to take the full Oath of Allegiance to the United States?','¿Está dispuesto(a) a prestar el Juramento de Lealtad completo a Estados Unidos?',{page:10,show:a=>P(a,'33')!=='yes'}),
 R('35','P12_Line35','no',15,'If the law requires it, are you willing to bear arms (carry weapons) on behalf of the United States?','Si la ley lo exige, ¿está dispuesto(a) a portar armas en nombre de Estados Unidos?',{page:10,show:a=>P(a,'33')!=='yes'}),
 R('36','P12_Line36','no',15,'If the law requires it, are you willing to perform noncombatant services in the U.S. armed forces?','Si la ley lo exige, ¿está dispuesto(a) a realizar servicios no combatientes en las fuerzas armadas de EE. UU.?',{page:10,show:a=>P(a,'33')!=='yes'}),
 R('37','P12_Line37','no',15,'If the law requires it, are you willing to perform work of national importance under civilian direction?','Si la ley lo exige, ¿está dispuesto(a) a realizar trabajo de importancia nacional bajo dirección civil?',{page:10,show:a=>P(a,'33')!=='yes'})
];
const RISK_INDEX={};RISK.forEach(r=>RISK_INDEX[r.id]=r);
const CRIME=f('crimes','list',L('Crimes and offenses (Item 15 table)','Delitos e infracciones (tabla del Ítem 15)'),{no:'15',show:a=>P(a,'15a')==='yes'||P(a,'15b')==='yes',min:1,cap:5,part:9,page:8,help:L('List every incident, even if records are sealed, expunged or cleared. Attach certified court dispositions.','Liste cada incidente, aunque los registros estén sellados, borrados o aclarados. Adjunte las resoluciones certificadas del tribunal.'),item:[
 f('what','text',L('Crime or offense','Delito o infracción'),{t:rows('P12_Line29_why',5)}),
 f('date','date',L('Date of crime or offense','Fecha del delito o infracción'),{t:rows('P12_Line29_Date',5)}),
 f('conv','date',L('Date of conviction or guilty plea (if any)','Fecha de condena o declaración de culpabilidad (si hay)'),{t:rows('P12_Line29_DateOfConv',5)}),
 f('place','text',L('Place (city, state, country)','Lugar (ciudad, estado, país)'),{t:rows('P12_Line29_Outcome',5,'[1]')}),
 f('result','text',L('Result (convicted, dismissed, etc.)','Resultado (condenado, desestimado, etc.)'),{t:rows('P12_Line29_Outcome',5,'[0]')}),
 f('sentence','text',L('Sentence (if any)','Sentencia (si hay)'),{t:rows('P12_Line29_Outcome',5,'[2]')})]});
function riskFields(){
 const out=[];
 RISK.forEach(r=>{
  const q=f('q_'+r.id,'yesno',L(r.en,r.es),{no:r.id.replace(/([0-9]+)([a-z])/,'$1.$2'),req:1,y:r.base,show:r.show,w:r.w,adv:r.adv});
  out.push(q);
  if(r.id==='15b')out.push(CRIME);
  if(r.expl&&r.w>0)out.push(f('x_'+r.id,'textarea',UI.explain,{no:q.no,show:a=>a['q_'+r.id]===r.adv&&(!r.show||r.show(a)),req:1,sub:1,p14:{part:9,item:q.no,page:r.page,from:'x'}}));
  if(r.id==='22b')out.push(f('ss_date','date',L('Date registered for Selective Service','Fecha de registro en el Servicio Selectivo'),{no:'22.c',show:a=>P(a,'22b')==='yes',t:'P9_Line22c_Date[0]'}),f('ss_num','text',L('Selective Service number','Número del Servicio Selectivo'),{no:'22.c',show:a=>P(a,'22b')==='yes',t:'P9_Line22c_SSNumber[0]',dg:1}));
  if(r.id==='30b')out.push(f('titles','text',L('List the titles you hold','Liste los títulos que posee'),{no:'30.b',show:a=>P(a,'30a')==='yes',t:'P9_NobilityTitles[0]'}));
 });
 return out;
}
PARTS.find(p=>p.risk).fields=riskFields();
const DAY=86400000;
function eligCalc(c){
 const a=c.answers;const r={items:[],ok:true};
 const years=a.reason==='B'?3:5;
 if(a.dob){const age=(Date.now()-new Date(a.dob))/DAY/365.25;r.items.push({ok:age>=18,t:UI.ageOk})}
 if(!a.lprDate){r.noLpr=true;return r}
 const start=new Date(a.lprDate);const earliest=new Date(start);earliest.setFullYear(earliest.getFullYear()+years);earliest.setDate(earliest.getDate()-90);
 r.earliest=earliest.toISOString().slice(0,10);r.earliestOk=earliest<=new Date();
 const periodStart=new Date();periodStart.setFullYear(periodStart.getFullYear()-years);
 const from=new Date(Math.max(periodStart,start));
 const totalDays=Math.round((Date.now()-from)/DAY);
 let out=0;r.long=[];r.broke=[];
 (a.anyTrips==='yes'?(a.trips||[]):[]).forEach(t=>{
  if(!t.out||!t.back)return;
  const o=new Date(t.out),b=new Date(t.back);const len=Math.round((b-o)/DAY);
  const s=Math.max(o,from),e=Math.min(b,Date.now());if(e>s)out+=Math.round((e-s)/DAY);
  if(len>=365)r.broke.push(t);else if(len>=180)r.long.push(t);
 });
 r.daysIn=totalDays-out;r.need=Math.ceil(totalDays/2);r.years=years;
 return r;
}

function elig(c){
 const el=eligCalc(c);
  return el.noLpr?`<p class="help">${T(UI.noLpr)}</p>`:`<table>
  ${el.items.map(i=>`<tr><td>${T(i.t)}</td><td><span class="pill ${i.ok?'l':'r'}">${i.ok?'OK':'!'}</span></td></tr>`).join('')}
  <tr><td>${T(UI.earliest)}</td><td class="mono">${el.earliest} <span class="pill ${el.earliestOk?'l':'w'}">${el.earliestOk?'OK':'…'}</span></td></tr>
  <tr><td>${T(UI.daysIn)}</td><td class="mono">${el.daysIn} <span class="pill ${el.daysIn>=el.need?'l':'r'}">${el.daysIn>=el.need?'OK':'!'}</span></td></tr>
  <tr><td>${T(UI.needDays)}</td><td class="mono">${el.need}</td></tr>
  ${el.long.map(t=>`<tr><td colspan="2"><span class="pill w">6+ mo</span> ${esc(t.out)} → ${esc(t.back)}: ${T(UI.longTrip)}</td></tr>`).join('')}
  ${el.broke.map(t=>`<tr><td colspan="2"><span class="pill r">1+ yr</span> ${esc(t.out)} → ${esc(t.back)}: ${T(UI.breakTrip)}</td></tr>`).join('')}
 </table>`;

}
const p14={
 name:[['P2_Line1_FamilyName[1]','familyName'],['P2_Line1_GivenName[1]','givenName'],['P2_Line1_MiddleName[1]','middleName']],
 blocks:[['P11_Line3A[0]','P11_Line3B[0]','P11_Line3C[0]','P11_Line3D[0]'],['P11_Line4A[0]','P11_Line4B[0]','P11_Line4C[0]','P11_Line4D[0]'],['P11_Line5A[0]','P11_Line5B[0]','P11_Line5C[0]','P11_Line5D[0]'],['P11_Line6A[0]','P11_Line6B[0]','P11_Line6C[0]','P11_Line6D[0]']]
};
return {id:'n400',name:'N-400 Application for Naturalization',short:'N-400',edition:'01/20/25',expires:'02/28/2027',pdf:'n400-01-20-25.pdf',OPT,PARTS,RISK,RISK_INDEX,elig,p14,ui:{
 disclaimer:UI.disclaimer,pdfNote:UI.pdfNote,part9intro:UI.part9intro}};
})());
