import React, {Component} from "react"
import "./ResultsTable.css"

interface Table{
    questions: string[]
    userResults: number[]
    politicianName: string
    politicianIndex: number
    politicianResults: number[][]
   
}

export class ResultsTable extends Component<Table>{
    render() {
        return (
            <div className="BigDiv">
            <table className="AnswerTable">
                <thead>
                    <th className="AnswersTH">Question</th>
                    <th className="AnswersTH">You</th>
                    <th className="AnswersTH">{this.props.politicianName}</th>
                </thead>
                    {this.numtoword(this.props.politicianIndex)}
            </table>
            </div>
        )
    }

    private numtoword(politicianIndex:number) {
        const allResults = this.props.politicianResults
        console.log(allResults);
        const answers = zip(this.props.questions,this.props.userResults,allResults[politicianIndex])
        const allResultsStringFirst20 = answers.slice(0,19).map((answersArray:[string,number,number])=>{
            const [question,userNum,politicianNum] = answersArray;
            return ( 
                <tr>
                    <td className="AnswersTD">{question}</td> 
                    <td className="AnswersTD">{answerMeaning(userNum)}</td>
                    <td className="AnswersTD">{answerMeaning(politicianNum)}</td>
                </tr>
            )
            })
            
            const allResultsStringEnd = answers.slice(20,28).map((answersArray:[string,number,number])=>{
                const [question,userNum,politicianNum] = answersArray;
                return ( 
                    <tr>
                        <td className="AnswersTD">{question}</td> 
                        <td className="AnswersTD">{fundingAnswersMeaning(userNum)}</td>
                        <td className="AnswersTD">{fundingAnswersMeaning(politicianNum)}</td>
                    </tr>
                )
                })
        
        return(
            <tbody>
            {allResultsStringFirst20}
            {allResultsStringEnd}
            </tbody>
        );
    }
    
}

export default Table

const zip = (arr:any, ...arrs:any) => {
    return arr.map((val:any, i:any) => arrs.reduce((a:any, arr:any) => [...a, arr[i]], [val]));
    }

const answerMeaning=(i:number)=> {
        switch(i) {
            case 1:
                return "Strongly Disagree"
            case 2:
                return "Disagree"
            case 3:
                return "Agree"
            case 4:
                return "Strongly Agree"
            default:
                return "N/A"
        }
    }

const fundingAnswersMeaning=(i:number)=> {
    //Check the wording on the actual quiz to make sure these match up
    switch(i) {
        case 0: 
            return "Shouldn't be funded"
        case 1:
            return "Should be severely cut"
        case 2: 
            return "Should be cut a small amount"
        case 3:
            return "Funding should remain the same"
        case 4:
            return "Funding should increase a small amount"
        case 5:
            return "Funding should be severely increased" 
        default:
            return "N/A"
    }
}