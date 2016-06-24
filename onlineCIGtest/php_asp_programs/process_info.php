<!DOCTYPE HTML>

<html>
	<head>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		<title>REU Healthcare Problem</title>
		<link href="../css/php_styles.css" rel="stylesheet" type="text/css" media="screen">
		<?php
		
			/*
				Function places each line or answer-set from the file into a string. 
				Extracts the needed data, in this case each medication, from each atom in the string.
				Calls function addToAllMeds
			*/
			function extractMed($file, &$allMeds) {
				$answer_set = fgets($file);
				$flag = true;
				while(!feof($file) && strcmp($answer_set, "\r\n") != 0 && $flag) {
					$oneSet = array();
					$atom = explode(" ", $answer_set);
					foreach($atom as $element) {
						$startpos = stripos($element, ",") + 1;
						$endpos = stripos($element, ")" );
						$len = $endpos - $startpos;
						$medication = substr($element, $startpos, $len);
						$oneSet[] = str_replace("_", " ", $medication);
					}
					$flag = addToAllMeds($allMeds, $oneSet);
					unset($oneSet);
					$answer_set = fgets($file);
				}
			} 
			
			function addToAllMeds(&$mainArray, $subArray) {
				$flag = true;
				if(empty($mainArray)) {
					$mainArray[] = $subArray;
				}
				else {
					for($i = 0; $i < count($mainArray) && $flag; $i++) {
						if($mainArray[$i] === $subArray) 
							$flag = false;
					}
					if($flag)
						$mainArray[] = $subArray;	
				}
				return $flag;
			
			}
			
			//Function prints out the multidimensional array containing reach recommendation
			function printRecommendations($recommendations) {
				if (empty($recommendations)) 
					print("<p>No answer-sets were found</p>");
				else if (strcmp($recommendations[0][0], "}") == 0) 
					print("<p>Empty answer-set</p>");
				else {
					for($i=0; $i < count($recommendations); $i++) {
						$j = 0;
						$recommendations[$i][$j] = strtoupper($recommendations[$i][$j]);
						echo "<p>".$recommendations[$i][$j];
						for($j=1; $j < count($recommendations[$i]); $j++) {
							$recommendations[$i][$j] = strtoupper($recommendations[$i][$j]);
							echo " and ".$recommendations[$i][$j];
						}
						echo "</p>";
						//Print an 'or' inbetween each recommendation unless last medication was just printed
						if ($i+1 < count($recommendations))
							echo "<div id=\"or\"><p>or</p></div>";
					}
				}
			}
						
						
			//Function processes the additional information for hypertension, creates needed facts, and places facts in array
			function processHypertension($name, $condition, &$factArray) {
				$systolicBP = $_POST['sbp'];
				$diastolicBP = $_POST['dbp'];
				$timeTreated = $_POST['HyperDaysT'];
				$hasKidneyDis = (strcmp($_POST['kidneyDis'], "yes") == 0) ? true : false;
				$factArray[] = "diagnosed($name, $condition).";
				$factArray[] = "bloodpressure($name, $systolicBP, $diastolicBP).";
				$factArray[] = "treated_for($name, $condition, $timeTreated).";
				if ($hasKidneyDis)
					$factArray[] = "diagnosed($name, chronic_kidney_disease).";
			
			}
			
			//Function processes the additional information for diabetes type I and II, creates needed facts, and places facts in array
			function processDiabetes($name, $condition, &$factArray) {
				$timeTreated = $_POST['DiabDaysT'];
				$factArray[] = "diagnosed($name, $condition).";
				$factArray[] = "treated_for($name, $condition, $timeTreated).";

			}
			
			//Function processes the additional information for osteoarthritis, creates needed facts, and places facts in array
			function processOsteoarthritis($name, $condition, &$factArray) {
				$oa_type = $_POST['oa_type'];
				$GIcomp = $_POST['GIcomp'];
				//Format var condition based on OA type and create needed fact
				if (strcmp($oa_type, "knee") == 0)
					$condition = "knee_OA";
				else if (strcmp($oa_type, "hip") == 0)
					$condition = "hip_OA";
				else
					$condition = "hand_OA";
				$factArray[] = "diagnosed($name, $condition).";
				//Create needed facts if patient diagnosed with past/current GI complications
				if(strcmp($GIcomp, "past") == 0) {
					$factArray[] = "diagnosed($name, upperGI_comp).";
					$factArray[] = "-experiencedGIBleedPastYr($name).";	
				}
				else if(strcmp($GIcomp, "current") == 0) {
					$factArray[] = "diagnosed($name, upperGI_comp).";
					$factArray[] = "experiencedGIBleedPastYr($name).";
				}

			}
			
			//Function processes the additional information for osteoporosis, creates needed facts, and places facts in array
			function processOsteoporosis($name, $condition, &$factArray) {
				$gfr = $_POST['gfr'];
				$menopausalState = $_POST['menoState'];
				$allergy = $_POST['allergy'];
				$takingGlucocorticoids = strcmp($_POST['takingGluc'], "yes") == 0 ? true : false;
				$had_skel_rad = strcmp($_POST['skeleton_rad'], "yes") == 0 ? true : false;
				$skel_mal_hist = strcmp($_POST['skeletal_malignancy'], "yes") == 0 ? true : false;
				$factArray[] = "diagnosed($name, $condition).";
				$factArray[] = "gfr($name, $gfr).";
				if(strcmp($menopausalState, "none") != 0)
					$factArray[] = "state($name, $menopausalState).";
				if(strcmp($allergy, "salmon") == 0)
					$factArray[] = "allergic_to($name, $allergy).";
				if($had_skel_rad)
					$factArray[] = "diagnosed($name, prior_skeleton_radiation_therapy)."; 
				if($skel_mal_hist)
					$factArray[] = "diagnosed($name, skeletal_malignancy_history).";
				if($takingGlucocorticoids)
					$factArray[] = "also_taking($name, glucocorticoids).";
				if (!empty($_POST['relateCon'])) {
					$relatedCon = $_POST['relateCon'];
					//Loop through each element that was inputted for related conditions, create appropriate facts
					for($i=0; $i < count($relatedCon); $i++) {
						if(strcmp($relatedCon[$i], "highCreatinine") == 0)
							$factArray[] = "condition($name, high_creatinine).";
						else if(strcmp($relatedCon[$i], "highFracRisk") == 0)
							$factArray[] = "condition($name, high_fracture_risk).";
						else if(strcmp($relatedCon[$i], "hypocalcemia") == 0)
							$factArray[] = "diagnosed($name, hypocalcemia).";
						else if(strcmp($relatedCon[$i], "paget_bone_disease") == 0)
							$factArray[] = "diagnosed($name, paget_disease_of_bone).";
						else if(strcmp($relatedCon[$i], "bone_metastases") == 0)
							$factArray[] = "diagnosed($name, bone_metastases).";
					}
				}
						
			}
			
		?>
	</head>
	<body>
		<div id="wrapper">
			<div id="top">
				<div id="logo"> <img src="../images/Logo-small.jpg" alt="REU Declarative Program Logo" /></div>
			</div>
			<div id="topnav">
				<ul>
					<li><a href="../input_page.html">BACK TO INPUT PAGE</a></li>
				</ul>
			</div>
			<div id="content"><h1>Pharmacological Recommendations for Patient</h1>
				<?php
					//Save inputted data into variables, format as required for ASP program
					$name = $_POST['firstname'];
					$age = $_POST['age'];
					$sex = $_POST['sex'];
					$race = $_POST['race'];
					$allConditions = $_POST['medcondition'];
					$hypConsideration = NULL;
					$diabConsideration = NULL;
					$facts = array();
					$facts[] = "age($name, $age).";
					$facts[] = "race($name, $race).";			
					//Loop processes all information given for each disease the patient is diagnosed with.
					//Information turned into facts and placed into array
					for($i = 0; $i < count($allConditions); $i++) {
						$condition = strtolower($allConditions[$i]);
						$condition = str_replace(" ", "_", $condition);
						if (strcmp($condition, "osteoarthritis") == 0)
							processOsteoarthritis($name, $condition, $facts);
						else if (strcmp($condition, "hypertension") == 0) {
							processHypertension($name, $condition, $facts);
							//Add a consideration if needed. Based on the days hypertension has been treated
							$timeTreated = $_POST['HyperDaysT'];
							if($timeTreated > 30) 
								$hypConsideration = "Recommend adding second anti-hypertensive drug to recommendation";
							else if ($timeTreated > 60)
								$hypConsideration = "Recommend adding third anti-hypertensive drug to recommendation";
							else if ($timeTreated > 90)
								$hypConsideration = "See a specialist or add drug from different class";
							
						}	
						else if (strcmp($condition, "type_1_diabetes") == 0 || strcmp($condition, "type_2_diabetes") == 0) {
							processDiabetes($name, $condition, $facts); 
							$timeTreated = $_POST['DiabDaysT'];
							//Add a consideration if needed. Based on the days type II diabetes has been treated
							if(strcmp($condition, "type_2_diabetes") == 0) {
								if($timeTreated >= 180 && $timeTreated < 270) 
									$diabConsideration = "Recommend adding second diabetes drug to recommendation";
							}
						}	
						else if (strcmp($condition, "osteoporosis") == 0) {
							processOsteoporosis($name, $condition, $facts);
							$facts[] = "gender($name, $sex).";	
						}
						
					}
					//Copy the original ASP program to a temporary file
					copy("combined_ASP_program.txt", "temp.txt");
					//Add each fact created to the temporary ASP program
					for($i=0; $i < count($facts); $i++) {
						file_put_contents("temp.txt", "\r\n", FILE_APPEND);
						file_put_contents("temp.txt", $facts[$i], FILE_APPEND);
					}
					//Create the command to be executed by the system
					$command = "java -jar sparc.jar temp.txt -solveropts \"-pfilter=treatment\" -A >results.txt";
					exec($command);
					$results = fopen("results.txt", "r");
					$medArray = array();
					extractMed($results, $medArray);
					fclose($results);			
				?>
				<div id="processed_info">
					<?php
						printRecommendations($medArray);
						//Print consideration if they exist
						if(!empty($hypConsideration) || !empty($diabConsideration)) {
							echo "<div id=\"consider\">";
							if(!empty($hypConsideration))
								echo "<p>$hypConsideration</p>";
							if(!empty($diabConsideration))
								echo "<p>$diabConsideration</p>";
							echo "</div>";
						}
					?>
				</div>
			</div>
		</div>
	</body>
</html>