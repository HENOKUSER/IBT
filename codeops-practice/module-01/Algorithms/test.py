# question 1 
print("="*10)

Test_1=[1, 2, 3, 6, 4, 8]
Test_2=[0, 1, 2, 3, 4]

def even_Number(num):
    new_array=[num for index,num in enumerate(num) if num%2==0 and index%2==0]
    print(new_array)
even_Number(Test_1)
even_Number(Test_2)
print("="*10)
# question 2 

def reverseCompare(str):
    reverse_str= (str[::-1])
    if int(str)>int(reverse_str):
        print("OK")
    else:
        print("not OK")

reverseCompare(str(72))
reverseCompare(str(23))

print("="*10)
# 3 question 
factorial=1
def returnFactorial(factnum):
    if factnum==0 or factnum==1:
        return factorial
    else:
        return factnum * (returnFactorial(factnum-1))
        

print(returnFactorial(5))
print(returnFactorial(6))
print(returnFactorial(0))

print("="*10)

#  4

arry=[2,3,7, 11, 37]
arry1=[2,4,10,5,6]

def check (arr):
  array =[a for a in arr if a*2  in arr]  
  if len(array)==0:
      print ("is maree")
  else:
      print("is not maree")

check(arry)    
check(arry1) 


print("="*10)

#  5

def isdual(array_list):
    lit=[n for n in array_list if array_list.count(n) != 2]
    if len(lit)==0:
      return 1
    else:
      return 0

a=[1, 2, 1, 3, 3, 2]
b=[2, 5, 2, 5, 5]

print (f"dual{isdual(a)}")
print (f"dual{isdual(b)}")
print("="*10)

# 6
def digitalClock(seconds):
    hours = (seconds // 3600) % 24  
    minutes = (seconds % 3600) // 60
    secs = seconds % 60

    return f"{hours:02d}:{minutes:02d}:{secs:02d}"

print(digitalClock(5025))   
print(digitalClock(61201))  
print(digitalClock(87000))  

