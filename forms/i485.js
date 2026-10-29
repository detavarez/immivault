registerForm((function(){
const OPT={
 sex:[['M',L('Male','Masculino')],['F',L('Female','Femenino')]],
 unit:[['',L('None','Ninguno')],['apt',L('Apt.','Apto.')],['ste',L('Ste.','Ste.')],['flr',L('Flr.','Piso')]],
 arrive:[['A',L('Inspected at a port of entry and admitted as:','Inspeccionado en un puerto de entrada y admitido como:')],['P',L('Inspected at a port of entry and paroled as:','Inspeccionado en un puerto de entrada y con permiso de permanencia (parole) como:')],['W',L('Came into the U.S. without admission or parole','Entró a EE. UU. sin admisión ni parole')],['O',L('Other','Otro')]],
 marital:[['S',L('Single, never married','Soltero(a), nunca casado(a)')],['M',L('Married','Casado(a)')],['D',L('Divorced','Divorciado(a)')],['W',L('Widowed','Viudo(a)')],['A',L('Marriage annulled','Matrimonio anulado')],['E',L('Legally separated','Legalmente separado(a)')]],
 armed:[['Y',L('Yes','Sí')],['N',L('No','No')],['A',L('Not applicable','No aplica')]],
 howEnded:[['A',L('Annulled','Anulado')],['D',L('Divorced','Divorciado(a)')],['W',L('Spouse deceased','Cónyuge fallecido(a)')],['O',L('Other (explain)','Otro (explique)')]],
 ethnicity:[['H',L('Hispanic or Latino','Hispano o latino')],['N',L('Not Hispanic or Latino','No hispano ni latino')]],
 race:[['I',L('American Indian or Alaska Native','Indígena americano o nativo de Alaska')],['A',L('Asian','Asiático')],['B',L('Black or African American','Negro o afroamericano')],['P',L('Native Hawaiian or Other Pacific Islander','Nativo de Hawái u otro isleño del Pacífico')],['W',L('White','Blanco')]],
 eye:[['BLK',L('Black','Negros')],['BLU',L('Blue','Azules')],['BRO',L('Brown','Marrones')],['GRY',L('Gray','Grises')],['GRN',L('Green','Verdes')],['HAZ',L('Hazel','Avellana')],['MAR',L('Maroon','Granate')],['PNK',L('Pink','Rosados')],['XXX',L('Unknown/other','Desconocido/otro')]],
 hair:[['BAL',L('Bald (no hair)','Calvo (sin cabello)')],['BLK',L('Black','Negro')],['BLN',L('Blond','Rubio')],['BRO',L('Brown','Castaño')],['GRY',L('Gray','Canoso')],['RED',L('Red','Pelirrojo')],['SDY',L('Sandy','Arena')],['WHI',L('White','Blanco')],['XXX',L('Unknown/other','Desconocido/otro')]],
 feet:['2','3','4','5','6','7','8'].map(v=>[v,{en:v,es:v}]),
 inches:['0','1','2','3','4','5','6','7','8','9','10','11'].map(v=>[v,{en:v,es:v}]),
 filingAs:[['P',L('Principal applicant','Solicitante principal')],['D',L('Derivative applicant','Solicitante derivado')]],
 cat:[
  ['a0',L('3.a Family: Spouse of a U.S. citizen','3.a Familiar: Cónyuge de ciudadano(a) de EE. UU.')],
  ['a1',L('3.a Family: Unmarried child under 21 of a U.S. citizen','3.a Familiar: Hijo(a) soltero(a) menor de 21 de ciudadano(a)')],
  ['a2',L('3.a Family: Parent of a U.S. citizen (citizen 21 or older)','3.a Familiar: Padre/madre de ciudadano(a) (mayor de 21)')],
  ['a3',L('3.a Family: K-1/K-2 fiancé(e) or child of fiancé(e) of a U.S. citizen','3.a Familiar: Prometido(a) K-1/K-2 o hijo(a) de prometido(a) de ciudadano(a)')],
  ['a4',L('3.a Family: Widow or widower of a U.S. citizen','3.a Familiar: Viudo(a) de ciudadano(a)')],
  ['a5',L('3.a Family: Spouse, child or parent of a deceased U.S. active-duty service member (NDAA)','3.a Familiar: Cónyuge, hijo(a) o padre/madre de militar activo fallecido (NDAA)')],
  ['a6',L('3.a Family: Unmarried son or daughter (21+) of a U.S. citizen','3.a Familiar: Hijo(a) soltero(a) (21+) de ciudadano(a)')],
  ['a7',L('3.a Family: Married son or daughter of a U.S. citizen','3.a Familiar: Hijo(a) casado(a) de ciudadano(a)')],
  ['a8',L('3.a Family: Brother or sister of a U.S. citizen (citizen 21 or older)','3.a Familiar: Hermano(a) de ciudadano(a) (mayor de 21)')],
  ['a9',L('3.a Family: Spouse of a lawful permanent resident','3.a Familiar: Cónyuge de residente permanente')],
  ['a10',L('3.a Family: Unmarried child under 21 of a permanent resident','3.a Familiar: Hijo(a) soltero(a) menor de 21 de residente permanente')],
  ['a11',L('3.a Family: Unmarried son or daughter (21+) of a permanent resident','3.a Familiar: Hijo(a) soltero(a) (21+) de residente permanente')],
  ['a12',L('3.a VAWA self-petitioning spouse of a U.S. citizen or permanent resident','3.a VAWA: Cónyuge autopeticionario(a) de ciudadano(a) o residente')],
  ['a13',L('3.a VAWA self-petitioning child of a U.S. citizen or permanent resident','3.a VAWA: Hijo(a) autopeticionario(a) de ciudadano(a) o residente')],
  ['a14',L('3.a VAWA self-petitioning parent of a U.S. citizen','3.a VAWA: Padre/madre autopeticionario(a) de ciudadano(a)')],
  ['b0',L('3.b Employment: Alien investor (I-526 / I-526E)','3.b Empleo: Inversionista (I-526 / I-526E)')],
  ['b1',L('3.b Employment: Alien of extraordinary ability','3.b Empleo: Extranjero de habilidad extraordinaria')],
  ['b2',L('3.b Employment: Outstanding professor or researcher','3.b Empleo: Profesor o investigador sobresaliente')],
  ['b3',L('3.b Employment: Multinational executive or manager','3.b Empleo: Ejecutivo o gerente multinacional')],
  ['b4',L('3.b Employment: Advanced degree / exceptional ability (no NIW)','3.b Empleo: Título avanzado / habilidad excepcional (sin NIW)')],
  ['b5',L('3.b Employment: Professional (bachelor\'s degree)','3.b Empleo: Profesional (licenciatura)')],
  ['b6',L('3.b Employment: Skilled worker (2+ years training/experience)','3.b Empleo: Trabajador calificado (2+ años)')],
  ['b7',L('3.b Employment: Other worker (under 2 years)','3.b Empleo: Otro trabajador (menos de 2 años)')],
  ['b8',L('3.b Employment: National Interest Waiver','3.b Empleo: Exención por interés nacional (NIW)')],
  ['c0',L('3.c Special immigrant juvenile (I-360)','3.c Inmigrante especial: Menor inmigrante especial (I-360)')],
  ['c1',L('3.c Special immigrant: Certain Afghan or Iraqi national','3.c Inmigrante especial: Ciertos nacionales afganos o iraquíes')],
  ['c2',L('3.c Special immigrant: Certain international broadcaster','3.c Inmigrante especial: Cierto locutor internacional')],
  ['c3',L('3.c Special immigrant: G-4 international organization or NATO-6 employee/family','3.c Inmigrante especial: Organización internacional G-4 o empleado NATO-6 / familiar')],
  ['c4',L('3.c Special immigrant: U.S. armed forces member (Six and Six)','3.c Inmigrante especial: Miembro de las fuerzas armadas (Six and Six)')],
  ['c5',L('3.c Special immigrant: Panama Canal Zone employee','3.c Inmigrante especial: Empleado de la Zona del Canal de Panamá')],
  ['c6',L('3.c Special immigrant: Certain physician','3.c Inmigrante especial: Cierto médico')],
  ['c7',L('3.c Special immigrant: Employee/former employee of U.S. government abroad (DS-1884)','3.c Inmigrante especial: Empleado o exempleado del gobierno de EE. UU. en el exterior (DS-1884)')],
  ['c8',L('3.c Special immigrant: Minister of religion','3.c Inmigrante especial: Ministro religioso')],
  ['c9',L('3.c Special immigrant: Other religious worker','3.c Inmigrante especial: Otro trabajador religioso')],
  ['d0',L('3.d Asylee (INA 208)','3.d Asilado (INA 208)')],
  ['d1',L('3.d Refugee (INA 207)','3.d Refugiado (INA 207)')],
  ['e0',L('3.e Human trafficking victim (T nonimmigrant)','3.e Víctima de trata (T)')],
  ['e1',L('3.e Victim of qualifying criminal activity (U nonimmigrant)','3.e Víctima de actividad criminal calificada (U)')],
  ['f0',L('3.f Cuban Adjustment Act','3.f Ley de Ajuste Cubano')],
  ['f2',L('3.f Battered spouse/child under the Cuban Adjustment Act','3.f Cónyuge/hijo(a) maltratado(a) bajo la Ley de Ajuste Cubano')],
  ['f3',L('3.f Dependent status under the Haitian Refugee Immigrant Fairness Act (HRIFA)','3.f Estatus dependiente bajo HRIFA (refugiados haitianos)')],
  ['f4',L('3.f Battered spouse/child, dependent status under HRIFA','3.f Cónyuge/hijo(a) maltratado(a), dependiente bajo HRIFA')],
  ['f5',L('3.f Lautenberg parolee','3.f Parolee Lautenberg')],
  ['f6',L('3.f Diplomat or high-ranking official unable to return home (Sec. 13, Act of 9/11/57)','3.f Diplomático o alto funcionario que no puede regresar (Sec. 13, Ley del 11/9/57)')],
  ['f7',L('3.f National of Vietnam, Cambodia or Laos (Public Law 106-429, sec. 586)','3.f Nacional de Vietnam, Camboya o Laos (Ley Pública 106-429, sec. 586)')],
  ['f8',L('3.f Amerasian Act applicant (October 22, 1982), I-360','3.f Solicitante bajo la Ley Amerasiática (22 oct. 1982), I-360')],
  ['g0',L('3.g Diversity Visa program','3.g Programa de Visas de Diversidad')],
  ['g1',L('3.g Registry (continuous residence since before January 1, 1972)','3.g Registro (residencia continua desde antes del 1 de enero de 1972)')],
  ['g2',L('3.g Individual born to a foreign government employee in the U.S.','3.g Persona nacida en EE. UU. de empleado de gobierno extranjero')],
  ['g3',L('3.g S nonimmigrant or qualifying family member (approved I-854B)','3.g No inmigrante S o familiar calificado (I-854B aprobado)')],
  ['g4',L('3.g Other eligibility','3.g Otra elegibilidad')]
 ],
 relFiled:[['Y',L('Yes','Sí')],['N',L('No','No')],['NA',L('N/A (I-140 self-petition)','N/A (autopetición I-140)')]],
 relRel:[['1',L('Father','Padre')],['2',L('Mother','Madre')],['3',L('Child','Hijo(a)')],['4',L('Adult son','Hijo adulto')],['5',L('Adult daughter','Hija adulta')],['6',L('Brother','Hermano')],['7',L('Sister','Hermana')],['8',L('None of these','Ninguno de estos')]],
 relType:[['1',L('U.S. citizen','Ciudadano(a) de EE. UU.')],['2',L('U.S. national','Nacional de EE. UU.')],['3',L('Lawful permanent resident','Residente permanente')],['4',L('None of these','Ninguno de estos')]],
 exempt:[['0',L('1.a 40 qualifying quarters of work in the U.S.','1.a 40 trimestres de trabajo calificado en EE. UU.')],['1',L('1.b Under 18, unmarried, child of a U.S. citizen, will automatically become a citizen (INA 320)','1.b Menor de 18, soltero(a), hijo(a) de ciudadano(a), será ciudadano(a) automáticamente (INA 320)')],['2',L('1.c Widow or widower of a U.S. citizen (I-360)','1.c Viudo(a) de ciudadano(a) (I-360)')],['3',L('1.d VAWA self-petitioner','1.d Autopeticionario(a) VAWA')],['4',L('1.e No exemption applies and no Affidavit of Support is required by statute','1.e Ninguna exención aplica y la ley no exige Declaración de Patrocinio')],['5',L('1.f No exemption applies and I am required to submit an Affidavit of Support','1.f Ninguna exención aplica y debo presentar una Declaración de Patrocinio')]],
 pcEx:[
  ['5',L('VAWA self-petitioner (I-360)','Autopeticionario(a) VAWA (I-360)')],['6',L('Special immigrant juvenile (I-360)','Menor inmigrante especial (I-360)')],['0',L('Certain Afghan or Iraqi national','Ciertos nacionales afganos o iraquíes')],['3',L('Asylee','Asilado(a)')],['1',L('Refugee','Refugiado(a)')],
  ['2',L('U nonimmigrant victim under INA 245(m)','Víctima U bajo INA 245(m)')],['4',L('Other U category, in valid U status at filing','Otra categoría, en estatus U válido al presentar')],['9',L('T nonimmigrant victim under INA 245(l)','Víctima T bajo INA 245(l)')],['12',L('Other T category, pending I-914 (prima facie) or valid T status','Otra categoría, I-914 pendiente (prima facie) o estatus T válido')],
  ['7',L('Cuban Adjustment Act','Ley de Ajuste Cubano')],['10',L('Cuban Adjustment Act, battered spouses and children','Ley de Ajuste Cubano, cónyuges e hijos maltratados')],['11',L('Dependent status under HRIFA','Estatus dependiente bajo HRIFA')],['8',L('Dependent status under HRIFA, battered spouses and children','Estatus dependiente bajo HRIFA, cónyuges e hijos maltratados')],
  ['17',L('Cuban and Haitian entrants (IRCA sec. 202)','Entrantes cubanos y haitianos (IRCA sec. 202)')],['18',L('Lautenberg parolee','Parolee Lautenberg')],['19',L('National of Vietnam, Cambodia or Laos','Nacional de Vietnam, Camboya o Laos')],['13',L('Registry (since before January 1, 1972)','Registro (desde antes del 1 de enero de 1972)')],['15',L('Amerasian Homecoming Act','Ley Amerasiática de Repatriación')],['16',L('Polish or Hungarian parolee','Parolee polaco o húngaro')],['14',L('NACARA (sec. 203)','NACARA (sec. 203)')],
  ['20',L('American Indian born in Canada / Texas Band of Kickapoo','Indígena americano nacido en Canadá / Banda Kickapoo de Texas')],['21',L('Liberian Refugee Immigration Fairness (NDAA FY2020 sec. 7611)','Equidad migratoria para refugiados liberianos (NDAA 2020 sec. 7611)')],['24',L('Syrian national (Public Law 106-378)','Nacional sirio (Ley Pública 106-378)')],['22',L('Spouse, child or parent of a deceased U.S. active-duty service member (NDAA)','Cónyuge, hijo(a) o padre/madre de militar activo fallecido (NDAA)')],
  ['23',L('I do NOT fall under any exempt category (complete Items 57-64)','NO estoy en ninguna categoría exenta (complete los Ítems 57-64)')]],
 income:[['A',L('$0-27,000','$0-27,000')],['B',L('$27,001-52,000','$27,001-52,000')],['C',L('$52,001-85,000','$52,001-85,000')],['D',L('$85,001-141,000','$85,001-141,000')],['E',L('Over $141,000','Más de $141,000')]],
 assets:[['A',L('$0-18,400','$0-18,400')],['B',L('$18,401-136,000','$18,401-136,000')],['C',L('$136,001-321,400','$136,001-321,400')],['D',L('$321,401-707,100','$321,401-707,100')],['E',L('Over $707,100','Más de $707,100')]],
 liab:[['A',L('$0','$0')],['B',L('$1-10,100','$1-10,100')],['C',L('$10,101-57,700','$10,101-57,700')],['D',L('$57,701-186,800','$57,701-186,800')],['E',L('Over $186,800','Más de $186,800')]],
 edu:[['C',L('Less than a high school diploma','Menos que diploma de secundaria')],['2',L('High school diploma, GED or alternative','Diploma de secundaria, GED o alternativo')],['1',L('1+ years of college credit, no degree','1+ años de crédito universitario, sin título')],['3',L('Associate\'s degree','Título asociado')],['7',L('Bachelor\'s degree','Licenciatura')],['4',L('Master\'s degree','Maestría')],['5',L('Professional degree (JD, MD, DMD, etc.)','Título profesional (JD, MD, DMD, etc.)')],['6',L('Doctorate degree','Doctorado')]],
 g28:[['y',L('Form G-28 is attached','Se adjunta el Formulario G-28')]]
};

const YN=(b,y)=>({yes:`${b}[${y}]`,no:`${b}[${1-y}]`});
const X=(k,en,es,t,o)=>f(k,'text',L(en,es),Object.assign({t},o));
const D=(k,en,es,t,o)=>f(k,'date',L(en,es),Object.assign({t},o));
const Y=(k,en,es,y,o)=>f(k,'yesno',L(en,es),Object.assign({y},o));
const S=(k,en,es,opts,c,o)=>f(k,'select',L(en,es),Object.assign({opts,c},o));
const N3=(p,ids,no,o)=>[X(p+'Family','Family name (last)','Apellido',ids[0],Object.assign({no},o)),X(p+'Given','Given name (first)','Nombre',ids[1],Object.assign({no},o)),X(p+'Middle','Middle name','Segundo nombre',ids[2],Object.assign({no},o))];
const PN=(p,en,es,ids,no)=>[X(p+'Family',en+': family name',es+': apellido',ids[0],{no}),X(p+'Given',en+': given name',es+': nombre',ids[1],{no}),X(p+'Middle',en+': middle name',es+': segundo nombre',ids[2],{no})];
const ST=(d)=>f('state','text',L('State (2 letters, U.S. only)','Estado (2 letras, solo EE. UU.)'),{d,up:1});
const ADDR=(m)=>[].concat(
 m.care?[X('careOf','In care of name (if any)','A/C de (si aplica)',m.care)]:[],
 [X('street','Street number and name','Número y nombre de la calle',m.street,{req:m.req})],
 m.unit?[S('unitType','Unit type','Tipo de unidad','unit',{apt:m.unit[0],ste:m.unit[1],flr:m.unit[2]}),X('unitNum','Unit number','Número de unidad',m.num)]:[],
 [X('city','City or town','Ciudad o pueblo',m.city,{req:m.req}),ST(m.state),X('zip','ZIP code','Código ZIP',m.zip,{dg:1})],
 m.prov?[X('province','Province (outside U.S.)','Provincia (fuera de EE. UU.)',m.prov),X('postal','Postal code (outside U.S.)','Código postal (fuera de EE. UU.)',m.postal),X('country','Country','País',m.country,{req:m.req&&m.country&&m.reqC})]:[],
 m.from?[D('from','From','Desde',m.from)]:[],
 m.to?[D('to','To','Hasta',m.to)]:[]
);
const aNums=(v)=>Array.from({length:25},(_,i)=>[`Pt1Line4_AlienNumber[${i}]`,v]);
const married=a=>a.marital==='M'||a.marital==='E';
const notSingle=a=>!!a.marital&&a.marital!=='S';
const isCat=(...c)=>a=>c.includes(a.category);
const emp=(pf,n,o)=>[
 X('name','Employer, company or school name','Nombre del empleador, compañía o escuela',null,Object.assign({tf:v=>n.name.map(x=>[x,v])},{})),
 X('occ','Occupation (if unemployed or retired, say so)','Ocupación (si está desempleado o jubilado, indíquelo)',n.occ)
].concat(ADDR(n.addr),[D('from','From','Desde',n.from),D('to','To','Hasta',n.to),X('support','If unemployed or retired: source of financial support','Si está desempleado o jubilado: fuente de sustento',n.support)]);

const PARTS=[
 {id:1,t:L('Information about you','Información sobre usted'),fields:[].concat(
  N3('',['Pt1Line1_FamilyName[0]','Pt1Line1_GivenName[0]','Pt1Line1_MiddleName[0]'],'1',{req:1}).map((x,i)=>Object.assign(x,{k:['familyName','givenName','middleName'][i],tf2:[['Pt1Line1_FamilyName[1]','Pt1Line1_GivenName[1]','Pt1Line1_MiddleName[1]'][i]],req:i<2?1:0})),
  [f('otherNames','list',L('Other names used since birth (family name at birth, aliases, nicknames)','Otros nombres usados desde su nacimiento (apellido de nacimiento, alias, apodos)'),{no:'2',cap:2,part:1,page:1,item:[
    X('family','Family name','Apellido',['Pt1Line2_FamilyName[0]','Pt1Line2a_FamilyName[0]']),
    X('given','Given name','Nombre',['Pt1Line2_GivenName[0]','Pt1Line2a_GivenName[0]']),
    X('middle','Middle name','Segundo nombre',['Pt1Line2_MiddleName[0]','Pt1Line2a_MiddleName[0]'])]}),
   D('dob','Date of birth','Fecha de nacimiento','Pt1Line3_DOB[0]',{no:'3',req:1}),
   Y('otherDobYn','Have you ever used any other date of birth?','¿Ha usado alguna vez otra fecha de nacimiento?',YN('Pt1Line3_YN',0),{no:'3'}),
   f('otherDobs','list',L('Other dates of birth used','Otras fechas de nacimiento usadas'),{no:'3',show:a=>a.otherDobYn==='yes',cap:2,part:1,page:1,item:[D('d','Date of birth','Fecha de nacimiento',['Pt1Line3A_OtherDOB[0]','Pt1Line3B_OtherDOB[0]'])]}),
   Y('hasA','Do you have an Alien Registration Number (A-Number)?','¿Tiene un Número de Registro de Extranjero (Número A)?',YN('Pt1Line4_YN',0),{no:'4'}),
   X('aNumber','A-Number (9 digits)','Número A (9 dígitos)',null,{no:'4',show:a=>a.hasA==='yes',dg:1,tf:v=>aNums(v)}),
   Y('otherAYn','Have you ever used or been assigned any other A-Number?','¿Ha usado o se le ha asignado alguna vez otro Número A?',YN('Pt1Line5_YN',0),{no:'5'}),
   f('otherANums','list',L('Other A-Numbers','Otros Números A'),{no:'5',show:a=>a.otherAYn==='yes',cap:2,part:1,page:2,item:[X('n','A-Number','Número A',['Pt1Line5A_ANumber[0]','Pt1Line5B_ANumber[0]'],{dg:1})]}),
   S('sex','Sex','Sexo','sex',{F:'Pt1Line6_CB_Sex[0]',M:'Pt1Line6_CB_Sex[1]'},{no:'6',req:1}),
   X('birthCity','City or town of birth','Ciudad o pueblo de nacimiento','Pt1Line7_CityTownOfBirth[0]',{no:'7',req:1}),
   X('birthCountry','Country of birth','País de nacimiento','Pt1Line7_CountryOfBirth[0]',{no:'7',req:1}),
   X('citizenship','Country of citizenship or nationality','País de ciudadanía o nacionalidad','Pt1Line8_CountryofCitizenshipNationality[0]',{no:'8',req:1}),
   X('uscisAcct','USCIS online account number (if any)','Número de cuenta en línea de USCIS (si tiene)','Pt1Line9_USCISAccountNumber[0]',{no:'9'}),
   X('passNum','Passport or travel document number used at last arrival','Número de pasaporte o documento de viaje usado en la última llegada','Pt1Line10_PassportNum[0]',{no:'10'}),
   D('passExp','Passport / travel document expiration date','Fecha de vencimiento del pasaporte / documento','Pt1Line10_ExpDate[0]',{no:'10'}),
   X('passCountry','Country that issued the passport / travel document','País que emitió el pasaporte / documento','Pt1Line10_Passport[0]',{no:'10'}),
   X('visaNum','Nonimmigrant visa number used at most recent arrival (if any)','Número de visa de no inmigrante usada en la llegada más reciente (si tiene)','Pt1Line10_VisaNum[0]',{no:'10'}),
   D('visaDate','Date the nonimmigrant visa was issued','Fecha en que se emitió la visa de no inmigrante','Pt1Line10_NonImmDate[0]',{no:'10'}),
   X('arrCity','Place of last arrival: city or town','Lugar de la última llegada: ciudad o pueblo','Pt1Line10_CityTown[0]',{no:'10'}),
   f('arrState','text',L('Place of last arrival: state (2 letters)','Lugar de la última llegada: estado (2 letras)'),{no:'10',d:'Pt1Line10_State[0]',up:1}),
   D('arrDate','Date of last arrival','Fecha de la última llegada','Pt1Line10_DateofArrival[0]',{no:'10'}),
   S('arrive','When I last arrived in the United States, I was','Cuando llegué por última vez a Estados Unidos','arrive',{A:'Pt2Line11_CB[0]',P:'Pt2Line11_CB[1]',W:'Pt2Line11_CB[2]',O:'Pt2Line11_CB[3]'},{no:'11',req:1}),
   X('arriveAdmit','Admitted as (e.g. visitor, student, temporary worker)','Admitido como (p. ej. visitante, estudiante, trabajador temporal)','Pt1Line11_Admitted[0]',{no:'11',show:a=>a.arrive==='A'}),
   X('arriveParole','Paroled as (e.g. humanitarian parole, Cuban parole)','Con parole como (p. ej. parole humanitario, parole cubano)','Pt1Line11_Paroled[0]',{no:'11',show:a=>a.arrive==='P'}),
   X('arriveOther','Other (explain)','Otro (explique)','Pt1Line11_Other[0]',{no:'11',show:a=>a.arrive==='O'}),
   X('i94Family','Family name exactly as on Form I-94 (if you have one)','Apellido tal como aparece en el Formulario I-94 (si tiene)','P1Line12_FamilyName[0]',{no:'12'}),
   X('i94Given','Given name exactly as on Form I-94','Nombre tal como aparece en el Formulario I-94','P1Line13_GivenName[0]',{no:'12'}),
   X('i94Num','Form I-94 Arrival/Departure Record number','Número del Registro de Llegada/Salida I-94','P1Line12_I94[0]',{no:'12'}),
   X('i94Exp','I-94 authorized stay expiration (mm/dd/yyyy or D/S)','Vencimiento de la estadía autorizada en el I-94 (mm/dd/aaaa o D/S)','Pt1Line12_Date[0]',{no:'12'}),
   X('i94Status','Immigration status on Form I-94 (class of admission, or paroled)','Estatus migratorio en el I-94 (clase de admisión, o parole)','Pt1Line12_Status[0]',{no:'12'}),
   Y('firstTime','Was your last arrival the first time you were physically present in the U.S.?','¿Su última llegada fue la primera vez que estuvo físicamente en EE. UU.?',YN('Pt1Line13_YN',0),{no:'13'}),
   X('curStatus','Current immigration status (if it changed since your last arrival)','Estatus migratorio actual (si cambió desde su última llegada)','Pt1Line14_Status[0]',{no:'14'}),
   X('curStatusExp','Expiration of current status (mm/dd/yyyy or D/S)','Vencimiento del estatus actual (mm/dd/aaaa o D/S)','Pt1Line15_Date[0]',{no:'15'}),
   Y('crewVisa','Have you ever been issued an "alien crewman" visa?','¿Alguna vez se le emitió una visa de "tripulante"?',YN('Pt1Line16_YN',0),{no:'16'}),
   Y('crewArrive','Did you last arrive to join a vessel as a seaman/crewman, or serving aboard a vessel or aircraft?','¿Llegó por última vez para unirse a una nave como marinero/tripulante, o sirviendo a bordo de una nave o aeronave?',YN('Pt1Line17_YN',1),{no:'17'}),
   f('curAddr','group',L('Current U.S. physical address (Item 18)','Dirección física actual en EE. UU. (Ítem 18)'),{no:'18',sub:ADDR({care:'Part1_Item18_InCareOfName[0]',street:'Pt1Line18_StreetNumberName[0]',req:1,unit:['Pt1Line18US_Unit[2]','Pt1Line18US_Unit[0]','Pt1Line18US_Unit[1]'],num:'Pt1Line18US_AptSteFlrNumber[0]',city:'Pt1Line18_CityOrTown[0]',state:'Pt1Line18_State[0]',zip:'Pt1Line18_ZipCode[0]',from:'Pt1Line18_Date[0]'})}),
   Y('mailSame','Is this your current mailing address?','¿Esta es su dirección postal actual?',YN('Pt1Line18_YN',0),{no:'18',req:1}),
   f('mailAddr','group',L('Current mailing address (Item 18)','Dirección postal actual (Ítem 18)'),{no:'18',show:a=>a.mailSame==='no',sub:ADDR({care:'Pt1Line18_CurrentInCareOfName[0]',street:'Pt1Line18_CurrentStreetNumberName[0]',unit:['Pt1Line18_CurrentUnit[0]','Pt1Line18_CurrentUnit[1]','Pt1Line18_CurrentUnit[2]'],num:'Pt1Line18_CurrentAptSteFlrNumber[0]',city:'Pt1Line18_CurrentCityOrTown[0]',state:'Pt1Line18_CurrentState[0]',zip:'Pt1Line18_CurrentZipCode[0]'})}),
   Y('fiveYrs','Have you resided at your current address for at least 5 years?','¿Ha vivido en su dirección actual por al menos 5 años?',YN('Pt1Line18_last5yrs_YN',0),{no:'18'}),
   f('priorAddr','group',L('Prior address (last 5 years; more go in Part 14)','Dirección anterior (últimos 5 años; más van en la Parte 14)'),{no:'18',show:a=>a.fiveYrs==='no',sub:ADDR({care:'Pt1Line18_PriorInCareOfName[0]',street:'Pt1Line18_PriorStreetName[0]',unit:['Pt1Line18_PriorAddress_Unit[0]','Pt1Line18_PriorAddress_Unit[1]','Pt1Line18_PriorAddress_Unit[2]'],num:'Pt1Line18_PriorAddress_Number[0]',city:'Pt1Line18_PriorCity[0]',state:'Pt1Line18_PriorState[0]',zip:'Pt1Line18_PriorZipCode[0]',prov:'Pt1Line18_PriorProvince[0]',postal:'Pt1Line18_PriorPostalCode[0]',country:'Pt1Line18_PriorCountry[0]',from:'Pt1Line18_PriorDateFrom[0]',to:'Pt1Line18PriorDateTo[0]'})}),
   f('moreAddr','textarea',L('Other prior addresses in the last 5 years (goes to Part 14)','Otras direcciones anteriores en los últimos 5 años (va a la Parte 14)'),{no:'18',p14:{part:1,item:'18',page:4}}),
   f('recentAddr','group',L('Most recent address outside the U.S. where you lived 1+ year (if not listed above)','Dirección más reciente fuera de EE. UU. donde vivió más de 1 año (si no está arriba)'),{no:'18',sub:ADDR({street:'Pt1Line18_RecentStreetName[0]',unit:['Pt1Line18_RecentUnit[0]','Pt1Line18_RecentUnit[1]','Pt1Line18_RecentUnit[2]'],num:'Pt1Line18_RecentNumber[0]',city:'Pt1Line18_RecentCity[0]',state:'Pt1Line18_RecentState[0]',zip:'Pt1Line18_RecentZipCode[0]',prov:'Pt1Line18_RecentProvince[0]',postal:'Pt1Line18_RecentPostalCode[0]',country:'Pt1Line18_RecentCountry[0]',from:'Pt1Line18_RecentDateFrom[0]',to:'Pt1Line18_RecentDateTo[0]'})}),
   Y('ssaIssued','Has the SSA ever officially issued you a Social Security card?','¿La SSA le ha emitido alguna vez oficialmente una tarjeta de Seguro Social?',YN('Pt1Line19_YN',1),{no:'19'}),
   X('ssn','Social Security number','Número de Seguro Social','Pt1Line19_SSN[0]',{no:'19',show:a=>a.ssaIssued==='yes',dg:1}),
   Y('ssaWant','Do you want the SSA to issue you a Social Security card?','¿Desea que la SSA le emita una tarjeta de Seguro Social?',YN('Pt1Line19_SSA_YN',0),{no:'19'}),
   Y('ssaConsent','Consent to disclose information to the SSA (must be Yes if you answered Yes above)','Consentimiento para divulgar información a la SSA (debe ser Sí si respondió Sí arriba)',YN('Pt1Line19_Consent_YN',0),{no:'19',show:a=>a.ssaWant==='yes'})
  ])},

 {id:2,t:L('Application type or filing category','Tipo de solicitud o categoría de presentación'),fields:[
  Y('eoir','Are you filing for adjustment with EOIR while in removal, exclusion, rescission or deportation proceedings?','¿Presenta el ajuste ante EOIR estando en procedimientos de remoción, exclusión, rescisión o deportación?',YN('Pt2Line1_YN',0),{no:'1'}),
  X('receipt','Receipt number of underlying petition (if any)','Número de recibo de la petición subyacente (si hay)','Pt2Line2_Receipt[0]',{no:'2'}),
  D('priority','Priority date from underlying petition (if any)','Fecha de prioridad de la petición subyacente (si hay)','Pt2Line2_Date[0]',{no:'2'}),
  S('filingAs','I am filing this Form I-485 as a','Presento este Formulario I-485 como','filingAs',{P:'Pt2Line2_CB[0]',D:'Pt2Line2_CB[1]'},{no:'2',req:1}),
  X('prFamily','Principal applicant family name','Apellido del solicitante principal','Pt2Line2_FamilyName[0]',{show:a=>a.filingAs==='D'}),
  X('prGiven','Principal applicant given name','Nombre del solicitante principal','Pt2Line2_GivenName[0]',{show:a=>a.filingAs==='D'}),
  X('prMiddle','Principal applicant middle name','Segundo nombre del solicitante principal','Pt2Line2_MiddleName[0]',{show:a=>a.filingAs==='D'}),
  X('prA','Principal applicant A-Number (if any)','Número A del solicitante principal (si tiene)','Pt2Line2_AlienNumber[0]',{show:a=>a.filingAs==='D',dg:1}),
  D('prDob','Principal applicant date of birth','Fecha de nacimiento del solicitante principal','Pt1Line2_DOB[0]',{show:a=>a.filingAs==='D'}),
  S('category','Category of your application (Item 3)','Categoría de su solicitud (Ítem 3)','cat',{a0:'Pt2Line3a_CB[0]',a1:'Pt2Line3a_CB[1]',a2:'Pt2Line3a_CB[2]',a3:'Pt2Line3a_CB[3]',a4:'Pt2Line3a_CB[4]',a5:'Pt2Line3a_CB[5]',a6:'Pt2Line3a_CB[6]',a7:'Pt2Line3a_CB[7]',a8:'Pt2Line3a_CB[8]',a9:'Pt2Line3a_CB[9]',a10:'Pt2Line3a_CB[10]',a11:'Pt2Line3a_CB[11]',a12:'Pt2Line3a_CB[12]',a13:'Pt2Line3a_CB[13]',a14:'Pt2Line3a_CB[14]',
   b0:'Pt2Line3b_CB526[0]',b1:'Pt2Line3b_CB140[0]',b2:'Pt2Line3b_CB140[1]',b3:'Pt2Line3b_CB140[2]',b4:'Pt2Line3b_CB140[3]',b5:'Pt2Line3b_CB140[4]',b6:'Pt2Line3b_CB140[5]',b7:'Pt2Line3b_CB140[6]',b8:'Pt2Line3b_CB140[7]',
   c0:'Pt2Line3c_CB[1]',c1:'Pt2Line3c_CB[0]',c2:'Pt2Line3c_CB[3]',c3:'Pt2Line3c_CB[2]',c4:'Pt2Line3c_CB[5]',c5:'Pt2Line3c_CB[4]',c6:'Pt2Line3c_CB[6]',c7:'Pt2Line3c_CB[7]',c8:'Pt2Line3c_CB[9]',c9:'Pt2Line3c_CB[8]',
   d0:'Pt2Line3d_AsyleeRefugeeCB[0]',d1:'Pt2Line3d_AsyleeRefugeeCB[1]',e0:'Pt2Line3e_CB[0]',e1:'Pt2Line3e_CB[1]',
   f0:'Pt2Line3f_CB[0]',f2:'Pt2Line3f_CB[1]',f3:'Pt2Line3f_CB[2]',f4:'Pt2Line3f_CB[3]',f5:'Pt2Line3f_CB[4]',f6:'Pt2Line3f_CB[5]',f7:'Pt2Line3f_CB[6]',f8:'Pt2Line3f_CB[7]',
   g0:'Pt2Line3g_CB[0]',g1:'Pt2Line3g_CB[1]',g2:'Pt2Line3g_CB[2]',g3:'Pt2Line3g_CB[3]',g4:'Pt2Line3g_CB[4]'},{no:'3',req:1,help:L('Select ONLY one. Derivatives pick the category the principal applicant uses.','Seleccione SOLO una. Los derivados eligen la categoría del solicitante principal.')}),
  S('relFiled','Did a relative file the I-140 for you (or own 5%+ of the business that filed it)?','¿Un familiar presentó el I-140 por usted (o posee 5% o más de la empresa que lo presentó)?','relFiled',{Y:'Pt2Line3b_CB140Assoc[2]',N:'Pt2Line3b_CB140Assoc[1]',NA:'Pt2Line3b_CB140Assoc[0]'},{no:'3.b',show:isCat('b1','b2','b3','b4','b5','b6','b7','b8')}),
  S('relRel','The relative is your','El familiar es su','relRel',{1:'Pt2Relative_CB[0]',2:'Pt2Relative_CB[1]',3:'Pt2Relative_CB[2]',4:'Pt2Relative_CB[3]',5:'Pt2Relative_CB[4]',6:'Pt2Relative_CB[5]',7:'Pt2Relative_CB[6]',8:'Pt2Relative_CB[7]'},{no:'3.b',show:a=>isCat('b1','b2','b3','b4','b5','b6','b7','b8')(a)&&a.relFiled==='Y'}),
  S('relType','The relative is a','El familiar es','relType',{1:'Pt2RelativeType_CB[0]',2:'Pt2RelativeType_CB[1]',3:'Pt2RelativeType_CB[2]',4:'Pt2RelativeType_CB[3]'},{no:'3.b',show:a=>isCat('b1','b2','b3','b4','b5','b6','b7','b8')(a)&&a.relFiled==='Y'}),
  D('asylumDate','Date you were granted asylum','Fecha en que se le concedió asilo','Pt2Line3d_Asylum[0]',{no:'3.d',show:isCat('d0')}),
  D('refugeeDate','Date of initial admission as refugee','Fecha de admisión inicial como refugiado','Pt2Line3d_Refugee[0]',{no:'3.d',show:isCat('d1')}),
  X('dvRank','Diversity Visa rank number','Número de rango de la Visa de Diversidad','Pt2Line1g_DV[0]',{no:'3.g',show:isCat('g0')}),
  X('otherElig','Other eligibility (describe)','Otra elegibilidad (describa)','Pt2Line1g_OtherEligibility[0]',{no:'3.g',show:isCat('g4')}),
  Y('i245','If applying under a family, employment, special immigrant or DV category: are you adjusting under INA 245(i)?','Si solicita bajo una categoría familiar, de empleo, inmigrante especial o DV: ¿ajusta bajo INA 245(i)?',YN('Pt2Line4_CB',1),{no:'4'}),
  Y('cspa','Are you 21 or older and applying as a child under the Child Status Protection Act (CSPA)?','¿Tiene 21 años o más y solicita como hijo(a) bajo la Ley de Protección del Estatus del Niño (CSPA)?',YN('Pt2Line5_CB',1),{no:'5'})]},

 {id:3,t:L('Exemption from the Affidavit of Support (I-864)','Exención de la Declaración de Patrocinio (I-864)'),fields:[
  S('exempt','I am requesting an exemption from the Affidavit of Support because','Solicito una exención de la Declaración de Patrocinio porque','exempt',{0:'Pt3Line1_CB[0]',1:'Pt3Line1_CB[1]',2:'Pt3Line1_CB[2]',3:'Pt3Line1_CB[3]',4:'Pt3Line1_CB[4]',5:'Pt3Line1_CB[5]'},{no:'1'})]},

 {id:4,t:L('Additional information about you','Información adicional sobre usted'),fields:[
  Y('visaAbroad','Have you ever applied for an immigrant visa at a U.S. Embassy or Consulate abroad?','¿Ha solicitado alguna vez una visa de inmigrante en una Embajada o Consulado de EE. UU. en el exterior?',YN('Pt4Line1_YN',1),{no:'1'}),
  X('consCity','Embassy or Consulate: city or town','Embajada o Consulado: ciudad o pueblo','Pt4Line2_CityTown[0]',{no:'2',show:a=>a.visaAbroad==='yes'}),
  X('consCountry','Embassy or Consulate: country','Embajada o Consulado: país','Pt4Line2_CityTownOfBirth[0]',{no:'2',show:a=>a.visaAbroad==='yes'}),
  X('consDecision','Decision (approved, refused, denied, withdrawn)','Decisión (aprobada, rechazada, denegada, retirada)','Pt4Line3_Decision[0]',{no:'3',show:a=>a.visaAbroad==='yes'}),
  D('consDate','Date of decision','Fecha de la decisión','Pt4Line4_Date[0]',{no:'4',show:a=>a.visaAbroad==='yes'}),
  Y('prevPR','Have you previously applied for permanent residence while in the U.S.?','¿Ha solicitado antes la residencia permanente estando en EE. UU.?',YN('Pt4Line5_YN',1),{no:'5'}),
  Y('rescinded','Have you EVER held permanent resident status that was later rescinded (INA 246)?','¿ALGUNA VEZ tuvo residencia permanente que luego fue rescindida (INA 246)?',YN('Pt4Line6_YN',1),{no:'6'}),
  f('emp1','group',L('Employment or school: current or most recent, last 5 years (Item 7)','Empleo o escuela: actual o más reciente, últimos 5 años (Ítem 7)'),{no:'7',sub:emp('',{name:['Pt4Line7_EmployerName[0]','Pt4Line7_EmployerName[2]'],occ:'Pt4Line7_EmployerName[1]',addr:{street:'Part4Line7_StreetName[0]',unit:['P4Line7_Unit[0]','P4Line7_Unit[1]','P4Line7_Unit[2]'],num:'P4Line7_Number[0]',city:'P4Line7_City[0]',state:'P4Line7_State[0]',zip:'P4Line7_ZipCode[0]',prov:'P4Line7_Province[0]',postal:'P4Line7_PostalCode[0]',country:'P4Line7_Country[0]'},from:'Pt4Line7_DateFrom[0]',to:'Pt4Line7_DateTo[0]',support:'Part4Line7_StreetName[1]'})}),
  f('moreEmp','textarea',L('Other employment/school for the last 5 years (goes to Part 14)','Otro empleo/escuela de los últimos 5 años (va a la Parte 14)'),{no:'7',p14:{part:4,item:'7',page:9}}),
  f('emp2','group',L('Most recent employer or school outside the U.S. (Item 8)','Empleador o escuela más reciente fuera de EE. UU. (Ítem 8)'),{no:'8',sub:emp('',{name:['Pt4Line8_EmployerName[0]'],occ:'Pt4Line8_Occupation[0]',addr:{street:'P4Line8_StreetName[0]',unit:['P4Line8_Unit[0]','P4Line8_Unit[1]','P4Line8_Unit[2]'],num:'P4Line8_Number[0]',city:'P4Line8_City[0]',state:'P4Line8_State[0]',zip:'P4Line8_ZipCode[0]',prov:'P4Line8_Province[0]',postal:'P4Line8_PostalCode[0]',country:'P4Line8_Country[0]'},from:'Pt4Line8_DateFrom[0]',to:'Pt4Line8_DateTo[0]',support:'Part4Line8_StreetName[0]'})})]},

 {id:5,t:L('Information about your parents','Información sobre sus padres'),fields:[].concat(
  PN('p1','Parent 1 legal name','Nombre legal del padre/madre 1',['Pt5Line1_FamilyName[0]','Pt5Line1_GivenName[0]','Pt5Line1_MiddleName[0]'],'1'),
  PN('p1b','Parent 1 name at birth (if different)','Nombre de nacimiento del padre/madre 1 (si es diferente)',['Pt5Line2_FamilyName[0]','Pt5Line2_GivenName[0]','Pt5Line2_MiddleName[0]'],'2'),
  [D('p1Dob','Parent 1 date of birth','Fecha de nacimiento del padre/madre 1','Pt5Line3_DateofBirth[0]',{no:'3'}),
   X('p1Country','Parent 1 country of birth','País de nacimiento del padre/madre 1','Pt5Line5_CityTownOfBirth[0]',{no:'4'})],
  PN('p2','Parent 2 legal name','Nombre legal del padre/madre 2',['Pt5Line6_FamilyName[0]','Pt5Line6_GivenName[0]','Pt5Line6_MiddleName[0]'],'5'),
  PN('p2b','Parent 2 name at birth (if different)','Nombre de nacimiento del padre/madre 2 (si es diferente)',['Pt5Line7_FamilyName[0]','Pt5Line7_GivenName[0]','Pt5Line7_MiddleName[0]'],'6'),
  [D('p2Dob','Parent 2 date of birth','Fecha de nacimiento del padre/madre 2','Pt5Line8_DateofBirth[0]',{no:'7'}),
   X('p2Country','Parent 2 country of birth','País de nacimiento del padre/madre 2','Pt5Line10_CityTownOfBirth[0]',{no:'8'})])},

 {id:6,t:L('Marital history','Historial matrimonial'),fields:[
  S('marital','Current marital status','Estado civil actual','marital',{S:'Pt6Line1_MaritalStatus[1]',M:'Pt6Line1_MaritalStatus[3]',D:'Pt6Line1_MaritalStatus[0]',W:'Pt6Line1_MaritalStatus[2]',A:'Pt6Line1_MaritalStatus[4]',E:'Pt6Line1_MaritalStatus[5]'},{no:'1',req:1}),
  S('spouseForces','If married: is your spouse a current member of the U.S. armed forces or Coast Guard?','Si está casado(a): ¿su cónyuge es miembro actual de las fuerzas armadas o la Guardia Costera de EE. UU.?','armed',{A:'Pt5Line2_YNNA[2]',Y:'Pt5Line2_YNNA[1]',N:'Pt5Line2_YNNA[0]'},{no:'2',show:married}),
  X('timesMarried','How many times have you been married (including current, abroad, annulled, to the same person)?','¿Cuántas veces se ha casado (incluya actual, en el exterior, anuladas, con la misma persona)?','Pt6Line3_TimesMarried[0]',{no:'3',show:notSingle,dg:1}),
  X('spFamily','Current spouse family name','Apellido del cónyuge actual','Pt6Line4_FamilyName[0]',{no:'4',show:married}),
  X('spGiven','Current spouse given name','Nombre del cónyuge actual','Pt6Line4_GivenName[0]',{no:'4',show:married}),
  X('spMiddle','Current spouse middle name','Segundo nombre del cónyuge actual','Pt6Line4_MiddleName[0]',{no:'4',show:married}),
  X('spA','Current spouse A-Number (if any)','Número A del cónyuge actual (si tiene)','Pt6Line5_AlienNumber[0]',{no:'5',show:married,dg:1}),
  D('spDob','Current spouse date of birth','Fecha de nacimiento del cónyuge actual','Pt5Line8_DateofBirth[1]',{no:'6',show:married}),
  X('spCountry','Current spouse country of birth','País de nacimiento del cónyuge actual','Pt6Line7_Country[0]',{no:'7',show:married}),
  f('spAddr','group',L('Current spouse physical address','Dirección física del cónyuge actual'),{no:'8',show:married,sub:ADDR({street:'Part6Line8_StreetName[0]',unit:['P6Line8_Unit[0]','P6Line8_Unit[1]','P6Line8_Unit[2]'],num:'P6Line8_Number[0]',city:'P6Line8_City[0]',state:'P6Line8_State[0]',zip:'P6Line8_ZipCode[0]',prov:'P6Line8_Province[0]',postal:'P6Line8_PostalCode[0]',country:'P6Line8_Country[0]'})}),
  X('mCity','Place of marriage to current spouse: city or town','Lugar del matrimonio con el cónyuge actual: ciudad o pueblo','Pt6Line10_CityTownOfBirth[0]',{no:'9',show:married}),
  X('mState','Place of marriage: state or province','Lugar del matrimonio: estado o provincia','Pt6Line10_State[0]',{no:'9',show:married}),
  X('mCountry','Place of marriage: country','Lugar del matrimonio: país','Pt6Line10_Country[0]',{no:'9',show:married}),
  D('mDate','Date of marriage to current spouse','Fecha del matrimonio con el cónyuge actual','Pt5Line8_DateofBirth[2]',{no:'9',show:married}),
  Y('spApplying','Is your current spouse applying with you?','¿Su cónyuge actual presenta solicitud con usted?',YN('Pt6Line11_YN',1),{no:'10',show:married}),
  f('priorSpouses','list',L('Prior marriages (extra ones go to Part 14)','Matrimonios anteriores (los adicionales van a la Parte 14)'),{no:'11',show:a=>notSingle(a)&&+a.timesMarried!==1,cap:1,part:6,page:11,item:[
   X('family','Prior spouse family name (before marriage)','Apellido del cónyuge anterior (antes del matrimonio)','Pt6Line12_FamilyName[0]'),
   X('given','Prior spouse given name','Nombre del cónyuge anterior','Pt6Line12_GivenName[0]'),
   X('middle','Prior spouse middle name','Segundo nombre del cónyuge anterior','Pt6Line12_MiddleName[0]'),
   D('dob','Prior spouse date of birth','Fecha de nacimiento del cónyuge anterior','Pt5Line8_DateofBirth[3]'),
   X('cob','Prior spouse country of birth','País de nacimiento del cónyuge anterior','Pt6Line14_Country[0]'),
   X('cit','Prior spouse country of citizenship','País de ciudadanía del cónyuge anterior','Pt6Line15_Country[0]'),
   D('mDate','Date of marriage','Fecha del matrimonio','Pt6Line16_DateofBirth[0]'),
   X('mCity','Place of marriage: city','Lugar del matrimonio: ciudad','Pt6Line10_CityTownOfBirth[1]'),
   X('mState','Place of marriage: state or province','Lugar del matrimonio: estado o provincia','Pt6Line10_State[1]'),
   X('mCountry','Place of marriage: country','Lugar del matrimonio: país','Pt6Line10_Country[1]'),
   X('eCity','Place marriage ended: city','Lugar donde terminó el matrimonio: ciudad','Pt6Line18_CityTownOfBirth[0]'),
   X('eState','Place marriage ended: state or province','Lugar donde terminó: estado o provincia','Pt6Line18_State[0]'),
   X('eCountry','Place marriage ended: country','Lugar donde terminó: país','Pt6Line18_Country[0]'),
   D('eDate','Date marriage legally ended','Fecha en que terminó legalmente el matrimonio','Pt6Line16_DateofBirth[1]'),
   S('howEnded','How the marriage ended','Cómo terminó el matrimonio','howEnded',{A:'Pt6Line19_MaritalStatus[1]',D:'Pt6Line19_MaritalStatus[3]',W:'Pt6Line19_MaritalStatus[0]',O:'Pt6Line19_MaritalStatus[2]'}),
   X('howOther','If Other, explain','Si es Otro, explique','Pt6Line19_HowMarriageEndedOther[0]')]})]},

 {id:7,t:L('Children','Hijos'),fields:[
  X('childCount','Total number of ALL living children anywhere (any age, including stepchildren)','Número total de TODOS sus hijos vivos en cualquier lugar (cualquier edad, incluso hijastros)','Pt6Line1_TotalChildren[0]',{no:'1',dg:1}),
  f('children','list',L('Your children (more than 2 go to Part 14)','Sus hijos (más de 2 van a la Parte 14)'),{no:'2',show:a=>+a.childCount>0,cap:2,part:7,page:12,item:[
   X('family','Family name','Apellido',['Pt7Line2_FamilyName[0]','Pt7Line3_FamilyName[0]']),
   X('given','Given name','Nombre',['Pt7Line2_GivenName[0]','Pt7Line3_GivenName[0]']),
   X('middle','Middle name','Segundo nombre',['Pt7Line2_MiddleName[0]','Pt7Line3_MiddleName[0]']),
   X('a','A-Number (if any)','Número A (si tiene)',['Pt7Line2_AlienNumber[0]','Pt7Line3_AlienNumber[0]'],{dg:1}),
   D('dob','Date of birth','Fecha de nacimiento',['Pt7Line2_DateofBirth[0]','Pt7Line3_DateofBirth[0]']),
   X('country','Country of birth','País de nacimiento',['Pt7Line2_Country[0]','Pt7Line3_Country[0]']),
   X('rel','Relationship (biological child, stepchild, legally adopted child)','Relación (hijo(a) biológico(a), hijastro(a), hijo(a) adoptado(a) legalmente)',['Pt7Line2_Relationship[0]','Pt7Line3_Relationship[0]']),
   f('applying','yesno',L('Is this child also applying now on a separate Form I-485?','¿Este(a) hijo(a) también presenta ahora un Formulario I-485 por separado?'),{y:[YN('Pt7Line2_YN',1),YN('Pt7Line3_YN',1)]})]})]},

 {id:8,t:L('Biographic information','Información biográfica'),fields:[
  S('ethnicity','Ethnicity','Origen étnico','ethnicity',{H:'Pt7Line1_Ethnicity[0]',N:'Pt7Line1_Ethnicity[1]'},{no:'1',req:1}),
  f('race','multi',L('Race (select all that apply)','Raza (seleccione todas las que apliquen)'),{no:'2',opts:'race',req:1,c:{I:'Pt7Line2_Race[3]',A:'Pt7Line2_Race[0]',B:'Pt7Line2_Race[2]',P:'Pt7Line2_Race[4]',W:'Pt7Line2_Race[1]'}}),
  f('heightFt','select',L('Height (feet)','Estatura (pies)'),{no:'3',opts:'feet',req:1,d:'Pt7Line3_HeightFeet[0]'}),
  f('heightIn','select',L('Height (inches)','Estatura (pulgadas)'),{no:'3',opts:'inches',req:1,d:'Pt7Line3_HeightInches[0]'}),
  f('weight','number',L('Weight (pounds)','Peso (libras)'),{no:'4',req:1,tf:(v)=>{const s=String(Math.max(0,Math.min(999,Math.round(+v)))).padStart(3,' ');return [['Pt7Line4_Weight1[0]',s[0]],['Pt7Line4_Weight2[0]',s[1]],['Pt7Line4_Weight3[0]',s[2]]].filter(x=>x[1].trim())}}),
  S('eye','Eye color','Color de ojos','eye',{BLK:'Pt7Line5_Eyecolor[1]',BLU:'Pt7Line5_Eyecolor[0]',BRO:'Pt7Line5_Eyecolor[2]',GRY:'Pt7Line5_Eyecolor[3]',GRN:'Pt7Line5_Eyecolor[4]',HAZ:'Pt7Line5_Eyecolor[5]',MAR:'Pt7Line5_Eyecolor[6]',PNK:'Pt7Line5_Eyecolor[7]',XXX:'Pt7Line5_Eyecolor[8]'},{no:'5',req:1}),
  S('hair','Hair color','Color de cabello','hair',{BAL:'Pt7Line6_Haircolor[0]',BLK:'Pt7Line6_Haircolor[1]',BLN:'Pt7Line6_Haircolor[2]',BRO:'Pt7Line6_Haircolor[3]',GRY:'Pt7Line6_Haircolor[4]',RED:'Pt7Line6_Haircolor[5]',SDY:'Pt7Line6_Haircolor[6]',WHI:'Pt7Line6_Haircolor[7]',XXX:'Pt7Line6_Haircolor[8]'},{no:'6',req:1})]},

 {id:9,t:L('General eligibility and inadmissibility grounds','Elegibilidad general y causales de inadmisibilidad'),risk:1,fields:[]},

 {id:10,t:L('Your contact information','Su información de contacto'),fields:[
  X('phone','Daytime telephone','Teléfono de día','Pt3Line3_DaytimePhoneNumber1[0]',{no:'1',req:1,dg:1}),
  X('mobile','Mobile telephone (if any)','Teléfono móvil (si tiene)','Pt3Line4_MobileNumber1[0]',{no:'2',dg:1}),
  X('email','Email (if any)','Correo electrónico (si tiene)','Pt3Line5_Email[0]',{no:'3'})]},

 {id:11,t:L('Interpreter','Intérprete'),fields:[
  Y('needsInterpreter','Did an interpreter help you read the form in a language you are fluent in?','¿Un intérprete le ayudó a leer el formulario en un idioma en que usted es fluido(a)?',null),
  X('inFamily','Interpreter family name','Apellido del intérprete','Pt11Line1a_FamilyName[0]',{show:a=>a.needsInterpreter==='yes'}),
  X('inGiven','Interpreter given name','Nombre del intérprete','Pt11Line1b_GivenName[0]',{show:a=>a.needsInterpreter==='yes'}),
  X('inOrg','Interpreter business or organization','Negocio u organización del intérprete','Pt11Line2_OrgName[0]',{show:a=>a.needsInterpreter==='yes'}),
  X('inPhone','Interpreter daytime telephone','Teléfono de día del intérprete','P3_Line4_DaytimeTelePhoneNumber[0]',{show:a=>a.needsInterpreter==='yes',dg:1}),
  X('inMobile','Interpreter mobile telephone','Teléfono móvil del intérprete','P3_Line5_MobileTelePhoneNumber[0]',{show:a=>a.needsInterpreter==='yes',dg:1}),
  X('inEmail','Interpreter email','Correo del intérprete','P3_Line6_Email[0]',{show:a=>a.needsInterpreter==='yes'}),
  X('inLang','Language the interpreter used','Idioma que usó el intérprete','Part11_NameofLanguage[0]',{show:a=>a.needsInterpreter==='yes'})]},

 {id:12,t:L('Preparer and attorney (if any)','Preparador y abogado (si hay)'),fields:[
  Y('preparedBy','Was this application prepared by someone other than the applicant?','¿Esta solicitud fue preparada por alguien que no es el solicitante?',null),
  X('prFamily2','Preparer family name','Apellido del preparador','Pt12Line1_PreparerFamilyName[0]',{show:a=>a.preparedBy==='yes'}),
  X('prGiven2','Preparer given name','Nombre del preparador','Pt12Line1a_PreparerGivenName[0]',{show:a=>a.preparedBy==='yes'}),
  X('prOrg','Preparer business or organization','Negocio u organización del preparador','Pt12Line2_BusinessName[0]',{show:a=>a.preparedBy==='yes'}),
  X('prPhone','Preparer daytime telephone','Teléfono de día del preparador','Pt12Line3_PreparerDaytimePhoneNumber1[0]',{show:a=>a.preparedBy==='yes',dg:1}),
  X('prMobile','Preparer mobile telephone','Teléfono móvil del preparador','Pt12Line4_PreparerMobileNumber[0]',{show:a=>a.preparedBy==='yes',dg:1}),
  X('prEmail','Preparer email','Correo del preparador','Pt12Line5_PreparerEmail[0]',{show:a=>a.preparedBy==='yes'}),
  f('g28','multi',L('Attorney or accredited representative (top of page 1)','Abogado o representante acreditado (parte superior de la página 1)'),{opts:'g28',c:{y:'CheckBox1[0]'}}),
  X('volag','Volag number (if any)','Número Volag (si tiene)','VolagNumber[0]'),
  X('barNo','Attorney State Bar number (if applicable)','Número de la barra estatal del abogado (si aplica)','AttorneyStateBarNumber[0]'),
  X('attyAcct','Attorney/representative USCIS online account number (if any)','Número de cuenta en línea de USCIS del abogado/representante (si tiene)','USCISOnlineAcctNumber[0]')]},

 {id:14,t:L('Additional information','Información adicional'),fields:[
  f('additionalInfo','textarea',L('Anything else for Part 14 (explanations from your answers are added automatically)','Algo más para la Parte 14 (las explicaciones de sus respuestas se agregan automáticamente)'),{p14:{part:14,item:'',page:24}})]}
];

const R=(id,base,adv,w,en,es,o={})=>({id,base,adv,w,en,es,page:o.page,show:o.show,expl:o.expl!==false});
const Q=(id,b,y,w,en,es,page,o={})=>R(id,YN(b,y),'yes',w,en,es,Object.assign({page},o));
const q=(a,k)=>a['q_'+k];
const RISK=[
 Q('1','Pt8Line1_YesNo',1,0,'Have you EVER been a member of, involved in, or associated with any organization, association, fund, foundation, party, club, society or similar group in the U.S. or anywhere in the world? (If Yes, complete the organization list below.)','¿Alguna vez fue miembro, participó o estuvo asociado con alguna organización, asociación, fondo, fundación, partido, club, sociedad o grupo similar en EE. UU. o en cualquier lugar del mundo? (Si es Sí, complete la lista de organizaciones abajo.)',13,{expl:false}),
 Q('10','Pt9Line10_YesNo',1,35,'Have you EVER been denied admission to the United States?','¿Alguna vez se le negó la admisión a Estados Unidos?',14),
 Q('11','Pt9Line11_YesNo',0,25,'Have you EVER been denied a visa to the United States?','¿Alguna vez se le negó una visa para Estados Unidos?',14),
 Q('12','Pt9Line12_YesNo',0,45,'Have you EVER worked in the United States without authorization?','¿Alguna vez trabajó en Estados Unidos sin autorización?',14),
 Q('13','Pt8Line13_YesNo',1,40,'Have you EVER violated the terms or conditions of your nonimmigrant status?','¿Alguna vez violó los términos o condiciones de su estatus de no inmigrante?',14),
 Q('14','Pt8Line18_YesNo',0,55,'Are you presently, or have you EVER been, in removal, exclusion, rescission or deportation proceedings (including expedited removal)?','¿Está actualmente, o ha estado ALGUNA VEZ, en procedimientos de remoción, exclusión, rescisión o deportación (incluso remoción expedita)?',14),
 Q('15','Pt8Line19_YesNo',1,70,'Have you EVER been issued a final order of exclusion, deportation or removal?','¿Alguna vez se le emitió una orden final de exclusión, deportación o remoción?',14),
 Q('16','Pt8Line20_YesNo',0,70,'Have you EVER had a prior final order of exclusion, deportation or removal reinstated?','¿Alguna vez se le reinstaló una orden final previa de exclusión, deportación o remoción?',14),
 Q('17','Pt8Line17_YesNo',0,50,'Have you EVER been granted voluntary departure by an immigration officer or judge but failed to depart in the allotted time?','¿Alguna vez se le concedió salida voluntaria por un oficial o juez de inmigración pero no salió en el plazo asignado?',14),
 Q('18','Pt8Line23_YesNo',1,30,'Have you EVER applied for any kind of relief or protection from removal, exclusion or deportation?','¿Alguna vez solicitó algún tipo de alivio o protección contra la remoción, exclusión o deportación?',14),
 Q('19','Pt8Line24a_YesNo',0,20,'Have you EVER been a J nonimmigrant exchange visitor subject to the two-year foreign residence requirement?','¿Alguna vez fue visitante de intercambio J sujeto al requisito de residencia en el extranjero de dos años?',14),
 R('20',YN('Pt8Line24b_YesNo',1),'no',30,'If Item 19 is Yes: have you complied with the foreign residence requirement?','Si el Ítem 19 es Sí: ¿ha cumplido el requisito de residencia en el extranjero?',{page:14,show:a=>q(a,'19')==='yes'}),
 R('21',YN('Pt8Line24c_YesNo',0),'no',30,'If Item 19 is Yes and Item 20 is No: have you been granted a waiver, or has the Department of State issued a favorable waiver recommendation letter?','Si el Ítem 19 es Sí y el 20 es No: ¿se le concedió una exención o el Departamento de Estado emitió una carta favorable de recomendación de exención?',{page:14,show:a=>q(a,'19')==='yes'&&q(a,'20')==='no'}),
 Q('22','Pt8Line22_YesNo',0,45,'Have you EVER been arrested, cited, charged, permitted to participate in a diversion program, or detained for any reason by any law enforcement official in any country (including U.S. immigration, armed forces or Coast Guard officials)?','¿Alguna vez fue arrestado(a), citado(a), acusado(a), admitido(a) a un programa de desvío o detenido(a) por cualquier motivo por algún oficial del orden público en cualquier país (incluso oficiales de inmigración, fuerzas armadas o Guardia Costera de EE. UU.)?',14),
 Q('23','Pt9Line23_YesNo',1,45,'Have you EVER committed a crime of any kind (even if not arrested, cited, charged, tried or convicted)?','¿Alguna vez cometió un delito de cualquier tipo (aunque no haya sido arrestado(a), citado(a), acusado(a), juzgado(a) o condenado(a))?',15),
 Q('24','Pt9Line24_YesNo',0,55,'Have you EVER pled guilty to or been convicted of a crime or offense (even if expunged, sealed, pardoned, or cleared by clemency)?','¿Alguna vez se declaró culpable o fue condenado(a) por un delito o infracción (aunque haya sido borrado, sellado, perdonado o anulado por clemencia)?',15),
 Q('25','Pt8Line25_YesNo',1,40,'Have you EVER been ordered punished by a judge or had conditions imposed that restrained your liberty (prison, suspended sentence, house arrest, parole, probation, treatment programs, community service)?','¿Alguna vez un juez ordenó un castigo o le impuso condiciones que restringieron su libertad (prisión, sentencia suspendida, arresto domiciliario, libertad condicional, probation, programas de tratamiento, servicio comunitario)?',15),
 Q('26','Pt8Line26_YesNo',1,55,'Have you EVER violated (or attempted or conspired to violate) any controlled substance law of a state, the U.S. or a foreign country?','¿Alguna vez violó (o intentó o conspiró para violar) alguna ley de sustancias controladas de un estado, EE. UU. o un país extranjero?',15),
 Q('27','Pt8Line27_YesNo',1,80,'Have you EVER trafficked in, benefited from, or knowingly aided, abetted, assisted, conspired or colluded in the illegal trafficking of controlled substances?','¿Alguna vez traficó, se benefició o ayudó, facilitó, asistió, conspiró o coludió a sabiendas en el tráfico ilegal de sustancias controladas?',15),
 Q('28','Pt8Line28_YesNo',1,40,'Are you the spouse, son or daughter of an alien who illicitly trafficked in a controlled substance, and you obtained a financial or other benefit from it within the last 5 years?','¿Es cónyuge, hijo(a) de un extranjero que traficó ilícitamente una sustancia controlada y obtuvo un beneficio financiero u otro de ello en los últimos 5 años?',15),
 Q('29','Pt8Line29_YesNo',1,50,'If Item 28 is Yes: did you know, or should you reasonably have known, that the benefit came from that activity?','Si el Ítem 28 es Sí: ¿sabía, o debía razonablemente saber, que el beneficio provenía de esa actividad?',15,{show:a=>q(a,'28')==='yes'}),
 Q('30','Pt8Line30_YesNo',1,40,'Have you EVER engaged in prostitution, or are you coming to the U.S. to engage in prostitution?','¿Alguna vez se dedicó a la prostitución, o viene a EE. UU. a dedicarse a ella?',15),
 Q('31','Pt8Line31_YesNo',0,50,'Have you EVER directly or indirectly procured, attempted to procure, or imported prostitutes or persons for prostitution?','¿Alguna vez consiguió, intentó conseguir o importó, directa o indirectamente, prostitutas o personas para la prostitución?',15),
 Q('32','Pt8Line32_YesNo',0,50,'Have you EVER received proceeds or money from prostitution?','¿Alguna vez recibió ganancias o dinero de la prostitución?',15),
 Q('33','Pt8Line33_YesNo',0,40,'Do you intend to engage in illegal gambling or any other commercialized vice (prostitution, bootlegging, sale of child pornography) in the U.S.?','¿Tiene la intención de dedicarse a apuestas ilegales u otro vicio comercializado (prostitución, contrabando de licor, venta de pornografía infantil) en EE. UU.?',15),
 Q('34','Pt8Line34_YesNo',1,40,'Have you EVER exercised immunity (diplomatic or otherwise) to avoid prosecution for a criminal offense in the U.S.?','¿Alguna vez ejerció inmunidad (diplomática u otra) para evitar ser procesado(a) por un delito en EE. UU.?',15),
 Q('35a','Pt8Line35a_YesNo',0,10,'Have you EVER served as a foreign government official?','¿Alguna vez sirvió como funcionario(a) de un gobierno extranjero?',15),
 Q('35b','Pt8Line35b_YesNo',1,80,'If Item 35.a is Yes: have you EVER been responsible for, enforced, or directly carried out violations of religious freedoms?','Si el Ítem 35.a es Sí: ¿alguna vez fue responsable de, hizo cumplir o llevó a cabo directamente violaciones de la libertad religiosa?',15,{show:a=>q(a,'35a')==='yes'}),
 Q('36','Pt8Line36_YesNo',1,90,'Have you EVER induced by force, fraud or coercion (or otherwise been involved in) the trafficking of another person for commercial sex acts (sex trafficking)?','¿Alguna vez indujo por fuerza, fraude o coerción (o estuvo involucrado(a) de otra forma) en la trata de otra persona para actos sexuales comerciales (trata sexual)?',15),
 Q('37','Pt8Line37_YesNo',1,90,'Have you EVER trafficked a person into involuntary servitude, peonage, debt bondage or slavery?','¿Alguna vez traficó a una persona hacia servidumbre involuntaria, peonaje, servidumbre por deudas o esclavitud?',15),
 Q('38','Pt8Line38_YesNo',0,90,'Have you EVER knowingly aided, abetted, assisted, conspired or colluded with others in trafficking in persons for commercial sex acts or involuntary servitude, peonage, debt bondage or slavery?','¿Alguna vez ayudó, facilitó, asistió, conspiró o coludió a sabiendas con otros en la trata de personas para actos sexuales comerciales o servidumbre involuntaria, peonaje, servidumbre por deudas o esclavitud?',16),
 Q('39','Pt9Line39_YesNo',1,40,'Are you the spouse, son or daughter of an alien who engaged in trafficking in persons, and you received a financial or other benefit from it within the last 5 years?','¿Es cónyuge, hijo(a) de un extranjero que participó en trata de personas y recibió un beneficio financiero u otro de ello en los últimos 5 años?',16),
 Q('40','Pt8Line40_YesNo',1,50,'If Item 39 is Yes: did you know, or reasonably should have known, that the benefit resulted from that activity?','Si el Ítem 39 es Sí: ¿sabía, o razonablemente debía saber, que el beneficio resultó de esa actividad?',16,{show:a=>q(a,'39')==='yes'}),
 Q('41','Pt8Line41_YesNo',0,80,'Have you EVER engaged in money laundering, or knowingly aided or conspired in money laundering, or do you seek to enter the U.S. to do so?','¿Alguna vez participó en lavado de dinero, o ayudó o conspiró a sabiendas en lavado de dinero, o busca entrar a EE. UU. para hacerlo?',16),
 Q('42a','Pt8Line42.a_YesNo',0,90,'Do you intend to engage in any activity that violates or evades any law relating to espionage or sabotage in the U.S.?','¿Tiene la intención de participar en alguna actividad que viole o evada alguna ley relacionada con espionaje o sabotaje en EE. UU.?',16),
 Q('42b','Pt8Line42.b_YesNo',1,80,'Do you intend to engage in any activity in the U.S. that violates or evades any law prohibiting the export of goods, technology or sensitive information?','¿Tiene la intención de participar en alguna actividad en EE. UU. que viole o evada alguna ley que prohíba la exportación de bienes, tecnología o información sensible?',16),
 Q('42c','Pt8Line42c_YesNo',1,90,'Do you intend to engage in any activity whose purpose includes opposing, controlling or overthrowing the U.S. Government by force, violence or other unlawful means?','¿Tiene la intención de participar en alguna actividad cuyo propósito incluya oponerse, controlar o derrocar al Gobierno de EE. UU. por la fuerza, violencia u otros medios ilegales?',16),
 Q('42d','Pt8Line42d_YesNo',0,60,'Do you intend to engage in any other unlawful activity?','¿Tiene la intención de participar en alguna otra actividad ilegal?',16),
 Q('43a','Pt8Line43a_YesNo',1,30,'Have you EVER received any weapons training, paramilitary training or other military-type training?','¿Alguna vez recibió entrenamiento con armas, paramilitar u otro tipo de entrenamiento militar?',16),
 Q('43b','Pt8Line43b_YesNo',0,90,'Have you EVER committed kidnapping, assassination, hijacking or sabotage of a conveyance (aircraft, vessel, vehicle or train)?','¿Alguna vez cometió secuestro, asesinato, desvío o sabotaje de un medio de transporte (aeronave, embarcación, vehículo o tren)?',16),
 Q('43c','Pt8Line43c_YesNo',0,90,'Have you EVER used a weapon, explosive or dangerous device with intent to endanger others or damage property?','¿Alguna vez usó un arma, explosivo o dispositivo peligroso con la intención de poner en peligro a otros o dañar propiedad?',16),
 Q('43d','Pt8Line43d_YesNo',0,85,'Have you EVER threatened, attempted, conspired, prepared or planned to do any of the things in Items 43.b.-43.c.?','¿Alguna vez amenazó, intentó, conspiró, preparó o planificó hacer alguna de las cosas de los Ítems 43.b.-43.c.?',16),
 Q('43e','Pt8Line43e_YesNo',0,85,'Have you EVER incited, with intent to cause death or serious bodily harm, any of the activities in Items 43.b.-43.c.?','¿Alguna vez incitó, con intención de causar muerte o daño corporal grave, alguna de las actividades de los Ítems 43.b.-43.c.?',16),
 Q('43f','Pt8Line43fYesNo',0,85,'Have you EVER participated in, or been a member of, a group or organization that did any of the activities in Items 43.b.-43.e.?','¿Alguna vez participó o fue miembro de un grupo u organización que hizo alguna de las actividades de los Ítems 43.b.-43.e.?',16),
 Q('43g','Pt8Line43g_YesNo',0,85,'Have you EVER recruited members or asked for money or things of value for a group that did any of the activities in Items 43.b.-43.e.?','¿Alguna vez reclutó miembros o pidió dinero o cosas de valor para un grupo que hizo alguna de las actividades de los Ítems 43.b.-43.e.?',16),
 Q('43h','Pt8Line43h_YesNo',1,85,'Have you EVER provided money, things of value, services, labor or other support for any of the activities in Items 43.b.-43.e.?','¿Alguna vez proporcionó dinero, cosas de valor, servicios, trabajo u otro apoyo para alguna de las actividades de los Ítems 43.b.-43.e.?',16),
 Q('43i','Pt8Line43i_YesNo',1,85,'Have you EVER provided money, things of value, services, labor or other support for an individual, group or organization that did any of the activities in Items 43.b.-43.e.?','¿Alguna vez proporcionó dinero, cosas de valor, servicios, trabajo u otro apoyo a una persona, grupo u organización que hizo alguna de las actividades de los Ítems 43.b.-43.e.?',16),
 Q('44','Pt8Line44_YesNo',0,90,'Do you intend to engage in any of the activities listed in Items 43.b.-43.e.?','¿Tiene la intención de participar en alguna de las actividades de los Ítems 43.b.-43.e.?',16),
 Q('45','Pt8Line45_YesNo',1,90,'Do you intend to engage in any activity that could endanger the welfare, safety or security of the United States?','¿Tiene la intención de participar en alguna actividad que pueda poner en peligro el bienestar, la seguridad o la protección de Estados Unidos?',16),
 Q('46','Pt8Line46_YesNo',0,60,'Are you the spouse or child of an individual who EVER engaged in any of the activities in Items 43.b.-43.i.?','¿Es cónyuge o hijo(a) de una persona que ALGUNA VEZ participó en alguna de las actividades de los Ítems 43.b.-43.i.?',17),
 Q('47','Pt8Line47_YesNo',1,70,'Have you EVER sold, provided or transported weapons, or helped anyone do so, knowing or believing they would be used against another person?','¿Alguna vez vendió, proporcionó o transportó armas, o ayudó a alguien a hacerlo, sabiendo o creyendo que se usarían contra otra persona?',17),
 Q('48','Pt8Line48_YesNo',1,40,'Have you EVER worked, volunteered or served in any prison, jail, prison camp, detention facility, labor camp or other place where people were detained, or directed/participated in detaining people?','¿Alguna vez trabajó, fue voluntario(a) o sirvió en alguna prisión, cárcel, campo de prisioneros, centro de detención, campo de trabajo u otro lugar donde se detenía personas, o dirigió/participó en detener personas?',17),
 Q('49','Pt8Line49_YesNo',0,40,'Have you EVER been a member of, assisted or participated in any group, unit or organization in which you or others used any type of weapon against any person or threatened to do so?','¿Alguna vez fue miembro, ayudó o participó en algún grupo, unidad u organización en el que usted u otros usaron cualquier tipo de arma contra alguien o amenazaron con hacerlo?',17),
 Q('50','Pt8Line50_YesNo',1,35,'Have you EVER served in, been a member of, assisted or participated in any military or police unit?','¿Alguna vez sirvió, fue miembro, ayudó o participó en alguna unidad militar o policial?',17),
 Q('51','Pt8Line51_YesNo',0,40,'Have you EVER served in, been a member of, assisted or participated in any armed group (paramilitary, self-defense, vigilante, rebel, guerrilla)?','¿Alguna vez sirvió, fue miembro, ayudó o participó en algún grupo armado (paramilitar, de autodefensa, vigilante, rebelde, guerrillero)?',17),
 Q('52','Pt8Line52_YesNo',1,30,'Have you EVER been a member of, or affiliated with, the Communist Party or any totalitarian party (in the U.S. or abroad)?','¿Alguna vez fue miembro o estuvo afiliado(a) al Partido Comunista o a algún partido totalitario (en EE. UU. o en el exterior)?',17),
 Q('53a','Pt8Line53a_YesNo',0,90,'Have you EVER ordered, incited, called for, committed, assisted or participated in: torture?','¿Alguna vez ordenó, incitó, pidió, cometió, ayudó o participó en: tortura?',17),
 Q('53b','Pt8Line53b_YesNo',0,90,'...genocide?','...genocidio?',17),
 Q('53c','Pt8Line53c_YesNo',0,90,'...killing, or trying to kill, any person?','...matar o intentar matar a alguna persona?',17),
 Q('53d','Pt8Line53d_YesNo',1,70,'...intentionally and severely injuring or trying to injure any person?','...lesionar intencional y gravemente o intentar lesionar a alguna persona?',17),
 Q('54','Pt8Line54_YesNo',1,85,'Have you EVER recruited, enlisted, conscripted or used any person under 15 to take part in hostilities or to serve in or help an armed force or group, or tried or worked with others to do so?','¿Alguna vez reclutó, alistó, reclutó a la fuerza o usó a una persona menor de 15 años para participar en hostilidades o servir o ayudar a una fuerza o grupo armado, o lo intentó o trabajó con otros para hacerlo?',17),
 Q('55','Pt8Line55_YesNo',0,85,'Have you EVER used any person under 15 to take part in hostilities (combat, courier, sabotage, supply transport), or tried or worked with others to do so?','¿Alguna vez usó a una persona menor de 15 años para participar en hostilidades (combate, mensajero, sabotaje, transporte de suministros), o lo intentó o trabajó con otros para hacerlo?',17),
 Q('65','Pt9Line67_YesNo',1,55,'Have you EVER failed or refused to attend or remain at a removal proceeding filed against you on or after April 1, 1997?','¿Alguna vez dejó de asistir o rehusó asistir o permanecer en un procedimiento de remoción presentado en su contra el 1 de abril de 1997 o después?',20),
 Q('66','Pt9Line68_YesNo',0,60,'Have you EVER submitted altered, fraudulent or counterfeit documentation to a U.S. Government official to obtain an immigration benefit, visa or entry?','¿Alguna vez presentó documentación alterada, fraudulenta o falsificada a un funcionario del Gobierno de EE. UU. para obtener un beneficio migratorio, visa o entrada?',20),
 Q('67','Pt9Line69_YesNo',1,55,'Have you EVER lied about, concealed or misrepresented information on an application or petition for a visa, entry document, admission or any immigration benefit?','¿Alguna vez mintió, ocultó o tergiversó información en una solicitud o petición de visa, documento de entrada, admisión o cualquier beneficio migratorio?',20),
 Q('68','Pt9Line70_YesNo',0,60,'Have you EVER falsely claimed to be a U.S. citizen (in writing or any other way)?','¿Alguna vez afirmó falsamente ser ciudadano(a) de EE. UU. (por escrito o de otra forma)?',20),
 Q('69','Pt9Line71_YesNo',1,45,'Have you EVER been a stowaway on a vessel or aircraft arriving in the U.S.?','¿Alguna vez fue polizón en una embarcación o aeronave que llegaba a EE. UU.?',20),
 Q('70','Pt9Line72_YesNo',0,50,'Have you EVER knowingly encouraged, induced, assisted, abetted or aided any alien to enter or try to enter the U.S. illegally (alien smuggling)?','¿Alguna vez alentó, indujo, ayudó o facilitó a sabiendas a algún extranjero a entrar o intentar entrar ilegalmente a EE. UU. (contrabando de personas)?',20),
 Q('71','Pt9Line73_YesNo',1,50,'Are you under a final order of civil penalty for violating INA section 274C for use of fraudulent documents?','¿Está bajo una orden final de sanción civil por violar la sección 274C de la INA por uso de documentos fraudulentos?',20),
 Q('72','Pt9Line74_YesNo',1,60,'Have you EVER been excluded, deported or removed from the U.S., or departed on your own after being ordered excluded, deported or removed?','¿Alguna vez fue excluido(a), deportado(a) o removido(a) de EE. UU., o salió por su cuenta después de que se ordenara su exclusión, deportación o remoción?',20),
 Q('73','Pt9Line75_YesNo',0,35,'Have you EVER entered the U.S. without being inspected and admitted or paroled?','¿Alguna vez entró a EE. UU. sin ser inspeccionado(a) y admitido(a) o con parole?',20),
 Q('74','Pt9Line76_YesNo',1,40,'Since April 1, 1997, have you been unlawfully present in the U.S.? (Include time after your authorized stay expired or time present without admission or parole.)','¿Desde el 1 de abril de 1997 ha estado presente ilegalmente en EE. UU.? (Incluya el tiempo después de vencer su estadía autorizada o presente sin admisión ni parole.)',20),
 Q('75','Pt9Line77_YesNo',0,10,'If Item 74 is Yes: was a severe form of trafficking in persons at least one central reason for your unlawful presence?','Si el Ítem 74 es Sí: ¿una forma grave de trata de personas fue al menos una razón central de su presencia ilegal?',21,{show:a=>q(a,'74')==='yes'}),
 Q('76a','Pt9Line78a_YesNo',1,60,'Since April 1, 1997, have you EVER reentered or tried to reenter the U.S. without inspection and admission or parole after being unlawfully present for more than one year in the aggregate?','¿Desde el 1 de abril de 1997 ha reingresado o intentado reingresar a EE. UU. sin inspección y admisión o parole después de haber estado presente ilegalmente por más de un año en total?',21),
 Q('76b','Pt9Line78b_YesNo',0,70,'Since April 1, 1997, have you EVER reentered or tried to reenter the U.S. without inspection and admission or parole after being deported, excluded or removed?','¿Desde el 1 de abril de 1997 ha reingresado o intentado reingresar a EE. UU. sin inspección y admisión o parole después de haber sido deportado(a), excluido(a) o removido(a)?',21),
 Q('77','Pt9Line79_YesNo',0,60,'Do you plan to practice polygamy in the United States?','¿Planea practicar la poligamia en Estados Unidos?',21),
 Q('78','Pt9Line80_YesNo',1,10,'Are you accompanying an inadmissible alien certified as helpless from sickness, disability or infancy who requires your protection or guardianship (INA 232(c))?','¿Acompaña a un extranjero inadmisible certificado como indefenso por enfermedad, discapacidad o infancia que requiere su protección o tutela (INA 232(c))?',21),
 Q('79','Pt9Line81_YesNo',0,50,'Have you EVER assisted in detaining, retaining or withholding custody of a U.S. citizen child outside the U.S. from a person granted custody?','¿Alguna vez ayudó a detener, retener o negar la custodia de un niño(a) ciudadano(a) de EE. UU. fuera de EE. UU. a una persona a quien se le otorgó la custodia?',21),
 Q('80','Pt9Line82_YesNo',1,50,'Have you EVER voted in violation of any federal, state or local constitutional provision, statute, ordinance or regulation in the U.S.?','¿Alguna vez votó violando alguna disposición constitucional, ley, ordenanza o reglamento federal, estatal o local en EE. UU.?',21),
 Q('81','Pt9Line83_YesNo',0,45,'Have you EVER renounced U.S. citizenship to avoid being taxed by the United States?','¿Alguna vez renunció a la ciudadanía de EE. UU. para evitar pagar impuestos a Estados Unidos?',21),
 Q('82a','Pt9Line84a_YesNo',1,30,'Have you EVER applied for exemption or discharge from training or service in the U.S. armed forces or National Security Training Corps because you are an alien?','¿Alguna vez solicitó exención o baja del entrenamiento o servicio en las fuerzas armadas de EE. UU. o el Cuerpo de Entrenamiento de Seguridad Nacional por ser extranjero(a)?',21),
 Q('82b','Pt9Line84b_YesNo',1,20,'Have you EVER been relieved or discharged from such training or service because you are an alien?','¿Alguna vez fue relevado(a) o dado(a) de baja de dicho entrenamiento o servicio por ser extranjero(a)?',21),
 Q('82c','Pt9Line84c_YesNo',1,40,'Have you EVER been convicted of desertion from the U.S. armed forces?','¿Alguna vez fue condenado(a) por deserción de las fuerzas armadas de EE. UU.?',21),
 Q('83','Pt9Line85_YesNo',1,40,'Have you EVER left or remained outside the U.S. to avoid or evade training or service in the armed forces in time of war or declared national emergency?','¿Alguna vez salió o permaneció fuera de EE. UU. para evitar el entrenamiento o servicio en las fuerzas armadas en tiempo de guerra o emergencia nacional declarada?',21)
];
const RISK_INDEX={};RISK.forEach(r=>RISK_INDEX[r.id]=r);

const ORGS=f('orgs','list',L('Organizations (Items 2-9; more than 2 go to Part 14)','Organizaciones (Ítems 2-9; más de 2 van a la Parte 14)'),{no:'2',show:a=>q(a,'1')==='yes',min:1,cap:2,part:9,page:13,item:[
 X('name','Name of organization','Nombre de la organización',['Pt9Line2_Organization1[0]','Pt9Line6_Organization2[0]']),
 X('city','City or town','Ciudad o pueblo',['Pt9Line3_CityTownOfBirth[0]','Pt9Line7_CityTownOfBirth[0]']),
 X('state','State or province','Estado o provincia',['Pt9Line3_State[0]','Pt9Line7_State[0]']),
 X('country','Country','País',['Pt9Line3_Country[0]','Pt9Line7_Country[0]']),
 X('nature','Nature of organization, purposes and activities (illicit or legitimate)','Naturaleza de la organización, propósitos y actividades (ilícitas o legítimas)',['Pt9Line4_FamilyName[0]','Pt9Line8_FamilyName[0]']),
 X('role','Nature of your involvement, role or positions held','Naturaleza de su participación, cargo o puestos ocupados',['Pt9Line4_Involvement[0]','Pt9Line8_Involvement[0]']),
 D('from','From','Desde',['Pt9Line5_DateFrom[0]','Pt9Line9_DateFrom[0]']),
 D('to','To','Hasta',['Pt9Line5_DateTo[0]','Pt9Line9_DateTo[0]'])]});

const PC=[
 S('pcExempt','Public charge: exempt category (Item 56)','Carga pública: categoría exenta (Ítem 56)','pcEx',Object.fromEntries(Array.from({length:25},(_,i)=>[String(i),`Pt9Line56_CB[${i}]`])),{no:'56'}),
 X('pcHousehold','Describe your family status (e.g. household size)','Describa su situación familiar (p. ej. tamaño del hogar)','Pt9Line57_HouseholdSize[0]',{no:'57',show:a=>a.pcExempt==='23'}),
 S('pcIncome','Annual household income','Ingreso anual del hogar','income',{A:'Pt9Line53_CB[0]',B:'Pt9Line53_CB[1]',C:'Pt9Line53_CB[2]',D:'Pt9Line53_CB[3]',E:'Pt9Line53_CB[4]'},{no:'58',show:a=>a.pcExempt==='23'}),
 S('pcAssets','Total value of household assets','Valor total de los activos del hogar','assets',{A:'Pt9Line59_CB[0]',B:'Pt9Line59_CB[1]',C:'Pt9Line59_CB[2]',D:'Pt9Line59_CB[3]',E:'Pt9Line59_CB[4]'},{no:'59',show:a=>a.pcExempt==='23'}),
 S('pcLiab','Total value of household liabilities (secured and unsecured)','Valor total de los pasivos del hogar (garantizados y no garantizados)','liab',{A:'Pt9Line60_CB[0]',B:'Pt9Line60_CB[1]',C:'Pt9Line60_CB[2]',D:'Pt9Line60_CB[3]',E:'Pt9Line60_CB[4]'},{no:'60',show:a=>a.pcExempt==='23'}),
 S('pcEdu','Highest level of education completed','Nivel más alto de educación completado','edu',{C:'Pt9Line61_CB[0]',2:'Pt9Line61_CB[2]',1:'Pt9Line61_CB[1]',3:'Pt9Line61_CB[3]',7:'Pt9Line61_CB[7]',4:'Pt9Line61_CB[4]',5:'Pt9Line61_CB[5]',6:'Pt9Line61_CB[6]'},{no:'61',show:a=>a.pcExempt==='23'}),
 X('pcGrade','If less than high school: highest grade completed','Si menos que secundaria: grado más alto completado','Pt9Line61_diploma[0]',{no:'61',show:a=>a.pcExempt==='23'&&a.pcEdu==='C'}),
 f('skills','list',L('Skills, certifications and licenses (Item 62; more than 8 go to Part 14)','Habilidades, certificaciones y licencias (Ítem 62; más de 8 van a la Parte 14)'),{no:'62',show:a=>a.pcExempt==='23',cap:8,part:9,page:19,item:[X('s','Skill / certification','Habilidad / certificación',Array.from({length:8},(_,i)=>`Table1[0].Row${i+1}[0].TextField${i+1}[0]`))]}),
 Y('pcBenefit','Have you ever received any means-tested public benefit?','¿Ha recibido alguna vez algún beneficio público sujeto a verificación de recursos?',YN('Pt9Line63_YesNo',0),{no:'63',show:a=>a.pcExempt==='23'}),
 f('benefits','list',L('Means-tested public benefits received (Item 64; more than 4 go to Part 14)','Beneficios públicos recibidos (Ítem 64; más de 4 van a la Parte 14)'),{no:'64',show:a=>a.pcExempt==='23'&&a.pcBenefit==='yes',cap:4,part:9,page:20,item:[
  X('b','Benefit','Beneficio',rows('Pt8Line68c_Column1Row',4)),
  D('from','Start date','Fecha de inicio',rows('Pt8Line68c_Column2Row',4)),
  D('to','End date','Fecha de fin',rows('Pt8Line68c_Column3Row',4)),
  X('amt','Dollar amount received (if applicable)','Monto en dólares recibido (si aplica)',rows('Pt8Line68c_Column4Row',4)),
  X('why','Reason you received the benefit','Motivo por el que recibió el beneficio',rows('Pt8Line68c_Column5Row',4))]})
];
const rq=(r)=>{
 const out=[f('q_'+r.id,'yesno',L(r.en,r.es),{no:r.id.replace(/([0-9]+)([a-z])/,'$1.$2'),req:1,y:r.base,show:r.show,w:r.w,adv:r.adv})];
 if(r.expl&&r.w>0)out.push(f('x_'+r.id,'textarea',UI.explain,{no:out[0].no,show:a=>a['q_'+r.id]===r.adv&&(!r.show||r.show(a)),req:1,sub:1,p14:{part:9,item:out[0].no,page:r.page,from:'x'}}));
 if(r.id==='1')out.push(ORGS);
 if(r.id==='55')out.push.apply(out,PC);
 return out;
};
PARTS.find(p=>p.risk).fields=[].concat.apply([],RISK.map(rq)).concat([
 X('nat83','Item 84: your nationality or immigration status immediately before you left (if Item 83 is Yes)','Ítem 84: su nacionalidad o estatus migratorio justo antes de salir (si el Ítem 83 es Sí)','Pt9Line86_Nationality[0]',{no:'84',show:a=>q(a,'83')==='yes'})]);

const p14={
 name:[['Pt1Line1_FamilyName[1]','familyName'],['Pt1Line1_GivenName[1]','givenName'],['Pt1Line1_MiddleName[1]','middleName']],
 blocks:[0,1,2,3].map(i=>[`Pt9Line3a_PageNumber[${i}]`,`Pt9Line3b_PartNumber[${i}]`,`Pt9Line3c_ItemNumber[${i}]`,`P14_Line${i+2}_AdditionalInfo[0]`])
};
return {id:'i485',name:'I-485 Application to Register Permanent Residence or Adjust Status',short:'I-485',edition:'09/18/26',expires:'02/28/2027',pdf:'i485-09-18-26.pdf',OPT,PARTS,RISK,RISK_INDEX,p14,ui:{
 disclaimer:L('This tool helps organize information for Form I-485 (edition 09/18/26). It is not legal advice and does not replace an attorney or accredited representative. Verify every answer against the official USCIS form and instructions before filing. Adjustment of status has serious consequences; talk to an attorney if any inadmissibility question is Yes.','Esta herramienta ayuda a organizar información para el Formulario I-485 (edición 09/18/26). No es asesoría legal y no reemplaza a un abogado o representante acreditado. Verifique cada respuesta con el formulario e instrucciones oficiales de USCIS antes de presentar. El ajuste de estatus tiene consecuencias serias; hable con un abogado si alguna pregunta de inadmisibilidad es Sí.'),
 pdfNote:L('Fills the official fillable I-485, edition 09/18/26 (expires 02/28/2027). Check uscis.gov/i-485 to confirm this is still the current edition. Signatures and dates are left blank for you to sign by hand. Part 13 (interview) is left blank.','Llena el I-485 oficial, edición 09/18/26 (vence 02/28/2027). Verifique en uscis.gov/i-485 que siga siendo la edición vigente. Las firmas y fechas quedan en blanco para firmarlas a mano. La Parte 13 (entrevista) queda en blanco.'),
 part9intro:L('When a question says EVER, include conduct anywhere in the world, at any time, even if records are sealed or cleared. A "Yes" does not automatically disqualify; it helps decide whether you need an attorney. Details matter. Explain every Yes (and any unsure No) in the box that appears.','Cuando una pregunta dice ALGUNA VEZ (EVER), incluya conducta en cualquier lugar del mundo y en cualquier momento, aunque los registros estén sellados o aclarados. Un "Sí" no descalifica automáticamente; ayuda a decidir si necesita un abogado. Los detalles importan. Explique cada Sí (y cualquier No dudoso) en el cuadro que aparece.')}};
})());
