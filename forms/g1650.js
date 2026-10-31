registerForm((function(){
const OPT={
 holder:[['B',L('Business account','Cuenta comercial')],['P',L('Personal account','Cuenta personal')]],
 acct:[['C',L('Checking account','Cuenta corriente')],['S',L('Savings account','Cuenta de ahorros')]]
};
const X=(k,en,es,t,o)=>f(k,'text',L(en,es),Object.assign({t},o));
const NM=(p,ids,no,o)=>[X(p+'Family','Family name (last)','Apellido',ids[0],Object.assign({no},o)),X(p+'Given','Given name (first)','Nombre',ids[1],Object.assign({no},o)),X(p+'Middle','Middle name','Segundo nombre',ids[2],{no})];
const A='PG1[0].sfApplicantPetitionerName[0].',H='PG1[0].sfBankAccountHolderInfo[0].',B='PG1[0].sfBankAccountInformation[0].';

const PARTS=[
 {id:1,t:L('Applicant / petitioner / requester','Solicitante / peticionario / requirente'),fields:
  NM('a',[A+'FamilyName[0]',A+'GivenName[0]',A+'MiddleName[0]'],'1',{req:1}).map((x,i)=>Object.assign(x,{k:['family','given','middle'][i]}))},
 {id:2,t:L('Bank account holder','Titular de la cuenta bancaria'),fields:[].concat(
  [f('holderType','select',L('Type of account holder','Tipo de titular de la cuenta'),{opts:'holder',c:{B:H+'CB_AccountType[0]',P:H+'CB_AccountType[1]'}})],
  NM('h',[H+'FamilyName[0]',H+'GivenName[0]',H+'MiddleName[0]'],'',{}).map((x,i)=>Object.assign(x,{k:['hFamily','hGiven','hMiddle'][i],help:i===0?L('Name as it appears on the account.','Nombre como aparece en la cuenta.'):undefined})),
  [X('business','Business name (if business account)','Nombre del negocio (si es cuenta comercial)',B+'BusinessName[0]',{show:a=>a.holderType==='B'})])},
 {id:3,t:L('Bank account and amount','Cuenta bancaria y monto'),fields:[
  f('acctType','select',L('Account type','Tipo de cuenta'),{opts:'acct',c:{C:B+'CB_CreditCardType[1]',S:B+'CB_CreditCardType[0]'}}),
  X('bank','Bank name','Nombre del banco',B+'BankName[0]'),
  X('amount','Authorized payment amount in dollars (no cents)','Monto autorizado en dólares (sin centavos)',B+'AuthorizedPaymentAmt[0]',{dg:1,help:L('For safety, ImmiVault does not store the routing number or account number. Write them on the printed form by hand, then sign it. The account must be with a U.S. bank.','Por seguridad, ImmiVault no guarda el número de ruta ni el número de cuenta. Escríbalos a mano en el formulario impreso y fírmelo. La cuenta debe ser de un banco de EE. UU.')})]}
];

return {id:'g1650',name:'G-1650 Authorization for ACH Transactions',short:'G-1650',edition:'06/03/25',pdf:'g1650-06-03-25.pdf',OPT,PARTS,RISK:[],RISK_INDEX:{},ui:{
 disclaimer:L('This tool helps organize information for Form G-1650 (edition 06/03/25). It is not legal advice and does not replace an attorney or accredited representative. Verify every answer against the official USCIS form before filing.','Esta herramienta ayuda a organizar información para el Formulario G-1650 (edición 06/03/25). No es asesoría legal y no reemplaza a un abogado o representante acreditado. Verifique cada respuesta con el formulario oficial de USCIS antes de presentar.'),
 pdfNote:L('Fills the official fillable G-1650, edition 06/03/25. Routing number, account number, signature and date are left blank for you to complete by hand. Check uscis.gov/g-1650 to confirm this is still the current edition.','Llena el G-1650 oficial, edición 06/03/25. El número de ruta, el número de cuenta, la firma y la fecha quedan en blanco para completarlos a mano. Verifique en uscis.gov/g-1650 que siga siendo la edición vigente.')
}};
})());
