registerForm((function(){
const OPT={
 unit:[['',L('None','Ninguno')],['apt',L('Apt.','Apto.')],['ste',L('Ste.','Ste.')],['flr',L('Flr.','Piso')]],
 card:[['V',L('Visa','Visa')],['MC',L('MasterCard','MasterCard')],['A',L('American Express','American Express')],['D',L('Discover','Discover')]]
};
const X=(k,en,es,t,o)=>f(k,'text',L(en,es),Object.assign({t},o));
const NM=(p,ids,no,o)=>[X(p+'Family','Family name (last)','Apellido',ids[0],Object.assign({no},o)),X(p+'Given','Given name (first)','Nombre',ids[1],Object.assign({no},o)),X(p+'Middle','Middle name','Segundo nombre',ids[2],{no})];

const PARTS=[
 {id:1,t:L('Applicant / petitioner / requester','Solicitante / peticionario / requirente'),fields:
  NM('a',['FamilyName[0]','GivenName[0]','MiddleName[0]'],'1',{req:1}).map((x,i)=>Object.assign(x,{k:['family','given','middle'][i]}))},
 {id:2,t:L('Credit card billing information','Información de facturación de la tarjeta'),fields:[].concat(
  NM('h',['CCHolderFamilyName[0]','CCHolderGivenName[0]','CCHolderMiddleName[0]'],'2',{}).map((x,i)=>Object.assign(x,{k:['hFamily','hGiven','hMiddle'][i],help:i===0?L('Name exactly as it appears on the card.','Nombre exactamente como aparece en la tarjeta.'):undefined})),
  [f('unitType','select',L('Billing unit type','Tipo de unidad de facturación'),{opts:'unit',c:{apt:'CCHolderAptSteFlr_Unit[1]',ste:'CCHolderAptSteFlr_Unit[0]',flr:'CCHolderAptSteFlr_Unit[2]'}}),
   X('unitNum','Unit number','Número de unidad','CCHolderAptSteFlrNumber[0]'),
   X('street','Billing street number and name','Número y nombre de la calle de facturación','Pt1Line2b_StreetNumberName[0]'),
   X('city','City or town','Ciudad o pueblo','CityOrTown[0]'),
   f('state','text',L('State (2 letters)','Estado (2 letras)'),{d:'State[0]',up:1}),
   X('zip','ZIP code','Código ZIP','ZipCode[0]',{dg:1}),
   X('phone','Cardholder daytime phone','Teléfono diurno del titular','DaytimeTelephoneNumber[0]'),
   X('email','Cardholder email','Correo electrónico del titular','Email[0]')])},
 {id:3,t:L('Card type and amount','Tipo de tarjeta y monto'),fields:[
  f('cardType','select',L('Credit card type','Tipo de tarjeta de crédito'),{no:'3',opts:'card',c:{V:'CreditCardTypeChBx[0]',MC:'CreditCardTypeChBx[1]',A:'CreditCardTypeChBx[2]',D:'CreditCardTypeChBx[3]'},help:L('For safety, ImmiVault does not store the card number, expiration date, or security code. Write them on the printed form by hand, then sign and date it.','Por seguridad, ImmiVault no guarda el número de tarjeta, la fecha de vencimiento ni el código de seguridad. Escríbalos a mano en el formulario impreso, fírmelo y féchelo.')}),
  X('amount','Authorized payment amount in dollars (no cents)','Monto autorizado en dólares (sin centavos)','AuthorizedPaymentAmt[0]',{dg:1})]}
];

return {id:'g1450',name:'G-1450 Authorization for Credit Card Transactions',short:'G-1450',edition:'02/06/26',pdf:'g1450-02-06-26.pdf',OPT,PARTS,RISK:[],RISK_INDEX:{},ui:{
 disclaimer:L('This tool helps organize information for Form G-1450 (edition 02/06/26). It is not legal advice and does not replace an attorney or accredited representative. Verify every answer against the official USCIS form before filing.','Esta herramienta ayuda a organizar información para el Formulario G-1450 (edición 02/06/26). No es asesoría legal y no reemplaza a un abogado o representante acreditado. Verifique cada respuesta con el formulario oficial de USCIS antes de presentar.'),
 pdfNote:L('Fills the official fillable G-1450, edition 02/06/26. Card number, expiration date, security code, signature and date are left blank for you to complete by hand. Check uscis.gov/g-1450 to confirm this is still the current edition.','Llena el G-1450 oficial, edición 02/06/26. El número de tarjeta, la fecha de vencimiento, el código de seguridad, la firma y la fecha quedan en blanco para completarlos a mano. Verifique en uscis.gov/g-1450 que siga siendo la edición vigente.')
}};
})());
