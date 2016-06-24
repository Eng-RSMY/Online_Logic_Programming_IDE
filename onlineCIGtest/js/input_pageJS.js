function additionalInfo() {
	var condition = document.getElementById('medcondition').value;
	condition = condition.toLowerCase();
	div1 = document.createElement('div');
	//If condition is osteoarthritis, create the additional info input fields needed
	if (condition.localeCompare("osteoarthritis") == 0) {
		//Create type of OA field
		var wrapperLab = document.createElement('label');
		var kneeLab = document.createElement('p');
		var hipLab = document.createElement('p');
		var handLab = document.createElement('p');
		var kneeInput = document.createElement('input');
		var hipInput = document.createElement('input');
		var handInput = document.createElement('input');
		kneeInput.setAttribute("name", "oa_type");
		kneeInput.setAttribute("type", "radio");
		kneeInput.setAttribute("value", "knee");
		kneeInput.setAttribute("checked", "true");
		hipInput.setAttribute("name", "oa_type");
		hipInput.setAttribute("type", "radio");
		hipInput.setAttribute("value", "hip");
		handInput.setAttribute("name", "oa_type");
		handInput.setAttribute("type", "radio");
		handInput.setAttribute("value", "hand");
		wrapperLab.textContent = "Type: ";
		kneeLab.textContent = "Knee";
		hipLab.textContent = "Hip";
		handLab.textContent = "Hand";
		wrapperLab.appendChild(kneeInput);
		wrapperLab.appendChild(kneeLab);
		wrapperLab.appendChild(hipInput);
		wrapperLab.appendChild(hipLab);
		wrapperLab.appendChild(handInput);
		wrapperLab.appendChild(handLab);
		div1.appendChild(wrapperLab);		
		
		//Create GI Bleed Question field
		var wrapperLab = document.createElement('label');
		var noneLab = document.createElement('p');
		var pastLab = document.createElement('p');
		var currLab = document.createElement('p');
		var input1 = document.createElement('input');
		var input2 = document.createElement('input');
		var input3 = document.createElement('input');
		input1.setAttribute("name", "GIcomp");
		input1.setAttribute("type", "radio");
		input1.setAttribute("value", "none");
		input1.setAttribute("checked", "true");
		input2.setAttribute("name", "GIcomp");
		input2.setAttribute("type", "radio");
		input2.setAttribute("value", "past");
		input3.setAttribute("name", "GIcomp");
		input3.setAttribute("type", "radio");
		input3.setAttribute("value", "current");
		wrapperLab.textContent = "Upper GI Complications: ";
		noneLab.textContent = "None";
		pastLab.textContent = "Past";
		currLab.textContent = "Current";
		wrapperLab.appendChild(input1);
		wrapperLab.appendChild(noneLab);
		wrapperLab.appendChild(input2);
		wrapperLab.appendChild(pastLab);
		wrapperLab.appendChild(input3);
		wrapperLab.appendChild(currLab);
		div1.appendChild(wrapperLab);
				
	}
	//If condition is hypertension, create the additional info input fields needed
	else if (condition.localeCompare("hypertension") == 0) {
		//Create SBP, DBP, and days treated fields
		var sbpLab = document.createElement('label');
		var dbpLab = document.createElement('label');
		var daysTreatLab = document.createElement('label');
		var sbpInput = document.createElement('input');
		var dbpInput = document.createElement('input');
		var daysInput = document.createElement('input');
		sbpInput.setAttribute("name", "sbp");
		sbpInput.setAttribute("min", "0");
		sbpInput.setAttribute("max", "300");
		sbpInput.setAttribute("type", "number");
		sbpInput.setAttribute("required", "true");
		dbpInput.setAttribute("name", "dbp");
		dbpInput.setAttribute("min", "0");
		dbpInput.setAttribute("max", "200");
		dbpInput.setAttribute("type", "number");
		dbpInput.setAttribute("required", "true");
		daysInput.setAttribute("name", "HyperDaysT");
		daysInput.setAttribute("min", "0");
		daysInput.setAttribute("type", "number");
		daysInput.setAttribute("required", "true");
		sbpLab.textContent = "Systolic BP: ";
		dbpLab.textContent = "Diastolic BP: ";
		daysTreatLab.textContent = "Days Treated: ";
		sbpLab.appendChild(sbpInput);
		dbpLab.appendChild(dbpInput);
		daysTreatLab.appendChild(daysInput);
		div1.appendChild(sbpLab);
		div1.appendChild(dbpLab);
		div1.appendChild(daysTreatLab);
		
		//Create Kidney disease question field
		wrapperLab = document.createElement('label');
		yesLab = document.createElement('p');
		noLab = document.createElement('p');
		yesInput = document.createElement('input');
		noInput = document.createElement('input');
		yesInput.setAttribute("name", "kidneyDis");
		yesInput.setAttribute("type", "radio");
		yesInput.setAttribute("value", "yes");
		noInput.setAttribute("name", "kidneyDis");
		noInput.setAttribute("type", "radio");
		noInput.setAttribute("value", "no");
		noInput.setAttribute("checked", "true");
		wrapperLab.textContent = "Diagnosed with kidney disease: ";
		yesLab.textContent = "Yes"
		noLab.textContent = "No";
		wrapperLab.appendChild(yesInput);
		wrapperLab.appendChild(yesLab);
		wrapperLab.appendChild(noInput);
		wrapperLab.appendChild(noLab);
		div1.appendChild(wrapperLab); 

		
	}	
	//If condition is diabetes, create the additional info input fields needed
	else if (condition.localeCompare("type 1 diabetes") == 0 || condition.localeCompare("type 2 diabetes") == 0) {
		//Create Days treated field
		daysTreatLab = document.createElement('label');
		daysInput = document.createElement('input');
		daysInput.setAttribute("name", "DiabDaysT");
		daysInput.setAttribute("min", "0");
		daysInput.setAttribute("type", "number");
		daysInput.setAttribute("required", "true");
		daysTreatLab.textContent = "Days Treated: ";
		daysTreatLab.appendChild(daysInput);
		div1.appendChild(daysTreatLab);
	}
	//If condition is osteoporosis, create the additional info input fields needed
	else if (condition.localeCompare("osteoporosis") == 0) {
	
		//Create Glomerular Filtration Rate input field
		gfrLab = document.createElement('label');
		gfrInput = document.createElement('input');
		gfrInput.setAttribute("name", "gfr");
		gfrInput.setAttribute("min", "10");
		gfrInput.setAttribute("max", "120");
		gfrInput.setAttribute("type", "number");
		gfrInput.setAttribute("required", "true");
		gfrLab.textContent = "Glomerular Filtration Rate: ";
		gfrLab.appendChild(gfrInput);
		div1.appendChild(gfrLab);
		
		//Create Menopausal State input field
		menoStateLab = document.createElement('label');
		menoStateSelect = document.createElement('select');
		option1 = document.createElement('option');
		option2 = document.createElement('option');
		option3 = document.createElement('option');
		menoStateSelect.setAttribute("name", "menoState");
		option1.setAttribute("value", "menopause");
		option2.setAttribute("value", "postmenopause");
		option3.setAttribute("value", "none");
		menoStateLab.textContent = "Menopausal State: ";
		option1.textContent = "Menopause";
		option2.textContent = "Post menopause";
		option3.textContent = "None";
		menoStateSelect.appendChild(option3);
		menoStateSelect.appendChild(option1);
		menoStateSelect.appendChild(option2);
		menoStateLab.appendChild(menoStateSelect);
		div1.appendChild(menoStateLab);

		//Create List of allergies that react with Osteoporosis
		allergyLab = document.createElement('label');
		allergySelect = document.createElement('select');
		option1 = document.createElement('option');
		option2 = document.createElement('option');
		allergySelect.setAttribute("name", "allergy");
		option1.setAttribute("value", "none");
		option2.setAttribute("value", "salmon");
		option1.textContent = "None";
		option2.textContent = "Salmon";
		allergyLab.textContent = "Allergy: ";
		allergySelect.appendChild(option1);
		allergySelect.appendChild(option2);
		allergyLab.appendChild(allergySelect);
		div1.appendChild(allergyLab);
		
		//Create Glucocorticoids field
		wrapperLab = document.createElement('label');
		yesLab = document.createElement('p');
		noLab = document.createElement('p');
		yesInput = document.createElement('input');
		noInput = document.createElement('input');
		yesInput.setAttribute("name", "takingGluc");
		yesInput.setAttribute("type", "radio");
		yesInput.setAttribute("value", "yes");
		noInput.setAttribute("name", "takingGluc");
		noInput.setAttribute("type", "radio");
		noInput.setAttribute("value", "no");
		noInput.setAttribute("checked", "true");
		wrapperLab.textContent = "Taking Glucocorticoids: ";
		yesLab.textContent = "Yes"
		noLab.textContent = "No";
		wrapperLab.appendChild(yesInput);
		wrapperLab.appendChild(yesLab);
		wrapperLab.appendChild(noInput);
		wrapperLab.appendChild(noLab);
		div1.appendChild(wrapperLab); 
		
		//Create related condition check box field
		wrapperLab = document.createElement('label');
		input1Lab = document.createElement('p');
		input2Lab = document.createElement('p');
		input3Lab = document.createElement('p');
		input4Lab = document.createElement('p');
		input5Lab = document.createElement('p');
		input1 = document.createElement('input');
		input2 = document.createElement('input');
		input3 = document.createElement('input');
		input4 = document.createElement('input');
		input5 = document.createElement('input');
		wrapperLab.setAttribute("id", "relatedConWrapper");
		input1.setAttribute("name", "relateCon[]");
		input1.setAttribute("type", "checkbox");
		input1.setAttribute("value", "highCreatinine");
		input2.setAttribute("name", "relateCon[]");
		input2.setAttribute("type", "checkbox");
		input2.setAttribute("value", "highFracRisk");
		input3.setAttribute("name", "relateCon[]");
		input3.setAttribute("type", "checkbox");
		input3.setAttribute("value", "hypocalcemia");
		input4.setAttribute("name", "relateCon[]");
		input4.setAttribute("type", "checkbox");
		input4.setAttribute("value", "paget_bone_disease");
		input5.setAttribute("name", "relateCon[]");
		input5.setAttribute("type", "checkbox");
		input5.setAttribute("value", "bone_metastases");
		wrapperLab.textContent = "Related Conditions: ";
		input1Lab.textContent = "High Creatinine Levels";
		input2Lab.textContent = "High Fracture Risk";
		input3Lab.textContent = "Hypocalcemia";
		input4Lab.textContent = "Paget Disease of Bone";
		input5Lab.textContent = "Bone Metastases";
		wrapperLab.appendChild(input1);
		wrapperLab.appendChild(input1Lab);
		wrapperLab.appendChild(input2);
		wrapperLab.appendChild(input2Lab);
		wrapperLab.appendChild(input3);
		wrapperLab.appendChild(input3Lab);
		wrapperLab.appendChild(input4);
		wrapperLab.appendChild(input4Lab);
		wrapperLab.appendChild(input5);
		wrapperLab.appendChild(input5Lab);
		div1.appendChild(wrapperLab);
				
		//Prior skeleton radiation therapy question field
		wrapperLab = document.createElement('label');
		yesLab = document.createElement('p');
		noLab = document.createElement('p');
		yesInput = document.createElement('input');
		noInput = document.createElement('input');
		yesInput.setAttribute("name", "skeleton_rad");
		yesInput.setAttribute("type", "radio");
		yesInput.setAttribute("value", "yes");
		noInput.setAttribute("name", "skeleton_rad");
		noInput.setAttribute("type", "radio");
		noInput.setAttribute("value", "no");
		noInput.setAttribute("checked", "true");
		wrapperLab.textContent = "Prior Skeleton Radiation Therapy: ";
		yesLab.textContent = "Yes"
		noLab.textContent = "No";
		wrapperLab.appendChild(yesInput);
		wrapperLab.appendChild(yesLab);
		wrapperLab.appendChild(noInput);
		wrapperLab.appendChild(noLab);
		div1.appendChild(wrapperLab); 
				
		//Skeletal Malignancy History question field
		wrapperLab = document.createElement('label');
		yesLab = document.createElement('p');
		noLab = document.createElement('p');
		yesInput = document.createElement('input');
		noInput = document.createElement('input');
		yesInput.setAttribute("name", "skeletal_malignancy");
		yesInput.setAttribute("type", "radio");
		yesInput.setAttribute("value", "yes");
		noInput.setAttribute("name", "skeletal_malignancy");
		noInput.setAttribute("type", "radio");
		noInput.setAttribute("value", "no");
		noInput.setAttribute("checked", "true");
		wrapperLab.textContent = "History of Skeletal Malignancy: ";
		yesLab.textContent = "Yes"
		noLab.textContent = "No";
		wrapperLab.appendChild(yesInput);
		wrapperLab.appendChild(yesLab);
		wrapperLab.appendChild(noInput);
		wrapperLab.appendChild(noLab);
		div1.appendChild(wrapperLab); 
			
		
	}
	document.getElementById('medCondition').appendChild(div1);
	
	//create button to add a disease
	var addDiseaseButton = document.createElement('button');
	addDiseaseButton.setAttribute("type", "button");
	addDiseaseButton.setAttribute("onclick", "addDisease()");
	addDiseaseButton.textContent = "Add Condition";
	document.getElementById('medCondition').appendChild(addDiseaseButton);
}



//Function adds the field required for user to add a disease
function addDisease() {
	var wrapperDiv = document.createElement('div');
	var label = document.createElement('label');
	var input = document.createElement('input');
	var datalist = document.createElement('datalist');
	var option1 = document.createElement('option'); 
	var option2 = document.createElement('option'); 
	var option3 = document.createElement('option');
	var option4 = document.createElement('option'); 
	var option5 = document.createElement('option'); 
	wrapperDiv.setAttribute("id", "medCondition");
	input.setAttribute("name", "medcondition[]");
	input.setAttribute("id", "medcondition");
	input.setAttribute("type", "text");
	input.setAttribute("list", "conditions");
	input.setAttribute("oninput", "additionalInfo()");
	input.setAttribute("placeholder", "Select a condition");
	input.setAttribute("required", "true");
	datalist.setAttribute("id", "conditions");
	option1.setAttribute("value", "Hypertension");
	option2.setAttribute("value", "Type 1 diabetes");
	option3.setAttribute("value", "Type 2 diabetes");
	option4.setAttribute("value", "Osteoarthritis");
	option5.setAttribute("value", "Osteoporosis");
	datalist.appendChild(option1);
	datalist.appendChild(option2);
	datalist.appendChild(option3);
	datalist.appendChild(option4);
	datalist.appendChild(option5);
	label.textContent = "Medical Conditions: "; 
	label.appendChild(input);
	label.appendChild(datalist);
	wrapperDiv.appendChild(label);
	document.getElementById('medCondition').parentNode.insertBefore(wrapperDiv, document.getElementById('medCondition'));
}

