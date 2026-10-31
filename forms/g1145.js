registerForm((function(){
const OPT={};
const X=(k,en,es,t,o)=>f(k,'text',L(en,es),Object.assign({t},o));

const PARTS=[
 {id:1,t:L('E-Notification (applicant / petitioner / requester)','Notificación electrónica (solicitante / peticionario / requirente)'),fields:[
  X('family','Family name (last)','Apellido','LastName[0]',{no:'1',req:1}),
  X('given','Given name (first)','Nombre','FirstName[0]',{no:'1',req:1}),
  X('middle','Middle name','Segundo nombre','MiddleName[0]',{no:'1'}),
  X('email','Email address (for the text/email notice)','Correo electrónico (para el aviso por texto/correo)','Email[0]',{no:'2',req:1}),
  X('mobile','Mobile phone number (to receive the text message)','Teléfono móvil (para recibir el mensaje de texto)','MobilePhoneNumber[0]',{no:'3',req:1,help:L('Clip the completed G-1145 on top of the first page of the form it goes with.','Sujete el G-1145 completo encima de la primera página del formulario al que acompaña.')})]}
];

return {id:'g1145',name:'G-1145 E-Notification of Application/Petition Acceptance',short:'G-1145',edition:'09/26/14',pdf:'g1145-09-26-14.pdf',OPT,PARTS,RISK:[],RISK_INDEX:{},ui:{
 disclaimer:L('This tool helps organize information for Form G-1145 (edition 09/26/14). It is not legal advice and does not replace an attorney or accredited representative. Verify every answer against the official USCIS form before filing.','Esta herramienta ayuda a organizar información para el Formulario G-1145 (edición 09/26/14). No es asesoría legal y no reemplaza a un abogado o representante acreditado. Verifique cada respuesta con el formulario oficial de USCIS antes de presentar.'),
 pdfNote:L('Fills the official fillable G-1145, edition 09/26/14. Check uscis.gov/g-1145 to confirm this is still the current edition.','Llena el G-1145 oficial, edición 09/26/14. Verifique en uscis.gov/g-1145 que siga siendo la edición vigente.')
}};
})());
