var hint1 = document.getElementById("hint1")
hint1.textContent = "1: A flat cake, often thin and round";
var hint2 = document.getElementById("hint2")
hint2.textContent = "2: The most common piece of furnature in a home";
var hint3 = document.getElementById("hint3")
hint3.textContent = "3: An eating utensil you using to stab/prick into food";



var words = [{"name":"pancake","iscomplete":false},{"name":"table","iscomplete":false}, {"name":"fork","iscomplete":false}] //array for word list
var table = document.getElementById("crosstable") //table element

function verifywordguess() {
    var word2 = []
    var wordclass1 = []

    for(let d = 0; d < words.length; d++) //length of words array
    {
        for(let i = 0; i < document.getElementsByClassName(words[d].name).length; i++) //gets the length of the classes with the mathcing word type
        {
            if(document.getElementsByClassName(words[d].name)[i].value.trim().toLowerCase() != "")
            {
                word2.push(document.getElementsByClassName(words[d].name)[i]) //adds html element to array
                wordclass1 += document.getElementsByClassName(words[d].name)[i].value.trim().toLowerCase() //adds input vlaue to array
            }
        }

        for(let l = 0; l < word2.length; l++)
        {
            if(wordclass1.toString() == words[d].name) //if word line matches
            {
                word2[l].value = wordclass1[l]
                words[d].iscomplete = true;

                if(words[d].name == "pancake")
                {
                    hint1.textContent = hint1.textContent.replace("- That is incorrect!", "");
                    //hint1.textContent = "debjhegb"
                    //console.log(typeof(hint1.textContent))
                }
                else if(words[d].name == "table")
                {
                    hint2.textContent = hint2.textContent.replace("- That is incorrect!", "");
                }
                else if(words[d].name == "fork")
                {
                    hint3.textContent = hint3.textContent.replace("- That is incorrect!", "");
                }
            }
            else if(!emergencycheck(word2[l].classList)) //if it doesn't match and there are no other uses for letters on that line
            {
                word2[l].value = ""
            }
            else
            {
                if(word2[l].classList.length <= 1) //removes letters that are wrong and do not serve any other possible use (not the intersecting ones)
                {
                    word2[l].value = ""
                }
            }
            if(wordclass1.toString() != words[d].name)
            {
                if(words[d].name == "pancake" && !hint1.textContent.includes("- That is incorrect!"))
                {
                    hint1.textContent += " - That is incorrect!";
                }
                else if(words[d].name == "table" && !hint2.textContent.includes("- That is incorrect!"))
                {
                    hint2.textContent += " - That is incorrect!";
                }
                else if(words[d].name == "fork" && !hint3.textContent.includes("- That is incorrect!"))
                {
                    hint3.textContent += " - That is incorrect!";
                }
            }
        }
        //resets variables for next word line check
        word2 = []
        wordclass1 = []

    }
    
}



function emergencycheck(CLASSLIST) {
    let wordclass2 = []

    for(let d = 0; d < CLASSLIST.length; d++) //possible other word line matches
    {
        for(let i = 0; i < words.length; i++)
        {
            if(CLASSLIST[d] == words[i].name)
            {
                for(let c = 0; c < document.getElementsByClassName(CLASSLIST[d]).length; c++) //gets the length of the classes with the mathcing word type
                {
                    if(document.getElementsByClassName(CLASSLIST[d])[c].value.trim().toLowerCase() != "")
                    {
                        wordclass2 += document.getElementsByClassName(CLASSLIST[d])[c].value.trim().toLowerCase()
                    }
                }
                if(words[i].iscomplete)
                {
                    return true //if there is at least one complete word line (which is intersecting with current word line check)
                }
                else if(wordclass2.toString().length == words[i].name.length)//go through potential word line intersections and see if they are filled 
                {
                    return true
                }
            }
            //resets variable for next word line double check
            wordclass2 = []
        }

    }

    return false //if there is no complete word line (which is intersecting with current word line check)
}



