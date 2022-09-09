                                                                                                                          
                                                   //g scope

const charBox = document.querySelector('input[type="number"]');
const numBox = document.getElementById('numchar');
const lowBox = document.getElementById('lowchar');
const upBox = document.getElementById('upchar');
const fancyBox = document.getElementById('fancychar');
const form = document.getElementById('buttform');

function makeRand(a,b,R) { return a+(b-a)*R;}

function whichWay (x,y) {return (x-y >=0.5);}





                                                                    //WE DON'T NEED Math() METHODS!! Let's put on our BigInt boy pants and generate our own random numbers. 


               /**********       we'll try to keep all our constants and variables contained in their own scope. We only need them to perform calculations: newI=(a*oldI) modM  -> R[i] = newI/M                 ***********************
                                    we will use these to generate an array of uniform deviates, and we're simply using the string length set in our HTML form as the seed. */

function sproutArray(seed) {                 
 
    const a = (7n**5n);                                      
    const M = ((2n**31n)-1n);
    var oldI = BigInt(seed);
    var newI;

    const devArray = [];
    
    for (let i=0; i<seed; i++) {                                                                               //build our array
       newI = (a*oldI) %M;
      devArray[i] = Number(newI) / Number(M);                                                                   //we do eventually need a value 0 >= i >1, but by multiplying by 1000n, then using type coercion at the very end we can reliably preserve 3 decimal places, np
      oldI = newI;
    }
return devArray;
}


                                                                                                                              /* now we can just use our deviates to generate random numbers as we go. We dont need R[] once we are done, so we can just pop out items as 
                                                                                                                             we use them for calculations. Then we know we are finished when the array is empty! */

function passGen() {

const R = sproutArray(charBox.valueAsNumber);
const launchCodes = [];
console.log(R);  //test
 
while(R.length>=1){
   if (lowBox.checked && !!R) {          
    let x = makeRand(97,122,R.pop()); 
    let y = Math.trunc(x);
              console.log(y);  //test
                                                                                   //we need integers, but we dont want to waste all that precision. We can truncate our decimal places, then use a simple bitwise fucntion to decide whether we push or shift our launch codes   
    if (whichWay(x,y)){                               
      launchCodes.push(y)
          } else{ launchCodes.unshift(y);}
}


   
                                                                                    //notice, truthy for x>0.5. The a & b in our makeRand function are actually constants that will set the range of our numbers

   if (upBox.checked && !!R) {                                                   //so why not set those to some sets of ASCII characters?
    let x = makeRand(65,90,R.pop()); 
    let y = Math.trunc(x);

    if (whichWay(x,y)){                               
      launchCodes.push(y);
          } else{ launchCodes.unshift(y);}
}


   if (numBox.checked && !!R) {  
    let x = makeRand(48,57,R.pop()); 
    let y = Math.trunc(x);         

        if (whichWay(x,y)){                               
        launchCodes.push(y);
          } else{ launchCodes.unshift(y);}
}


   if (fancyBox.checked && !!R) {     
    let x = makeRand(33,47,R.pop()); 
    let y = Math.trunc(x);    

    if (whichWay(x,y)){                               
      launchCodes.push(y);
          } else{ launchCodes.unshift(y);}
}


 }

return String.fromCharCode(...launchCodes);

}



// Get references to the #generate element
const generateBtn = document.querySelector("button");

// Write password to the #password input
  function writePass() {
    

    var password = passGen();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

  }

//prevent default form refresh


generateBtn.addEventListener('click', writePass);
document.addEventListener('submit', function(e){
e.preventDefault();

});

/*now we just need to reset everything to run again... oh wait! we designed our program to reset itself. Love it when that happens*/