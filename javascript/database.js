



window.addEventListener('load',loadPage);

function loadPage(){
	
	
 	
	
	loginCheck();
	
	
	if	(typeof searchDatabase == 'function'){searchDatabase()}
	if (typeof loadThread == 'function'){loadThread()}
	if (typeof profileDisplay == 'function'){profileDisplay()}
	if(typeof loadGraph == 'function'){loadGraph()}
	
	if(typeof timeNowSet == 'function' ){timeNowSet()}
	if(typeof changeGraph == 'function'){changeGraph()}

	

}
 
var postInfo = [];
var picRef;
var inUse = false;
var loggedIn;
 var position;

 
function checkInUse(){
   //check if username is in use
	 var existingUser;
	 var userForm = document.getElementById('username').value;
	 rootRef.child("/info/"+userForm).once("value", function(snapshot){
		existingUser = snapshot.val();
	 
	 if(existingUser == null){
		document.getElementById('username').style.border = "solid green 2px";
		document.getElementsByClassName('alert')[0].innerHTML = "";
		
		inUse = true;
		}
	 
	 else{document.getElementById('username').style.border = "solid red 2px";
	 
		document.getElementsByClassName('alert')[0].innerHTML = "Username already in use !";
		inUse = false;
		}
	 
	
	});
	}
	
	
function validatePassword(){

	// check if passwords are correct
	var pw = document.getElementById('password').value;
	var cpw = document.getElementById('confirmpassword').value;


	if(pw != cpw){
		document.getElementsByClassName('alert')[0].innerHTML = "Passwords entered do not match !";
		
	}
	else if(pw.length < 6){
		document.getElementsByClassName('alert')[0].innerHTML = "Password needs to be atleast 6 characters !";
		
		
	}
	else{
		return true;
	}
	
	}


function filledIn(){
	
	var userForm = document.getElementById('username').value;
	  var nameForm = document.getElementById('name').value;
	  var passwordForm = document.getElementById('password').value;
	  var contactForm = document.getElementById('contact').value;
	  var emailForm = document.getElementById('email').value;
	  var schoolForm = document.getElementById('school').value;
	  var dobForm = document.getElementById('dob').value;
	  if(nameForm == "" || passwordForm == "" || contactForm== "" || emailForm=="" || schoolForm == "" || dobForm=="" ){
		  document.getElementsByClassName('alert')[0].innerHTML = "Please ensure all fields are filled !" ;
		  return false;
		  
		  
	  }
		else{
			
			
			return true;
			
		}	
		
	
	
	
}

	
	
function registration(){
 
	
	if(filledIn() && inUse && validatePassword()){
 
	  var userForm = document.getElementById('username').value;
	  var nameForm = document.getElementById('name').value;
	  var passwordForm = document.getElementById('password').value;
	  var contactForm = document.getElementById('contact').value;
	  var emailForm = document.getElementById('email').value;
	  var schoolForm = document.getElementById('school').value;
	  var dobForm = document.getElementById('dob').value;

	rootRef.child('/info/'+ userForm).set({
		
	name:nameForm, password:passwordForm, dob:dobForm ,contact: contactForm, email: emailForm,  school: schoolForm, bio:"", position : "member",profilepicture:"https://firebasestorage.googleapis.com/v0/b/project-bdf04.appspot.com/o/images%2Fprofile.png?alt=media&token=22781f1f-2a7b-4aa4-9510-5d157dd66967"}).then(function(){
		
		
		document.getElementsByClassName('alert')[0].innerHTML = "<p style='color:green'>You have successfully registered for an account !</p>" ;
		document.getElementById("registrationForm").reset();
		document.getElementById("username").style.borderWidth = "2px";
		document.getElementById("username").style.borderStyle = "inset";
		document.getElementById("username").style.borderColor = "initial";
	})
	
	
	}
	
	

}  
  

 function redirect(ext){
	 
	 location.href = "profilePage.html?"+ext;
	 
 } 
  

 function loginCheck(){
 
 var dbbackground;
 var profileurl;

	loggedIn = localStorage.getItem("currentlogin");
	console.log("This is the login id : " + loggedIn);
	var localBackground = localStorage.getItem("background");

		
		if(loggedIn != null){
			
			if(localBackground != null){
				
				document.body.style.backgroundImage = "url("+localBackground+")";
				
			}
			
			
			rootRef.child("info/"+loggedIn+"/position").once("value",function(positionsnap){
				position = positionsnap.val();
				
				
			}).then(function(){
				
				if(position == "admin"){
					
					
					document.getElementsByClassName("profileNav")[1].innerHTML = "Statistics";
					document.getElementsByClassName("profileNav")[1].setAttribute("onclick", "location.href = ' "+"searchAnalytics.html"+ "' " );
					
					}
					
					
					
				
				
				
			})
			
			
			
			rootRef.child("info/"+loggedIn+"/profilebackground").once("value",function(background){
				
				dbbackground = background.val();
				
				
				
			}).then(function(){
			//
			
			 if(dbbackground != null && localBackground == null){
				
				document.body.style.backgroundImage = "url("+dbbackground+")";
				localStorage.setItem("background",dbbackground);
				}
			
			
			
			})	
			
				document.getElementsByClassName("profileNavbar")[0].style.display = "inline-block";
				document.getElementsByClassName("signIn")[0].style.display = "none";
				document.getElementById("profileName").innerHTML = loggedIn;
				
			
			rootRef.child("info/"+loggedIn+"/profilepicture").once("value",function(profilesnap){
		
				profileurl = profilesnap.val();
				console.log(profileurl);
				
			}).then(
			function(){
				document.getElementById("profileIcon").setAttribute("onclick","redirect('"+loggedIn+"')"); 
				document.getElementById("profileSettings").href="profilePage.html?"+loggedIn;
				document.getElementById("profileIcon").style.backgroundImage = "url("+profileurl+")";
			})



		}
	
	
	
	
}
	


 
 
 function checkLogin(){ 
	 var dbpw;
	 var id = document.getElementById('Username').value;
	 var pw = document.getElementById('Password').value;
	 rootRef.child("info/"+id+"/password").once('value',function(snapshot){
		dbpw = snapshot.val();
		}).then(function(){
			if(id == "" || pw == ""){
				document.getElementsByClassName('alert')[0].innerHTML = "Please enter a username and password !";
			}	
				else if(dbpw == null){
					document.getElementsByClassName('alert')[0].innerHTML = "Username does not exist !"
				}
					else if( dbpw != pw ){
						document.getElementsByClassName('alert')[0].innerHTML = "Incorrect password !"
					}
						else{
						
						localStorage.setItem("currentlogin",id);
						location.reload();
						
						
					};
					
					
				});
				
				
				//})
	
	} 
  
  function logOut(){
	
	localStorage.removeItem("currentlogin");
	localStorage.removeItem("background");
	
	location.reload();
  
  }
  
  
function popOutLogin(){
	document.getElementById("registrationMain").style.display = "block";
}


function closepopOut(){
	document.getElementById("registrationMain").style.display = "none";

}

	


function navbar(){

    if (document.body.scrollTop > 200) {
        document.getElementById("nav").className = "scrollednavbarDiv"
		//document.getElementsByClassName("contentDiv")[0].style.marginTop = "0px"
    }
	else{
		document.getElementById("nav").className = "navbarDiv"
		//document.getElementsByClassName("contentDiv")[0].style.marginTop = "0";
	}
	
	
}

function dropdownProfile(){
	
	var appear = document.getElementsByClassName("profileNav")[0].style.display;
	
	if(appear == "block"){
		document.getElementsByClassName("mainProfile")[0].style.backgroundColor = "rgba(0,0,0,0.9)";
		document.getElementsByClassName("profileNav")[0].style.display = "none";
		document.getElementsByClassName("profileNav")[1].style.display = "none";
		document.getElementsByClassName("profileNav")[2].style.display = "none";
		
	}
	
	else{
		document.getElementsByClassName("mainProfile")[0].style.backgroundColor = "rgba(255,255,255,0.5)";
		document.getElementsByClassName("profileNav")[0].style.display = "block";
		document.getElementsByClassName("profileNav")[1].style.display = "block";
		document.getElementsByClassName("profileNav")[2].style.display = "block";
		
	}
	
}

function changeToReset(){
	
	document.getElementsByClassName("formTable2")[0].style.display = "none";
	document.getElementsByClassName("resetpwTable")[0].style.display = "table" ;
}
function changeToLogin(){
	document.getElementsByClassName("formTable2")[0].style.display = "table";
	document.getElementsByClassName("resetpwTable")[0].style.display = "none" ;
	
}

function ResetUserPw(){
	
	var user = document.getElementById("resetusername").value
	var email = document.getElementById("resetemail").value
	var dob = document.getElementById("resetdob").value
	var newpw = document.getElementById("resetnewpw").value
	var confirmpw = document.getElementById("resetconfirmpw").value
	
	var dbData;
	var dbpw;
	var dbemail;
	var dbdob;
	
	if(user != "" && email != "" && dob != "" && newpw != "" && confirmpw != ""){
	
		rootRef.child("/info/"+user+"/").once("value",function(snapshot){
			dbData = snapshot.val()		
			dbemail = dbData.email;
			dbpw = dbData["password"];
			dbdob = dbData.dob;
			
		}).then(function(){
			
			
			
		if(dbpw != null && dbemail != null && dbdob !=null){
			
			
		
			if(email != dbemail ){
				document.getElementsByClassName("alert")[0].innerHTML = "Invalid Email !";
				
			}else if(dob != dbdob){
				
					document.getElementsByClassName("alert")[0].innerHTML = "Incorrect Date of Birth !";
				}
			
				else if(newpw != confirmpw){
					
					document.getElementsByClassName("alert")[0].innerHTML = "Passwords don't match !";	
					
				}
				else if(newpw.length<6){
					document.getElementsByClassName("alert")[0].innerHTML = "New password has to be atleast 6 characters ! ";
					
				}
				else{rootRef.child("/info/"+user+"/").update({ password:newpw }).then(function(){
					
					
					document.getElementsByClassName("alert")[0].innerHTML = "<p style='color:green'>Password successfully changed ! </p>";
					changeToLogin();
					document.getElementById("resetusername").value = "";
					document.getElementById("resetemail").value = "";
					document.getElementById("resetdob").value = "";
					document.getElementById("resetnewpw").value = "";
					document.getElementById("resetconfirmpw").value = "";
				}
				
				
				
				)}
			
				
			
		}
		
		})
		
		
	}

	else{
		
		document.getElementsByClassName("alert")[0].innerHTML = "Please fill in all the details to reset your password !";
		
	}	
		
		
		
		
}



	function getPrice(){
		var x;
		x = localStorage.getItem("price");
		var check = localStorage.getItem("cart");
		console.log(check);
		if(check == null){
			document.getElementsByClassName("pricing")[0].innerHTML = "<p>SGD$"+0+"</p>";
		}
		else{document.getElementsByClassName("pricing")[0].innerHTML = "<p>SGD$"+x+"</p>";}
	}