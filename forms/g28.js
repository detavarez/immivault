registerForm((function(){
const OPT={
 unit:[['',L('None','Ninguno')],['apt',L('Apt.','Apto.')],['ste',L('Ste.','Ste.')],['flr',L('Flr.','Piso')]],
 elig:[['a',L('I am an attorney eligible to practice law in, and a member in good standing of, the bar of the highest court of a state, territory or D.C.','Soy abogado(a) autorizado(a) para ejercer y miembro en buen estado del colegio de abogados del tribunal supremo de un estado, territorio o D.C.')],['b',L('I am an accredited representative of a qualified nonprofit organization recognized by the Department of Justice','Soy representante acreditado(a) de una organización sin fines de lucro calificada y reconocida por el Departamento de Justicia')],['c',L('I am associated with the attorney or accredited representative of record who previously filed a G-28 in this case (limited appearance at his or her request)','Estoy asociado(a) con el abogado o representante acreditado de récord que presentó antes un G-28 en este caso (comparecencia limitada a su solicitud)')],['d',L('I am a law student or law graduate working under the direct supervision of the attorney or accredited representative of record','Soy estudiante o graduado(a) de derecho bajo la supervisión directa del abogado o representante acreditado de récord')]],
 orders:[['N',L('I am not subject to any order suspending, enjoining, restraining, disbarring, or otherwise restricting me in the practice of law','No estoy sujeto(a) a ninguna orden que me suspenda, prohíba, restrinja, inhabilite o limite de otro modo en el ejercicio del derecho')],['Y',L('I am subject to such an order (explain in Part 6)','Estoy sujeto(a) a una orden de ese tipo (explique en la Parte 6)')]],
 agency:[['U',L('U.S. Citizenship and Immigration Services (USCIS)','Servicios de Ciudadanía e Inmigración de EE. UU. (USCIS)')],['I',L('U.S. Immigration and Customs Enforcement (ICE)','Servicio de Inmigración y Control de Aduanas de EE. UU. (ICE)')],['C',L('U.S. Customs and Border Protection (CBP)','Oficina de Aduanas y Protección Fronteriza de EE. UU. (CBP)')]],
 reqBy:[['A',L('Applicant','Solicitante')],['P',L('Petitioner','Peticionario')],['R',L('Requestor','Requirente')],['BD',L('Beneficiary / Derivative','Beneficiario / Derivado')],['B',L('Respondent (ICE, CBP)','Demandado (ICE, CBP)')]],
 consent:[['a',L('Send original notices on an application or petition to my attorney or accredited representative’s U.S. business address','Enviar los avisos originales de una solicitud o petición a la dirección comercial en EE. UU. de mi abogado o representante acreditado')],['b',L('Send my secure identity documents (e.g. Green Card, Employment Authorization) to my attorney or accredited representative’s U.S. business address','Enviar mis documentos de identidad seguros (p. ej. tarjeta verde, autorización de empleo) a la dirección comercial en EE. UU. de mi abogado o representante acreditado')],['c',L('Send my notice containing Form I-94 to me at my U.S. mailing address','Enviar el aviso que contenga el Formulario I-94 a mi dirección postal en EE. UU.')]]
};
const X=(k,en,es,t,o)=>f(k,'text',L(en,es),Object.assign({t},o));
const D=(k,en,es,t,o)=>f(k,'date',L(en,es),Object.assign({t},o));
const S=(k,en,es,opts,c,o)=>f(k,'select',L(en,es),Object.assign({opts,c},o));
const M=(k,en,es,opts,c,o)=>f(k,'multi',L(en,es),Object.assign({opts,c},o));
const ST=(d)=>f('state','text',L('State (2 letters, U.S. only)','Estado (2 letras, solo EE. UU.)'),{d,up:1});
const NM=(p,ids,no,o)=>[X(p+'Family','Family name (last)','Apellido',ids[0],Object.assign({no},o)),X(p+'Given','Given name (first)','Nombre',ids[1],Object.assign({no},o)),X(p+'Middle','Middle name','Segundo nombre',ids[2],{no})];
const ADDR=(m)=>[].concat(
 [X('street','Street number and name','Número y nombre de la calle',m.street,{req:m.req})],
 [S('unitType','Unit type','Tipo de unidad','unit',{apt:m.unit[0],ste:m.unit[1],flr:m.unit[2]}),X('unitNum','Unit number','Número de unidad',m.num)],
 [X('city','City or town','Ciudad o pueblo',m.city,{req:m.req}),ST(m.state),X('zip','ZIP code','Código ZIP',m.zip,{dg:1}),X('province','Province (outside U.S.)','Provincia (fuera de EE. UU.)',m.prov),X('postal','Postal code (outside U.S.)','Código postal (fuera de EE. UU.)',m.postal),X('country','Country','País',m.country)]
);
const AD=(g,l,no,m,o)=>f(g,'group',L(l[0],l[1]),Object.assign({no,sub:ADDR(m)},o));
const has=(k)=>a=>(a.elig||[]).includes(k);
const agencyTf=(v,a)=>[[({U:'Line1b_ListFormNumber[0]',I:'Line2b_ListMatter[0]',C:'Line3b_ListSpecificMatter[0]'})[a.agency||'U'],v]];

const PARTS=[
 {id:1,t:L('Attorney or accredited representative','Abogado o representante acreditado'),fields:[].concat(
  [X('rUscis','USCIS online account number (if any)','Número de cuenta en línea de USCIS (si tiene)','Pt1Line1_USCISOnlineAcctNumber[0]',{no:'1'})],
  NM('r',['Pt1Line2a_FamilyName[0]','Pt1Line2b_GivenName[0]','Pt1Line2c_MiddleName[0]'],'2',{req:1}),
  [AD('rAddr',['Business address','Dirección comercial'],'3',{street:'Line3a_StreetNumber[0]',req:1,unit:['Line3b_Unit[2]','Line3b_Unit[0]','Line3b_Unit[1]'],num:'Line3b_AptSteFlrNumber[0]',city:'Line3c_CityOrTown[0]',state:'Line3d_State[0]',zip:'Line3e_ZipCode[0]',prov:'Line3f_Province[0]',postal:'Line3g_PostalCode[0]',country:'Line3h_Country[0]'}),
   X('rPhone','Daytime telephone number','Teléfono diurno','Line4_DaytimeTelephoneNumber[0]',{no:'4',req:1}),
   X('rMobile','Mobile telephone number (if any)','Teléfono móvil (si tiene)','Line6_EMail[0]',{no:'5'}),
   X('rEmail','Email address (if any)','Correo electrónico (si tiene)','Line7_MobileTelephoneNumber[0]',{no:'6'}),
   X('rFax','Fax number (if any)','Número de fax (si tiene)','Pt1ItemNumber7_FaxNumber[0]',{no:'7'})])},

 {id:2,t:L('Eligibility information','Información de elegibilidad'),fields:[
  M('elig','Select all that apply','Seleccione todo lo que aplique','elig',{a:'CheckBox1[0]',b:'CheckBox2[0]',c:'CheckBox3[0]',d:'CheckBox4[0]'},{no:'1-4',req:1}),
  X('licAuth','Licensing authority (state bar / highest court)','Autoridad que otorga la licencia (colegio de abogados / tribunal supremo)','Pt2Line1a_LicensingAuthority[0]',{no:'1.a',show:has('a')}),
  X('barNum','Bar number (if applicable)','Número de colegiado (si aplica)','Pt2Line1b_BarNumber[0]',{no:'1.b',show:has('a')}),
  S('orders','Orders restricting your practice of law','Órdenes que restringen su ejercicio del derecho','orders',{N:'Checkbox1dAmNot[0]',Y:'Checkbox1dAm[0]'},{no:'1.c',show:has('a')}),
  X('firm','Name of law firm or organization','Nombre del bufete u organización','Pt2Line1d_NameofFirmOrOrganization[0]',{no:'1.d',show:has('a')}),
  X('org','Name of recognized organization','Nombre de la organización reconocida','Line2b_NameofOrganization[0]',{no:'2.b',show:has('b')}),
  D('accDate','Date of accreditation','Fecha de acreditación','Line2c_DateExpires[0]',{no:'2.c',show:has('b')}),
  X('assocName','Name of the attorney or representative of record','Nombre del abogado o representante de récord','Line3_NameofAttorneyOrRep[0]',{no:'3',show:has('c')}),
  X('studentName','Name of law student or law graduate','Nombre del estudiante o graduado de derecho','Line4b_LawStudent[0]',{no:'4.b',show:has('d')})]},

 {id:3,t:L('Notice of appearance (client information)','Aviso de comparecencia (información del cliente)'),fields:[].concat(
  [S('agency','Appearance relates to matters before','La comparecencia se relaciona con asuntos ante','agency',{U:'Line1a_USCIS[0]',I:'Line2a_ICE[0]',C:'Line3a_CBP[0]'},{no:'1-3',req:1}),
   X('matter','Form numbers or specific matter','Números de formulario o asunto específico',null,{no:'1.b / 2.b / 3.b',tf:agencyTf}),
   X('receipt','Receipt number (if any)','Número de recibo (si tiene)','Pt3Line4_ReceiptNumber[0]',{no:'4',help:L('Receipt numbers look like three letters followed by ten digits.','Los números de recibo tienen tres letras seguidas de diez dígitos.')}),
   S('reqBy','I enter my appearance at the request of the','Comparezco a solicitud del(de la)','reqBy',{A:'Line4_Checkbox[1]',P:'Line4_Checkbox[3]',R:'Line4_Checkbox[0]',BD:'Line4_Checkbox[4]',B:'Line4_Checkbox[2]'},{no:'5',req:1})],
  NM('c',['Pt3Line5a_FamilyName[0]','Pt3Line5b_GivenName[0]','Pt3Line5c_MiddleName[0]'],'6',{req:1}),
  [X('entName','Name of entity (if applicable)','Nombre de la entidad (si aplica)','Pt3Line7a_NameOfEntity[0]',{no:'7.a'}),
   X('entTitle','Title of authorized signatory for entity','Cargo del firmante autorizado de la entidad','Pt3Line7b_TitleofEntity[0]',{no:'7.b'}),
   X('cUscis','Client USCIS online account number (if any)','Número de cuenta en línea de USCIS del cliente (si tiene)','Pt3Line8_USCISOnlineAcctNumber[0]',{no:'8'}),
   X('aNumber','Client A-Number (if any)','Número A del cliente (si tiene)','Pt3Line9_ANumber[0]',{no:'9',dg:1}),
   X('cPhone','Client daytime telephone number','Teléfono diurno del cliente','Line9_DaytimeTelephoneNumber[0]',{no:'10'}),
   X('cMobile','Client mobile telephone number (if any)','Teléfono móvil del cliente (si tiene)','Line10_MobileTelephoneNumber[0]',{no:'11'}),
   X('cEmail','Client email address (if any)','Correo electrónico del cliente (si tiene)','Line11_EMail[0]',{no:'12'}),
   AD('cAddr',['Client mailing address','Dirección postal del cliente'],'13',{street:'Line12a_StreetNumberName[0]',req:1,unit:['Line12b_Unit[2]','Line12b_Unit[0]','Line12b_Unit[1]'],num:'Line12b_AptSteFlrNumber[0]',city:'Line12c_CityOrTown[0]',state:'Line12d_State[0]',zip:'Line12e_ZipCode[0]',prov:'Line12f_Province[0]',postal:'Line12g_PostalCode[0]',country:'Line12h_Country[0]'})])},

 {id:4,t:L('Client’s consent and notice options','Consentimiento del cliente y opciones de avisos'),fields:[
  M('consent','Options regarding receipt of USCIS notices and documents (select all that apply)','Opciones para recibir avisos y documentos de USCIS (seleccione todo lo que aplique)','consent',{a:'Pt4Line2a_CheckBox2a[0]',b:'Pt4Line2b_CheckBox2b[0]',c:'Pt4Line2c_CheckBox2c[0]'},{no:'2',help:L('Signatures and dates for the client (Part 4) and the attorney or representative (Part 5) are left blank for you to sign by hand.','Las firmas y fechas del cliente (Parte 4) y del abogado o representante (Parte 5) quedan en blanco para firmarlas a mano.')})]},

 {id:6,t:L('Additional information','Información adicional'),fields:[
  f('additionalInfo','textarea',L('Anything else for Part 6 (for example, an explanation of an order restricting your practice)','Algo más para la Parte 6 (por ejemplo, la explicación de una orden que restrinja su ejercicio)'),{p14:{part:6,item:'',page:4}})]}
];

const blk=(n,a,b,c,d)=>[`Pt9Line${n}a_PageNumber[${a}]`,`Pt9Line${n}b_PartNumber[${a}]`,`Pt9Line${n}c_ItemNumber[${a}]`,`Pt9Line${n}d_AdditionalInfo[${d}]`];
const p14={
 name:[['Pt3Line5a_FamilyName[1]','cFamily'],['Pt3Line5b_GivenName[1]','cGiven'],['Pt3Line5c_MiddleName[1]','cMiddle']],
 blocks:[blk(3,0,0,0,0),blk(4,0,0,0,0),blk(5,0,0,0,0),[`Pt9Line6a_PageNumber[1]`,`Pt9Line6b_PartNumber[1]`,`Pt9Line6c_ItemNumber[1]`,`Pt9Line6d_AdditionalInfo[0]`]]
};
return {id:'g28',name:'G-28 Notice of Entry of Appearance as Attorney or Accredited Representative',short:'G-28',edition:'09/17/18',pdf:'g28-09-17-18.pdf',OPT,PARTS,RISK:[],RISK_INDEX:{},p14,ui:{
 disclaimer:L('This tool helps organize information for Form G-28 (edition 09/17/18). It is not legal advice and does not replace an attorney or accredited representative. Verify every answer against the official USCIS form and instructions before filing.','Esta herramienta ayuda a organizar información para el Formulario G-28 (edición 09/17/18). No es asesoría legal y no reemplaza a un abogado o representante acreditado. Verifique cada respuesta con el formulario e instrucciones oficiales de USCIS antes de presentar.'),
 pdfNote:L('Fills the official fillable G-28, edition 09/17/18. This is the edition in the source PDF; check uscis.gov/g-28 to confirm it is still the current edition. Signatures and dates are left blank for you to sign by hand.','Llena el G-28 oficial, edición 09/17/18. Es la edición del PDF de origen; verifique en uscis.gov/g-28 que siga siendo la edición vigente. Las firmas y fechas quedan en blanco para firmarlas a mano.'),
 p14sheet:L('Part 6 continuation sheet','Hoja de continuación de la Parte 6'),
 p14note:L('Print this sheet, add the client name and A-Number at the top, sign and date it, and attach it to the form.','Imprima esta hoja, agregue el nombre y el Número A del cliente arriba, fírmela y féchela, y adjúntela al formulario.'),
 pdfMiss:L('values could not be placed (see Part 6 sheet)','valores no se pudieron colocar (vea la hoja de la Parte 6)')
}};
})());
