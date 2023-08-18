import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from "openai";

@Injectable()
export class FileService {
    private readonly openAiAPi: OpenAIApi
    constructor(){
        const configuration = new Configuration({
          // organization: 'org-yGboeUchk2VkSwL82AHp8ZvW',
          apiKey: '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',
      });
      this.openAiAPi = new OpenAIApi(configuration);
      }
    async getModelAnswer(content:string,prompt:string){
        try{
            const params: CreateCompletionRequest={
                prompt:`I want you to act as a content editor for file modifications. You will receive a piece of content, which could be code or text, along with a prompt detailing what needs to be done with that content. Your task is to follow the instructions provided in the prompt and perform the necessary action on the content. After making the required modifications, you should return the updated content to me. Here's an example format for your response:

                Content: "Here is a sample Python code: 
                num1 = float(input("Enter the first number: "))
                num2 = float(input("Enter the second number: "))
                num3 = float(input("Enter the third number: "))
                
                # Compare the numbers to find the greatest
                if num1 >= num2 and num1 >= num3:
                    greatest = num1
                elif num2 >= num1 and num2 >= num3:
                    greatest = num2
                else:
                    greatest = num3
                
                # Print the greatest number
                print("The greatest number is:", greatest)
                
                
                Prompt: "Change the above python code into C++."

                Updated Content: "Here is a sample C++ code:
                #include <iostream>
                using namespace std;
                int main() {
                    // Input three numbers
                    double num1, num2, num3;
                    cout << "Enter the first number: ";
                    cin >> num1;
                    cout << "Enter the second number: ";
                    cin >> num2;
                    cout << "Enter the third number: ";
                    cin >> num3;
                    // Compare the numbers to find the greatest
                    double greatest;
                    if (num1 >= num2 && num1 >= num3) {
                        greatest = num1;
                    } else if (num2 >= num1 && num2 >= num3) {
                        greatest = num2;
                    } else {
                        greatest = num3;
                    }
                    // Print the greatest number
                    cout << "The greatest number is: " << greatest << endl;
                    return 0;
                }
                              
                The content is: ${content}
                The prompt is: ${prompt}`,
                model: "text-davinci-003",
                temperature: 0.7,
                max_tokens:2048
            }
            const response = await this.openAiAPi.createCompletion(params)
            const array = response.data["choices"][0]["text"]
            return array
        }catch(error){
        
        }
    }
}
