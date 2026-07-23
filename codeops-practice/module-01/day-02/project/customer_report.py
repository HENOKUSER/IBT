customers_list =[
    ("kebede",3000),("abebe",1500),("seid",800),("derartu",10000),("yhunsew",440)
    ]

def tier (balance):
    if balance >=1000:
        return "premium"
    elif balance >= 500:
        return "standard"
    else:
        return "basic"

for name,balance in customers_list:
    print(f"{name} has {balance} amount and he/she is at {tier(balance)} level")