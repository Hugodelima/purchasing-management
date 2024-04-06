jQuery(function($){
	$("#TELEFONE").mask("(999) 9999-9999");
	$("#CNPJ").mask("99.999.999/9999-99");
	$("#CEP").mask("99999-999");
	$("#IE_NUMERO").mask("999999999");
});

//Script para deixar o input da inscrição estadual dinâmico
const elemento_IE_STATUS = document.getElementById("IE_STATUS")
elemento_IE_STATUS.addEventListener("change", function(){
const valorAtual = this.value
if(valorAtual === "false"){

	//remover div IE_NUMERO
	const div_IE_NUMERO = document.getElementById("div_IE_NUMERO")
	div_IE_NUMERO.parentNode.removeChild(div_IE_NUMERO)
}else if(valorAtual === "true"){
	//cria a div principal
	let divPrincipal = document.createElement('div');
	divPrincipal.classList.add('form-group');
	divPrincipal.id = 'div_IE_NUMERO';

	//cria a label
	let label = document.createElement('label');
	label.textContent = 'Número da Inscrição Estadual';

	//cria o input
	let input = document.createElement('input');
	input.type = 'text';
	input.classList.add('form-control');
	input.name = 'IE_NUMERO';
	input.id = 'IE_NUMERO';
	input.placeholder = 'XXXXXXXXX';
	input.required = true;
	
	//Adiciona a label e o input na div
	divPrincipal.appendChild(label);
	divPrincipal.appendChild(input);

	//adiciona a div depois do select da inscriçao estadual
	const div_IE_STATUS = document.getElementById("div_IE_STATUS")
	div_IE_STATUS.after(divPrincipal);
	//
	
	//vai estar adicionando está DIV que caso não seja preenchido vai estar solicitando
	const inputInvalido = document.createElement("div")
	inputInvalido.className = "invalid-feedback"
	inputInvalido.textContent = "Digite o número da inscrição estadual"
	divPrincipal.appendChild(inputInvalido)
	
	//validação novamente
	jQuery(function($){
		$("#IE_NUMERO").mask("999999999");
	});

}
});
	
(function() {
	'use strict';
	window.addEventListener('load', function() {
	  // Fetch all the forms we want to apply custom Bootstrap validation styles to
	  var forms = document.getElementsByClassName('needs-validation');
	  // Loop over them and prevent submission
	  var validation = Array.prototype.filter.call(forms, function(form) {
		form.addEventListener('submit', function(event) {
		  if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		  }
		  form.classList.add('was-validated');
		}, false);
	  });
	}, false);
})();

