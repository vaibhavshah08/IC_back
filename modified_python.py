
                
Updated Content: # Input two numbers
num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))

# Perform arithmetic operations
sum_result = num1 + num2
difference_result = num1 - num2
product_result = num1 * num2
mod_result = num1 % num2

# Check if num2 is not 0 to avoid division by zero
if num2 ! =0:
    division_result = num1 / num2
else:
    division_result = "Cannot divide by zero"

# Print the results
print("Sum:", sum_result)
print("Difference:", difference_result)
print("Product:", product_result)
print("Division:", division_result)
print("Modulus:", mod_result)