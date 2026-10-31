registerForm((function(){
const OPT={
 unit:[['',L('None','Ninguno')],['apt',L('Apt.','Apto.')],['ste',L('Ste.','Ste.')],['flr',L('Flr.','Piso')]],
 type:[['A',L('Information from my own immigration record','Información de mi propio expediente migratorio')],['B',L('Information from another person’s immigration record','Información del expediente migratorio de otra persona')],['C',L('USCIS business, operational, or policy records','Registros administrativos, operativos o de políticas de USCIS')],['D',L('An amendment or correction of my record under the Privacy Act','Una enmienda o corrección de mi expediente bajo la Ley de Privacidad')],['E',L('An amendment or correction of another person’s record on their behalf under the Privacy Act','Una enmienda o corrección del expediente de otra persona, en su nombre, bajo la Ley de Privacidad')],['F',L('Other records in USCIS custody','Otros registros bajo custodia de USCIS')]],
 docs:[['A',L('Apprehensions (give the date)','Aprehensiones (indique la fecha)')],['B',L('Birth certificate','Acta de nacimiento')],['C',L('Form I-94 (give the date of entry)','Formulario I-94 (indique la fecha de entrada)')],['D',L('Passport','Pasaporte')],['E',L('Other arrival/departure documents (give the date of entry)','Otros documentos de llegada/salida (indique la fecha de entrada)')],['F',L('I-129, Petition for a Nonimmigrant Worker','I-129, Petición de trabajador no inmigrante')],['G',L('I-90, Application to Replace Permanent Resident Card','I-90, Solicitud para reemplazar la tarjeta de residente permanente')],['H',L('I-130, Petition for Alien Relative','I-130, Petición para familiar extranjero')],['I',L('I-140, Immigrant Petition for Alien Workers','I-140, Petición de inmigrante para trabajadores extranjeros')],['J',L('I-485, Application to Register Permanent Residence or Adjust Status','I-485, Solicitud para registrar residencia permanente o ajustar estatus')],['K',L('I-751, Petition to Remove Conditions on Residence','I-751, Petición para eliminar las condiciones de residencia')],['L',L('N-400, Application for Naturalization','N-400, Solicitud de naturalización')],['M',L('Labor certification issued by the Department of Labor','Certificación laboral emitida por el Departamento de Trabajo')],['N',L('Naturalization certificate','Certificado de naturalización')],['O',L('Proof of lawful permanent resident (LPR) status','Prueba de estatus de residente permanente legal (LPR)')],['P',L('Record of removal from the U.S. (give the date)','Registro de remoción de EE. UU. (indique la fecha)')],['Q',L('Other (explain)','Otro (explique)')]],
 expedite:[['A',L('Imminent threat to the life or physical safety of an individual','Amenaza inminente a la vida o seguridad física de una persona')],['B',L('Urgency to inform the public about a Federal government activity (by a person primarily engaged in disseminating information)','Urgencia de informar al público sobre una actividad del gobierno federal (por una persona dedicada principalmente a difundir información)')],['C',L('Loss of substantial due process rights','Pérdida de derechos sustanciales al debido proceso')],['D',L('Matter of widespread and exceptional media interest with possible questions about government integrity','Asunto de amplio y excepcional interés de los medios con posibles dudas sobre la integridad del gobierno')]],
 court:[['y',L('The subject of record has a date scheduled for an immigration court proceeding','El sujeto del expediente tiene una fecha programada para un procedimiento en la corte de inmigración')]],
 consent:[['y',L('I consent to pay any fees that may be charged (up to the amount stated on the form)','Acepto pagar cualquier tarifa que se cobre (hasta el monto indicado en el formulario)')]],
 rel:[['A',L('I am an attorney or accredited representative acting on behalf of the subject of record','Soy abogado(a) o representante acreditado(a) que actúa en nombre del sujeto del expediente')],['B',L('I am requesting information about someone who is deceased','Solicito información sobre una persona fallecida')],['C',L('I am requesting on behalf of my child or a minor for whom I am the legal guardian','Solicito en nombre de mi hijo(a) o de un menor del que soy tutor legal')],['D',L('Other (explain)','Otro (explique)')],['E',L('I am requesting as a member of the media','Solicito como miembro de los medios')],['F',L('Other (explain)','Otro (explique)')]],
 optConsent:[['y',L('I, the subject of record, consent to USCIS releasing/amending my records to the third-party requestor named in Part 4','Yo, el sujeto del expediente, autorizo a USCIS a divulgar/enmendar mis registros al requirente tercero nombrado en la Parte 4')]],
 unk:[['y',L('Name is unknown','Nombre desconocido')]]
};
const X=(k,en,es,t,o)=>f(k,'text',L(en,es),Object.assign({t},o));
const D=(k,en,es,t,o)=>f(k,'date',L(en,es),Object.assign({t},o));
const S=(k,en,es,opts,c,o)=>f(k,'select',L(en,es),Object.assign({opts,c},o));
const M=(k,en,es,opts,c,o)=>f(k,'multi',L(en,es),Object.assign({opts,c},o));
const ST=(d)=>f('state','text',L('State (2 letters, U.S. only)','Estado (2 letras, solo EE. UU.)'),{d,up:1});
const NM=(p,ids,no,o)=>[X(p+'Family','Family name (last)','Apellido',ids[0],Object.assign({no},o)),X(p+'Given','Given name (first)','Nombre',ids[1],Object.assign({no},o)),X(p+'Middle','Middle name','Segundo nombre',ids[2],{no})];
const ADDR=(m)=>[].concat(
 m.care?[X('careOf','In care of name (if any)','A/C de (si aplica)',m.care)]:[],
 [X('street','Street number and name','Número y nombre de la calle',m.street,{req:m.req})],
 [S('unitType','Unit type','Tipo de unidad','unit',{apt:m.unit[0],ste:m.unit[1],flr:m.unit[2]}),X('unitNum','Unit number','Número de unidad',m.num)],
 [X('city','City or town','Ciudad o pueblo',m.city,{req:m.req}),ST(m.state),X('zip','ZIP code','Código ZIP',m.zip,{dg:1}),X('province','Province (outside U.S.)','Provincia (fuera de EE. UU.)',m.prov),X('postal','Postal code (outside U.S.)','Código postal (fuera de EE. UU.)',m.postal),X('country','Country','País',m.country)]
);
const AD=(g,l,no,m,o)=>f(g,'group',L(l[0],l[1]),Object.assign({no,sub:ADDR(m)},o));
const inc=(k,v)=>a=>(a[k]||[]).includes(v);
const L3=(a,b,c)=>[a,b,c];

const PARTS=[
 {id:1,t:L('Nature of your request','Naturaleza de su solicitud'),fields:[
  M('reqTypes','Type of request (select all that apply)','Tipo de solicitud (seleccione todo lo que aplique)','type',{A:'Pt1Line1A_Checkbox[0]',B:'Pt1Line1B_Checkbox[0]',C:'Pt1Line1C_Checkbox[0]',D:'Pt1Line1D_Checkbox[0]',E:'Pt1Line1E_Checkbox[0]',F:'Pt1Line1F_Checkbox[0]'},{no:'1',req:1}),
  X('amendOwn','Describe the amendment or correction to your record','Describa la enmienda o corrección de su expediente','Pt1Line1D_TORAmendOrCorrect[0]',{no:'1.d',show:inc('reqTypes','D')}),
  X('amendOther','Describe the amendment or correction to the other person’s record','Describa la enmienda o corrección del expediente de la otra persona','Pt1Line1E_TORAmendorCorrectforAnother[0]',{no:'1.e',show:inc('reqTypes','E')}),
  X('otherRecords','Describe the other records in USCIS custody','Describa los otros registros bajo custodia de USCIS','Pt1Line1F_TOROtherRecords[0]',{no:'1.f',show:inc('reqTypes','F')}),
  M('docs','Specific documents requested (select all that apply)','Documentos específicos solicitados (seleccione todo lo que aplique)','docs',{A:'Pt1Line2_CheckboxA[0]',B:'Pt1Line2_CheckboxB[0]',C:'Pt1Line2_CheckboxC[0]',D:'Pt1Line2_CheckboxD[0]',E:'Pt1Line2_CheckboxE[0]',F:'Pt1Line2_CheckboxF[0]',G:'Pt1Line2_CheckboxG[0]',H:'Pt1Line2_CheckboxH[0]',I:'Pt1Line2_CheckboxI[0]',J:'Pt1Line2_CheckboxJ[0]',K:'Pt1Line2_CheckboxK[0]',L:'Pt1Line2_CheckboxL[0]',M:'Pt1Line2_CheckboxM[0]',N:'Pt1Line2_CheckboxN[0]',O:'Pt1Line2_CheckboxO[0]',P:'Pt1Line2_CheckboxP[0]',Q:'Pt1Line2_CheckboxQ[0]'},{no:'2'}),
  D('dApp','Date of apprehension','Fecha de aprehensión','Pt1Line2A_RequestorDateSigned[0]',{no:'2.a',show:inc('docs','A')}),
  D('dI94','Date of entry (Form I-94)','Fecha de entrada (Formulario I-94)','Pt1Line2C_RequestorDateSigned[0]',{no:'2.c',show:inc('docs','C')}),
  D('dArr','Date of entry (other arrival/departure documents)','Fecha de entrada (otros documentos de llegada/salida)','Pt2Line2E_RequestorDateSigned[0]',{no:'2.e',show:inc('docs','E')}),
  D('dRem','Date of removal','Fecha de remoción','Pt2Line2P_RequestorDateSigned[0]',{no:'2.p',show:inc('docs','P')}),
  X('docOther','Other document (explain)','Otro documento (explique)','Pt1Line2_Description[0]',{no:'2.q',show:inc('docs','Q')}),
  M('expedite','Qualifies for expedited processing (select all that apply)','Califica para trámite expedito (seleccione todo lo que aplique)','expedite',{A:'Pt1Line3_CheckboxA[0]',B:'Pt1Line3_CheckboxB[0]',C:'Pt1Line3_CheckboxC[0]',D:'Pt1Line3_CheckboxD[0]'},{no:'3'}),
  M('court','Upcoming immigration court proceeding','Próximo procedimiento en la corte de inmigración','court',{y:'Pt1Line5_Checkbox[0]'},{no:'5'})]},

 {id:2,t:L('Subject of record','Sujeto del expediente'),fields:[].concat(
  [f('aNums','list',L('A-Numbers (up to 3 fit on the form)','Números A (caben hasta 3 en el formulario)'),{no:'1',cap:3,part:2,page:4,item:[X('a','A-Number','Número A',['Pt2Line1A_ANumber[0]','Pt2Line1B_ANumber[0]','Pt2Line1C_ANumber[0]'],{dg:1})]}),
   D('dob','Date of birth','Fecha de nacimiento','Pt2Line2_DateOfBirth[0]',{no:'2'}),
   X('birthCountry','Country of birth','País de nacimiento','Pt2Line3_CountryOfBirth[0]',{no:'3'}),
   f('receipts','list',L('Receipt numbers (up to 3 fit on the form)','Números de recibo (caben hasta 3 en el formulario)'),{no:'4',cap:3,part:2,page:5,item:[X('r','Receipt number','Número de recibo',['Pt2Line4A_ReceiptNumber[0]','Pt2Line4B_ReceiptNumber[0]','Pt2Line4C_ReceiptNumber[0]'])]})],
  NM('s',['Pt2Line5_FamilyName[0]','Pt2Line5_GivenName[0]','Pt2Line5_MiddleName[0]'],'5',{req:1}),
  [f('otherNames','list',L('Additional names used (up to 3 fit on the form)','Otros nombres usados (caben hasta 3 en el formulario)'),{no:'6',cap:3,part:2,page:5,item:[X('family','Family name','Apellido',['Pt2Line6A_FamilyName[0]','Pt2Line6B_FamilyName[0]','Pt2Line6C_FamilyName[0]']),X('given','Given name','Nombre',['Pt2Line6A_GivenName[0]','Pt2Line6B_GivenName[0]','Pt2Line6C_GivenName[0]']),X('middle','Middle name','Segundo nombre',['Pt2Line6A_MiddleName[0]','Pt2Line6B_MiddleName[0]','Pt2Line6C_MiddleName[0]'])]})],
  NM('e',['Pt2Line7_FamilyName[0]','Pt2Line7_GivenName[0]','Pt2Line7_MiddleName[0]'],'7',{}).map((x,i)=>Object.assign(x,{l:L(['Name used upon entry: family name','Name used upon entry: given name','Name used upon entry: middle name'][i],['Nombre usado al entrar: apellido','Nombre usado al entrar: nombre','Nombre usado al entrar: segundo nombre'][i])})),
  [AD('sAddr',['Mailing address','Dirección postal'],'8',{street:'Pt2Line8_StreetNumberName[0]',unit:['Pt2Line8_Unit[0]','Pt2Line8_Unit[1]','Pt2Line8_Unit[2]'],num:'Pt2Line8_AptSteFlrNumber[0]',city:'Pt2Line8_CityOrTown[0]',state:'Pt2Line8_State[0]',zip:'Pt2Line8_ZipCode[0]',prov:'Pt2Line8_Province[0]',postal:'Pt2Line8_PostalCode[0]',country:'Pt2Line8_Country[0]'}),
   X('sPhone','Daytime telephone number','Teléfono diurno','Pt2Line8_DaytimeTelephone[0]',{no:'8'}),
   X('sEmail','Email address','Correo electrónico','Pt2Line8_EmailAddress[0]',{no:'8'})],
  NM('f',['Pt2Line9_FamilyName[0]','Pt2Line9_GivenName[0]','Pt2Line9_MiddleName[0]'],'9',{}).map((x,i)=>Object.assign(x,{l:L(['Father: family name','Father: given name','Father: middle name'][i],['Padre: apellido','Padre: nombre','Padre: segundo nombre'][i])})),
  [M('fUnk','Father’s name','Nombre del padre','unk',{y:'Pt2Line9_FatherNameUnknownCheckbox[0]'},{no:'9'})],
  NM('m',['Pt2Line10_FamilyName[0]','Pt2Line10_GivenName[0]','Pt2Line10_MiddleName[0]'],'10',{}).map((x,i)=>Object.assign(x,{l:L(['Mother: family name','Mother: given name','Mother: middle name'][i],['Madre: apellido','Madre: nombre','Madre: segundo nombre'][i])})),
  [X('mMaiden','Mother: maiden name or previous last names','Madre: apellido de soltera o apellidos anteriores','Pt2Line10_FamilyName[1]',{no:'10'}),
   M('mUnk','Mother’s name','Nombre de la madre','unk',{y:'Pt2Line10_MotherNameUnknownCheckbox[0]'},{no:'10'}),
   f('family','list',L('Additional family members that may appear in the record (up to 3 fit on the form)','Otros familiares que pueden aparecer en el expediente (caben hasta 3 en el formulario)'),{no:'11',cap:3,part:2,page:6,item:[X('family','Family name','Apellido',['Pt2Line11A_FamilyName[0]','Pt2Line11B_FamilyName[0]','Pt2Line11C_FamilyName[0]']),X('given','Given name','Nombre',['Pt2Line11A_GivenName[0]','Pt2Line11B_GivenName[0]','Pt2Line11C_GivenName[0]']),X('middle','Middle name','Segundo nombre',['Pt2Line11A_MiddleName[0]','Pt2Line11B_MiddleName[0]','Pt2Line11C_MiddleName[0]']),X('rel','Relationship','Parentesco',['Pt2Line11_Relationship[0]','Pt2Line11_Relationship[1]','Pt2Line11_Relationship[2]'])]})])},

 {id:3,t:L('Certification and consent to pay fees','Certificación y consentimiento para pagar tarifas'),fields:[
  M('consentFees','Consent to pay potential fees','Consentimiento para pagar posibles tarifas','consent',{y:'Pt3_RequestorCheckbox[0]'},{no:'1',help:L('Do not send any payment with the request; USCIS will contact you if fees are due. The signature and date are left blank for you to sign by hand.','No envíe ningún pago con la solicitud; USCIS se comunicará con usted si se deben tarifas. La firma y la fecha quedan en blanco para firmarlas a mano.')})]},

 {id:4,t:L('Third-party requestor (only if requesting for someone else)','Requirente tercero (solo si solicita para otra persona)'),fields:[].concat(
  NM('t',['Pt4Line1_FamilyName[0]','Pt4Line1_GivenName[0]','Pt4Line1_MiddleName[0]'],'1',{}),
  [AD('tAddr',['Third-party mailing address','Dirección postal del tercero'],'2',{care:'Pt4Line2_InCareofName[0]',street:'Pt4Line2_StreetNumberName[0]',unit:['Pt4Line2_Unit[0]','Pt4Line2_Unit[1]','Pt4Line2_Unit[2]'],num:'Pt4Line2_AptSteFlrNumber[0]',city:'Pt4Line2_CityOrTown[0]',state:'Pt4Line2_State[0]',zip:'Pt4Line2_ZipCode[0]',prov:'Pt4Line2_Province[0]',postal:'Pt4Line2_PostalCode[0]',country:'Pt4Line2_Country[0]'}),
   X('tPhone','Daytime telephone number','Teléfono diurno','Pt4Line2_DaytimeTelephone[0]',{no:'2'}),
   X('tEmail','Email address','Correo electrónico','Pt4Line2_EmailAddress[0]',{no:'2'}),
   M('tRel','Relationship to the subject of record (select all that apply)','Relación con el sujeto del expediente (seleccione todo lo que aplique)','rel',{A:'Pt4Line3_CheckboxA[0]',B:'Pt4Line3_CheckboxB[0]',C:'Pt4Line3_CheckboxC[0]',D:'Pt4Line3_CheckboxD[0]',E:'Pt4Line3_CheckboxE[0]',F:'Pt4Line3_CheckboxF[0]'},{no:'3'}),
   X('tExplD','Explain (item D)','Explique (inciso D)','Pt4Line3_ExplanationD[0]',{no:'3.d',show:inc('tRel','D')}),
   X('tExplF','Explain (item F)','Explique (inciso F)','Pt4Line3_ExplanationF[0]',{no:'3.f',show:inc('tRel','F')})],
  NM('k',['Pt4Line4a_FamilyName[0]','Pt4Line4b_GivenName[0]','Pt4Line4c_MiddleName[0]'],'4',{show:inc('tRel','C')}).map((x,i)=>Object.assign(x,{show:inc('tRel','C'),l:L(['Parent/guardian: family name','Parent/guardian: given name','Parent/guardian: middle name'][i],['Padre/tutor: apellido','Padre/tutor: nombre','Padre/tutor: segundo nombre'][i])})),
  [D('kDob','Parent/guardian date of birth','Fecha de nacimiento del padre/tutor','Pt4Line4b_DateOfBirth[0]',{no:'4',show:inc('tRel','C')}),
   X('kCountry','Parent/guardian country of birth','País de nacimiento del padre/tutor','Pt4Line4c_CountryOfBirth[0]',{no:'4',show:inc('tRel','C')}),
   M('optConsent','Subject of record consent (Option 1)','Consentimiento del sujeto del expediente (Opción 1)','optConsent',{y:'P4_Option1_Checkbox1[0]'},{no:'Opt. 1',help:L('The subject’s signature and date, and any notarized affidavit (Option 2), are left blank to be completed by hand.','La firma y fecha del sujeto, y cualquier declaración jurada notarizada (Opción 2), quedan en blanco para completarlas a mano.')})])},

 {id:5,t:L('Additional information','Información adicional'),fields:[
  f('additionalInfo','textarea',L('Anything else for Part 5 (extra rows from your answers are added automatically)','Algo más para la Parte 5 (las filas adicionales de sus respuestas se agregan automáticamente)'),{p14:{part:5,item:'',page:10}})]}
];

const p14={
 name:[['Pt2Line5_FamilyName[1]','sFamily'],['Pt2Line5_GivenName[1]','sGiven'],['Pt2Line5_MiddleName[1]','sMiddle']],
 blocks:[
  ['P5_Line3a_PageNumber[0]','P5_Line3b_PartNumber[0]','P5_Line3c_ItemNumber[0]','P5_Line3d_AdditionalInfo[0]'],
  ['P5_Line4a_PageNumber[0]','P5_Line4b_PartNumber[0]','P5_Line4c_ItemNumber[0]','P5_Line7d_AdditionalInfo[0]'],
  ['P5_Line5a_PageNumber[0]','P5_Line5b_PartNumber[0]','P5_Line5c_ItemNumber[0]','P5_Line5d_AdditionalInfo[0]'],
  ['P5_Line6a_PageNumber[0]','P5_Line6b_PartNumber[0]','P5_Line6c_ItemNumber[0]','P5_Line6d_AdditionalInfo[0]']
 ]
};
return {id:'g639',name:'G-639 FOIA/Privacy Act Request',short:'G-639',edition:'12/12/24',expires:'12/31/2027',pdf:'g639-12-12-24.pdf',OPT,PARTS,RISK:[],RISK_INDEX:{},p14,ui:{
 disclaimer:L('This tool helps organize information for Form G-639 (edition 12/12/24). It is not legal advice and does not replace an attorney or accredited representative. Verify every answer against the official USCIS form and instructions before filing.','Esta herramienta ayuda a organizar información para el Formulario G-639 (edición 12/12/24). No es asesoría legal y no reemplaza a un abogado o representante acreditado. Verifique cada respuesta con el formulario e instrucciones oficiales de USCIS antes de presentar.'),
 pdfNote:L('Fills the official fillable G-639, edition 12/12/24 (expires 12/31/2027). Check uscis.gov/g-639 to confirm this is still the current edition. Signatures and dates are left blank for you to sign by hand.','Llena el G-639 oficial, edición 12/12/24 (vence 12/31/2027). Verifique en uscis.gov/g-639 que siga siendo la edición vigente. Las firmas y fechas quedan en blanco para firmarlas a mano.'),
 p14sheet:L('Part 5 continuation sheet','Hoja de continuación de la Parte 5'),
 p14note:L('Print this sheet, add the subject of record’s name and A-Number at the top, sign and date it, and attach it to the form.','Imprima esta hoja, agregue el nombre y el Número A del sujeto del expediente arriba, fírmela y féchela, y adjúntela al formulario.'),
 cap:L('rows fit on the form; extra rows go to Part 5','filas caben en el formulario; las demás van a la Parte 5'),
 pdfMiss:L('values could not be placed (see Part 5 sheet)','valores no se pudieron colocar (vea la hoja de la Parte 5)')
}};
})());
