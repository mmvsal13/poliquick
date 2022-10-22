/*function that calculates match rate between a user and politician 
General Rules:
Start at 100 points (100% match)
On each stance, a point is lost for how much each opinion differs
If the user and politician "generally agree", half points are lost
    for the first 20 questions general agreement refers to either:
        a pairing of strongly disagree and disagree
        a pairing of agree and strongly agree
    for the final 8 questions general agreement refers to either:
        any pairing of cutting funding completely, severely cutting funding, or cutting funding by a small amount
        a pairing of increase funding by a small amount and increase funding severely
The points are then divided by the max points to get a percentage*/

export function match(user: number[], poli: number[]) {
    /*total points, begins at 100*/
    var max_match = 100;
    /*current total*/
    var curr_match = max_match;
    
    /*iterating through both inputs for current stance*/
    for (var index in poli) {
        /*define user and poli stance for simplicity*/
        var user_stance = user[index];
        var poli_stance = poli[index];
        
        /*handling skips/neutral by deducting from curr_match and max match*/
        if (user_stance == -1) {
            curr_match -= 3;
            max_match -= 3; 
        }
        /*if the stance is the same, do nothing*/
        else if (!(user_stance == poli_stance)) {
            /*case for the first 20 questions, which are rated 1-4*/
            if (parseFloat(index) < 20)  {
            /*if user and politician "generally agree" only half points are lost*/
                /*a pairing of agree and strongly agree*/
                if ((user_stance == 3 && poli_stance == 4) || (user_stance == 4 && poli_stance == 3)) {
                    curr_match -= (0.5) * Math.abs(user_stance - poli_stance);
                }
                /*a pairing of strongly disagree and disagree*/
                else if ((user_stance == 1 && poli_stance == 2) || (user_stance == 2 && poli_stance == 1)) {
                    curr_match -= (0.5) * Math.abs(user_stance- poli_stance);
                }
            /*otherwise follow general rule*/
                else {
                    curr_match -= Math.abs(user_stance - poli_stance);
                }   
            }
            
            /*case for the last 8 questions, which are rated 0-5*/
            else if(parseFloat(index) < 28){
            /*checks for general agreement
                a pairing of slight, severe, or complete cuts*/
                if ((user_stance == 0 || user_stance == 1 || user_stance == 2) && 
                (poli_stance == 0 || poli_stance == 1 || poli_stance == 2)){
                    curr_match -= (0.5) * Math.abs(user_stance - poli_stance);
                }
                /*a pairing slight/severe funding increases*/
                else if ((user_stance == 4 && poli_stance == 5) || (user_stance == 5 && poli_stance == 4)) {
                    curr_match -= (0.5) * Math.abs(user_stance - poli_stance);
                }
            /*otherwise follow general rule*/
                else {
                    curr_match -= Math.abs(user_stance - poli_stance);
                }                
            }  
        }
    }
    /*calculate final percentage, rounded to the nearest 10ths*/
    var final = Math.round(curr_match/max_match * 1000)/10;
    return final;
}