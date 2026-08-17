import axios from "axios";
import Interview from "../models/Interview.js";

import {
    executeCode,
    evaluateCode,
} from "./ai.service.js";



// START INTERVIEW


export const startInterviewService = async ({
    userId,
    topic,
    difficulty,
    language,
}) => {

    // Create interview first
    const interview = await Interview.create({
        user: userId,
        topic,
        difficulty,
        language,
        status: "started",
    });

    try {

       
        // GENERATE QUESTION

        const response = await axios.post(
            "https://interviewai-1-f9ox.onrender.com/api/interview/generate-question",
            {
                topic,
                difficulty,
                language,
            }
        );

        if (
            response.data &&
            response.data.success
        ) {

            const question =
                response.data.data;

            interview.question =
                question;

            interview.status =
                "in_progress";

            await interview.save();
        }

    } catch (error) {

        console.error(
            "AI QUESTION ERROR:",
            error.response?.data ||
            error.message
        );

        // Interview remains created
    }

    return interview;
};



// GET INTERVIEW

export const getInterviewService = async ({
    interviewId,
    userId,
}) => {

    const interview =
        await Interview.findOne({
            _id: interviewId,
            user: userId,
        }).lean();

    if (!interview) {

        throw new Error(
            "Interview not found"
        );
    }

    // Never send hidden test cases
    if (interview.question) {

        delete interview.question
            .hidden_test_cases;
    }

    return interview;
};



// SUBMIT INTERVIEW CODE
export const submitInterviewCodeService =
    async ({
        interviewId,
        userId,
        code,
    }) => {
        console.log(
            "Interview ID:",
            interviewId
        );

        console.log(
            "User ID:",
            userId
        );
      
        // FIND INTERVIEW
        const interview =
            await Interview.findOne({
                _id: interviewId,
                user: userId,
            });

        if (!interview) {

            throw new Error(
                "Interview not found"
            );
        }

       


       
        // CHECK STATUS

        console.log(
            "Interview status:",
            interview.status
        );

        if (
            interview.status ===
            "completed"
        ) {

            throw new Error(
                "Interview already completed"
            );
        }


        
        // CHECK QUESTION

        if (!interview.question) {

            throw new Error(
                "Interview question not found"
            );
        }

        console.log(
            "Question:",
            interview.question.title
        );


     
        // GET HIDDEN TEST CASES

        const hiddenTestCases =
            interview.question
                .hidden_test_cases;

        

        console.log(
            " TOTAL HIDDEN TESTS:",
            hiddenTestCases?.length
        );

        

        console.log(
            JSON.stringify(
                hiddenTestCases,
                null,
                2
            )
        );


        if (
            !hiddenTestCases ||
            hiddenTestCases.length === 0
        ) {

            throw new Error(
                "Hidden test cases not available"
            );
        }


        // =================================================
        // IMPORTANT:
        //
        // DO NOT ASSUME EVERY QUESTION IS:
        //
        // n
        // array of n values
        //
        // Different problems can have:
        //
        // n + array
        // n + array + k
        // n + array + target
        // n + array + limit
        // multiple arrays
        // strings
        // matrices
        // etc.
        //
        // Therefore validation is handled by the
        // question generator and execution service.
        // =================================================
      
        // 1. EXECUTE CODE
       

        

        const executionResult =
            await executeCode({
                code,
                language:
                    interview.language,
                testCases:
                    hiddenTestCases,
            });

        console.log(
            JSON.stringify(
                executionResult,
                null,
                2
            )
        );

        


      
        // CHECK EXECUTION RESULT
  

        if (!executionResult) {

            throw new Error(
                "Code execution returned no result"
            );
        }


        const total =
            executionResult.total || 0;

        const passed =
            executionResult.passed || 0;

        const failed =
            executionResult.failed || 0;

        const results =
            executionResult.results || [];


      
        // 2. SAVE EXECUTION RESULT
    

        interview.executionResult = {

            total,

            passed,

            failed,

            results,
        };


      
        // 3. EXECUTION SCORE
    

        const executionScore =
            total === 0
                ? 0
                : Math.round(
                    (passed /
                        total) *
                    100
                );

        console.log(
            "\n Execution Score:",
            executionScore
        );


   
        // 4. AI EVALUATION
    

       

        const evaluation =
            await evaluateCode({

                question:
                    interview.question
                        .description,

                candidateCode:
                    code,

                language:
                    interview.language,

                executionResult,
            });


        

        console.log(
            JSON.stringify(
                evaluation,
                null,
                2
            )
        );

        

      
        // 5. AI SCORE
    

        const aiScore =
            Number(
                evaluation
                    ?.correctness_score
            ) || 0;

        console.log(
            "AI Score:",
            aiScore
        );


      
        // 6. FINAL SCORE
       

        const finalScore =
            Math.round(
                executionScore * 0.7 +
                aiScore * 0.3
            );

        console.log(
            " Final Score:",
            finalScore
        );


        // 7. SAVE EVALUATION


        interview.score =
            finalScore;

        interview.evaluation =
            evaluation;

        // 8. COMPLETE INTERVIEW


        if (
            total > 0 &&
            passed === total
        ) {

            interview.status =
                "completed";

        } else {

            interview.status =
                "in_progress";
        }

        console.log(
            "\n Interview final status:",
            interview.status
        );


        
        // 9. SAVE DATABASE


        await interview.save();




        // 10. RETURN RESULT


        return {

            interviewId:
                interview._id,

            score:
                finalScore,

            executionScore,

            aiScore,

            total,

            passed,

            failed,

            results,

            evaluation,

            status:
                interview.status,
        };
    };



// GET INTERVIEW RESULT


export const getInterviewResultService =
    async ({
        interviewId,
        userId,
    }) => {

        const interview =
            await Interview.findOne({
                _id: interviewId,
                user: userId,
            }).lean();

        if (!interview) {

            throw new Error(
                "Interview not found"
            );
        }


        
        // RESULT ONLY AFTER COMPLETION
   

        if (
            interview.status !==
            "completed"
        ) {

            throw new Error(
                "Interview not completed"
            );
        }


       
        // REMOVE HIDDEN TEST CASES
    

        if (interview.question) {

            delete interview.question
                .hidden_test_cases;
        }


         
        // RETURN CLEAN RESULT
        

        return {

            interviewId:
                interview._id,

            topic:
                interview.topic,

            difficulty:
                interview.difficulty,

            language:
                interview.language,

            question:
                interview.question,

            score:
                interview.score,

            evaluation:
                interview.evaluation,

            executionResult:
                interview.executionResult,

            status:
                interview.status,

            createdAt:
                interview.createdAt,

            updatedAt:
                interview.updatedAt,
        };
    };


 
// GET INTERVIEW HISTORY
 

export const getInterviewHistoryService = async ({
    userId,
}) => {

    

    console.log(
        "USER ID:",
        userId
    );


    const interviews =
        await Interview.find({
            user: userId,
        })
            .sort({
                createdAt: -1,
            })
            .lean();


    console.log(
        " INTERVIEWS FOUND:",
        interviews.length
    );

    console.log(
        "INTERVIEWS:",
        interviews
    );


    return interviews.map(
        (interview) => ({

            interviewId:
                interview._id,

            title:
                interview.question?.title ||
                "Coding Interview",

            topic:
                interview.topic,

            difficulty:
                interview.difficulty,

            language:
                interview.language,

            score:
                interview.score ?? 0,

            status:
                interview.status,

            createdAt:
                interview.createdAt,

            updatedAt:
                interview.updatedAt,
        })
    );
};