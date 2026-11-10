registerForm((function(){
const OPT={
 why:[['i',L('I do not have access to banking services or electronic payment systems','No tengo acceso a servicios bancarios ni a sistemas de pago electrónico')],
  ['ii',L('Electronic payment would cause me undue hardship (31 C.F.R. Part 208)','El pago electrónico me causaría dificultades indebidas (31 C.F.R. Parte 208)')],
  ['iii',L('National security or law enforcement activities where non-electronic payment is necessary','Actividades de seguridad nacional o de cumplimiento de la ley donde el pago no electrónico es necesario')],
  ['iv',L('Other circumstances determined by the Secretary of the Treasury','Otras circunstancias determinadas por el Secretario del Tesoro')]]
};
const PARTS=[
 {id:1,t:L('Exemption for paper fee payment','Exención para pago de tarifa en papel'),fields:[
  f('reason','select',L('Which exemption applies to you? (reminder only, not printed)','¿Qué exención le aplica? (solo recordatorio, no se imprime)'),{opts:'why',no:'1',help:L('Form G-1651 has no boxes to fill in except your signature and date. This question is only a reminder of why you are paying on paper. Attach the signed form to your check or money order and the application.','El formulario G-1651 no tiene casillas para llenar excepto su firma y fecha. Esta pregunta es solo un recordatorio de por qué paga en papel. Adjunte el formulario firmado a su cheque o giro y a la solicitud.')})
 ]}
];
return {id:'g1651',name:'G-1651 Exemption for Paper Fee Payment',short:'G-1651',edition:'06/03/25',pdf:'g1651-06-03-25.pdf',OPT,PARTS,RISK:[],RISK_INDEX:{},ui:{
 disclaimer:L('This tool helps organize information for Form G-1651 (edition 06/03/25). It is not legal advice and does not replace an attorney or accredited representative. Verify against the official USCIS form before filing.','Esta herramienta ayuda a organizar la información del Formulario G-1651 (edición 06/03/25). No es asesoría legal ni reemplaza a un abogado o representante acreditado. Verifique con el formulario oficial de USCIS antes de presentarlo.'),
 pdfNote:L('Downloads the official G-1651, edition 06/03/25. The form has only two boxes, Signature of Payer and Date, and both are left blank for you to complete by hand. Check uscis.gov/g-1651 to confirm this is still the current edition.','Descarga el G-1651 oficial, edición 06/03/25. El formulario tiene solo dos casillas, Firma del pagador y Fecha, y ambas quedan en blanco para que usted las complete a mano. Verifique en uscis.gov/g-1651 que siga siendo la edición vigente.')
}};
})());
